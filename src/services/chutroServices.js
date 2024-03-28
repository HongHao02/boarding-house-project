import * as httpRequest from '~/utils/httpRequest';

export const getListNhaTroByIdChuTro = async () => {
    try {
        const response = await httpRequest.get('/public/nhatro/me');
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getAllLoaiPhong = async () => {
    try {
        const response = await httpRequest.get('/chutro/loaiphong/getAll');
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
};
export const addPhong = async ({ idNhaTro, idLau, idLoai, sttPhong, giaPhong, tinhTrang }) => {
    try {
        const formData = new FormData();
        formData.append('idNhaTro', idNhaTro);
        formData.append('idLau', idLau);
        formData.append('idLoai', idLoai);
        formData.append('sttPhong', sttPhong);
        formData.append('giaPhong', giaPhong);
        formData.append('tinhTrang', tinhTrang);
        const response = await httpRequest.post('/chutro/phongtro/create', formData);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
};
export const addLau = async ({ idNhaTro, sttLau }) => {
    try {
        const formData = new FormData();
        formData.append('idNhaTro', idNhaTro);
        formData.append('sttLau', sttLau);

        const response = await httpRequest.post('/chutro/lau/create', formData);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return { error };
    }
};
export const addNhaTro = async ({ tenNhaTro, tenTinh, tenXa, tenHuyen, tenDuong }) => {
    try {
        const formData = new FormData();
        formData.append('tenNhaTro', tenNhaTro);
        formData.append('tenTinh', tenTinh);
        formData.append('tenHuyen', tenHuyen);
        formData.append('tenXa', tenXa);
        formData.append('tenDuong', tenDuong);

        const response = await httpRequest.post('/chutro/nhatro/create', formData);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const updateTinhTrangPhong = async (idPhong) => {
    try {
        const response = await httpRequest.put(`/chutro/phongtro/update/${idPhong}`);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return { error };
    }
};
