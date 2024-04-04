import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { loginUserSuccess } from '~/features/user/userSlice';
import * as userServices from '~/services/userServices';
const validationSchema = Yup.object().shape({
    firstName: Yup.string().max(20, 'Tên tối đa 20 ký tự').required('Tên là bắt buộc'),
    lastName: Yup.string().max(30, 'Họ tối đa 30 ký tự').required('Họ là bắt buộc'),
    numberPhone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ') // Kiểm tra xem giá trị có đúng định dạng số điện thoại không
        .required('Số điện thoại là bắt buộc'),
    gender: Yup.string().required('Vui lòng chọn một lựa chọn một trong 2 giới tính'),
    dateOfBirth: Yup.date()
        .nullable()
        .transform(function (value, originalValue) {
            // Nếu giá trị nhập không phải là một ngày hợp lệ, không thực hiện transform
            if (!Yup.date().isType(value)) return value;
            const parsedDate = new Date(originalValue);
            return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
        })
        .typeError('Ngày không hợp lệ. Ngày hợp lệ "YYYY-MM-DD. Ví dụ 2002-01-29"')
        .required('Ngày là bắt buộc. Ngày hợp lệ "YYYY-MM-DD". Ví dụ 2002-01-29'),
    cccd: Yup.string()
        .matches(/^[0-9]{12}$/, 'Căn cước công dân phải có 12 số') // Kiểm tra xem giá trị có đúng định dạng số điện thoại không
        .required('Căn cước công dân là bắt buộc là bắt buộc'),
});

const UpdateInfoForm = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

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
                alert('Quá trình đồng bộ thông tin thất bại. Vui lòng đăng nhập lại nếu có thể.');
            }
        } catch (error) {
            alert(`Quá trình đồng bộ thông tin thất bại! Vui lòng đăng nhập lại nếu có thể. ${error}`);
        }
    };
    const handleUpdate = (values) => {
        setIsSubmitting(true);
        console.log('UP_INFO_VALUE ', values);
        const data = {
            firstName: values.firstName,
            lastName: values.lastName,
            gender: values.gender,
            numberPhone: values.numberPhone,
            dateOfBirth: values.dateOfBirth,
            cccd: values.cccd,
        };
        const fetchUpdateInfo = async (data) => {
            const response = await userServices.changeInfo(data);
            console.log('UP_INFO_RESPONSE ', response);
            if (response) {
                console.log('UP_INFO_RESPONSE_1 ', response);
                if (response.data) {
                    setSubmitError(null);
                    alert(JSON.stringify('Cập nhật thông tin tài khoản thành công!', null, 2));
                    fetchUserInfo();
                } else {
                    setSubmitError(response.message);
                    // alert(JSON.stringify(response.message, null, 2));
                }
            } else {
                setSubmitError('Lỗi! Cập nhật hồ sơ không thành công.');
            }
            setIsSubmitting(false);
        };
        fetchUpdateInfo(data);
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-xl font-semibold mb-4">Form Cập nhật hồ sơ</h1>
            <Formik
                initialValues={{
                    firstName: `${users.user.user.firstName ? users.user.user.firstName : ''}`,
                    lastName: `${users.user.user.lastName ? users.user.user.lastName : ''}`,
                    gender: `${users.user.user.gender}`,
                    numberPhone: `${users.user.user.numberPhone ? users.user.user.numberPhone : ''}`,
                    dateOfBirth: `${
                        users.user.user.dateOfBirth != null
                            ? users.user.user.dateOfBirth.slice(0, users.user.user.dateOfBirth.indexOf('T'))
                            : ''
                    }`,
                    cccd: `${users.user.user.cccd ? users.user.user.cccd : ''}`,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    handleUpdate(values);
                    // setSubmitting(false);
                    // resetForm();
                }}
            >
                {(props) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="lastName" className="block">
                                Tên
                            </label>
                            <Field
                                type="text"
                                name="lastName"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                            <ErrorMessage name="lastName" component="div" className="text-red-500" />
                        </div>
                        <div>
                            <label htmlFor="firstName" className="block">
                                Họ
                            </label>
                            <Field
                                type="text"
                                name="firstName"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                            <ErrorMessage name="firstName" component="div" className="text-red-500" />
                        </div>
                        <div>
                            <label htmlFor="numberPhone" className="block">
                                Số điện thoại
                            </label>
                            <Field
                                type="text"
                                name="numberPhone"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                            <ErrorMessage name="numberPhone" component="div" className="text-red-500" />
                        </div>
                        <div role="group" aria-labelledby="my-radio-group">
                            <label htmlFor="gender" className="block">
                                Giới tính
                            </label>
                            <div className="flex gap-x-2">
                                <label className="flex items-center gap-x-1">
                                    <Field type="radio" name="gender" value="true" />
                                    NAM
                                </label>
                                <label className="flex items-center gap-x-1">
                                    <Field type="radio" name="gender" value="false" />
                                    NỮ
                                </label>
                            </div>
                            <ErrorMessage name="gender" component="div" className="text-red-500" />
                        </div>
                        <div>
                            <label htmlFor="dateOfBirth">Ngày:</label>
                            <Field
                                type="text"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                            <ErrorMessage name="dateOfBirth" component="div" className="text-red-500" />
                        </div>
                        <div>
                            <label htmlFor="cccd" className="block">
                                CCCD
                            </label>
                            <Field
                                type="text"
                                name="cccd"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                            <ErrorMessage name="cccd" component="div" className="text-red-500" />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed ${
                                isSubmitting ? 'bg-blue-500 animate-pulse' : ''
                            }`}
                        >
                            {isSubmitting ? '...Waiting' : 'Đăng ký'}
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

export default UpdateInfoForm;
