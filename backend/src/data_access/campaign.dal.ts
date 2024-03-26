import {campaign, ICampaign} from "../model/campaign.schema";
import {IUser} from "../model/user.schema";

export const createCampaign = async (data: ICampaign) => {
    return new campaign(data).save();
};
export const getCampaigns = async () => campaign.find();
export const getCampaign = async (id: string) => campaign.findById({_id: id});
export const getCampaignsAsGameMaster = async (gameMaster: string) => campaign.find({gameMaster});
export const getCampaignsAsPlayer = async (player: string) => campaign.find({players: player});
export const updateCampaign = async (id: string, data: ICampaign) => campaign.findByIdAndUpdate(id, {...data});
export const addPlayerToCampaign = async (id: string, playerId: IUser) => campaign.findByIdAndUpdate(id, {$push: {players: playerId.id}});
export const removePlayerFromCampaign = async (id: string, playerId: IUser) => campaign.findByIdAndUpdate(id, {$pull: {players: playerId.id}});
export const deleteCampaign = async (id: string) => campaign.findByIdAndDelete({_id: id});
export const existingLink = async (link: string) => campaign.findOne({inviteLink: link});
export const isMjOfCampaign = async (user: IUser, campaignId: string) => campaign.findOne({gameMaster: user.id, _id: campaignId});
export const findCharacterSheetsOfPlayersInCampaign = async (campaignId: string) => campaign.findById(campaignId)
    .populate('players', 'characterSheets')
    .lean()
    .exec();
