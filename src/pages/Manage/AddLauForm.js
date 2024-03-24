import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input } from '@material-tailwind/react';
import * as chuTroServices from '~/services/chutroServices';

const validationSchema = Yup.object().shape({
    sttLau: Yup.number("Số lầu phải là số")
        .min(0, 'Số lầu phải lớn hơn hoặc bằng 0')
        .max(10, 'Số lầu phải nhỏ hơn 10')
        .required('Vui lòng nhập số lầu'),
});

const AddLauForm = ({ tenNhaTro, lau }) => {
    useEffect(() => {
        const fetchLoaiNhaTro = async () => {
            const response = await chuTroServices.getAllLoaiPhong();
            if (response.data.length > 0) {
                console.log('LOAIPHONG ', response.data);
            }
        };
        fetchLoaiNhaTro();
    }, []);

    

    const handleAddLau = (values) => {
        const data = {
            idNhaTro: lau.lauID.idNhaTro,
            sttLau: values.sttLau,
        };
        const fecthAddLau = async (data) => {
            const response = await chuTroServices.addLau(data);
            console.log('RESPONSE_ADD_FLOOR ', response);
            if (!response.error) {
                console.log('ADD_LAU ', response);
                if (response.data) {
                    alert(JSON.stringify('Thêm lầu thành công', null, 2));
                } else {
                    alert(JSON.stringify(response.message, null, 2));
                }
            } else {
                alert(JSON.stringify(response, null, 2));
            }
        };
        fecthAddLau(data);
    };

    return (
        <div className="max-w-md mx-auto flex flex-col gap-2">
            <h1 className="text-xl font-semibold mb-4">Form Thêm Lầu</h1>
            <Input label={`Nhà trọ: ${tenNhaTro}`} disabled />
            <Formik
                initialValues={{
                    sttLau: 0
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
                            disabled={props.isSubmitting}
                            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Thêm lầu
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddLauForm;
