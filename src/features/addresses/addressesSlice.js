import { createSlice } from '@reduxjs/toolkit';

import {getAddressList} from './AddressesThunk'

export const addressesSlice = createSlice({
    name: 'addresses',
    initialState: {
        addresses: null,
        error: null,
        loading: false,
    },
    reducers: {
        getAddressListStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getAddressListSuccess: (state, action) => {
            // const { data, status, headers } = action.payload;
            // state.headers= headers['content-type'];
            state.loading = false;
            state.error= null;
            state.addresses = action.payload;
        },
        getAddressListFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
    extraReducers(builder) {
        // Xử lý các actions được sinh ra bởi createAsyncThunk
        // có pending, fullfilled, rejected
        builder
            .addCase(getAddressList.pending, (state, action) => {
                //Xử lý sự kiện khi bắt đầu loading data
                state.status = 'loading';
            })
            .addCase(getAddressList.fulfilled, (state, action) => {
                console.log("ADDRESSES_THUNK_SUCCESS ", action.payload)
                // Xử lý sự kiện khi request thành công
                state.status = 'succeeded';
                // Add any fetched posts to the array
                state.addresses = action.payload;
            })
            .addCase(getAddressList.rejected, (state, action) => {
                //Xử lý khi request bị từ chối
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const { getAddressListStart, getAddressListSuccess, getAddressListFailure } = addressesSlice.actions;
export const sellectAddresses = (state) => state.addresses;
export default addressesSlice.reducer;