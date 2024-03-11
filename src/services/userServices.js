import * as httpRequest from '~/utils/httpRequest'


/**
 * request in postman
 * name:  getAllLikeBaiViet
 * url: {{8080_ENDPOINT}}/api/v1/users/baiviet/like
 * @returns list liked posts
 */
export const getListLikedPost = async () => {
    try{
        const response= await httpRequest.get('/public/address/getAll');
        console.log(response);
        return response;
    }catch(error){
        console.log(error);
    }
}