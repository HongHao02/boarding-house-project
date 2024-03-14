import * as httpRequest from '~/utils/httpRequest'

export const getListNhaTroByIdChuTro = async () => {
    try{
        const response= await httpRequest.get('/public/nhatro/me');
        console.log(response);
        return response;
    }catch(error){
        console.log(error);
    }
}