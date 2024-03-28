import { Avatar, Button, Card, CardBody, CardFooter, IconButton, Typography, Chip } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoMdAddCircleOutline } from 'react-icons/io';

import BoardingHouseTable from './BoardingHouseTable';
import { sellectAddresses } from '~/features/addresses/addressesSlice';
import { getAddressList } from '~/features/addresses/AddressesThunk';
import { getNhaTroList } from '~/features/nhaTroList/nhaTroListThunk';
import { sellectNhaTroList } from '~/features/nhaTroList/nhaTroSlice';
import { DialogCustomAnimation } from '~/components/Dialog';
import AddNhaTroForm from './AddNhaTroForm';
import images from '~/assets/images';
function BoardingCard({ nhaTro, onChange = () => {}, isActive }) {
    return (
        <Card className="flex-col justify-between">
            <CardBody className="h-[70%]">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {nhaTro.tenNhaTro}
                </Typography>
                <Typography className="flex flex-col">
                    <p>{nhaTro.tenDuong}</p>
                    <p>{nhaTro.tenXa}</p>
                    <p>{nhaTro.tenHuyen}</p>
                    <p>{nhaTro.tenTinh}</p>
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button
                    variant="outlined"
                    color={nhaTro.idNhaTro === isActive ? 'green' : 'black'}
                    onClick={() => onChange(nhaTro)}
                >
                    Read More
                </Button>
            </CardFooter>
        </Card>
    );
}
function Manage() {
    //redux
    const dispatch = useDispatch();
    const addresses = useSelector(sellectAddresses);
    const { nhaTroList } = useSelector(sellectNhaTroList);
    const users = useSelector((state) => state.users);

    //state
    const [isLandlord, setIsLandlord] = useState(false);
    // const [nhaTroList, setNhaTroList] = useState([]);
    const [isActive, setIsActive] = useState(() => {
        return nhaTroList.length === 0 ? {} : nhaTroList[0];
    });
    // const fetchNhaTroList = async () => {
    //     // const response = await chuTroServices.getListNhaTroByIdChuTro();
    //     // if (response.data) {
    //     //     setNhaTroList(response.data);
    //     // }

    // };

    useEffect(() => {
        if (users.user) {
            const isLandlordRole = users.user.user.roles.some((role) => role.nameRole === 'CHUTRO');
            if (isLandlordRole) {
                setIsLandlord(true);
                // fetchNhaTroList();
            }
        } else {
            setIsLandlord(false);
        }
    }, [dispatch, users.user]);

    useEffect(() => {
        console.log('ADDRESSES_REDUCER ', addresses);
        // Dispatch thunk để lấy danh sách địa chỉ khi component được render
        dispatch(getAddressList());
        dispatch(getNhaTroList());
        console.log('ADDRESSES ', addresses.addresses);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const handleChangeActive = (nhaTro) => {
        if (nhaTro) {
            setIsActive(nhaTro);
        }
    };
    useEffect(() => {
        if (nhaTroList.length > 0) {
            setIsActive(nhaTroList[0]);
        } else {
            setIsActive({});
        }
    }, [nhaTroList]);

    console.log('NHATROLIST ', nhaTroList);
    return (
        <div className="w-full">
            {isLandlord && users.user !== null ? (
                <div className="flex flex-col gap-y-2">
                    {/**User info */}
                    <div className="flex gap-6">
                        <Avatar
                            src={users.user.user.avt || images.noAVTMale}
                            className="w-28 h-28"
                            withBorder={true}
                            color="green"
                        ></Avatar>
                        <div className="flex flex-col justify-between">
                            {/* {`${users.user.user.firstName} ${users.user.user.lastName}`} */}
                            <p className="font-bold">
                                {users.user.user.firstName && users.user.user.lastName
                                    ? `${users.user.user.firstName} ${users.user.user.lastName}`
                                    : 'NO_NAME'}
                            </p>
                            <p>{users.user.user.username}</p>
                            <Button className="flex items-center gap-3 h-5" variant="outlined">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                    />
                                </svg>
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                    <hr className="border-2 mx-2"></hr>
                    {/**Chon nha trọ nếu có nhiều nhà trọ - tạo nhà trọ */}
                    <Typography variant="h4">Danh sach nha tro</Typography>
                    <div className="grid grid-cols-6 gap-4">
                        {nhaTroList.length > 0 ? (
                            <>
                                {nhaTroList.map((nhatro, index) => (
                                    <BoardingCard
                                        key={index}
                                        nhaTro={nhatro}
                                        onChange={handleChangeActive}
                                        isActive={isActive ? isActive.idNhaTro : 0}
                                    ></BoardingCard>
                                ))}
                                {/* <div className="flex justify-center"> */}
                                {/* <IconButton variant="outlined" className="rounded-full my-auto">
                                        <IoMdAddCircleOutline
                                            color="green"
                                            className="w-10 h-10"
                                        ></IoMdAddCircleOutline>
                                    </IconButton> */}
                                <DialogCustomAnimation
                                    title="Thêm nhà trọ mới"
                                    button={
                                        <IconButton className="rounded-full bg-green-700">
                                            <IoMdAddCircleOutline className="w-6 h-6" />
                                        </IconButton>
                                    }
                                    toolTipContent="Thêm nhà trọ"
                                >
                                    {/* <AddRoom tenNhaTro={nhaTro.tenNhaTro} lau={isActiveLau}></AddRoom> */}
                                    <AddNhaTroForm></AddNhaTroForm>
                                </DialogCustomAnimation>
                                {/* </div> */}
                            </>
                        ) : (
                            <>
                                <div className="flex items-center">Không có nhà trọ</div>
                                <DialogCustomAnimation
                                    title="Thêm nhà trọ mới"
                                    button={
                                        <IconButton className="rounded-full bg-green-700">
                                            <IoMdAddCircleOutline className="w-6 h-6" />
                                        </IconButton>
                                    }
                                    toolTipContent="Thêm nhà trọ"
                                >
                                    {/* <AddRoom tenNhaTro={nhaTro.tenNhaTro} lau={isActiveLau}></AddRoom> */}
                                    <AddNhaTroForm></AddNhaTroForm>
                                </DialogCustomAnimation>
                            </>
                        )}
                    </div>
                    {/* <hr className="border-2 mx-2 border-gray-300"></hr> */}
                    {/**Hiển thị thông tin hiện tại của nhà trọ (Lầu, Phòng) - tạo lầu, tạo phòng, xóa lầu, xóa phòng*/}
                    <div>
                        {Object.keys(isActive).length > 0 ? (
                            <>
                                <div className="flex gap-2">
                                    <Chip
                                        size="lg"
                                        color="green"
                                        variant="outlined"
                                        value={isActive.tenNhaTro}
                                        className="rounded-full"
                                    />
                                    <Chip
                                        size="lg"
                                        variant="outlined"
                                        value={isActive.tenDuong}
                                        className="rounded-full"
                                    />
                                    <Chip
                                        size="lg"
                                        variant="outlined"
                                        value={isActive.tenXa}
                                        className="rounded-full"
                                    />
                                    <Chip
                                        size="lg"
                                        variant="outlined"
                                        value={isActive.tenHuyen}
                                        className="rounded-full"
                                    />
                                    <Chip
                                        size="lg"
                                        variant="outlined"
                                        value={isActive.tenTinh}
                                        className="rounded-full"
                                    />
                                </div>
                            </>
                        ) : (
                            <div>Loi khong the tim thay nha tro</div>
                        )}
                    </div>
                    <div>
                        <BoardingHouseTable nhaTro={isActive}></BoardingHouseTable>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center mx-auto h-screen">
                    Tính năng quản lý chỉ dành cho chủ trọ!
                </div>
            )}
        </div>
    );
}

export default Manage;
