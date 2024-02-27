import mongoose from "mongoose";

export interface ISpellSlot {
    level: number;
    available: number;
    used: number;
}

enum AbilityEnum {
    FOR = "FOR",
    DEX = "DEX",
    CON = "CON",
    INT = "INT",
    WIS = "WIS",
    CHA = "CHA",
}

const abilityScoreSchema = {
    score: {type: Number, required: true},
    modifier: {type: Number, required: true},
};

const skillSchema = {
    proficiency: {type: Boolean, default: false},
    bonus: {type: Number, required: true},
};

const savingThrowSchema = {
    proficiency: {type: Boolean, default: false},
    bonus: {type: Number, default: 0},
}

const diceSchema = {
    total: {type: Number, required: true},
    current: {type: Number, required: true},
}

const WeaponAndSpellSchema = new mongoose.Schema({
    name: {type: String, required: true},
    attackBonus: {type: Number, required: true},
    damage: {
        diceCount: {type: Number, required: true},
        diceValue: {type: Number, required: true},
        bonus: {type: Number, required: true},
        type: {type: String, required: true},
    },
    critical: {type: Number, default: 20},
    range: {type: Number, default: 5},
    save: {
        attributes: { type: String, enum: Object.values(AbilityEnum), default: AbilityEnum.FOR },
        effect: {type: String, default: '1/2 damage on successful save'},
    },
    description: {type: String, required: true},
    properties: [{type: String}],
    weight: {type: Number, required: true},
    value: {type: Number, required: true},
}, {_id: false});

const SpellSlotSchema = new mongoose.Schema({
    level: {type: Number, default: 0},
    available: {type: Number, default: 0},
    used: {
        type: Number,
        default: 0,
        validate: {
            validator: function (this: ISpellSlot, v: number): boolean {
                return v <= this.available;
            },
            message: (props: { value: any }) => `Used spell slots cannot exceed available spell slots`
        }
    },
}, {_id: false});

export interface ICharacterSheet {
    playerName: string;
    inspiration: boolean;
    proficiencyBonus: number;
    passiveWisdom: number;
    languagesAndProficiencies: string[];
    equipment: {
        name: string;
        weight: number;
        quantity: number;
    }[];
    weapons: string[]; // Assuming that this is an array of string identifiers
    basicInfo: {
        name: string;
        class: string;
        background: string;
        race: string;
        alignment: string;
        level: number;
    };
    attributes: {
        [ability in AbilityEnum]: {
            score: number;
            modifier: number;
        }
    };
    skills: { [k: string]: { proficiency: boolean, bonus: number } };
    spells: { name: string; level: number; description: string; cast: boolean; prepared: boolean; }[];
    items: {
        name: string;
        description?: string;
        type: string;
        value?: number;
        weight?: number;
        quantity?: number;
        properties?: string[];
    }[];
    featuresAndTraits: { name: string; description: string }[];
    hitPoints: {
        max: number;
        current: number;
        temporary: number;
    };
    experiencePoints: {
        nextLevel: number;
        current: number;
    };
    treasures: {
        name: string,
        quantity: number,
        value: number,
    }[];
    currency: {
        platinum: number;
        gold: number;
        electrum: number;
        silver: number;
        copper: number;
    };
    armorClass: number;
    initiative: number;
    speed: number;
    savingThrows: {
        [ability in AbilityEnum]: {
            proficiency: boolean;
            bonus: number;
        }
    };
    hitDice: { total: number; current: number; };
    lifeDice: { total: number; current: number; };
    deathSaves: {
        successes: number;
        failures: number;
    };
    attacks: {
        name: string;
        bonus: number;
        damage: string;
        type: string;
    }[];
    spellCasting: {
        ability: string;
        saveDC: number;
        attackBonus: number;
    };
    personalityTraits: string;
    ideals: string;
    bonds: string;
    flaws: string;
    backstory: string;
    appearance: string;
    age: number;
    height: string;
    weight: number;
    spellSlot: ISpellSlot[];
    alliesAndOrganizations: { name: string }[];
}

const attributeSchema = new mongoose.Schema({
    score: {type: Number, required: true},
    modifier: {type: Number, required: true}
}, {_id: false});

const CharacterSheetSchema = new mongoose.Schema({
    playerName: {type: String, required: true},
    inspiration: {type: Boolean, default: false},
    proficiencyBonus: {type: Number, required: true},
    passiveWisdom: {type: Number, required: true},
    languagesAndProficiencies: [{type: String, required: true}],
    equipment: [{
        name: {type: String, required: true},
        weight: {type: Number, required: true},
        quantity: {type: Number, required: true},
    }],
    weapons: [WeaponAndSpellSchema],
    basicInfo: {
        name: {type: String, required: true},
        class: {type: String, required: true},
        background: {type: String, required: true},
        race: {type: String, required: true},
        alignment: {type: String, required: true},
        level: {type: Number, required: true}
    },
    attributes: {
        strength: attributeSchema,
        dexterity: attributeSchema,
        constitution: attributeSchema,
        intelligence: attributeSchema,
        wisdom: attributeSchema,
        charisma: attributeSchema,
    },
    skills: {
        acrobatics: skillSchema,
        animalHandling: skillSchema,
        arcana: skillSchema,
        athletics: skillSchema,
        deception: skillSchema,
        history: skillSchema,
        insight: skillSchema,
        intimidation: skillSchema,
        investigation: skillSchema,
        medicine: skillSchema,
        nature: skillSchema,
        perception: skillSchema,
        performance: skillSchema,
        persuasion: skillSchema,
        religion: skillSchema,
        sleightOfHand: skillSchema,
        stealth: skillSchema,
        survival: skillSchema
    },
    spells: [{
        name: {type: String, required: true},
        level: {type: Number, required: true},
        description: {type: String, required: true},
        cast: {type: Boolean, default: false},
        prepared: {type: Boolean, default: false},
    }],
    items: [{
        name: {type: String, required: true},
        description: {type: String},
        type: {type: String, required: true},
        value: {type: Number},
        weight: {type: Number},
        quantity: {type: Number, default: 1},
        properties: [{type: String}]
    }],
    featuresAndTraits: [{
        name: {type: String, required: true},
        description: {type: String, required: true},
    }],
    hitPoints: {
        max: {type: Number, required: true},
        current: {type: Number, required: true},
        temporary: {type: Number, default: 0},
    },
    experiencePoints: {
        nextLevel: {type: Number, default: 300},
        current: {type: Number, default: 0},
    },
    treasures: {},
    currency: {
        platinum: {type: Number, default: 0},
        gold: {type: Number, default: 0},
        electrum: {type: Number, default: 0},
        silver: {type: Number, default: 0},
        copper: {type: Number, default: 0},
    },
    armorClass: {type: Number, default: 0},
    initiative: {type: Number, default: 0},
    speed: {type: Number, default: 0},
    savingThrows: {
        strength: savingThrowSchema,
        dexterity: savingThrowSchema,
        constitution: savingThrowSchema,
        intelligence: savingThrowSchema,
        wisdom: savingThrowSchema,
        charisma: savingThrowSchema,
    },
    hitDice: diceSchema,
    lifeDice: diceSchema,
    deathSaves: {
        successes: {type: Number, default: 0, max: 3},
        failures: {type: Number, default: 0, max: 3},
    },
    attacks: [{
        name: {type: String, required: true},
        bonus: {type: Number, required: true},
        damage: {type: String, required: true},
        type: {type: String, required: true},
    }],
    spellCasting: {
        ability: {type: String, required: true},
        saveDC: {type: Number, required: true},
        attackBonus: {type: Number, required: true},
    },
    personalityTraits: {type: String, required: true},
    ideals: {type: String, required: true},
    bonds: {type: String, required: true},
    flaws: {type: String, required: true},
    backstory: {type: String, required: true},
    appearance: {type: String, required: true},
    age: {type: Number, required: true},
    height: {type: String, required: true},
    weight: {type: Number, required: true},
    spellSlot: [SpellSlotSchema],
    alliesAndOrganizations: [{
        name: {type: String, required: true},
        description: {type: String, required: true},
    }]
}, {timestamps: true});

export const CharacterSheet = mongoose.model<ICharacterSheet>("CharacterSheet", CharacterSheetSchema);
