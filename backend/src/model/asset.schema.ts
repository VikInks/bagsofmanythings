import mongoose from "mongoose";

// asset are the images, sounds, and other files that are used in the game

// maybe we shouldn't store the file in the database, but rather store the file in a folder and store the path in the database

// maybe we shouldn't indicate the game in the asset, but rather in the game, we should indicate the assets that are used in the game -> displaced to campaign.schema.ts already

const assetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    game: {type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true},
    file: { type: String, required: true },
});

export const asset = mongoose.model("Asset", assetSchema);
