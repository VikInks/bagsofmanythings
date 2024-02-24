import { gql } from 'apollo-server-express';

export const portfolioTypeDefs = gql`
  type CharacterSheetVersion {
    campaignId: Campaign
    characterSheetData: CharacterSheet!
  }

  input CharacterSheetVersionInput {
    campaignId: CampaignInput
    characterSheetData: CharacterSheetInput!
  }
  
  type Version {
    characterName: String!
    versions: [CharacterSheetVersion!]!
  }

  input VersionInput {
    characterName: String!
    versions: [CharacterSheetVersionInput!]!
  }

  type Portfolio {
    userId: User!
    characterSheets: [Version!]!
  }

  input PortfolioInput {
    userId: UserInput!
    characterSheets: [VersionInput!]!
  }

  extend type Query {
    getPortfolio(userId: ID!): Response
  }

  extend type Mutation {
    createCharacterSheetVersion(sheetId: ID!, campaignId: ID!): Response
    updateCharacterSheetVersion(sheetVersionId: ID!, input: CharacterSheetInput!): Response
    deleteCharacterSheetVersion(sheetVersionId: ID!): Response
    createPortfolio(userId: ID!): Response
    addCharacterSheetToPortfolio(portfolioId: ID!, sheetId: ID!): Response
    removeCharacterSheetFromPortfolio(portfolioId: ID!, sheetId: ID!): Response
  }
`;
