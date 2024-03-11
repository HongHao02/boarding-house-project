import React, { useState, useEffect } from 'react';

import { Alert } from '@material-tailwind/react';

const AlertCustom = ({ type, message, onClose }) => {
    const [show, setShow] = useState(true);
    const handleShow = () => {
        setShow(false);
        onClose();
    };
    console.log('AlertCustom');

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            onClose()
        }, 5000); // 5 giây
        //clear function before component umnount
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <Alert
            open={show}
            onClose={handleShow}
            animate={{
                mount: { y: 0 },
                unmount: { y: -200 },
            }}
            title="Bạn chưa đăng nhập vui lòng đăng nhập!"
            className={`top-0 fixed left-0 w-full text-white bg-gray-500 flex justify-center`}
        >
            {/* <span className='mr-2'>{message}</span> */}
        </Alert>
    );
};

export default AlertCustom;
