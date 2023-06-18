import { configureStore } from '@reduxjs/toolkit';
import colorThemeReducer from './features/slicers';
import postsReducer from './features/postslice';

export const store = configureStore({
    reducer: {
        colorThemeReducer,
        posts: postsReducer,
    }
})

