import mongoose from "mongoose";

enum GameNameEnum {
    DND5 = "DND5",
    DND3 = "DND3",
    STARFINDER = "STARFINDER",
    PATHFINDER = "PATHFINDER",
    CALL_OF_CTHULHU = "CALL_OF_CTHULHU",
    SHADOWRUN = "SHADOWRUN",
    VAMPIRE_THE_MASQUERADE = "VAMPIRE_THE_MASQUERADE",
    WOD = "WOD",
    OTHER = "OTHER",
}

export interface ICampaign extends Document {
    name: string;
    description: string;
    inviteLink: string;
    gameMaster: string;
    players: string[];
    game: string;
}

const campaignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    inviteLink: { type: String, required: true },
    gameMaster: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    game: { type: String, enum: Object.values(GameNameEnum), default: GameNameEnum.DND5, required: true},
}, { timestamps: true });

export const campaign = mongoose.model<ICampaign>("Campaign", campaignSchema);
