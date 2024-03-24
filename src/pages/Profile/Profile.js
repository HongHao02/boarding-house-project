import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Avatar, Button, Card, Typography } from '@material-tailwind/react';
import { FaCameraRetro } from 'react-icons/fa';

import * as userService from '~/services/userServices';

function Profile() {
    const { username } = useParams();
    const formatUsername = `@${username.substring(1)}`;

    const [userInfo, setUserInfo] = useState(null);
    const [message, setMessage] = useState(null);
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
    }, []);
    return (
        <div className="w-full min-h-screen">
            {message !== null && <div className="flex justify-center items-center mx-auto"></div>}
            {userInfo !== null && (
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
                                            src={userInfo.user.avt}
                                            alt="avatar"
                                            withBorder={true}
                                            className="p-0.5 w-40 h-40 mr-5"
                                        />
                                        <div className="flex flex-grow items-end mb-6">
                                            <Typography
                                                variant="h3"
                                                className="flex-col justify-end"
                                            >{`${userInfo.user.firstName} ${userInfo.user.lastName}`}</Typography>
                                            {/* <Button className="flex justify-end items-center ml-auto gap-4" variant="outlined">
                                                    <FaCameraRetro />
                                                    Chỉnh sửa ảnh đại diện
                                                </Button> */}
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                            <div className="w-full h-[1px] bg-gray-800 mt-24 mb-4"></div>
                            <div className="flex gap-x-4 mb-2">
                                <Button variant="text" className="hover:decoration-clone">
                                    Bài viết
                                </Button>
                                <Button variant="text">Giới thiệu</Button>
                                <Button variant="text">Khác</Button>
                            </div>
                        </div>
                    </div>
                    {/**part 2: content */}
                    <Card className="w-[80%] mx-auto">
                        <div className='flex gap-x-2'>
                            <div className="w-2/5">Info</div>
                            <div className="w-3/5">Post</div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default Profile;
