import { CharacterSheet } from '../model/sheet.character.schema';
import {user} from "../model/user.schema";

export const getCharacterSheet = async (id: string) => CharacterSheet.findById(id);
export const getAllCharacterSheetsOfSpecificCampaign = async (campaignId: string) => CharacterSheet.find({ campaignId });
export const getAllCharacterSheetsOfSpecificUser = async (userId: string) => CharacterSheet.find({ userId });
export const createCharacterSheet = async (characterSheet: any) => new CharacterSheet(characterSheet).save().then(() => characterSheet.toObject());
export const updateCharacterSheet = async (id: string, characterSheet: any) => CharacterSheet.findOneAndUpdate({ _id: id }, characterSheet, { new: true });
export const deleteCharacterSheet = async (id: string) => CharacterSheet.findByIdAndDelete(id);
export const addFollower = async (userId: string, follower: any) => user.findByIdAndUpdate(userId, { $push: { followers: follower } });
export const deleteFollower = async (userId: string, followerId: string) => user.findByIdAndUpdate(userId, { $pull: { followers: { followerSheetId: followerId } } });
