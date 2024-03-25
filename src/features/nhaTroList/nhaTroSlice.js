import { createSlice } from '@reduxjs/toolkit';

import { getNhaTroList } from './nhaTroListThunk';

export const nhaTroSlice = createSlice({
    name: 'nhaTroList',
    initialState: {
        nhaTroList: [],
        error: null,
        loading: false,
    },
    reducers: {
        getNhaTroListStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getNhaTroListSuccess: (state, action) => {
            // const { data, status, headers } = action.payload;
            // state.headers= headers['content-type'];
            state.loading = false;
            state.error = null;
            state.nhaTroList = action.payload;
        },
        getNhaTroListFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
    extraReducers(builder) {
        // Xử lý các actions được sinh ra bởi createAsyncThunk
        // có pending, fullfilled, rejected
        builder
            .addCase(getNhaTroList.pending, (state, action) => {
                //Xử lý sự kiện khi bắt đầu loading data
                state.status = 'loading';
            })
            .addCase(getNhaTroList.fulfilled, (state, action) => {
                console.log('NHATROLIST_THUNK_SUCCESS ', action.payload);
                // Xử lý sự kiện khi request thành công
                state.status = 'succeeded';
                // Add any fetched posts to the array
                state.nhaTroList = action.payload;
            })
            .addCase(getNhaTroList.rejected, (state, action) => {
                //Xử lý khi request bị từ chối
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { getNhaTroListStart, getNhaTroListSuccess, getNhaTroListFailure } = nhaTroSlice.actions;
export const sellectNhaTroList = (state) => state.nhaTroList;
export default nhaTroSlice.reducer;
