import { CharacterSheet } from '../model/sheet.character.schema';

export const getCharacterSheet = async (id: string) => CharacterSheet.findById(id);
export const getAllCharacterSheetsOfSpecificCampaign = async (campaignId: string) => CharacterSheet.find({ campaignId });
export const getAllCharacterSheetsOfSpecificUser = async (userId: string) => CharacterSheet.find({ userId });
export const createCharacterSheet = async (characterSheet: any) => new CharacterSheet(characterSheet).save();
export const updateCharacterSheet = async (id: string, characterSheet: any) => CharacterSheet.findOneAndUpdate({ _id: id }, characterSheet, { new: true });
export const deleteCharacterSheet = async (id: string) => CharacterSheet.findByIdAndDelete(id);
