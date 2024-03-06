import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false
    },
    reducers: {
        signIn: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        signOut: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
});

export const {signIn, signOut} = authSlice.actions;

export const selectUser = (state: {auth: {user: any, isAuthenticated: boolean}}) => state.auth.user;
export const selectIsAuthenticated = (state: {auth: {user: any, isAuthenticated: boolean}}) => state.auth.isAuthenticated;

export default authSlice.reducer;
