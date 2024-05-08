import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input } from '@material-tailwind/react';

import { useDispatch } from 'react-redux';
import { getNhaTroList } from '~/features/nhaTroList/nhaTroListThunk';
import * as chuTroServices from '~/services/chutroServices';
const validationSchema = Yup.object().shape({
    sttLau: Yup.number('Số lầu phải là số')
        .min(0, 'Số lầu phải lớn hơn hoặc bằng 0')
        .max(10, 'Số lầu phải nhỏ hơn 10')
        .required('Vui lòng nhập số lầu'),
});

const AddLauForm = ({ tenNhaTro, lau, idNhaTro }) => {
    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    console.log('idNhaTro ', idNhaTro);

    const handleAddLau = (values) => {
        setIsSubmitting(true);
        const data = {
            idNhaTro: idNhaTro,
            sttLau: values.sttLau,
        };
        const fecthAddLau = async (data) => {
            const response = await chuTroServices.addLau(data);
            console.log('RESPONSE_ADD_FLOOR ', response);
            if (!response.error) {
                console.log('ADD_LAU ', response);
                if (response.data) {
                    setSubmitError(null);
                    alert(JSON.stringify('Thêm lầu thành công', null, 2));
                    dispatch(getNhaTroList());
                } else {
                    setSubmitError(response.message);
                    // alert(JSON.stringify(response.message, null, 2));
                }
            } else {
                setSubmitError(response.error);
                // alert(JSON.stringify(response, null, 2));
            }
            setIsSubmitting(false);
        };
        fecthAddLau(data);
    };

    return (
        <div className="max-w-md mx-auto flex flex-col gap-2">
            <h1 className="text-xl font-semibold mb-4">Form Thêm Lầu</h1>
            <Input label={`Nhà trọ: ${tenNhaTro}`} disabled />
            <Formik
                initialValues={{
                    sttLau: 0,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    handleAddLau(values);
                    setSubmitting(false);
                    resetForm();
                }}
            >
                {(props) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="sttLau" className="block">
                                Tầng lầu
                            </label>
                            <Field
                                type="number"
                                name="sttLau"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                            <ErrorMessage name="sttLau" component="div" className="text-red-500" />
                        </div>
                        <button
                            type="submit"
                            disabled={!props.isValid || isSubmitting}
                            className={`bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed ${
                                isSubmitting ? 'bg-blue-500 animate-pulse' : ''
                            }`}
                        >
                            {isSubmitting ? 'Đang thêm lầu...' : 'Thêm lầu'}
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

export default AddLauForm;
