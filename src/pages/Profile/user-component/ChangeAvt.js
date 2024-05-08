import { Button } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginUserSuccess } from '~/features/user/userSlice';
import * as userServices from '~/services/userServices';
import images from '~/assets/images';
const MAX_SIZE = 5 * 1024 * 1024; // 5MB expressed in bytes
function ChangeAvt() {
    const [file, setFile] = useState(null);

    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [url, setUrl] = useState(users.user.user?.avt ?? images.noAVTMale);

    const fetchUserInfo = async () => {
        try {
            const response = await userServices.getUserInfo({ username: `@${users.user.user.username}` });
            console.log('USER INFO ', response);
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
        let url_object;
        if (file) {
            if (file.size === 0 || file.size > MAX_SIZE) {
                setUrl(users.user.user?.avt ?? images.noAVTMale);
                console.log('url_image ', url);
            } else {
                url_object = URL.createObjectURL(file);
                setUrl(url_object);
            }
        }
        return () => URL.revokeObjectURL(url_object);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    // useEffect(() => {
    //     setUrl(users.user.user.avt);
    // }, [users]);

    return (
        <div className="flex flex-col gap-4">
            <div className="w-36 h-36 rounded-full border-green-500">
                <img src={url} alt="avt" className="w-full h-full object-cover rounded-full" />
            </div>
            <input
                // value={postData.files}
                type="file"
                accept="image/jpeg, image/png"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="flex justify-end">
                <Button className="w-32" onClick={handleUpdateAvt}>
                    Cập nhật
                </Button>
            </div>
        </div>
    );
}

export default ChangeAvt;
