import * as httpRequest from '~/utils/httpRequest'

export const getAddressList = async () => {
    try{
        const response= await httpRequest.get('/public/address/getAll');
        console.log(response);
        return response;
    }catch(error){
        console.log(error);
    }
}