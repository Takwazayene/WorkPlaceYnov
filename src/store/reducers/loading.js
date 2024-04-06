import {createSlice} from '@reduxjs/toolkit';

const loadingSlice = createSlice({
    name: 'Loading',
    initialState: {value: true},
    reducers: {
        setLoading: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {setLoading} = loadingSlice.actions;

export default loadingSlice.reducer;