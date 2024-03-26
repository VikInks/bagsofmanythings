import { asset } from '../model/asset.schema'

export const getOwnedAssets = async (owner: string) => asset.find({owner: owner});
export const addAssets = async (assets: any) => asset.create(assets);
export const deleteAsset = async (id: string) => asset.findByIdAndDelete(id);
