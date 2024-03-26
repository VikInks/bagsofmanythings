import {campaign} from "../../model/campaign.schema";
import {v4 as uuidv4} from "uuid";
import {addPlayerToCampaign, existingLink, removePlayerFromCampaign} from "../../data_access/campaign.dal";
import {findUserById} from "../../data_access/user.dal";
import {IResponseStatus, respondWithStatus} from "../utils/response.status";
import {contextType} from "../../config/context.type";
import {exceptionHandler} from "../utils/exception.handler";

interface ArgsGetCampaign {
    id: string;
}

interface ArgsGetCampaignsByGameMaster {
    gameMaster: string;
}

interface ArgsCampaignInput {
    input: {
        name: string;
        description: string;
        gameMaster: string;
        players: string[];
        games: string;
    }
}

interface ArgsUpdateCampaign extends ArgsCampaignInput {
    id: string;
}

interface ArgsDeleteCampaign {
    id: string;
}

export const campaignResolvers = {
    Query: {
        campaigns: async (_: any, __:any, context: contextType): Promise<IResponseStatus> => {
            try {
                const campaigns = await campaign.find();
                return respondWithStatus(200, "Campaigns found", true, campaigns, context);
            } catch (e: any) {
                return exceptionHandler("fetching campaigns", e, context);
            }
        },
        campaign: async (_: any, args: ArgsGetCampaign, context: contextType): Promise<IResponseStatus> => {
            try {
                console.log(parent);
                const camp = await campaign.findById({_id: args.id});
                if(!camp) return respondWithStatus(404, "Campaign not found", false, null, context);
                return respondWithStatus(200, "Campaign found", true, camp, context);
            } catch (e: any) {
                return respondWithStatus(500, "Error while fetching campaign", false, null, context);
            }
        },
        campaignsByGameMaster: async (_: any, args: ArgsGetCampaignsByGameMaster, context: contextType): Promise<IResponseStatus> => {
            try {
                const getCampaigns = await campaign.find({gameMaster: args.gameMaster});
                if (!getCampaigns) return respondWithStatus(404, "Campaigns not found", false, null, context);
                return respondWithStatus(200, "Campaigns found", true, getCampaigns, context);
            } catch (e: any) {
                return exceptionHandler("fetching campaigns by game master", e, context);
            }
        },
    },
    Mutation: {
        createCampaign: async (_: any, args: ArgsCampaignInput, context: contextType): Promise<IResponseStatus> => {
            try {
                const inviteLink = uuidv4();
                const newCampaign = await campaign.create({...args, inviteLink});
                if (!newCampaign) return respondWithStatus(500, "Error while creating campaign", false, null, context);
                return respondWithStatus(200, "Campaign created", true, newCampaign, context);
            } catch (e: any) {
                return exceptionHandler("creating campaign", e, context);
            }
        },
        updateCampaign: async (_: any, args: ArgsUpdateCampaign, context: contextType): Promise<IResponseStatus> => {
            try {
                const upCampaign = await campaign.findByIdAndUpdate(args.id, {...args});
                if (!upCampaign) return respondWithStatus(404, "Campaign not found", false, null, context);
                return respondWithStatus(200, "Campaign updated", true, upCampaign, context);
            } catch (e: any) {
                return respondWithStatus(500, "Error while updating campaign", false, null, context);
            }
        },
        deleteCampaign: async (_: any, args: ArgsDeleteCampaign, context: contextType): Promise<IResponseStatus> => {
            try {
                const delCampaign = await campaign.findByIdAndDelete({_id: args.id});
                if (!delCampaign) return respondWithStatus(404, "Campaign not found", false, null, context);
                return respondWithStatus(200, "Campaign deleted", true, delCampaign, context);
            } catch (e: any) {
                return respondWithStatus(500, "Error while deleting campaign", false, null, context);
            }
        },
        joinCampaignByLink: async (_: any, args: { user: any, link: any }, context: contextType): Promise<IResponseStatus> => {
            try {
                const user = await findUserById(args.user);
                const campaignToJoin = await existingLink(args.link);
                if (!user || !campaignToJoin) return respondWithStatus(404, "User or campaign not found", false, null, context);
                const toTheBattle = await addPlayerToCampaign(campaignToJoin._id.toString(), user);
                if (!toTheBattle) return respondWithStatus(500, "Error while joining campaign", false, null, context);
                return respondWithStatus(200, "Joined campaign", true, toTheBattle, context);
            } catch (e: any) {
                return exceptionHandler("joining campaign", e, context);
            }
        },
        removePlayerFromCampaign: async (_: any, args: any): Promise<IResponseStatus> => {
            try {
                const user = await findUserById(args.user);
                const campaignToLeave = await campaign.findById(args.campaign);
                if (!user || !campaignToLeave) return respondWithStatus(404, "User or campaign not found", false, null, args.context);
                const leaveTheBattle = await removePlayerFromCampaign(args.campaign, user);
                if (!leaveTheBattle) return respondWithStatus(500, "Error while leaving campaign", false, null, args.context);
                return respondWithStatus(200, "Left campaign", true, leaveTheBattle, args.context);
            } catch (e: any) {
                return exceptionHandler("leaving campaign", e, args.context);
            }
        }
    }
};
