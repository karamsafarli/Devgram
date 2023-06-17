import { configureStore } from '@reduxjs/toolkit';
import colorThemeReducer from './features/slicers';

export const store = configureStore({
    reducer: {
        colorThemeReducer,
    }
})

