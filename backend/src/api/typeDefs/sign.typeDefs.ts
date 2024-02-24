import {gql} from "apollo-server-express";

export const signTypeDefs = gql`
    extend type Query {
        signIn(email: String!, password: String!): Response
        signOut: Response
    }
    
    extend type Mutation {
        signUp(username: String!, email: String!, password: String!, avatar: String!): Response
    }
`;
