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
            onClose();
        }, 5000); // 5 giây
        //clear function before component umnount
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        // <div className={`z-[9999] ${type=== 'success' ? 'bg-green-600': 'bg-red-600'}`}>
        <Alert
            open={show}
            onClose={handleShow}
            // animate={{
            //     mount: { y: 0 },
            //     unmount: { y: -200 },
            // }}
            className={`top-0 z-[9999] fixed left-0 w-full min-h-[50px] text-white ${
                type === 'success' ? 'bg-green-400' : 'bg-red-400'
            }  flex justify-center`}
        >
            {message}
        </Alert>
        // </div>
    );
};

export default AlertCustom;
