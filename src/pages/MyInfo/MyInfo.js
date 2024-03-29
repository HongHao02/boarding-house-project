import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Button, Avatar, Card, Typography } from '@material-tailwind/react';
import { FaCameraRetro } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import PostFeature from './PostFeature';
import NhaTroFeature from './NhaTroFeature';
import IntroFeature from './IntroFeature';

import * as userService from '~/services/userServices';
import ChangeAvt from './user-component/ChangeAvt';
import { DialogCustomAnimation } from '~/components/Dialog';
import images from '~/assets/images';
const featuresList = [
    {
        label: 'Giới thiệu',
        component: <IntroFeature></IntroFeature>,
    },
    {
        label: 'Bài Viết',
        component: <PostFeature></PostFeature>,
    },
    {
        label: 'Nhà trọ',
        component: <NhaTroFeature></NhaTroFeature>,
    },
    {
        label: 'Khác',
        component: <PostFeature></PostFeature>,
    },
];

function MyInfo() {
    const users = useSelector((state) => state.users);
    const { username } = useParams();
    const formatUsername = `@${username.substring(1)}`;

    const [userInfo, setUserInfo] = useState(null);
    const [message, setMessage] = useState(null);

    const [activeComponent, setActiveComponent] = useState(featuresList[0].component);

    console.log('USER_INFO ', activeComponent);
    const fetchUserInfo = async () => {
        try {
            const response = await userService.getUserInfo({ username: formatUsername });
            console.log('USER INFO ', response);
            if (response.data !== null) {
                console.log('RESPONSE ', response.data);
                setUserInfo(response.data);

                setMessage(null);
            } else {
                setMessage(response.message);
            }
        } catch (error) {
            setMessage(error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users]);

    return (
        <div>
            {formatUsername !== '@anonymous-user' ? (
                <div className="w-full min-h-screen mb-4">
                    {message !== null && <div className="flex justify-center items-center mx-auto">{message}</div>}
                    {userInfo !== null && users.user !== null && (
                        <div>
                            {/**part 1: info */}
                            <div className="bg-gray-50">
                                <div className="w-[80%] mx-auto">
                                    <div>
                                        <figure className="relative h-96 w-full">
                                            <img
                                                className="h-full w-full rounded-xl object-cover object-center"
                                                src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                                                alt="nature"
                                            />
                                            <figcaption className="absolute left-2/4 flex  w-[calc(100%-4rem)] -translate-x-2/4 bottom-[-80px]   rounded-full">
                                                <Avatar
                                                    src={users.user.user.avt || images.noAVTMale}
                                                    alt="avatar"
                                                    withBorder={true}
                                                    className="p-0.5 w-40 h-40 mr-5"
                                                />
                                                <div className="flex flex-grow items-end mb-6">
                                                    <Typography
                                                        variant="h3"
                                                        className="flex-col justify-end"
                                                    >{`${userInfo.user.firstName} ${userInfo.user.lastName}`}</Typography>

                                                    <DialogCustomAnimation
                                                        title="Cập nhật ảnh đại diện"
                                                        button={
                                                            <Button
                                                                className="flex justify-end items-center ml-auto gap-4"
                                                                variant="outlined"
                                                            >
                                                                <FaCameraRetro />
                                                                Chỉnh sửa ảnh đại diện
                                                            </Button>
                                                        }
                                                        type="button"
                                                    >
                                                        {/* <AddRoom tenNhaTro={nhaTro.tenNhaTro} lau={isActiveLau}></AddRoom> */}
                                                        <ChangeAvt></ChangeAvt>
                                                    </DialogCustomAnimation>
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </div>
                                    <div className="w-full h-[1px] bg-gray-800 mt-24 mb-4"></div>
                                    <div className="flex gap-x-4 mb-2">
                                        {featuresList.map(({ label, component }, index) => (
                                            <Button
                                                key={index}
                                                variant={component === activeComponent ? 'gradient' : 'text'}
                                                color={component === activeComponent ? 'blue' : 'black'}
                                                onClick={() => setActiveComponent(component)}
                                                className={component === activeComponent ? 'border-b-indigo-600' : ''}
                                            >
                                                <p>{label}</p>
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/**part 2: content */}
                            <Card className="w-[80%] mx-auto p-4">
                                {React.cloneElement(activeComponent, { data: userInfo })}
                            </Card>
                        </div>
                    )}
                </div>
            ) : (
                <div>anonymous user</div>
            )}
        </div>
    );
}

export default MyInfo;
