import mongoose from "mongoose";

const versionSchema = new mongoose.Schema({
    characterName: {type: String, required: true},
    versions: [{
        campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign"},
        characterSheetData: {type: mongoose.Schema.Types.ObjectId, ref: "CharacterSheet"}
    }]
}, {timestamps: true});

versionSchema.index({ 'versions.campaignId': 1, 'characterName': 1 });

const portfolioSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    characterSheets: [versionSchema],
}, {timestamps: true});

portfolioSchema.index({ 'userId': 1 });

export const Portfolio = mongoose.model("Portfolio", portfolioSchema);


