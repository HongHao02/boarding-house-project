import { PencilIcon } from '@heroicons/react/24/solid';
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    IconButton,
    Tooltip,
    Input,
} from '@material-tailwind/react';
import { useEffect, useMemo, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';

import { DialogCustomAnimation } from '~/components/Dialog';
import AddLauForm from './AddLauForm';
import AddRoomForm from './AddRoomForm';

const TABLE_HEAD = ['Tên nhà trọ', 'idLau', 'Tầng', 'idPhong', 'Số phòng', 'Loại phòng', 'Giá phòng', 'Status', ''];
const STT_LAU_LIST = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


export default function BoardingHouseTable({ nhaTro = {} }) {
    const [sttLau, setSttLau] = useState(0);
    const [isActiveLau, setIsActiveLau] = useState({});

    // const [isAddRoom, setIsAddRoom] = useState(false);

    console.log('NHATRO.lauSet ', nhaTro.lauSet);
    console.log('isActiveLau ', isActiveLau);
    console.log('STTLAU ', sttLau);
    useEffect(() => {
        if (nhaTro.lauSet) {
            const lau = nhaTro.lauSet.find((lau) => lau.sttLau === sttLau);
            console.log('LAU ', lau);
            if (lau) {
                setIsActiveLau(lau);
            } else {
                setIsActiveLau({});
            }
        }
    }, [sttLau, nhaTro.lauSet]);

    //add room
    // const handleAddRoom = () => {
    //     setIsAddRoom(false);
    // };
    // console.log('addroom ', isAddRoom);

    const calculateIsReadyPhong = useMemo(() => {
        if (Object.keys(isActiveLau).length > 0) {
            if (isActiveLau.phongSet.length > 0) {
                return isActiveLau.phongSet.reduce((accumulator, currentValue) => {
                    if (currentValue.tinhTrang) {
                        return accumulator + 1;
                    } else {
                        return accumulator;
                    }
                }, 0);
            }
            return 0;
        }
        return 0;
    }, [isActiveLau]); // Khi phongSet thay đổi, useMemo sẽ tính toán lại giá trị

    const checkExistsLau = (index) => {
        if (nhaTro.lauSet) {
            return nhaTro.lauSet.some((lau) => lau.sttLau === index);
        } else {
            return false;
        }
    };

    return (
        <>
            {/* {isAddRoom && <DialogDefault onClose={handleAddRoom}>
                <AddRoom></AddRoom>
            </DialogDefault>} */}

            {Object.keys(nhaTro).length > 0 ? (
                <Card className="h-full w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    {nhaTro.tenNhaTro}
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Thông tin chi tiết của tầng lầu
                                </Typography>
                                <div className="flex gap-x-2 mt-2">
                                    {Object.keys(isActiveLau).length > 0 ? (
                                        <>
                                            <Chip
                                                variant="outlined"
                                                value={`Tầng: ${
                                                    isActiveLau.sttLau === 0 ? 'Trệt' : isActiveLau.sttLau
                                                }`}
                                            ></Chip>
                                            <Chip
                                                variant="outlined"
                                                value={`Tổng: ${isActiveLau.phongSet.length}`}
                                            ></Chip>
                                            <Chip
                                                variant="outlined"
                                                color="green"
                                                value={`Sẵn sàng: ${calculateIsReadyPhong}`}
                                            ></Chip>
                                            <Chip
                                                variant="outlined"
                                                color="red"
                                                value={`Bận: ${isActiveLau.phongSet.length - calculateIsReadyPhong}`}
                                            ></Chip>
                                            <DialogCustomAnimation
                                                title="Thêm lầu mới"
                                                button={
                                                    <IconButton className="rounded-full">
                                                        <IoMdAddCircleOutline className="w-6 h-6" />
                                                    </IconButton>
                                                }
                                                toolTipContent="Thêm lầu"
                                            >
                                                {/* <AddRoom tenNhaTro={nhaTro.tenNhaTro} lau={isActiveLau}></AddRoom> */}
                                                <AddLauForm
                                                    tenNhaTro={nhaTro.tenNhaTro}
                                                    lau={isActiveLau}
                                                ></AddLauForm>
                                            </DialogCustomAnimation>
                                        </>
                                    ) : (
                                        <div className="font-bold text-red-900">Tầng chưa được tạo</div>
                                    )}
                                </div>
                            </div>

                            <div className="flex w-full shrink-0 gap-2 md:w-max">
                                <div className="w-full md:w-72">
                                    <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
                                </div>
                                <Button className="flex items-center gap-3" size="sm">
                                    <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    {/**Bang hien thi */}
                    <CardBody className="overflow-scroll px-0">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(isActiveLau).length > 0 &&
                                    isActiveLau.phongSet.map(
                                        ({ phongID, loaiPhong, sttLau, sttPhong, tinhTrang, giaPhong }, index) => {
                                            const isLast = index === isActiveLau.phongSet.length - 1;
                                            const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                                            return (
                                                <tr key={phongID.idPhong}>
                                                    <td className={classes}>
                                                        <div className="flex items-center gap-3">
                                                            {nhaTro.tenNhaTro}
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {phongID.idLau}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {isActiveLau.sttLau === 0 ? 'Trệt' : isActiveLau.sttLau}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {phongID.idPhong}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {sttPhong}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="flex items-center gap-3">
                                                            {loaiPhong.tenLoai}
                                                        </div>
                                                    </td>

                                                    <td className={classes}>
                                                        <div className="flex items-center gap-3">{giaPhong}</div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="w-max">
                                                            <Chip
                                                                size="sm"
                                                                variant="ghost"
                                                                value={tinhTrang ? 'Sẵn sàng' : 'Bận'}
                                                                color={tinhTrang ? 'green' : 'red'}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <Tooltip content="Edit Room">
                                                            <IconButton variant="text">
                                                                <PencilIcon className="h-4 w-4" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            );
                                        },
                                    )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td colSpan={'4'} className="flex p-4 border-b border-blue-gray-50">
                                        <DialogCustomAnimation
                                            title="Thêm phòng mới"
                                            button={
                                                <IconButton className="rounded-full">
                                                    <IoMdAddCircleOutline className="w-6 h-6" />
                                                </IconButton>
                                            }
                                            toolTipContent="Thêm phòng"
                                        >
                                            {/* <AddRoom tenNhaTro={nhaTro.tenNhaTro} lau={isActiveLau}></AddRoom> */}
                                            <AddRoomForm tenNhaTro={nhaTro.tenNhaTro} lau={isActiveLau}></AddRoomForm>
                                        </DialogCustomAnimation>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </CardBody>
                    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                        <Button variant="outlined" size="sm">
                            Previous
                        </Button>
                        <div className="flex items-center gap-2">
                            {STT_LAU_LIST.map((lau, index) => {
                                return (
                                    <IconButton
                                        key={index}
                                        color={checkExistsLau(index) ? 'green' : 'black'}
                                        variant={sttLau === index ? 'outlined' : 'text'}
                                        size="sm"
                                        onClick={() => setSttLau(index)}
                                    >
                                        {lau}
                                    </IconButton>
                                );
                            })}
                        </div>
                        <Button variant="outlined" size="sm">
                            Next
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                <div>Không có nhà trọ nào hợp lệ</div>
            )}
        </>
    );
}
