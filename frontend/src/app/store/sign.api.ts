import axios from 'axios';
import { signIn, signOut } from './sign.slice';
import {AppDispatch} from "../store";
import {IUser} from "../../interface/user.interface";

// Define the types for sign up and sign in
interface SignUpInterface {
    username: string;
    password: string;
    email: string;
    avatar?: string;
}

interface SignInInterface {
    email: string;
    password: string;
}

async function POST(url: string, data: any) {
    return await axios.post(url, data, {withCredentials: true});
}

// Signup action
export const signUpApi = async (dispatch: AppDispatch, signUpData: SignUpInterface) => {
    const response = await POST('SIGN_UP', signUpData);
    if (response.data) {
        let userData = response.data as IUser;
        dispatch(signIn({
            _id: userData._id,
            username: userData.username,
            email: userData.email,
            bio: userData.bio,
            avatar: userData.avatar,
            preferences: userData.preferences,
        }));
    }
};

// Signout action
export const signOutApi = async (dispatch: AppDispatch) => {
    const response = await POST('SIGN_OUT', null);
    if (response.data) {
        dispatch(signOut());
    }
};
