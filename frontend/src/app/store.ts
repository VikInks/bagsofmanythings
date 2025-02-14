import { configureStore } from '@reduxjs/toolkit';
import signReducer from './store/sign.slice';

const store = configureStore({
    reducer: {
        sign: signReducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
