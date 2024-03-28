import * as httpRequest from '~/utils/httpRequest';

/**
 * request in postman
 * name:  getUserInfo
 * url: {{8080_ENDPOINT}}/api/v1/public/users/@thaochutro1@gmail.com
 * @returns user info
 */
export const getUserInfo = async ({ username }) => {
    try {
        const response = await httpRequest.get(`/public/users/${username}`);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const signUp = async ({ username, password, role }) => {
    try {
        const response = await httpRequest.post('/auth/signup', { username, password, role });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const changeAvt = async (file) => {
    try {
        console.log('CHANGE AVT SERVICE ', file);
        const formData = new FormData();
        formData.append('file', file);

        const response = await httpRequest.postWithFile('/users/avt', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('CHANGE AVT RESPONSE', response);
        return response;
    } catch (error) {
        console.log(error);
        return { error };
    }
};

export const changeInfo = async ({ firstName, lastName, numberPhone, gender, dateOfBirth, cccd }) => {
    try {
        console.log('CHANGE INFOR SERVICE ', firstName);
        console.log('CHANGE INFOR SERVICE ', lastName);
        console.log('CHANGE INFOR SERVICE ', numberPhone);
        console.log('CHANGE INFOR SERVICE ', gender);
        console.log('CHANGE INFOR SERVICE ', dateOfBirth);
        console.log('CHANGE INFOR SERVICE ', cccd);

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('numberPhone', numberPhone);
        formData.append('gender', gender);
        formData.append('dateOfBirth', dateOfBirth);
        formData.append('cccd', cccd);

        const response = await httpRequest.postWithFile('/users/avt', formData);
        console.log('CHANGE INFOR RESPONSE', response);
        return response;
    } catch (error) {
        console.log(error);
        return { error };
    }
};
