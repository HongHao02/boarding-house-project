/* eslint-disable eqeqeq */
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaHeart } from 'react-icons/fa';
import { FaComment } from 'react-icons/fa';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { FaHouse } from 'react-icons/fa6';
import { IoMapOutline } from 'react-icons/io5';
import { IoHeartDislike } from 'react-icons/io5';
import { IoHeartCircleSharp } from 'react-icons/io5';
import { FiMoreHorizontal } from 'react-icons/fi';

import images from '~/assets/images';
import CarouselCustomNavigation from '~/components/Carousel';
import * as postServices from '~/services/postServices';
import PostTimeStamp from '~/components/Time/PostTimeStamp';
import { Avatar, Button, Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
import TwitterChatboxTextarea from './TwitterChatboxTextarea';
import AlertCustom from '~/components/Alert/AlertCustom';
import { DialogCustomAnimation } from '~/components/Dialog';
import DeleteComment from './components/DeleteComment';
import CardPlacehoderSkeleton from '~/components/Skeleton/CardPlacehoderSkeleton';
import useCheckChuTroRole from '~/hooks/useCheckChuTroRole';
import DialogDefault from '~/components/Dialog/DialogDefault';
import Consultant from '~/components/Post/components/Consultant';

const CommentElement = ({ idBL, username, avt, lastName, firstName, noiDung, thoiGianBL, onLoading }) => {
    const { user } = useSelector((state) => state.users);
    const [isHovered, setIsHovered] = useState(false);

    const handleHidden = () => {
        onLoading();
    };

    return (
        <div className="flex gap-2" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <>
                <Avatar src={avt || images.noAVTMale} className="w-8 h-8" withBorder={true}></Avatar>
                <div className=" rounded-lg bg-blue-gray-50 mb-2 p-2">
                    <h4 className="font-bold">{`${
                        firstName === null || lastName === null ? 'NO_NAME' : firstName.concat(' ').concat(lastName)
                    }`}</h4>
                    <p>{noiDung}</p>
                    <PostTimeStamp published_at={thoiGianBL}></PostTimeStamp>
                </div>
                {isHovered && (
                    <div className="relative flex justify-center items-center">
                        <Menu className="absolute">
                            <MenuHandler>
                                <div className="flex justify-center items-center  min-w-10">
                                    <FiMoreHorizontal className="w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-400"></FiMoreHorizontal>
                                </div>
                            </MenuHandler>
                            <MenuList>
                                {user !== null && user.user.username === username ? (
                                    <>
                                        <MenuItem>Cập nhật</MenuItem>

                                        <DialogCustomAnimation
                                            title="Xóa bình luận"
                                            button={<MenuItem>Xóa</MenuItem>}
                                            type="button"
                                        >
                                            <DeleteComment idBL={idBL} onHidden={handleHidden}></DeleteComment>
                                        </DialogCustomAnimation>
                                    </>
                                ) : (
                                    <>
                                        <MenuItem>Ẩn</MenuItem>
                                        <MenuItem>Báo cáo</MenuItem>
                                    </>
                                )}
                            </MenuList>
                        </Menu>
                    </div>
                )}
            </>
        </div>
    );
};

function Comment() {
    const { idBaiViet } = useParams();
    const idBaiVietFormat = idBaiViet.substring(1);
    const [showChuTroDialog, setShowChuTroDialog] = useState(false);

    const { user } = useSelector((state) => state.users);
    const isChuTro = useCheckChuTroRole(user);
    const [post, setPost] = useState({
        baiViet: null,
        comments: [],
    });

    const [loading, setLoading] = useState(false);
    const [expand, setExpand] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState(null);
    const [type, setType] = useState('success');
    const [liked, setLiked] = useState(false);
    const [likedPosts, setLikedPosts] = useState([]);

    useEffect(() => {
        const fetchLikedPost = async () => {
            const response = await postServices.getAllLikedPosts();
            if (response) {
                setLikedPosts((prev) => [...response.data]);
            }
        };
        if (user) {
            fetchLikedPost();
        }
    }, [user]);

    useEffect(() => {
        if (likedPosts.length > 0) {
            const isLiked = likedPosts.some((post) => post.idBaiViet == idBaiVietFormat);
            console.log('LIKED BAIVIET ', isLiked);
            setLiked(isLiked);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [likedPosts]);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await postServices.getBaiVietByIdBaiViet(idBaiVietFormat);
            if (response) {
                setPost((prev) => ({ ...prev, ...response.data }));
            }
        };
        fetchPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, liked]);

    const toggleExpand = () => {
        setExpand(!expand);
    };

    const toggleLike = () => {
        const fetchLikePost = async () => {
            let response;
            if (liked) {
                response = await postServices.unLikePost(parseInt(idBaiVietFormat));
                console.log('response unlike Post ', response);
            } else {
                response = await postServices.likePost(parseInt(idBaiVietFormat));
                console.log('response like Post ', response);
            }
            if (response) {
                setLiked(!liked);
            }
        };

        fetchLikePost();
    };

    const handleLoad = ({ status = '', message = '' }) => {
        console.log('STATUS_COMMENT ', message);
        setShowAlert(!showAlert);
        setType(status);
        setMessage(message);
        setLoading(!loading);
    };

    const handleClose = () => {
        setShowAlert(!showAlert);
        setType(null);
        setMessage(null);
    };

    const handleLoading = () => {
        setLoading(!loading);
    };
    const handleOnChuTroDiaglog = () => {
        setShowChuTroDialog(!showChuTroDialog);
    };

    const handleAlert = (data) => {
        setShowAlert(!showAlert);
        setMessage(data.message);
        setType(data.type === 'success' ? 'ok' : 'fail');
    };
    const toggleCreateConsultan = () => {
        setShowChuTroDialog(!showChuTroDialog);
    };

    return (
        <>
            {showAlert && (
                <AlertCustom
                    message={message}
                    type={type === 'ok' ? 'success' : 'failed'}
                    onClose={handleClose}
                ></AlertCustom>
            )}
            {showChuTroDialog && (
                <DialogDefault type="login" onClose={handleOnChuTroDiaglog}>
                    Bạn phải là KHÁCH THUÊ để được thực hiện tư vấn
                </DialogDefault>
            )}
            <div className="bg-white w-full h-full md:fixed">
                {post.baiViet !== null ? (
                    <div className="grid md:grid-cols-4 sm:grid-flow-row gap-4 h-full">
                        <div className="grid md:col-span-3">
                            <div className="sm:px-2 md:px-40 bg-black w-full h-[660px]">
                                <CarouselCustomNavigation fileSet={post.baiViet.fileSet} />
                            </div>
                        </div>
                        <div className="h-[660px]">
                            <div className="overflow-auto p-2 h-[580px]">
                                <div className="flex items-center mb-4">
                                    <Link to={`/:${post.baiViet.user.username}`}>
                                        <img
                                            src={post.baiViet.user.avt || images.noAVTMale}
                                            alt={post.baiViet.user.lastName}
                                            className="w-10 h-10 rounded-full mr-2"
                                        />
                                    </Link>
                                    <div className="">
                                        <p className="flex justify-start font-bold">
                                            {post.baiViet.user.firstName && post.baiViet.user.lastName
                                                ? `${post.baiViet.user.firstName} ${post.baiViet.user.lastName}`
                                                : post.baiViet.user.username}
                                        </p>
                                        <PostTimeStamp published_at={post.baiViet.published_at} />
                                    </div>
                                    <div className="ml-auto">
                                        <button>
                                            <MdOutlineMoreHoriz className="w-5 h-5 ml-auto" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-start mb-2 text-justify">
                                    {expand ? (
                                        <div>
                                            {post.baiViet.description}
                                            <button onClick={toggleExpand} className="font-bold">
                                                Thu gọn
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            {post.baiViet.description.length > 100
                                                ? `${post.baiViet.description.slice(0, 100)} ...`
                                                : post.baiViet.description}
                                            {post.baiViet.description.length > 100 ? (
                                                <button className="font-bold" onClick={toggleExpand}>
                                                    Xem thêm
                                                </button>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    )}
                                </div>
                                {/* Phần 2: Thông tin về phòng cần giới thiệu */}
                                <div className="text-[10px] grid grid-cols-2 space-x-2 mb-2">
                                    <div className="flex-col space-y-2">
                                        <div className="flex items-center border-2 rounded-md bg-gray-100  p-1">
                                            <FaHouse />
                                            <span className="ml-2">{post.baiViet.phong.tenNhaTro}</span>
                                        </div>
                                        <div className="flex  items-center border-2 rounded-md bg-gray-100 p-1">
                                            <FaHouse />
                                            <span className="ml-2">
                                                Loại phòng: {post.baiViet.phongSet[0].loaiPhong.tenLoai}
                                            </span>
                                        </div>
                                        <div className="flex items-center border-2 rounded-md bg-gray-100 p-1">
                                            <FaHouse />
                                            <span className="ml-2">SĐT: {post.baiViet.user.numberPhone || ''}</span>
                                        </div>
                                    </div>
                                    <div className="flex-col space-y-2">
                                        <div className="flex  items-center border-2 rounded-md bg-gray-100 p-1">
                                            <FaHouse />
                                            <span className="ml-2">
                                                Lầu:{' '}
                                                {post.baiViet.phong.sttLau === 0 ? 'Trệt' : post.baiViet.phong.sttLau}
                                            </span>
                                        </div>
                                        <div className="flex items-center border-2 rounded-md bg-gray-100 p-1">
                                            <FaHouse />
                                            <span className="ml-2">Số Phòng: {post.baiViet.phong.sttPhong}</span>
                                        </div>
                                        <div className="flex items-center border-2 rounded-md bg-gray-100 p-1">
                                            <FaHouse />
                                            <span className="ml-2">Giá phòng: {post.baiViet.phong.giaPhong}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className=" text-[10px] flex items-center justify-center border-2 rounded-md bg-gray-100  p-1 mb-1">
                                    <IoMapOutline />
                                    <span className="ml-2">{`${post.baiViet.phong.tenDuong}, ${post.baiViet.phong.tenXa}, ${post.baiViet.phong.tenHuyen}, ${post.baiViet.phong.tenTinh}`}</span>
                                </div>
                                <hr className="bg-gray-600 h-[2px] mt-2"></hr>
                                {/**Yeu thích */}
                                <div className="flex items-center mb-2 mt-2">
                                    <button className="flex items-center text-gray-700 mr-4 ">
                                        {liked ? (
                                            <IoHeartCircleSharp color="red" className={`w-6 h-6 rounded-full`} />
                                        ) : (
                                            <IoHeartCircleSharp className={`w-6 h-6 rounded-full`} />
                                        )}
                                        <span className="ml-2">{post.baiViet.countLikes}</span>
                                    </button>
                                    <button className="flex ml-auto items-center text-gray-700 ">
                                        <FaComment className="w-5 h-5 rounded-full" />
                                        <span className="ml-2">{post.baiViet.countComments}</span>
                                    </button>
                                </div>
                                <hr className="bg-gray-600 h-[2px] mt-2"></hr>
                                <div className="flex items-center justify-evenly text-sm gap-2 mt-4">
                                    <button
                                        disabled={user === null}
                                        className={`flex justify-center  w-1/4  items-center text-gray-700  ${
                                            user === null
                                                ? ''
                                                : 'hover:border-blue-gray-50 hover:rounded-md hover:bg-blue-gray-50 hover:scale-110 cursor-pointer'
                                        } `}
                                        onClick={toggleLike}
                                    >
                                        {liked ? (
                                            <>
                                                <IoHeartDislike className="w-5 h-5" />
                                                <span className="ml-2">Hủy</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaHeart className="w-5 h-5" />
                                                <span className="ml-2">Yêu thích</span>
                                            </>
                                        )}
                                    </button>
                                    <div className="flex justify-center  w-1/4 items-center text-gray-700   hover:border-blue-gray-50 hover:rounded-md hover:bg-blue-gray-50 hover:scale-110 cursor-pointer">
                                        <div className="flex items-center justify-center">
                                            <FaComment className="w-5 h-5" />
                                            <span className="ml-2">Bình luận</span>
                                        </div>
                                    </div>
                                    <div className="  flex justify-center  w-1/4 items-center text-white bg-green-600 rounded-md   hover:border-blue-900 hover:rounded-md hover:scale-110  cursor-pointer">
                                        {!isChuTro ? (
                                            <DialogCustomAnimation title="Tư vấn" button={<p>Tư vấn</p>} type="button">
                                                <Consultant post={post.baiViet} onDone={handleAlert}></Consultant>
                                            </DialogCustomAnimation>
                                        ) : (
                                            <div onClick={toggleCreateConsultan}>Tư vấn</div>
                                        )}
                                    </div>
                                </div>
                                <hr className="bg-gray-600 h-[2px] mt-2"></hr>
                                <div className="flex justify-between mt-2">
                                    <p>Bình luận</p>
                                    <Button variant="text" color="red">
                                        Ẩn
                                    </Button>
                                </div>
                                {/**Khung chứa bình luận luận */}
                                <div className="flex flex-col gap-1 h-[175px]">
                                    {post.comments.length > 0 ? (
                                        post.comments.map(({ user, idBL, noiDung, thoiGianBL }, index) => (
                                            <CommentElement
                                                key={index}
                                                avt={user.avt}
                                                firstName={user.firstName}
                                                lastName={user.lastName}
                                                thoiGianBL={thoiGianBL}
                                                noiDung={noiDung}
                                                username={user.username}
                                                idBL={idBL}
                                                onLoading={handleLoading}
                                            ></CommentElement>
                                        ))
                                    ) : (
                                        <p>Không thấy bình luận phù hợp</p>
                                    )}
                                </div>
                            </div>
                            {/**Phần bình luận */}
                            <div className="h-[80px] w-[95%]">
                                <TwitterChatboxTextarea
                                    idBaiViet={post.baiViet.idBaiViet}
                                    handleLoad={handleLoad}
                                ></TwitterChatboxTextarea>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-full w-full ">
                        <CardPlacehoderSkeleton></CardPlacehoderSkeleton>
                    </div>
                )}
            </div>
        </>
    );
}

export default Comment;
