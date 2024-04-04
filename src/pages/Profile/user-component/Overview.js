/* eslint-disable eqeqeq */
import { useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import { FaTransgenderAlt } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { PiIdentificationCardFill } from 'react-icons/pi';
import { Button } from '@material-tailwind/react';

import UserInfoElement from './UserInfoElement';
import UpdateInfoForm from './UpdateInfoForm';
import { DialogCustomAnimation } from '~/components/Dialog';

function Overview({ data }) {
    const { user } = useSelector((state) => state.users);
    return (
        <div className="flex flex-col gap-4 w-full">
            {user && (
                <>
                    <p className="font-bold">Tổng quan</p>
                    <div className="flex flex-col gap-2">
                        {user.user !== null ? (
                            <>
                                <UserInfoElement icon={<FaUserCircle></FaUserCircle>}>
                                    Username: {user.user.username}
                                </UserInfoElement>
                                <UserInfoElement icon={<FaUserCircle></FaUserCircle>}>
                                    LastName: {user.user.firstName}
                                </UserInfoElement>
                                <UserInfoElement icon={<FaUserCircle></FaUserCircle>}>
                                    FirstName: {user.user.lastName}
                                </UserInfoElement>
                                <UserInfoElement icon={<FaPhoneAlt></FaPhoneAlt>}>
                                    NumberPhne: {user.user.numberPhone}
                                </UserInfoElement>
                                <UserInfoElement icon={<FaTransgenderAlt></FaTransgenderAlt>}>
                                    Gender: {user.user.gender ? 'Male' : 'Female'}
                                </UserInfoElement>
                                <UserInfoElement icon={<MdDateRange></MdDateRange>}>
                                    Ngày sinh:{' '}
                                    {user.user.dateOfBirth !== null
                                        ? user.user.dateOfBirth.slice(0, user.user.dateOfBirth.indexOf('T'))
                                        : ''}
                                </UserInfoElement>
                                <UserInfoElement icon={<PiIdentificationCardFill></PiIdentificationCardFill>}>
                                    Căn cước công dân: {user.user.cccd}
                                </UserInfoElement>
                            </>
                        ) : (
                            <div>"Không có thông tin user"</div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Overview;
