import { gql } from '@apollo/client';

export const SIGN_UP = gql`
    query SignUp($email: String!, $password: String!, $username: String!, $avatar: String!) {
        signUp(email: $email, password: $password, username: $username, avatar: $avatar) {
            success
            data
            message
        }
    }
`;
