//for configure  to call request
import axios from 'axios';

// console.log(process.env)
//process.env.NODE_EVN: "development" use for development environment

const httpRequest = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    // baseURL: 'https://tiktok.fullstack.edu.vn/api/',
    baseURL: 'https://honghaocp-api-boarding-house.azurewebsites.net/api/v1' 
});

export const updateToken = (newToken) => {
    httpRequest.defaults.headers.Authorization = `Bearer ${newToken}`;
    console.log('bearer ', httpRequest.defaults.headers.Authorization);
};

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (path, options = {}) => {
    const response = await httpRequest.post(path, options);
    return response.data;
};

export const postWithFile = async (path, formData, options={}) => {
    const response = await httpRequest.post(path,formData, options);
    return response.data;
};
export const putWithFile = async (path, formData, options={}) => {
    const response = await httpRequest.put(path,formData, options);
    return response.data;
};
export const put = async (path, options = {}) => {
    const response = await httpRequest.put(path, options);
    console.log("put response", response);
    return response.data;
}
export const deleted = async (path, options = {}) => {
    const response= await httpRequest.delete(path, options);
    return response.data;
}

//Listen event when localStorage change token

export default httpRequest;
