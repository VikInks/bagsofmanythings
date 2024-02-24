import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    modifier: { type: Number, required: true },
    associatedStat: { type: String, required: true },
    advantage: { type: Boolean, required: true },
    disadvantage: { type: Boolean, required: true },
    notes: { type: String }
}, { _id: false });

const monsterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: String, required: true },
    alignment: { type: String, required: true },
    armorClass: { type: Number, required: true },
    hitPoints: { type: Number, required: true },
    hitDice: { type: String, required: true },
    speed: { type: String, required: true },
    stats: {
        strength: { type: Number, required: true },
        dexterity: { type: Number, required: true },
        constitution: { type: Number, required: true },
        intelligence: { type: Number, required: true },
        wisdom: { type: Number, required: true },
        charisma: { type: Number, required: true }
    },
    skills: [skillSchema],
    damageResistances: [{ type: String, required: false }],
    damageImmunities: [{ type: String, required: false }],
    conditionImmunities: [{ type: String, required: false }],
    senses: [{
        name: { type: String, required: true },
        value: { type: Number, required: true }
    }],
    languages: [{ type: String, required: false }],
    challengeRating: { type: Number, required: true },
    specialAbilities: [{
        name: { type: String, required: true },
        description: { type: String, required: true }
    }],
    actions: [{
        name: { type: String, required: true },
        description: { type: String, required: true }
    }],
    legendaryActions: [{
        name: { type: String, required: true },
        description: { type: String, required: true }
    }]
});

export const Monster = mongoose.model("Monster", monsterSchema);
