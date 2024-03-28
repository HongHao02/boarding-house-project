import * as httpRequest from '~/utils/httpRequest';

/**
 * request in postman
 * name:  findNhaTroByTen
 * url: {{8080_ENDPOINT}}/api/v1/public/nhatro?tenNhaTro=A Q&page=&size
 * @returns user info
 */
export const findNhaTroByTen = async ({ tenNhaTro, page = 0, size = 8 }) => {
    try {
        const response = await httpRequest.get('/public/nhatro', {
            params: {
                tenNhaTro,
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

export const findNhaTroByAbsoluteAddress = async ({ tenDuong, tenXa, tenHuyen, tenTinh, page = 0, size = 20 }) => {
    try {
        const response = await httpRequest.get('/public/nhatro/find-absolute', {
            params: {
                tenDuong,
                tenXa,
                tenHuyen,
                tenTinh,
                page,
                size,
            },
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return { error };
    }
};
