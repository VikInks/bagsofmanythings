import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    game: {type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true}
});

export const asset = mongoose.model("Asset", assetSchema);
