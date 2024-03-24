// authThunk.js
import { loginUserStart, loginUserSuccess, loginUserFailure } from './userSlice';

import * as request from '~/utils/httpRequest'


export const loginUser = (username, password) => async (dispatch) => {
    try {
        dispatch(loginUserStart());

        // Gọi API sử dụng Axios với interceptor đã được cấu hình
        const response = await request.post('/auth/login', { username, password });
        console.log('response', response);
        if (response.data != null) {
            console.log(response)
            request.updateToken(response.data.token);
            // Cập nhật trạng thái thành công
            dispatch(loginUserSuccess(response.data));
            localStorage.setItem("user", JSON.stringify(response.data))
        }else{
            dispatch(loginUserFailure(response.message))
        }
    } catch (error) {
        // Cập nhật trạng thái thất bại
        dispatch(loginUserFailure(error.message || 'Đã có lỗi xảy ra.'));
    }
};
