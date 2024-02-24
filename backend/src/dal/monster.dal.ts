import {Monster} from '../model/monster.schema';

export const getMonsters = async () => Monster.find();
export const getMonster = async (id: string) => Monster.findById(id);
export const createMonster = async (monster: any) => Monster.create(monster);
export const updateMonster = async (id: string, monster: any) => Monster.findOneAndUpdate({_id: id, ...monster}, {new: true});
export const deleteMonster = async (id: string) => Monster.findByIdAndDelete(id);

