import {gql} from "apollo-server-express";

export const campaignTypeDefs = gql`
    type Campaign {
        _id: ID!
        name: String!
        description: String!
        created: String!
        updated: String!
        inviteLink: String!
        gameMaster: User!
        players: [User!]
        games: String!
    }

    input CampaignInput {
        name: String!
        description: String!
        gameMaster: ID!
        players: [ID!]
        games: [ID!]
    }

    extend type Query {
        campaign(_id: ID!): Response
        campaigns: Response
        campaignsByGameMaster(gameMaster: ID!): Response
    }

    extend type Mutation {
        createCampaign(input: CampaignInput!): Response
        updateCampaign(_id: ID!, input: CampaignInput!): Response
        deleteCampaign(_id: ID!): Response
        joinCampaignByLink(inviteLink: String!): Response
        removePlayerFromCampaign(_id: ID!, player: ID!): Response
    }
`;0
