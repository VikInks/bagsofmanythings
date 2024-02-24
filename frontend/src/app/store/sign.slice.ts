import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IUser} from "../../interface/user.interface";

const initialState: IUser = {
    _id: '',
    username: '',
    email: '',
    bio: '',
    avatar: '',
    preferences: {
        language: '',
        theme: '',
        notifications: false,
    },
};

export const signSlice = createSlice({
    name: 'sign',
    initialState: {} as IUser,
    reducers: {
        signIn: (_, action: PayloadAction<IUser>) => {
            return action.payload;
        },
        signUp: (_, action: PayloadAction<IUser>) => {
            return action.payload;
        },
        signOut: () => initialState,
    },
});

// Export actions
export const { signIn, signOut } = signSlice.actions;

// Export reducer
export default signSlice.reducer;
