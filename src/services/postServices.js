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

export const createPost = async (post) =>{
    try{
        console.log("POST CREATE IN SERVICE ", post.files);
        const formData = new FormData();
        formData.append('idNhaTro', parseInt(post.idNhaTro));
        formData.append('idLau', parseInt(post.idLau));
        formData.append('idPhong', parseInt(post.idPhong));
        formData.append('description', post.description);
        formData.append('lock', post.lock);
        post.files.forEach((file, index) => {
            formData.append(`files[${index}]`, file);
        });

        const response= await httpRequest.postWithFile('/chutro/baiviet/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log("CREATE POST RESPONSE", response)
        return response
    }catch(error){
        console.log(error);
    }
}
