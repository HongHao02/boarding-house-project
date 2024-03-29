import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import * as userServices from '~/services/userServices';

const validationSchema = Yup.object().shape({
    username: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: Yup.string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .matches(/[a-z]/, 'Mật khẩu phải chứa ít nhất một chữ cái thường')
        .matches(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ cái hoa')
        .matches(/[0-9]/, 'Mật khẩu phải chứa ít nhất một số')
        .matches(/[@$!%*?&]/, 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt: @$!%*?&')
        .required('Mật khẩu là bắt buộc'),
    role: Yup.string().required('Vui lòng chọn một lựa chọn một vai trò'),
});

const SignUpForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const handleSignUp = (values) => {
        setIsSubmitting(true);
        console.log('SIGNUP_VALUE ', values);
        const data = {
            username: values.username,
            password: values.password,
            role: values.role,
        };
        const fetchSignUp = async (data) => {
            const response = await userServices.signUp(data);
            console.log('SIGNUP_RESPONSE ', response);
            if (response) {
                console.log('SIGNUP_RESPONSE_1 ', response);
                if (response.data) {
                    setSubmitError(null);
                    alert(JSON.stringify('Đăng ký tài khoản thành công!', null, 2));
                } else {
                    setSubmitError(response.message);
                    // alert(JSON.stringify(response.message, null, 2));
                }
            } else {
                setSubmitError('Lỗi! Đăng ký không thành công.');
            }
            setIsSubmitting(false);
        };
        fetchSignUp(data);
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-xl font-semibold mb-4">Form Đăng Ký</h1>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    role: 'KHACHTHUE',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    handleSignUp(values);
                    // setSubmitting(false);
                    // resetForm();
                }}
            >
                {(props) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block">
                                Email
                            </label>
                            <Field
                                type="email"
                                name="username"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                // autoComplete="username" // Giúp trình quản lý mật khẩu nhận diện
                            />
                            <ErrorMessage name="username" component="div" className="text-red-500" />
                        </div>
                        {/* Trường tên người dùng ẩn */}
                        <input
                            type="text"
                            name="username"
                            style={{ display: 'none' }} // Ẩn trường này
                            autoComplete="username" // Giúp trình quản lý mật khẩu nhận diện
                        />
                        <div>
                            <label htmlFor="password" className="block">
                                Password
                            </label>
                            <Field
                                id="password"
                                type="password"
                                name="password"
                                autoComplete="new-password" // Thêm dòng này để tránh bị DOM cảnh báo
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500" />
                        </div>
                        <div role="group" aria-labelledby="my-radio-group">
                            <label htmlFor="role" className="block">
                                Bạn muốn đăng ký với vai trò
                            </label>
                            <div className="flex gap-x-2">
                                <label className="flex items-center gap-x-1">
                                    <Field type="radio" name="role" value="KHACHTHUE" />
                                    KHÁCH THUÊ
                                </label>
                                <label className="flex items-center gap-x-1">
                                    <Field type="radio" name="role" value="CHUTRO" />
                                    CHỦ TRỌ
                                </label>
                            </div>
                            <ErrorMessage name="role" component="div" className="text-red-500" />
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

export default SignUpForm;
