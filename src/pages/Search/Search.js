import { Avatar, IconButton, Typography, Chip } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { IconFilter } from '~/components/Icons';
import AddFormAddress from './AddFormAddress';
import { MdOutlineHouse } from 'react-icons/md';
import { sellectAddresses } from '~/features/addresses/addressesSlice';
import { getAddressList } from '~/features/addresses/AddressesThunk';
import { getNhaTroList } from '~/features/nhaTroList/nhaTroListThunk';
import { DialogCustomAnimation } from '~/components/Dialog';
import images from '~/assets/images';

function Search() {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const addresses = useSelector(sellectAddresses);

    const [searchValue, setSearchValue] = useState({
        message: null,
        data: [],
        tenTinh: '',
        tenXa: '',
        tenHuyen: '',
        tenDuong: '',
    });

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('address'))) {
            const searchValueArray = JSON.parse(localStorage.getItem('address'));
            if ((searchValueArray?.length ?? 0) > 0) {
                setSearchValue((prev) => ({
                    ...prev,
                    data: searchValueArray,
                    tenTinh: searchValueArray[0].tenTinh,
                    tenXa: searchValueArray[0].tenXa,
                    tenHuyen: searchValueArray[0].tenHuyen,
                    tenDuong: searchValueArray[0].tenDuong,
                }));
            }
        }
    }, []);

    const handleSetSearchValue = (data) => {
        if (data != null) {
            setSearchValue((prev) => ({
                ...prev,
                data: data.data,
                message: data.message,
                tenTinh: data.tenTinh,
                tenXa: data.tenXa,
                tenHuyen: data.tenHuyen,
                tenDuong: data.tenDuong,
            }));
        }
    };

    useEffect(() => {
        console.log('ADDRESSES_REDUCER ', addresses);
        dispatch(getAddressList());
        dispatch(getNhaTroList());
        console.log('ADDRESSES ', addresses.addresses);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
    return (
        <div className="h-full w-full">
            {users.user !== null ? (
                <div className="flex gap-6">
                    <Avatar
                        src={users.user.user.avt || images.noAVTMale}
                        className="w-28 h-28"
                        withBorder={true}
                        color="green"
                    ></Avatar>
                    <div className="flex flex-col justify-between">
                        <div className="font-bold">
                            {users.user.user.firstName && users.user.user.lastName
                                ? `${users.user.user.firstName} ${users.user.user.lastName}`
                                : 'NO_NAME'}
                        </div>
                        <div className="flex">
                            <p>Email</p>
                            <p>: {users.user.user.username}</p>
                        </div>
                        <div className="flex text-center">
                            <p>Number Phone:</p>
                            <p className="ml-3 ">{users.user.user.numberPhone}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Bạn chưa đăng nhập</div>
            )}

            <div className="mt-14">
                <div className="flex mb-5 gap-6">
                    <DialogCustomAnimation
                        title="Nhập địa chỉ trọ"
                        button={
                            <IconButton className="rounded-full bg-green-700 ">
                                <IconFilter className="text-3xl" />
                            </IconButton>
                        }
                        toolTipContent="Chọn địa chỉ"
                    >
                        <AddFormAddress onResult={handleSetSearchValue}></AddFormAddress>
                    </DialogCustomAnimation>
                    <Typography className="ml-90" variant="h4">
                        Danh sách nhà trọ theo địa chỉ
                    </Typography>
                </div>
                <>
                    {searchValue.data.length > 0 ? (
                        <div className="flex gap-2 mb-2">
                            <>
                                <Chip
                                    size="lg"
                                    color="green"
                                    variant="outlined"
                                    value={searchValue.tenTinh}
                                    className="rounded-full"
                                />
                                <Chip
                                    size="lg"
                                    color="green"
                                    variant="outlined"
                                    value={searchValue.tenHuyen}
                                    className="rounded-full"
                                />
                                <Chip
                                    size="lg"
                                    color="green"
                                    variant="outlined"
                                    value={searchValue.tenXa}
                                    className="rounded-full"
                                />
                                <Chip
                                    size="lg"
                                    color="green"
                                    variant="outlined"
                                    value={searchValue.tenDuong}
                                    className="rounded-full"
                                />
                            </>
                        </div>
                    ) : (
                        <Chip
                            size="lg"
                            color="green"
                            variant="outlined"
                            value="Không có dữ liệu"
                            className="rounded-full flex justify-center items-center m-2"
                        />
                    )}
                </>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                STT
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tên nhà trọ
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Xem chi tiết
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {(searchValue.data?.length ?? 0) > 0 ? (
                            <>
                                {searchValue.data.map(({ tenNhaTro, username }, index) => (
                                    <tr
                                        key={index}
                                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                    >
                                        <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                            {index + 1}
                                        </td>
                                        <td
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {tenNhaTro}
                                        </td>

                                        <td className="px-12 py-4">
                                            <Link to={`/:${username}`}>
                                                <MdOutlineHouse className="text-3xl" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </>
                        ) : (
                            <tr>
                                <td >Không tìm thấy</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Search;
