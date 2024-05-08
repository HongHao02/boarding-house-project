import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input, Slider } from '@material-tailwind/react';
import { useDispatch } from 'react-redux';

import { getNhaTroList } from '~/features/nhaTroList/nhaTroListThunk';
import * as chuTroServices from '~/services/chutroServices';

const validationSchema = Yup.object().shape({
    soPhong: Yup.number('Số phòng phải là số')
        .min(1, 'Số phòng phải lớn hơn hoặc bằng 1')
        .max(100, 'Số phòng phải nhỏ hơn 100')
        .positive('Số phòng phải là số nguyên')
        .required('Vui lòng nhập số phòng'),
    idLoai: Yup.number().min(0, 'Loại phòng phải có id lớn hơn 0').required('Vui lòng chọn loại phòng'),
    tinhTrang: Yup.boolean(),
});

const AddRoomForm = ({ tenNhaTro, lau }) => {
    const dispatch = useDispatch();
    const [reload, setReload] = useState(false);
    const [loaiPhong, setLoaiPhong] = useState([]);
    const [cost, setCost] = useState(50);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const handleChange = (e) => {
        setCost(e.target.value);
    };
    const handleSetCost = (cost) => {
        const roomCost = cost * 100000;
        const formattedAmount = roomCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        // Thêm đơn vị tiền tệ (VD: vnđ)
        return formattedAmount + ' vnđ';
    };

    useEffect(() => {
        const fetchLoaiNhaTro = async () => {
            const response = await chuTroServices.getAllLoaiPhong();
            if (response) {
                console.log('LOAIPHONG ', response.data);
                setLoaiPhong(response.data);
            } else {
                setLoaiPhong([]);
            }
        };
        fetchLoaiNhaTro();
    }, []);

    const handleAddPhong = (values) => {
        const data = {
            idNhaTro: lau.lauID.idNhaTro,
            idLau: lau.lauID.idLau,
            sttPhong: parseInt(values.soPhong),
            idLoai: parseInt(values.idLoai),
            tinhTrang: values.tinhTrang,
            giaPhong: cost * 100000,
        };
        const fecthAddRoom = async (data) => {
            setIsSubmitting(true);
            const response = await chuTroServices.addPhong(data);
            console.log('RESPONSE_ADD_ROOM ', response);
            if (response) {
                console.log('ADD_ROOM ', response);
                if (response.data) {
                    setSubmitError(null);
                    alert(JSON.stringify('Thêm phòng trọ thành công', null, 2));
                    setReload(!reload);
                    dispatch(getNhaTroList());
                } else {
                    setSubmitError(response.message);
                    // alert(JSON.stringify(response.message, null, 2));
                }
            } else {
                setSubmitError(response.error);
            }
            setIsSubmitting(false);
        };
        fecthAddRoom(data);
    };

    return (
        <div className="max-w-md mx-auto flex flex-col gap-2">
            <h1 className="text-xl font-semibold mb-4">Form Thêm Phòng</h1>
            <Input label={`Nhà trọ: ${tenNhaTro}`} disabled />
            <Input label={`Lầu: ${lau.sttLau === 0 ? 'Trệt' : lau.sttLau}`} disabled></Input>
            <Formik
                initialValues={{
                    soPhong: '',
                    idLoai: 1,
                    tinhTrang: true,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    handleAddPhong(values);
                    setSubmitting(false);
                    resetForm();
                }}
            >
                {(props) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="soPhong" className="block">
                                Số phòng
                            </label>
                            <Field
                                type="text"
                                name="soPhong"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                            <ErrorMessage name="soPhong" component="div" className="text-red-500" />
                        </div>
                        <div>
                            <label htmlFor="idLoai" className="block">
                                Loại phòng
                            </label>
                            <Field
                                name="idLoai"
                                as="select"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            >
                                {loaiPhong.length > 0 ? (
                                    <>
                                        {loaiPhong.map((loaiPhong, index) => (
                                            <option key={index} value={loaiPhong.idLoai}>
                                                {loaiPhong.tenLoai}
                                            </option>
                                        ))}
                                    </>
                                ) : (
                                    <option>Lỗi!Không tìm thấy loại phòng nào</option>
                                )}
                            </Field>
                        </div>
                        <div>
                            <p>Giá phòng</p>
                            <div className="flex items-center justify-between">
                                <Slider
                                    id="giaPhong"
                                    value={cost}
                                    color="green"
                                    onChange={handleChange}
                                    className="w-[50%]"
                                    step={1}
                                ></Slider>
                                <p>{handleSetCost(cost)}</p>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="tinhTrang" className="block">
                                Có thể sử dụng
                            </label>
                            <Field
                                type="checkbox"
                                name="tinhTrang"
                                className=" flex justify-start border border-gray-300 rounded-full px-3 py-2 w-5 h-5 hover:shadow-lg"
                            />
                            <ErrorMessage name="tinhTrang" component="div" className="text-red-500" />
                        </div>
                        <button
                            type="submit"
                            disabled={!props.isValid || isSubmitting}
                            className={`bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed ${
                                isSubmitting ? 'bg-blue-500 animate-pulse' : ''
                            }`}
                        >
                            {isSubmitting ? 'Đang thêm phòng...' : 'Thêm phòng'}
                        </button>
                        <button
                            type="reset"
                            disabled={isSubmitting}
                            className={`ml-4 bg-red-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed`}
                            onClick={() => setSubmitError(null)}
                        >
                            Reset
                        </button>
                        {submitError && <div className="text-red-500">{submitError}</div>}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddRoomForm;
