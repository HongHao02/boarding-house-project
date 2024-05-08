import axios from 'axios';

const httpRandomRequest = axios.create({
    baseURL: 'https://randomuser.me/api',
});

export const get = async (path, options = {}) => {
    const response = await httpRandomRequest.get(path, options);
    return response.data;
};
export const randomUsers = async ({ amount }) => {
    try {
        const response = await get('/', {
            params: {
                results: amount,
            },
        });
        console.log('RANDOMUSRES ', response);
        return response;
    } catch (error) {
        console.log(error);
        return { error };
    }
};
