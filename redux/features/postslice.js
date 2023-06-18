import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const res = await fetch('/api/post');
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error)
    }
});

// Create the slice

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        data: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default postsSlice.reducer;
