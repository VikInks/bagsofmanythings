import { gql } from '@apollo/client';

export const SIGN_UP = gql`
    mutation SignUp($username: String!, $email: String!, $password: String!, $avatar: String!) {
        signUp(username: $username, email: $email, password: $password, avatar: $avatar) {
            success
            message
            data
        }
    }
`;
