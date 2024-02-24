import {gql} from "apollo-server-express";

export const userTypeDefs = gql`
    enum Lang {
        en
        fr
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

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        bio: String
        avatar: String
        preferences: UserPreferences!
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
    }

    extend type Mutation {
        updateUser(input: UserInput!): Response
        deleteUser(_id: ID!): Response
    }
`;
