import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        message: null,
    },
    reducers: {
        // Cette action sera dispatchée avec les données de l'utilisateur après une connexion réussie
        signInSuccess: (state, action) => {
            state.user = action.payload.data;
            state.isAuthenticated = action.payload.success;
            state.message = action.payload.message;
        },
        // Pour gérer le sign out, on nettoie simplement l'état
        signOutSuccess: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.message = null;
        },
        // Action dispatchée après une inscription réussie
        signUpSuccess: (state, action) => {
            state.user = action.payload.data;
            state.isAuthenticated = action.payload.success;
            state.message = action.payload.message;
        },
        // Gérer les échecs d'authentification (optionnel)
        authFailure: (state, action) => {
            state.message = action.payload.message;
        },
    },
});

// Exporte les actions pour les utiliser dans des composants ou thunks
export const { signInSuccess, signOutSuccess, signUpSuccess, authFailure } = authSlice.actions;

// Sélecteurs
export const selectUser = (state: { auth: { user: any; isAuthenticated: any; message: any; }; }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: { user: any; isAuthenticated: any; message: any; }; }) => state.auth.isAuthenticated;
export const selectAuthMessage = (state: { auth: { user: any; isAuthenticated: any; message: any; }; }) => state.auth.message;

// Reducer
export default authSlice.reducer;
