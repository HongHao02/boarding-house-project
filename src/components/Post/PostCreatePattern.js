import { Select, Option, Textarea, Checkbox, Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { GrPowerReset } from 'react-icons/gr';

import * as chuTroServices from '~/services/chutroServices';
import * as postServices from '~/services/postServices';
import AlertCustom from '../Alert/AlertCustom';
import DialogDefault from '../Dialog/DialogDefault';

function PostCreatePattern({ onChange }) {
    const users = useSelector((state) => state.users);
    const [nhaTroList, setNhaTroList] = useState([]);
    const [accept, setAccept] = useState(true);
    /**
     * show error when create post
     */
    const [alert, setAlert] = useState(null);
    const [showDiaglog, setShowDialog] = useState(false);
    const [error, setError] = useState(null);
    const handleCloseAlert = () => {
        setAlert(null);
    };
    //
    const handleOnCloseDiaglog = () => {
        setShowDialog(!showDiaglog);
    };
    /**
     * Data for <PostPreview/>
     */
    const [preview, setPreview] = useState({
        tenNhaTro: '',
        sttLau: '',
        sttPhong: '',
        giaPhong: '',
        loaiPhong: '',
        description: '',
        lock: false,
        files: [],
    });

    const [nhaTro, setNhaTro] = useState({
        lauSet: [],
        phongSet: [],
    });
    const [postData, setPostData] = useState({
        idNhaTro: '',
        idLau: '',
        idPhong: '',
        description: '',
        lock: false,
        files: [],
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line eqeqeq
        const nhaTro = nhaTroList.find((nhaTro) => nhaTro.idNhaTro == postData.idNhaTro);
        console.log('nhaTro Effect ', nhaTro);
        if (nhaTro) {
            setPreview((prev) => ({ ...prev, tenNhaTro: nhaTro.tenNhaTro }));
            setNhaTro((prev) => ({ ...prev, lauSet: [...nhaTro.lauSet] }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postData.idNhaTro]);

    useEffect(() => {
        // eslint-disable-next-line eqeqeq
        const lau = nhaTro.lauSet.find((lau) => lau.lauID.idLau == postData.idLau);
        if (lau) {
            setPreview((prev) => ({ ...prev, sttLau: lau.sttLau }));
            setNhaTro((prev) => ({ ...prev, phongSet: [...lau.phongSet] }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postData.idLau]);

    /**
     * Call if previewData change
     */
    useEffect(() => {
        onChange(preview);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preview]);
    console.log('nhaTroList ', nhaTroList);
    /**
     * fetch list nha tro by idChuTro
     */
    const fetchListNhaTro = async () => {
        const response = await chuTroServices.getListNhaTroByIdChuTro();
        if (response) {
            setNhaTroList(response.data);
        }
    };

    useEffect(() => {
        if (postData.description.length > 0) {
            setPreview((prev) => ({ ...prev, description: postData.description }));
        }
        if (postData.idPhong) {
            // eslint-disable-next-line eqeqeq
            const phong = nhaTro.phongSet.find((phong) => phong.phongID.idPhong == postData.idPhong);
            console.log('phong_from_post_pattern ', phong);
            if (phong) {
                setPreview((prev) => ({
                    ...prev,
                    sttPhong: phong.sttPhong,
                    giaPhong: phong.giaPhong,
                    loaiPhong: phong.loaiPhong.tenLoai,
                }));
            }
        }
        if (postData.files) {
            setPreview((prev) => ({ ...prev, files: [...postData.files] }));
        }
        if (
            postData.description.length > 0 &&
            postData.idNhaTro !== '' &&
            postData.idLau !== '' &&
            postData.idPhong !== ''
        ) {
            setAccept(false);
        } else {
            setAccept(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postData.description.length, postData.idLau, postData.idNhaTro, postData.idPhong, postData.files, postData]);

    /**
     * Create Post
     * @returns
     */
    const createPost = async () => {
        setLoading(true);
        const response = await postServices.createPost(postData);
        if (response) {
            if(response.data){
                setAlert({ type: 'success', message: 'Đăng bài thành công!' });
                setPostData((prev) => ({
                    ...prev,
                    idNhaTro: '',
                    idLau: '',
                    idPhong: '',
                    description: '',
                    lock: false,
                    files: [],
                }));
            }else{
                setShowDialog(!showDiaglog)
                setError(response.message)
            }
            setLoading(false);
            
            console.log('CREATE_POST ', response);
        } else {
            setShowDialog(!showDiaglog);
            setLoading(false);
            console.log('CREATE_POST FAILED');
        }
    };
    const handleCreatePost = () => {
        createPost();
    };
    const renderNhaTro = () => {
        return (
            <div>
                <Select
                    label="Chọn nhà trọ"
                    //value={postData.idNhaTro}
                    name="idNhaTro"
                    onChange={(val) => handleChangeValue('idNhaTro', val)}
                >
                    {nhaTroList.length > 0 ? (
                        nhaTroList.map((nhaTro, index) => (
                            <Option key={index} value={nhaTro.idNhaTro.toString()}>
                                {nhaTro.tenNhaTro}
                            </Option>
                        ))
                    ) : (
                        <Option disabled>"Không có nhà trọ nào cả"</Option>
                    )}
                </Select>
            </div>
        );
    };
    const renderLau = () => {
        return (
            <div>
                <Select
                    label="Chọn tầng lầu"
                    //wrong syntax: value={postData.idLau}
                    name="idLau"
                    onChange={(val) => handleChangeValue('idLau', val)}
                >
                    {nhaTro.lauSet.length > 0 ? (
                        nhaTro.lauSet.map((lau) => (
                            <Option key={lau.lauID.idLau} value={`${lau.lauID.idLau}`}>
                                {lau.sttLau}
                            </Option>
                        ))
                    ) : (
                        <Option disabled>"Không có tầng lầu"</Option>
                    )}
                </Select>
            </div>
        );
    };
    const renderPhong = () => {
        return (
            <div>
                <Select
                    label="Chọn phòng"
                    // value={postData.idPhong}
                    name="idPhong"
                    onChange={(val) => handleChangeValue('idPhong', val)}
                >
                    {nhaTro.phongSet.length > 0 ? (
                        nhaTro.phongSet.map((phong) => (
                            <Option
                                key={phong.phongID.idPhong}
                                disabled={!phong.tinhTrang}
                                value={`${phong.phongID.idPhong}`}
                            >
                                {phong.sttPhong}
                            </Option>
                        ))
                    ) : (
                        <Option disabled>"Không có phòng"</Option>
                    )}
                </Select>
            </div>
        );
    };
    useEffect(() => {
        if (users.user) {
            const isLandlordRole = users.user.user.roles.some((role) => role.nameRole === 'CHUTRO');
            if (isLandlordRole) {
                fetchListNhaTro();
            }
        } else {
            setNhaTroList([]);
        }
    }, [users.user]);
    const handleChangeValue = (type, value) => {
        console.log('type_value ', type, value);
        if (type === 'files') {
            const selected = [];
            const validTypes = ['image/jpeg', 'image/png']; // Các loại file ảnh bạn muốn chấp nhận
            // Lọc ra các file hợp lệ
            for (let i = 0; i < value.length; i++) {
                const file = value[i];
                if (validTypes.includes(file.type)) {
                    selected.push(file);
                }
            }
            console.log('Selected files ', selected);
            setPostData((prev) => ({ ...prev, [type]: [...selected.slice(0, 4)] }));
        } else {
            setPostData((prev) => ({ ...prev, [type]: value }));
        }
    };
    console.log('postData ', postData);
    console.log('nhaTro ', nhaTro);

    return (
        <>
            {showDiaglog && (
                <DialogDefault type="error" onClose={handleOnCloseDiaglog}>
                    {error}
                </DialogDefault>
            )}
            {alert && <AlertCustom type={alert.type} message={alert.message} onClose={handleCloseAlert} />}
            <div className="h-full">
                <div className="">
                    <h2 className="mb-4">Tạo bài viết</h2>
                </div>
                <div className="flex gap-x-2 justify-between mb-4">
                    {renderNhaTro()}
                    {renderLau()}
                    {renderPhong()}
                </div>
                <div className="mb-2">
                    <Textarea
                        label="Mô tả"
                        value={postData.description}
                        onChange={(e) => handleChangeValue('description', e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <Checkbox
                        label="Khóa bình luận"
                        // value={postData.lock}
                        checked={postData.lock}
                        onChange={(e) => handleChangeValue('lock', e.target.checked)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        // value={postData.files}
                        type="file"
                        accept="image/jpeg, image/png"
                        multiple
                        onChange={(e) => handleChangeValue('files', e.target.files)}
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <Button
                        color="red"
                        className="flex items-center gap-2"
                        onClick={() => {
                            setPostData((prev) => ({
                                ...prev,
                                idNhaTro: '',
                                idLau: '',
                                idPhong: '',
                                description: '',
                                lock: false,
                                files: [],
                            }));
                            setPreview((prev) => ({
                                ...prev,
                                idNhaTro: '',
                                idLau: '',
                                idPhong: '',
                                description: '',
                                lock: false,
                                files: [],
                                tenNhaTro: '',
                                sttLau: '',
                                sttPhong: '',
                            }));
                        }}
                    >
                        <GrPowerReset />
                        Hủy bỏ
                    </Button>
                    <Button
                        loading={loading}
                        className={`flex items-center gap-2 `}
                        disabled={accept}
                        onClick={handleCreatePost}
                        color={accept ? 'gray' : 'green'}
                    >
                        <FaCloudUploadAlt />
                        Đăng bài
                    </Button>
                </div>
            </div>
        </>
    );
}

export default PostCreatePattern;
