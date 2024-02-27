import mongoose from "mongoose";

const diceSkinSchema = new mongoose.Schema({
   name: {type: String, required: true},
   image: {type: String, required: true},
}, {timestamps: true});

export const DiceSkin = mongoose.model("DiceSkin", diceSkinSchema);
