import { gql } from '@apollo/client';

export const SIGN_OUT = gql`
    query signOut {
        signOut {
            message
            success
            data
        }
    }
`;
