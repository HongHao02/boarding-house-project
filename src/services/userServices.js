import * as httpRequest from '~/utils/httpRequest'


/**
 * request in postman
 * name:  getUserInfo
 * url: {{8080_ENDPOINT}}/api/v1/public/users/@thaochutro1@gmail.com
 * @returns user info
 */
export const getUserInfo = async ({username}) => {
    try{
        const response= await httpRequest.get(`/public/users/${username}`);
        console.log(response);
        return response;
    }catch(error){
        console.log(error);
    }
}

export const signUp = async ({username, password, role}) => {
    try{
        const response = await httpRequest.post('/auth/signup', { username, password, role });
        console.log(response);
        return response;
    }catch(error){
        console.log(error);
        return null;
    }
}

