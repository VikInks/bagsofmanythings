import {validateAndResponse} from "../utils/validate.response";
import {isAdmin, isFriend, verifyFreeAccount} from "../../dal/user.dal";
import {findMyPortfolio} from "../../dal/portfolio.dal";
import {respondWithStatus} from "../utils/response.status";
import {CharacterSheet, ICharacterSheet} from "../../model/sheet.character.schema";
import {exceptionHandler} from "../utils/exception.handler";
import {createCharacterSheet, deleteCharacterSheet, updateCharacterSheet} from "../../dal/sheet.dal";

// todo: ajouter peut-être plus de vérification pour les feuilles de personnages
const verifyUserPermission = async (context: any) => {
    const admin = await isAdmin(context.user);
    const friend = await isFriend(context.user);
    if (!admin || !friend) {
        const freeAccount = await verifyFreeAccount(context.user);
        if (!freeAccount) return false;
        const portfolio: any = await findMyPortfolio(context.user);
        return (portfolio?.characterSheets.length ?? 0) > 2;
    }
    return true;
}

export const sheetResolvers = {
    Query: {
        // todo: récupérer toutes les feuilles de personnages d'un utilisateur uniquement pour l'utilisateur qui les possèdent
        getCharacterSheets: async (_: any, args: any, context: any) => {
            return null;
        },
        // todo: récupérer la version d'une feuille de personnage d'un personnage uniquement pour l'utilisateur qui les possèdent
        getCharacterSheetVersion: async (_: any, args: any, context: any) => {
            return null;
        },
        // todo: récupérer toutes les feuilles de personnages d'une campagne, uniquement pour le MJ de la campagne
        getCharacterSheetFromCampaign: async (_: any, args: any, context: any) => {
            return null;
        }
    },
    Mutation: {
        // todo: vérifier comment compter l'ajout d'une feuille de follower (animaux, démons, etc)
        //  pour qu'elle ne soit pas décompter du nombre autoriser de personnage dans le portfolio pour une compte gratuit
        createCharacterSheet: async (_: any, args: ICharacterSheet, context: any) => {
            await validateAndResponse(null, args, 'character creation', context, async () => {
                try {
                    const maxCharacterReached = await verifyUserPermission(context);
                    if (maxCharacterReached) {
                        return respondWithStatus(200, 'Max character reached in portfolio', true, null, context);
                    }
                    const newCharacter = await createCharacterSheet(args);
                    return respondWithStatus(200, `${args.basicInfo.name} created`, true, newCharacter, context);
                } catch (e: any) {
                    return exceptionHandler('character creation', e, context);
                }
            });
        },
        updateCharacterSheet: async (_: any, args: any, context: any) => {
            await validateAndResponse(null, args, 'character update', context, async () => {
                try {
                    // todo: vérification des droits de l'utilisateur si admin peut mettre à jour n'importe quelle feuille
                    const character = await updateCharacterSheet(args.id, args);
                    if (!character) return respondWithStatus(404, 'Not Found', false, null, context);
                    return respondWithStatus(200, `${args.basicInfo.name} updated`, true, character, context);
                } catch (e: any) {
                    return exceptionHandler('character update', e, context);
                }
            });
        },
        deleteCharacterSheet: async (_: any, args: any, context: any) => {
            await validateAndResponse(null, args, 'character deletion', context, async () => {
                try {
                    // todo: vérification des droits de l'utilisateur si admin peut supprimer n'importe quelle feuille
                    const character = await deleteCharacterSheet(args.id);
                    if (!character) return respondWithStatus(404, 'Not Found', false, null, context);
                    return respondWithStatus(200, `${args.basicInfo.name} deleted`, true, character, context);
                } catch (e: any) {
                    return exceptionHandler('character deletion', e, context);
                }
            });
        }
    }
}
