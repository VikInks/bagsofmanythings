import {gql} from "apollo-server-express";

export const sheetTypeDefs = gql`
    enum AbilityEnum {
        FOR
        DEX
        CON
        INT
        WIS
        CHA
    }

    type AbilityScore {
        score: Int!
        modifier: Int!
    }

    input AbilityScoreInput {
        score: Int!
        modifier: Int!
    }

    type Skill {
        proficiency: Boolean
        bonus: Int!
    }

    input SkillInput {
        proficiency: Boolean
        bonus: Int!
    }

    type SavingThrow {
        proficiency: Boolean
        bonus: Int
    }

    input SavingThrowInput {
        proficiency: Boolean
        bonus: Int
    }

    type Dice {
        total: Int!
        current: Int!
    }

    input DiceInput {
        total: Int!
        current: Int!
    }

    type Damage {
        diceCount: Int!
        diceValue: Int!
        bonus: Int!
        type: String!
    }

    input DamageInput {
        diceCount: Int!
        diceValue: Int!
        bonus: Int!
        type: String!
    }

    type Save {
        attributes: AbilityEnum
        effect: String
    }

    input SaveInput {
        attributes: AbilityEnum
        effect: String
    }

    type WeaponAndSpell {
        name: String!
        attackBonus: Int!
        damage: Damage!
        critical: Int
        range: Int
        save: Save
        description: String!
        properties: [String]
        weight: Float!
        value: Float!
    }

    input WeaponAndSpellInput {
        name: String!
        attackBonus: Int!
        damageDiceCount: Int!
        damageDiceValue: Int!
        damageBonus: Int!
        damageType: String!
        critical: Int
        range: Int
        saveAttribute: AbilityEnum
        saveEffect: String
        description: String!
        properties: [String]
        weight: Float!
        value: Float!
    }

    type SpellSlot {
        level: Int
        available: Int
        used: Int
    }

    input SpellSlotInput {
        level: Int
        available: Int
        used: Int
    }

    type BasicInfo {
        name: String!
        class: String!
        background: String!
        race: String!
        alignment: String!
        level: Int!
    }

    input BasicInfoInput {
        name: String!
        class: String!
        background: String!
        race: String!
        alignment: String!
        level: Int!
    }

    type Attributes {
        strength: AbilityScore!
        dexterity: AbilityScore!
        constitution: AbilityScore!
        intelligence: AbilityScore!
        wisdom: AbilityScore!
        charisma: AbilityScore!
    }

    input AttributesInput {
        strength: AbilityScoreInput!
        dexterity: AbilityScoreInput!
        constitution: AbilityScoreInput!
        intelligence: AbilityScoreInput!
        wisdom: AbilityScoreInput!
        charisma: AbilityScoreInput!
    }

    type Skills {
        acrobatics: Skill!
        animalHandling: Skill!
        arcana: Skill!
        athletics: Skill!
        deception: Skill!
        history: Skill!
        insight: Skill!
        intimidation: Skill!
        investigation: Skill!
        medicine: Skill!
        nature: Skill!
        perception: Skill!
        performance: Skill!
        persuasion: Skill!
        religion: Skill!
        sleightOfHand: Skill!
        stealth: Skill!
        survival: Skill!
    }

    input SkillsInput {
        acrobatics: SkillInput!
        animalHandling: SkillInput!
        arcana: SkillInput!
        athletics: SkillInput!
        deception: SkillInput!
        history: SkillInput!
        insight: SkillInput!
        intimidation: SkillInput!
        investigation: SkillInput!
        medicine: SkillInput!
        nature: SkillInput!
        perception: SkillInput!
        performance: SkillInput!
        persuasion: SkillInput!
        religion: SkillInput!
        sleightOfHand: SkillInput!
        stealth: SkillInput!
        survival: SkillInput!
    }

    type Spell {
        name: String!
        level: Int!
        description: String!
        cast: Boolean
        prepared: Boolean
    }

    input SpellInput {
        name: String!
        level: Int!
        description: String!
        cast: Boolean
        prepared: Boolean
    }

    type Item {
        name: String!
        description: String
        type: String!
        value: Float
        weight: Float
        quantity: Int
        properties: [String]
    }

    input ItemInput {
        name: String!
        description: String
        type: String!
        value: Float
        weight: Float
        quantity: Int
        properties: [String]
    }

    type FeatureAndTrait {
        name: String!
        description: String!
    }

    input FeatureAndTraitInput {
        name: String!
        description: String!
    }

    type HPEntity {
        max: Int!
        current: Int!
        temporary: Int
    }

    input HPEntityInput {
        max: Int!
        current: Int!
        temporary: Int
    }

    type ExperiencePoints {
        nextLevel: Int
        current: Int
    }

    input ExperiencePointsInput {
        nextLevel: Int
        current: Int
    }

    type Currency {
        platinum: Int
        gold: Int
        electrum: Int
        silver: Int
        copper: Int
    }

    input CurrencyInput {
        platinum: Int
        gold: Int
        electrum: Int
        silver: Int
        copper: Int
    }

    type DeathSaves {
        successes: Int
        failures: Int
    }

    input DeathSavesInput {
        successes: Int
        failures: Int
    }


    type SpellCasting {
        ability: AbilityEnum!
        saveDC: Int!
        attackBonus: Int!
    }

    input SpellCastingInput {
        ability: AbilityEnum!
        saveDC: Int!
        attackBonus: Int!
    }

    type AlliesAndOrganizations {
        name: String!
        description: String!
    }

    input AlliesAndOrganizationsInput {
        name: String!
        description: String!
    }

    type Equipment {
        name: String!
        properties: [String!]!
        weight: Float!
        value: Float!
    }

    input EquipmentInput {
        name: String!
        properties: [String!]!
        weight: Float!
        value: Float!
    }

    type CharacterSheet {
        playerName: String!
        inspiration: Boolean
        proficiencyBonus: Int!
        passiveWisdom: Int!
        languagesAndProficiencies: [String!]!
        equipment: [Equipment!]!
        weapons: [WeaponAndSpell!]!
        basicInfo: BasicInfo!
        attributes: Attributes!
        skills: Skills!
        spells: [Spell!]!
        items: [Item!]!
        featuresAndTraits: [FeatureAndTrait!]!
        hitPoints: HPEntity!
        experiencePoints: ExperiencePoints!
        currency: Currency!
        armorClass: Int
        initiative: Int
        speed: Int
        savingThrows: [SavingThrow!]!
        hitDice: Dice!
        lifeDice: Dice!
        deathSaves: DeathSaves!
        attacks: [WeaponAndSpell!]!
        spellCasting: SpellCasting!
        personalityTraits: String!
        ideals: String!
        bonds: String!
        flaws: String!
        backstory: String!
        appearance: String!
        age: Int!
        height: String!
        weight: Float!
        spellSlot: [SpellSlot!]!
        alliesAndOrganizations: AlliesAndOrganizations!
    }

    input CharacterSheetInput {
        playerName: String!
        inspiration: Boolean
        proficiencyBonus: Int!
        passiveWisdom: Int!
        languagesAndProficiencies: [String!]!
        equipment: [EquipmentInput!]!
        weapons: [WeaponAndSpellInput!]!
        basicInfo: BasicInfoInput!
        attributes: AttributesInput!
        skills: SkillsInput!
        spells: [SpellInput!]!
        items: [ItemInput!]!
        featuresAndTraits: [FeatureAndTraitInput!]!
        hitPoints: HPEntityInput!
        experiencePoints: ExperiencePointsInput!
        currency: CurrencyInput!
        armorClass: Int
        initiative: Int
        speed: Int
        savingThrows: [SavingThrowInput!]!
        hitDice: DiceInput!
        lifeDice: DiceInput!
        deathSaves: DeathSavesInput!
        attacks: [WeaponAndSpellInput!]!
        spellCasting: SpellCastingInput!
        personalityTraits: String!
        ideals: String!
        bonds: String!
        flaws: String!
        backstory: String!
        appearance: String!
        age: Int!
        height: String!
        weight: Float!
        spellSlot: [SpellSlotInput!]!
        alliesAndOrganizations: AlliesAndOrganizationsInput!
    }
    
    extend type Query {
        getCharacterSheets(userId: ID!): Response
        getCharacterSheetVersion(sheetId: ID!, version: Int!): Response
    }
    
    extend type Mutation {
        createCharacterSheet(input: CharacterSheetInput!, isFollower: String!): Response
        updateCharacterSheet(sheetId: ID!, input: CharacterSheetInput!): Response
        deleteCharacterSheet(sheetId: ID!): Response
    }
`;
