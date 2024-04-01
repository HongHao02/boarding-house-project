import { Menu, MenuHandler, MenuList, MenuItem, IconButton, Avatar, Typography, Badge } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { CheckIcon } from '@heroicons/react/24/outline';
import useCheckChuTroRole from '~/hooks/useCheckChuTroRole';
import * as publicServices from '~/services/addressServices';
import images from '~/assets/images';
import PostTimeStamp from '../Time/PostTimeStamp';
function ClockIcon() {
    return (
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.99998 14.9C9.69736 14.9 11.3252 14.2257 12.5255 13.0255C13.7257 11.8252 14.4 10.1974 14.4 8.49998C14.4 6.80259 13.7257 5.17472 12.5255 3.97449C11.3252 2.77426 9.69736 2.09998 7.99998 2.09998C6.30259 2.09998 4.67472 2.77426 3.47449 3.97449C2.27426 5.17472 1.59998 6.80259 1.59998 8.49998C1.59998 10.1974 2.27426 11.8252 3.47449 13.0255C4.67472 14.2257 6.30259 14.9 7.99998 14.9ZM8.79998 5.29998C8.79998 5.0878 8.71569 4.88432 8.56566 4.73429C8.41563 4.58426 8.21215 4.49998 7.99998 4.49998C7.7878 4.49998 7.58432 4.58426 7.43429 4.73429C7.28426 4.88432 7.19998 5.0878 7.19998 5.29998V8.49998C7.20002 8.71213 7.28434 8.91558 7.43438 9.06558L9.69678 11.3288C9.7711 11.4031 9.85934 11.4621 9.95646 11.5023C10.0536 11.5425 10.1577 11.5632 10.2628 11.5632C10.3679 11.5632 10.472 11.5425 10.5691 11.5023C10.6662 11.4621 10.7544 11.4031 10.8288 11.3288C10.9031 11.2544 10.9621 11.1662 11.0023 11.0691C11.0425 10.972 11.0632 10.8679 11.0632 10.7628C11.0632 10.6577 11.0425 10.5536 11.0023 10.4565C10.9621 10.3593 10.9031 10.2711 10.8288 10.1968L8.79998 8.16878V5.29998Z"
                fill="#90A4AE"
            />
        </svg>
    );
}

function NotifyConsultant({ NotifyIcon }) {
    const { user } = useSelector((state) => state.users);
    const [badgeValue, setBadgeValue] = useState(0);
    const [consultant, setConsultant] = useState({});

    const chuTroRole = useCheckChuTroRole(user);

    console.log('CONSULTANT ', consultant);
    const fetchChuTroConsultant = async (id) => {
        const response = await publicServices.getAllConsultanByIdChuTro(id);
        if (!response.error) {
            if (response.data) {
                setBadgeValue(response.data.countTuVans);
                setConsultant(response.data);
            }
        } else {
            console.log('ERROR WHEN FETCHING CONSULTANT ', response.error);
        }
    };
    useEffect(() => {
        if (chuTroRole) {
            fetchChuTroConsultant(user.user.id);
        }
    }, [user, chuTroRole]);
    return (
        <Badge
            content={badgeValue === 0 ? <CheckIcon className="h-2 w-2 text-white" strokeWidth={2.5} /> : badgeValue}
            withBorder
            className={
                badgeValue === 0
                    ? 'bg-gradient-to-tr from-green-400 to-green-600 border-2 border-white shadow-lg shadow-black/20'
                    : ''
            }
        >
            <Menu>
                <MenuHandler>
                    <IconButton variant="text">{NotifyIcon}</IconButton>
                </MenuHandler>
                <MenuList className="flex flex-col gap-2">
                    {Object.keys(consultant).length > 0 ? (
                        <>
                            {consultant.tuVanDTOList.map(({ user, chiTietTuVanSet }, index) => (
                                <MenuItem key={index} className="flex items-center gap-4 py-2 pl-2 pr-8">
                                    <Avatar
                                        variant="circular"
                                        alt="tania andrew"
                                        src={user.avt || images.noAVTMale}
                                    />
                                    <div className="flex flex-col gap-1">
                                        <Typography  color="gray" className="font-semibold text-[10px]">
                                            {user.lastName || user.username} đã gửi cho bạn một tư vấn
                                        </Typography>
                                        <div className="flex items-center gap-1 text-sm font-medium text-blue-gray-500">
                                            <ClockIcon />
                                            <PostTimeStamp published_at={chiTietTuVanSet[0].thoiGianTuVan}></PostTimeStamp>
                                        </div>
                                    </div>
                                </MenuItem>
                            ))}
                        </>
                    ) : (
                        <MenuItem className="flex items-center gap-4 py-2 pl-2 pr-8">"Không có tư vấn nào cả"</MenuItem>
                    )}
                </MenuList>
            </Menu>
        </Badge>
    );
}

export default NotifyConsultant;
