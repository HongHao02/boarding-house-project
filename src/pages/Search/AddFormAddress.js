import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

import { sellectAddresses } from '~/features/addresses/addressesSlice';
import * as nhaTroServices from '~/services/nhatroServices';

const validationSchema = Yup.object().shape({
    tenTinh: Yup.string('Vui lòng chọn tỉnh').notOneOf([''], 'Tỉnh không được để trống').required('Tỉnh là bắt buộc'),
    tenHuyen: Yup.string('Vui lòng chọn huyện')
        .notOneOf([''], 'Huyện không được để trống')
        .required('Huyện là bắt buộc'),
    tenXa: Yup.string('Vui lòng chọn xã').notOneOf([''], 'Xã không được để trống').required('Xã là bắt buộc'),
    tenDuong: Yup.string('Vui lòng chọn tuyến đường')
        .notOneOf([''], 'Tên đường không được để trống')
        .required('Tuyến đường là bắt buộc'),
});

const AddFormAddress = ({ onResult = () => {} }) => {
    const { addresses } = useSelector(sellectAddresses);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    console.log('ADDRESSES_FORM ', addresses);
    const handleAdddress = (values) => {
        setIsSubmitting(true);
        console.log('ADDRESSES_VALUE ', values);
        const data = {
            tenTinh: values.tenTinh,
            tenHuyen: values.tenHuyen,
            tenXa: values.tenXa,
            tenDuong: values.tenDuong,
        };
        const fecthFindNhaTro = async (data) => {
            const response = await nhaTroServices.findNhaTroByAbsoluteAddress(data);
            console.log('RESPONSE_FIND_BOARDINGHOUSE ', response);
            if (response) {
                console.log('FIND_NHATRO ', response);
                if (response.data) {
                    setSubmitError(null);
                    alert(JSON.stringify('Tìm kiếm nhà nhà trọ thành công', null, 2));
                    //dispatch(getNhaTroList());
                    localStorage.setItem('address', JSON.stringify(response.data));
                    onResult({
                        data: response.data,
                        message: response.message,
                        tenTinh: data.tenTinh,
                        tenHuyen: data.tenHuyen,
                        tenXa: data.tenXa,
                        tenDuong: data.tenDuong,
                    });
                } else {
                    setSubmitError(response.message);
                }
            } else {
                setSubmitError('Lỗi! Tìm kiếm nhà trọ không thành công.');
            }
            setIsSubmitting(false);
        };
        fecthFindNhaTro(data);
    };

    const findHuyenBySeclectedTinh = (tenTinh) => {
        if (addresses.length > 0) {
            const selectTinh = addresses.find((tinh) => tinh.tenTinh === tenTinh);
            if (selectTinh) {
                return selectTinh.huyenSet;
            }
        }
        return null;
    };
    const findXaBySelectedHuyen = (tenTinh, tenHuyen) => {
        if (addresses.length > 0) {
            const selectTinh = addresses.find((tinh) => tinh.tenTinh === tenTinh);
            if (selectTinh) {
                const selectedHuyen = selectTinh.huyenSet.find((huyen) => huyen.tenHuyen === tenHuyen);
                if (selectedHuyen) {
                    return selectedHuyen.xaSet;
                }
            }
        }
        return null;
    };
    const findTuyenDuongBySelectedXa = (tenTinh, tenHuyen, tenXa) => {
        if (addresses.length > 0) {
            const selectTinh = addresses.find((tinh) => tinh.tenTinh === tenTinh);
            if (selectTinh) {
                const selectedHuyen = selectTinh.huyenSet.find((huyen) => huyen.tenHuyen === tenHuyen);
                if (selectedHuyen) {
                    const selectedXa = selectedHuyen.xaSet.find((xa) => xa.tenXa === tenXa);
                    if (selectedXa) {
                        return selectedXa.tuyenDuongSet;
                    }
                }
            }
        }
        return null;
    };

    return (
        <div className="max-w-md mx-auto flex flex-col gap-2">
            <h1 className="text-xl font-semibold mb-4">Form tìm kiếm nhà trọ theo địa chỉ</h1>
            {addresses !== null ? (
                <Formik
                    initialValues={{
                        tenTinh: '',
                        tenDuong: '',
                        tenXa: '',
                        tenHuyen: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        handleAdddress(values);
                        resetForm();
                    }}
                >
                    {(props) => (
                        <Form className="space-y-4">
                            <div>
                                <label htmlFor="tenTinh" className="block">
                                    Tỉnh
                                </label>
                                <Field
                                    name="tenTinh"
                                    as="select"
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                >
                                    <option value="">Chọn Tỉnh</option>
                                    {addresses.length > 0 && (
                                        <>
                                            {addresses.map((tinh, index) => (
                                                <option key={index} value={tinh.tenTinh}>
                                                    {tinh.tenTinh}
                                                </option>
                                            ))}
                                        </>
                                    )}
                                </Field>
                                <ErrorMessage name="tenTinh" component="div" className="text-red-500" />
                            </div>
                            <div>
                                <label htmlFor="tenHuyen" className="block">
                                    Huyện
                                </label>
                                <Field
                                    name="tenHuyen"
                                    as="select"
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                >
                                    <option value="">Chọn Huyện</option>
                                    {findHuyenBySeclectedTinh(props.values.tenTinh) && (
                                        <>
                                            {findHuyenBySeclectedTinh(props.values.tenTinh).map((huyen, index) => (
                                                <option key={index} value={huyen.tenHuyen}>
                                                    {huyen.tenHuyen}
                                                </option>
                                            ))}
                                        </>
                                    )}
                                </Field>
                                <ErrorMessage name="tenHuyen" component="div" className="text-red-500" />
                            </div>
                            <div>
                                <label htmlFor="tenXa" className="block">
                                    Xã
                                </label>
                                <Field
                                    name="tenXa"
                                    as="select"
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                >
                                    <option value="">Chọn Xã</option>
                                    {findXaBySelectedHuyen(props.values.tenTinh, props.values.tenHuyen) ? (
                                        <>
                                            {findXaBySelectedHuyen(props.values.tenTinh, props.values.tenHuyen).map(
                                                (xa, index) => (
                                                    <option key={index} value={xa.tenXa}>
                                                        {xa.tenXa}
                                                    </option>
                                                ),
                                            )}
                                        </>
                                    ) : (
                                        <option value="">Không thấy xã hợp lệ nào</option>
                                    )}
                                </Field>
                                <ErrorMessage name="tenXa" component="div" className="text-red-500" />
                            </div>
                            <div>
                                <label htmlFor="tenDuong" className="block">
                                    Tuyến Đường
                                </label>
                                <Field
                                    name="tenDuong"
                                    as="select"
                                    className="border border-gray-300 rounded px-3 py-2 w-full"
                                >
                                    <option value="">Chọn Tuyến Đường</option>
                                    {findTuyenDuongBySelectedXa(
                                        props.values.tenTinh,
                                        props.values.tenHuyen,
                                        props.values.tenXa,
                                    ) ? (
                                        <>
                                            {findTuyenDuongBySelectedXa(
                                                props.values.tenTinh,
                                                props.values.tenHuyen,
                                                props.values.tenXa,
                                            ).map((tuyenDuong, index) => (
                                                <option key={index} value={tuyenDuong}>
                                                    {tuyenDuong}
                                                </option>
                                            ))}
                                        </>
                                    ) : (
                                        <option value="">Không thấy tuyến đường hợp lệ nào</option>
                                    )}
                                </Field>
                                <ErrorMessage name="tenDuong" component="div" className="text-red-500" />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed ${
                                    isSubmitting ? 'bg-blue-500 animate-pulse' : ''
                                }`}
                            >
                                {isSubmitting ? 'Đang tìm kiếm nhà trọ...' : 'Tìm kiếm'}
                            </button>
                            <button
                                type="reset"
                                disabled={!props.isValid || isSubmitting}
                                className={`ml-4 bg-red-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed`}
                                onClick={() => setSubmitError(null)}
                            >
                                Reset
                            </button>
                            {submitError && <div className="text-red-500">{submitError}</div>}
                        </Form>
                    )}
                </Formik>
            ) : (
                <div>Lỗi! Không thể lấy danh sách địa chỉ. Vui lòng tải lại trang và thử lại sau.</div>
            )}
        </div>
    );
};

export default AddFormAddress;
