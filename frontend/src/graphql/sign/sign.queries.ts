import { gql } from '@apollo/client';

export const SIGN_IN = gql`
    query SignIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
            success
            message
            data
        }
    }
`;

export const SIGN_OUT = gql`
    query SignOut {
        signOut {
            success
            message
            data
        }
    }
`;
