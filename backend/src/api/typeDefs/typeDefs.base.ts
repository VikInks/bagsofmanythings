// src/typeDefs.ts
import {gql} from 'apollo-server-express';

export const typeDefs = gql`
    scalar JSON
    
    type Me {
        id: ID!
        username: String!
        portfolio: Portfolio!
        campaignsAsGm: [Campaign!]!
        campaignsAsPlayer: [Campaign!]!
    }

    type Response {
        success: Boolean!
        message: String
        data: JSON
    }

    type Query {
        hello: String
        me: Response
    }

    type Mutation {
        hello(arg: String): String
    }
`;
