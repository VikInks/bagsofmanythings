import {validateAndResponse} from "../utils/validate.response";
import {
    findMyCharacterToPortfolio,
    findUserById,
    isAdmin,
    isFriend,
    updateUser,
    verifyFreeAccount
} from "../../dal/user.dal";
import {respondWithStatus} from "../utils/response.status";
import {ICharacterSheet} from "../../model/sheet.character.schema";
import {exceptionHandler} from "../utils/exception.handler";
import {createCharacterSheet, deleteCharacterSheet, getCharacterSheet, updateCharacterSheet} from "../../dal/sheet.dal";
import {findCharacterSheetsOfPlayersInCampaign, isMjOfCampaign} from "../../dal/campaign.dal";
import characterSheetValidation from "./validation/character.sheet.val";

/**
 * Verifies if user has the necessary permissions.
 *
 * @async
 * @param {any} context - The context object.
 * @param {boolean} isFollower - Flag indicating if the user is a follower.
 * @returns {boolean} - True if user has the necessary permissions, false otherwise.
 */
const verifyUserPermission = async (context: any, isFollower: boolean): Promise<boolean> => {
    const admin = await isAdmin(context.user);
    const friend = await isFriend(context.user);
    if (!admin && !friend) {
        const freeAccount = await verifyFreeAccount(context.user);
        if (!freeAccount) return false;
        const user: any = await findUserById(context.user);

        if (!isFollower && (user.characterCount > 2)) return true;
    }
    return false;
}

export const sheetResolvers = {
    Query: {
        /**
         * Retrieves character sheets for the authenticated user.
         *
         * @param {any} _ - The input parameter placeholder (unused).
         * @param {any} args - The arguments passed to the function (unused).
         * @param {any} context - The context object containing user information.
         */
        getCharacterSheets: async (_: any, args: any, context: any) => {
            return await validateAndResponse(null, args, 'character retrieval', context, async () => {
                try {
                    const characterSheets = await findMyCharacterToPortfolio(context.user);
                    return respondWithStatus(200, 'OK', true, characterSheets, context);
                } catch (e: any) {
                    return exceptionHandler('character retrieval', e, context);
                }
            });
        },
        /**
         * Retrieves character sheets from a campaign.
         *
         * @async
         * @param {any} _ - Unused parameter.
         * @param {Object} args - The arguments passed to the function.
         * @param {string} args.campaignId - The ID of the campaign.
         * @param {any} context - The context object.
         */
        getCharacterSheetFromCampaign: async (_: any, args: { campaignId: string }, context: any) => {
            return await validateAndResponse(null, args, 'character retrieval', context, async () => {
                try {
                    if (!!await isMjOfCampaign(context.user, args.campaignId)) return respondWithStatus(403, 'Forbidden', false, null, context);
                    const characterSheets = await findCharacterSheetsOfPlayersInCampaign(args.campaignId);
                    return respondWithStatus(200, 'OK', true, characterSheets, context);
                } catch (e: any) {
                    return exceptionHandler('character retrieval', e, context);
                }
            });
        }
    },
    Mutation: {
        createCharacterSheet: async (_: any, {characterSheet, isFollower = false}: { characterSheet:ICharacterSheet, isFollower:boolean }, context: any, ) => {
            return await validateAndResponse(characterSheetValidation, characterSheet, 'character creation', context, async () => {
                try {
                    const maxCharacterReached = await verifyUserPermission(context, isFollower);
                    if (maxCharacterReached && !isFollower) return respondWithStatus(200, 'Max character reached in portfolio', false, null, context);
                    const newCharacter = await createCharacterSheet(characterSheet);
                    const user: any = await findUserById(context.user);
                    if (!isFollower) {
                        user.characterCount += 1;
                        await updateUser(context.user, user);
                    }
                    if (user.accountType === 'free' && user.followers.length > 4) return respondWithStatus(200, 'Max follower reached in portfolio', false, null, context);
                    return respondWithStatus(200, `${characterSheet.basicInfo.name} created`, true, newCharacter, context);
                } catch (e: any) {
                    return exceptionHandler('character creation', e, context);
                }
            });
        },
        updateCharacterSheet: async (_: any, args: any, context: any) => {
            return await validateAndResponse(characterSheetValidation, args, 'character update', context, async () => {
                try {
                    const user = await findUserById(context.user);
                    if(!user || !user.characterSheets.includes(args.id) || !isAdmin(context.user)) return respondWithStatus(403, 'Forbidden', false, null, context);
                    const character = await updateCharacterSheet(args.id, args);
                    if (!character) return respondWithStatus(404, 'Not Found', false, null, context);
                    return respondWithStatus(200, `${args.basicInfo.name} updated`, true, character, context);
                } catch (e: any) {
                    return exceptionHandler('character update', e, context);
                }
            });
        },
        deleteCharacterSheet: async (_: any, args: any, context: any) => {
            return await validateAndResponse(null, args, 'character deletion', context, async () => {
                try {
                    // todo: vérification des droits de l'utilisateur si admin peut supprimer n'importe quelle feuille
                    const owner = await getCharacterSheet(args.id);
                    const character = await deleteCharacterSheet(args.id);
                    if (!character) return respondWithStatus(404, 'Not Found', false, null, context);
                    const user: any = await findUserById(context.user);
                    user.characterCount -= 1;
                    await updateUser(context.user, user);
                    return respondWithStatus(200, `${args.basicInfo.name} deleted`, true, character, context);
                } catch (e: any) {
                    return exceptionHandler('character deletion', e, context);
                }
            });
        }
    }
}
