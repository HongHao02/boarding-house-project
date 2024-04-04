import { Button } from '@material-tailwind/react';
import Overview from './user-component/Overview';
import React, { useState } from 'react';
import Contact from './user-component/Contact';
import Status from './user-component/Status';
const userInfo = [
    {
        label: 'Tổng quan',
        component: <Overview></Overview>,
    },
    {
        label: 'Thông tin liên hệ cơ bản',
        component: <Contact></Contact>,
    },
    {
        label: 'Tình trạng tài khoản',
        component: <Status></Status>,
    },
];

function IntroFeature({ data }) {
    console.log('DATA ', data);
    const [active, setActive] = useState(userInfo[0].component);
    return (
        <div className='min-h-80'>
            {data !== null && (
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-2 border-r-2">
                        <h4 className="font-bold">Giới thiệu</h4>
                        <div className="flex flex-col gap-2 items-start">
                            {userInfo.map(({ label, component }, index) => (
                                <Button
                                    variant="text"
                                    key={index}
                                    className="w-full flex justify-start pl-0"
                                    onClick={() => setActive(component)}
                                >
                                    {label}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-3">{React.cloneElement(active, { data: data })}</div>
                </div>
            )}
        </div>
    );
}

export default IntroFeature;
