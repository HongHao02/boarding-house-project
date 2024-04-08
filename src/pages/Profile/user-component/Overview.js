/* eslint-disable eqeqeq */
import { FaUserCircle } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import { FaTransgenderAlt } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { PiIdentificationCardFill } from 'react-icons/pi';

import UserInfoElement from './UserInfoElement';

function Overview({ data }) {
    console.log("OVERVIEW_PROFILE", data);
    return (
        <div className="flex flex-col gap-4 w-full">
            {data!= null && Object.keys(data.user).length > 0 && (
                <>
                    <p className="font-bold">Tổng quan</p>
                    <div className="flex flex-col gap-2">
                        {Object.keys(data.user).length > 0 ? (
                            <>
                                <UserInfoElement icon={<FaUserCircle></FaUserCircle>}>
                                    Username: {data.user.username}
                                </UserInfoElement>
                                <UserInfoElement icon={<FaUserCircle></FaUserCircle>}>
                                    LastName: {data.user.firstName}
                                </UserInfoElement>
                                <UserInfoElement icon={<FaUserCircle></FaUserCircle>}>
                                    FirstName: {data.user.lastName}
                                </UserInfoElement>
                                <UserInfoElement icon={<FaPhoneAlt></FaPhoneAlt>}>
                                    NumberPhone: {data.user.numberPhone}
                                </UserInfoElement>
                                <UserInfoElement icon={<FaTransgenderAlt></FaTransgenderAlt>}>
                                    Gender: {data.user.gender ? 'Male' : 'Female'}
                                </UserInfoElement>
                                <UserInfoElement icon={<MdDateRange></MdDateRange>}>
                                    Ngày sinh:{' '}
                                    {data.user.dateOfBirth !== null
                                        ? data.user.dateOfBirth.slice(0, data.user.dateOfBirth.indexOf('T'))
                                        : ''}
                                </UserInfoElement>
                                <UserInfoElement icon={<PiIdentificationCardFill></PiIdentificationCardFill>}>
                                    Căn cước công dân: {data.user.cccd}
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
