import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        user: null,
        error: null,
        loading: false,
    },
    reducers: {
        loginUserStart: (state) => {
            
            state.loading = true;
            state.error = null;
        },
        loginUserSuccess: (state, action) => {
            // const { data, status, headers } = action.payload;
            // state.headers= headers['content-type'];
            state.loading = false;
            state.error= null;
            state.user = action.payload;
        },
        loginUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { loginUserStart, loginUserSuccess, loginUserFailure } = userSlice.actions;
export const sellectUser = (state) => state.user;
export default userSlice.reducer;