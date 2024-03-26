// src/typeDefs.ts
import {gql} from 'apollo-server-express';

export const typeDefs = gql`
    scalar JSON
    
    type Me {
        id: ID!
        user: User!
        portfolio: [CharacterSheet!]!
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
