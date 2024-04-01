import * as httpRequest from '~/utils/httpRequest';

export const getAddressList = async () => {
    try {
        const response = await httpRequest.get('/public/address/getAll');
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getAllConsultanByIdChuTro = async (id) => {
    try {
        const response = await httpRequest.get(`/public/tuvan/${id}`);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return { error };
    }
};
export const getAllConsultanByIdKhachThue = async (id) => {
    try {
        const response = await httpRequest.get(`/public/tuvan/user/${id}`);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return { error };
    }
};
