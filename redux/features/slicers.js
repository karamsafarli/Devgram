import { createSlice } from '@reduxjs/toolkit';

export const colorThemeSlice = createSlice({
    name: 'colormode',
    initialState: {
        value: false,
    },
    reducers: {
        changemode: (state) => {
            state.value = !state.value
        },
        localmode: (state, action) => {
            state.value = action.payload
        }
    }
});



export const { changemode, localmode } = colorThemeSlice.actions;
export default colorThemeSlice.reducer;