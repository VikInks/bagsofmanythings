import {gql} from "apollo-server-express";

export const userTypeDefs = gql`
    enum Lang {
        en
        fr
    }

    enum Role {
        member
        admin
    }

    enum AccountType {
        free
        premium
        friend
    }

    type UserPreferences {
        language: Lang!
        theme: String!
        notifications: Boolean!
    }

    input UserPreferencesInput {
        language: Lang!
        theme: String!
        notifications: Boolean!
    }
    
    type Follower {
        followerSheetId: ID!
        followerSheetModel: String!
    }
    
    type DiceSkin {
        _id: ID!
        name: String!
        color: String!
        image: String!
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        bio: String
        avatar: String
        role: Role
        accountType: AccountType
        preferences: UserPreferences!
        friends: [User]
        campaigns: [Campaign]
        masterCampaigns: [Campaign]
        characterSheets: [CharacterSheet]
        followers: [Follower]
        diceSkins: [DiceSkin]
    }

    input UserInput {
        username: String!
        email: String!
        password: String!
        bio: String
        avatar: String
        preferences: UserPreferencesInput!
    }

    extend type Query {
        users: Response
        user(_id: ID!): Response
        getUsernames(partial: String!): Response
        getProfile: Response
    }

    extend type Mutation {
        updateUser(input: UserInput!): Response
        deleteUser(_id: ID!): Response
    }
`;
