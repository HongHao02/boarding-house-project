import {createAsyncThunk } from '@reduxjs/toolkit';

import * as request from '~/utils/httpRequest'

export const getNhaTroList= createAsyncThunk('nhaTroList/getNhaTroList', async (_,  { rejectWithValue }) => {
    try {
        // Gửi GET request đến API để lấy dữ liệu
        const response= await request.get('/public/nhatro/me');
        // Trả về dữ liệu từ response để lưu vào Redux store nếu cần
        return response.data;
    } catch (error) {
        // Xử lý lỗi nếu có
        return rejectWithValue(error);
    }
});