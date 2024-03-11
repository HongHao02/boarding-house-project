import * as httpRequest from '~/utils/httpRequest'

export const getVideoFollowPage = async (page = 0, size = 20) => {
    try {
        const response = await httpRequest.get('/public/baiviet', {
            params: {
                page,
                size,
            },
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const likePost = async (idBaiViet) => {
    try {
        const response = await httpRequest.put(`/users/${idBaiViet}/like`);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
};
export const unLikePost = async (idBaiViet) => {
    try {
        const response = await httpRequest.deleted(`/users/${idBaiViet}/unlike`);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
};
export const getAllLikedPosts = async () => {
    try {
        const response = await httpRequest.get('/users/baiviet/like');
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
};
