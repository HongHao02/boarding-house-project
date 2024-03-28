import { Button } from '@material-tailwind/react';
import { useDispatch } from 'react-redux';

import { getNhaTroList } from '~/features/nhaTroList/nhaTroListThunk';
import * as chuTroServices from '~/services/chutroServices';

function EditRoom({ idPhong, tinhTrang, sttPhong }) {
    const dispatch = useDispatch();
    const handleEditRoom = (idPhong) => {
        const fetchEditRoom = async (idPhong) => {
            const response = await chuTroServices.updateTinhTrangPhong(idPhong);
            if (response) {
                if (response.data) {
                    alert('Chỉnh sửa tình trạng phòng trọ thành công!');
                    dispatch(getNhaTroList());
                } else {
                    alert(response.message);
                }
            } else {
                alert('Lỗi! Chỉnh sửa trạng thái phòng trọ thất bại vui lòng thử lại sau.');
            }
        };
        if (idPhong) {
            fetchEditRoom(idPhong);
        }
    };
    return (
        <div className="flex flex-col gap-4">
            <h2>
                Bạn có chắc chắc muốn chỉnh sửa trạng thái của phòng {`${sttPhong}`} từ{' '}
                {`${tinhTrang ? 'SẴN SÀNG thành BẬN?' : 'BẬN thành SẴN SÀNG?'}`}
            </h2>
            <div className="flex justify-end gap-4">
                <Button color="green" onClick={() => handleEditRoom(idPhong)}>
                    Xác nhận
                </Button>
            </div>
        </div>
    );
}

export default EditRoom;
