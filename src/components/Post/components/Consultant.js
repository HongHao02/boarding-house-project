import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import { useCalculateMoney } from '~/hooks';

import * as userServices from '~/services/userServices';

const GridElement = ({ label, value }) => {
    return (
        <div className="grid grid-cols-2 gap-10 border-t-[1px] border-y-blue-gray-100  p-2">
            <div className="text-black">{label}</div>
            <div>{value}</div>
        </div>
    );
};

function Consultant({ post = {}, onDone = () => {} }) {
    const [loading, setLoading] = useState(false);
    console.log('CONSULTANT ', post);
    const { idBaiViet, phong, phongSet, user } = post;
    const giaPhong = useCalculateMoney(phong.giaPhong);

    const handleAccept = () => {
        setLoading(true)
        const data = {
            idNhaTro: phong.idNhaTro,
            idLau: phong.idLau,
            idPhong: phong.idPhong,
            idBaiViet: idBaiViet,
        };
        const fetchCreateConsultant = async (data) => {
            const response = await userServices.createConsultant(data);
            if (response.error) {
                onDone({ type: 'fail', message: response.error.toString() });
            } else {
                if (response.data) {
                    onDone({ type: 'success', message: response.message });
                } else {
                    onDone({ type: 'fail', message: response.message });
                }
            }
            setLoading(false)
        };
        fetchCreateConsultant(data);
    };
    return (
        <div className="flex flex-col gap-x-2 ">
            <div className="mb-2 font-bold  rounded-md">
                <div>THÔNG TIN NHÀ TRỌ</div>
            </div>
            {Object.keys(post).length > 0 ? (
                <>
                    <GridElement label={'Tên nhà trọ'} value={phong.tenNhaTro}></GridElement>
                    <GridElement
                        label={'Tầng lầu'}
                        value={`${phong.sttLau === 0 ? 'Trệt' : phong.sttLau}`}
                    ></GridElement>
                    <GridElement label={'Số phòng'} value={phong.sttPhong}></GridElement>
                    <GridElement label={'Giá phòng'} value={giaPhong}></GridElement>
                    <GridElement label={'Loại phòng'} value={phongSet[0].loaiPhong.tenLoai}></GridElement>
                    <GridElement
                        label={'Địa chỉ'}
                        value={`${phong.tenDuong}, ${phong.tenXa}, ${phong.tenHuyen}, ${phong.tenTinh}`}
                    ></GridElement>
                    <GridElement label={'Loại phòng'} value={phongSet[0].loaiPhong.tenLoai}></GridElement>

                    <div className="mb-2 font-bold  rounded-md">
                        <div>LIÊN HỆ</div>
                    </div>
                    <GridElement label={'Chủ trọ'} value={`${user.firstName} ${user.lastName}`}></GridElement>
                    <GridElement label={'Số điện thoại'} value={user.numberPhone}></GridElement>
                    <div className="flex justify-end items-center">
                        <Button disabled={loading} color="green" onClick={handleAccept} className={loading && "animate-pulse"}>
                            Xác nhận
                        </Button>
                    </div>
                </>
            ) : (
                <div>Lỗi! Không thể hiển thị. Vui lòng thử lại sau.</div>
            )}
        </div>
    );
}

export default Consultant;
