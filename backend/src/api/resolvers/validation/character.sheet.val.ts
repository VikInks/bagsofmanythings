import Joi from 'joi';

const abilityEnum = Joi.string().valid('FOR', 'DEX', 'CON', 'INT', 'WIS', 'CHA');

const abilityScoreValidation = Joi.object({
    score: Joi.number().required(),
    modifier: Joi.number().required(),
});

const skillValidation = Joi.object({
    proficiency: Joi.boolean().default(false),
    bonus: Joi.number().required(),
});

const savingThrowValidation = Joi.object({
    proficiency: Joi.boolean().default(false),
    bonus: Joi.number().default(0),
});

const diceValidation = Joi.object({
    total: Joi.number().required(),
    current: Joi.number().required(),
});

const weaponAndSpellValidation = Joi.object({
    name: Joi.string().required(),
    attackBonus: Joi.number().required(),
    damage: Joi.object({
        diceCount: Joi.number().required(),
        diceValue: Joi.number().required(),
        bonus: Joi.number().required(),
        type: Joi.string().required(),
    }).required(),
    critical: Joi.number().default(20),
    range: Joi.number().default(5),
    save: Joi.object({
        attributes: abilityEnum.default('FOR'),
        effect: Joi.string().default('1/2 damage on successful save'),
    }),
    description: Joi.string().required(),
    properties: Joi.array().items(Joi.string()),
    weight: Joi.number().required(),
    value: Joi.number().required(),
});

const spellSlotValidation = Joi.object({
    level: Joi.number().default(0),
    available: Joi.number().default(0),
    used: Joi.number().default(0).max(Joi.ref('available')),
});

const characterSheetValidation = Joi.object({
    playerName: Joi.string().required(),
    inspiration: Joi.boolean().default(false),
    proficiencyBonus: Joi.number().required(),
    passiveWisdom: Joi.number().required(),
    languagesAndProficiencies: Joi.array().items(Joi.string()).required(),
    equipment: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        weight: Joi.number().required(),
        quantity: Joi.number().required(),
    })).required(),
    weapons: Joi.array().items(weaponAndSpellValidation),
    basicInfo: Joi.object({
        name: Joi.string().required(),
        class: Joi.string().required(),
        background: Joi.string().required(),
        race: Joi.string().required(),
        alignment: Joi.string().required(),
        level: Joi.number().required(),
    }).required(),
    attributes: Joi.object().keys({
        strength: abilityScoreValidation,
        dexterity: abilityScoreValidation,
        constitution: abilityScoreValidation,
        intelligence: abilityScoreValidation,
        wisdom: abilityScoreValidation,
        charisma: abilityScoreValidation,
    }),
    skills: Joi.object().pattern(/^/, skillValidation),
    spells: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        level: Joi.number().required(),
        description: Joi.string().required(),
        cast: Joi.boolean().default(false),
        prepared: Joi.boolean().default(false),
    })),
    items: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        description: Joi.string().optional(),
        type: Joi.string().required(),
        value: Joi.number().optional(),
        weight: Joi.number().optional(),
        quantity: Joi.number().default(1),
        properties: Joi.array().items(Joi.string()).optional(),
    })),
    featuresAndTraits: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
    })),
    hitPoints: Joi.object({
        max: Joi.number().required(),
        current: Joi.number().required(),
        temporary: Joi.number().default(0),
    }),
    experiencePoints: Joi.object({
        nextLevel: Joi.number().default(300),
        current: Joi.number().default(0),
    }),
    treasures: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        quantity: Joi.number().default(1),
        value: Joi.number().optional(),
    })),
    currency: Joi.object({
        platinum: Joi.number().default(0),
        gold: Joi.number().default(0),
        electrum: Joi.number().default(0),
        silver: Joi.number().default(0),
        copper: Joi.number().default(0),
    }),
    armorClass: Joi.number().required(),
    initiative: Joi.number().required(),
    speed: Joi.number().required(),
    savingThrows: Joi.object().keys({
        strength: savingThrowValidation,
        dexterity: savingThrowValidation,
        constitution: savingThrowValidation,
        intelligence: savingThrowValidation,
        wisdom: savingThrowValidation,
        charisma: savingThrowValidation,
    }),
    hitDice: diceValidation,
    lifeDice: diceValidation,
    deathSaves: Joi.object({
        successes: Joi.number().default(0).max(3),
        failures: Joi.number().default(0).max(3),
    }),
    attacks: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        bonus: Joi.number().required(),
        damage: Joi.string().required(),
        type: Joi.string().required(),
    })),
    spellCasting: Joi.object({
        ability: Joi.string().required(),
        saveDC: Joi.number().required(),
        attackBonus: Joi.number().required(),
    }),
    personalityTraits: Joi.string().required(),
    ideals: Joi.string().required(),
    bonds: Joi.string().required(),
    flaws: Joi.string().required(),
    backstory: Joi.string().required(),
    appearance: Joi.string().required(),
    age: Joi.number().required(),
    height: Joi.string().required(),
    weight: Joi.number().required(),
    spellSlot: Joi.array().items(spellSlotValidation),
    alliesAndOrganizations: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
    }),
});

export default characterSheetValidation;
