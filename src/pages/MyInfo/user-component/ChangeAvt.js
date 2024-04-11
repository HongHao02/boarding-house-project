import { Button } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginUserSuccess } from '~/features/user/userSlice';
import * as userServices from '~/services/userServices';
const MAX_SIZE = 5 * 1024 * 1024; // 5MB expressed in bytes
function ChangeAvt() {
    const [file, setFile] = useState(null);

    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [url, setUrl] = useState(users.user.user.avt);
    const [message, setMessage] = useState(null);

    const fetchUserInfo = async () => {
        try {
            const response = await userServices.getUserInfo({ username: `@${users.user.user.username}` });
            if (response) {
                if (response.data) {
                    console.log('RESPONSE ', response.data);
                    const { user } = response.data;

                    const storeUser = JSON.parse(localStorage.getItem('user'));
                    const token = storeUser.token;
                    const refreshToken = storeUser.refreshToken;
                    const updateUser = { user: user, token: token, refreshToken: refreshToken };
                    console.log('UPDATE_USER ', updateUser);

                    dispatch(loginUserSuccess(updateUser));
                    localStorage.setItem('user', JSON.stringify(updateUser));
                }
            } else {
                alert('Quá trình đồng bộ ảnh đại diện thất bại.');
            }
        } catch (error) {
            alert(`Quá trình đồng bộ ảnh đại diện thất bại! Vui lòng thử lại sau ${error}`);
        }
    };
    const handleUpdateAvt = async () => {
        const confirm = window.confirm('Bạn có chắc chắn muốn cập nhật ảnh đại diện');
        if (confirm) {
            const response = await userServices.changeAvt(file);
            if (response) {
                if (response.data) {
                    alert('Cập nhật ảnh đại diện thành công');
                    fetchUserInfo();
                    setUrl(users.user.user.avt);
                }
            } else {
                alert('Cập nhật ảnh đại diện thất bại');
            }
        }
    };

    useEffect(() => {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg']; // Các loại file ảnh bạn muốn chấp nhận

        if (file) {
            console.log('FILE CHANGE ', file.type);
            if (file.size === 0 || file.size > MAX_SIZE) {
                setUrl(users.user.user.avt);
            } else {
                if (!validTypes.includes(file.type)) {
                    setMessage(
                        'Định dạng file không hợp lệ. Vui lòng chọn file có định dạng image.jpg, image/png, image.jpeg',
                    );
                } else {
                    setMessage(null);
                    const url = URL.createObjectURL(file);
                    setUrl(url);
                }
            }
        }

        return () => URL.revokeObjectURL(url);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    // useEffect(() => {
    //     setUrl(users.user.user.avt);
    // }, [users]);

    return (
        <div className="flex flex-col gap-4">
            <div className="w-36 h-36 rounded-full border-green-500">
                <img src={url || users.user.user.avt} alt="avt" className="w-full h-full object-cover rounded-full" />
            </div>
            <input
                // value={postData.files}
                type="file"
                accept="image/jpeg, image/png, iamge/jpeg"
                onChange={(e) => setFile(e.target.files[0])}
            />
            {message && <div className="text-sm text-red-800">{message}</div>}
            <div className="flex justify-end">
                <Button className="w-32" onClick={handleUpdateAvt} disabled={file == null || message != null}>
                    Cập nhật
                </Button>
            </div>
        </div>
    );
}

export default ChangeAvt;
