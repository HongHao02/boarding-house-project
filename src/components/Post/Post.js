import { FaHeart } from 'react-icons/fa';
import { FaComment } from 'react-icons/fa';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { FaHouse } from 'react-icons/fa6';
import { IoMapOutline } from 'react-icons/io5';
import { forwardRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoHeartCircleSharp } from 'react-icons/io5';
import { IoHeartDislike } from 'react-icons/io5';

import PostTimeStamp from '../Time/PostTimeStamp';
import * as postServices from '../../services/postServices';
import DialogDefault from '../Dialog/DialogDefault';
import AlertCustom from '../Alert/AlertCustom';

function Post({ post, likedPosts, ...passProps }, ref) {
    // const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    // const [likedPostList, setLikedPostList] = useState([...likedPosts]);
    const [expand, setExpand] = useState(false);
    const [like, setLike] = useState(post.countLikes);
    const [showDiaglog, setShowDiaglog] = useState(false);
    const [showLoginDialog, setshowLoginDialog] = useState(false);
    //likedPost
    const [liked, setLiked] = useState(() => {
        if (likedPosts.length !== 0) {
            for (const p of likedPosts) {
                if (post.idBaiViet === p.idBaiViet) {
                    return true;
                }
            }
        }
        return false;
    });

    useEffect(() => {
        if (likedPosts.length > 0) {
            // Kiểm tra xem post có trong danh sách likedPosts hay không
            const isLiked = likedPosts.some((likedPost) => likedPost.idBaiViet === post.idBaiViet);
            setLiked(isLiked);
        }
    }, [likedPosts, post]);

    //Blur image
    const [load, setLoad] = useState(false);
    ////Alert
    const [alert, setAlert] = useState(null);
    const handleCloseAlert = () => {
        setAlert(null);
    };
    //
    const handleOnCloseDiaglog = () => {
        setshowLoginDialog(!showLoginDialog);
    };
    const fallback =
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80';
    // const blurImage =
    //     'https://images.search.yahoo.com/images/view;_ylt=AwrOtgdJS.tl1CUUpHaJzbkF;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzM1OThlOTZlOGQ0Zjc3ODI0MjNlMTg0NGUyN2JmYmFkBGdwb3MDNDkEaXQDYmluZw--?back=https%3A%2F%2Fimages.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dblur%2Bimage%26type%3DE210US885G91814%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D49&w=4500&h=3000&imgurl=www.bdsc.school.nz%2Fwp-content%2Fuploads%2F2017%2F03%2Fbackground-blur-1.jpg&rurl=http%3A%2F%2Fwww.bdsc.school.nz%2Fbackground-blur-1-2%2F&size=1328.3KB&p=blur+image&oid=3598e96e8d4f7782423e1844e27bfbad&fr2=piv-web&fr=mcafee&tt=background+blur+%281%29+%E2%80%A2+BDSC&b=0&ni=21&no=49&ts=&tab=organic&sigr=tP2kPuiaKvEz&sigb=Z95aSQHVDM7N&sigi=0D4QBMq2YRLG&sigt=WmQzVwh9D_G1&.crumb=WB8aweCmcY4&fr=mcafee&fr2=piv-web&type=E210US885G91814';
    const maxVisibleImage = 3;
    const visibleImages = post.fileSet.slice(0, maxVisibleImage); // Lấy danh sách ảnh hiển thị được
    // const hiddenImages = post.fileSet.slice(maxVisibleImage); // Lấy danh sách ảnh ẩn
    // const postRef = useRef();

    function getHeight(numImages) {
        if (numImages === 1 || numImages === 2) {
            return 'full';
        }
        return '1/2';
    }
    function getWidth(numImages) {
        if (numImages === 1) {
            return 'full';
        } else {
            return '1/2';
        }
    }
    const toggleExpand = () => {
        setExpand(!expand);
    };

    useEffect(() => {
        if (users.user) {
            setshowLoginDialog(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users.user]);

    //Set show diaglog when call API like post
    const toggleLike = async (idBaiViet) => {
        setshowLoginDialog(false);
        if (users.user) {
            setShowDiaglog(false);
            var response;
            if (liked) {
                response = await postServices.unLikePost(idBaiViet);
                console.log('response unlike Post ', response);
            } else {
                response = await postServices.likePost(idBaiViet);
                console.log('response like Post ', response);
            }
            if (response) {
                setLike(response.data);
                setLiked(!liked);
                setShowDiaglog(false);
            } else {
                setShowDiaglog(true);
            }
        } else {
            setshowLoginDialog(true);
        }
    };
    /**
     * blur image when load
     */
    const handleLoadImage = () => {
        setLoad(true);
    };

    return (
        <div ref={ref} className="bg-white shadow-md rounded-lg p-4 mb-4 w-[50%] mx-auto">
            {showDiaglog && setAlert({ type: 'error', message: 'Có lỗi! Không thể thực hiện hành động' })}
            {showLoginDialog && (
                <DialogDefault type="login" onClose={handleOnCloseDiaglog}>
                    Bạn chưa đăng nhập, vui lòng đăng nhập trước khi thích bài viết!
                </DialogDefault>
            )}
            {alert && <AlertCustom type={alert.type} message={alert.message} onClose={handleCloseAlert} />}
            {/* Phần 1: Ảnh và thông tin người đăng */}
            <div className="flex items-center mb-4">
                <img src={post.user.avt || fallback} alt={post.user.lastName} className="w-10 h-10 rounded-full mr-2" />
                <div className="">
                    <p className="flex justify-start font-bold">
                        {post.user.firstName && post.user.lastName
                            ? `${post.user.firstName} ${post.user.lastName}`
                            : post.user.username}
                    </p>
                    <PostTimeStamp published_at={post.published_at} />
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
                        {post.description}
                        <button onClick={toggleExpand} className="font-bold">
                            Thu gọn
                        </button>
                    </div>
                ) : (
                    <div>
                        {post.description.length > 100 ? `${post.description.slice(0, 100)} ...` : post.description}
                        {post.description.length > 100 ? (
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
                        <span className="ml-2">{post.phong.tenNhaTro}</span>
                    </div>
                    <div className="flex  items-center border-2 rounded-md bg-gray-100 p-1">
                        <FaHouse />
                        <span className="ml-2">Loại phòng: {post.phongSet[0].loaiPhong.tenLoai}</span>
                    </div>
                    <div className="flex items-center border-2 rounded-md bg-gray-100 p-1">
                        <FaHouse />
                        <span className="ml-2">SĐT: {post.user.numberPhone || ''}</span>
                    </div>
                </div>
                <div className="flex-col space-y-2">
                    <div className="flex  items-center border-2 rounded-md bg-gray-100 p-1">
                        <FaHouse />
                        <span className="ml-2">Lầu: {post.phong.sttLau === 0 ? 'Trệt' : post.phong.sttLau}</span>
                    </div>
                    <div className="flex items-center border-2 rounded-md bg-gray-100 p-1">
                        <FaHouse />
                        <span className="ml-2">Số Phòng: {post.phong.sttPhong}</span>
                    </div>
                    <div className="flex items-center border-2 rounded-md bg-gray-100 p-1">
                        <FaHouse />
                        <span className="ml-2">Giá phòng: {post.phong.giaPhong}</span>
                    </div>
                </div>
            </div>
            <div className=" text-[10px] flex items-center justify-center border-2 rounded-md bg-gray-100  p-1 mb-1">
                <IoMapOutline />
                <span className="ml-2">{`${post.phong.tenDuong}, ${post.phong.tenXa}, ${post.phong.tenHuyen}, ${post.phong.tenTinh}`}</span>
            </div>

            {/* Phần 3: Ảnh bài viết */}
            <div className="mb-2 max-h-[500px] w-full flex overflow-hidden flex-wrap justify-between">
                {/* {visibleImages.map((image, index) => (
                    <img key={index} src={image.url} alt={`Ảnh ${index}`} className="w-auto" />
                ))}
                {hiddenImages.length > 0 && (
                    <div className="w-auto m-1 flex justify-center items-center bg-gray-200">{hiddenImages.length}</div>
                )} */}
                {visibleImages.map((image, index) => (
                    <div
                        key={index}
                        className={`flex-grow w-${getWidth(visibleImages.length)} h-${getHeight(
                            visibleImages.length,
                        )} p-1`}
                    >
                        <img
                            src={image.url}
                            alt={`Ảnh ${index}`}
                            onLoad={handleLoadImage}
                            className={`w-full h-full object-cover transition-opacity duration-300 ${
                                load ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                    </div>
                ))}
                {post.fileSet.length > 4 && (
                    <div className="flex-grow w-1/2  p-1 bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-600">+{post.fileSet.length - 3} ảnh</p>
                    </div>
                )}
            </div>

            {/* Phần 4: Nút like và bình luận */}
            <div className="flex items-center mb-2">
                <button className="flex items-center text-gray-700 mr-4 ">
                    {liked ? (
                        <IoHeartCircleSharp color="red" className={`w-6 h-6 rounded-full`} />
                    ) : (
                        <IoHeartCircleSharp className={`w-6 h-6 rounded-full`} />
                    )}
                    <span className="ml-2">{like}</span>
                </button>
                <button className="flex ml-auto items-center text-gray-700 ">
                    <FaComment className="w-5 h-5 rounded-full" />
                    <span className="ml-2">{post.countComments}</span>
                </button>
            </div>
            <div className=" bg-blue-gray-100  h-[1px] mx-auto mb-2"></div>
            <div className="flex items-center justify-evenly">
                <div
                    className="flex justify-center  w-1/4  items-center text-gray-700   hover:border-blue-gray-50 hover:rounded-md hover:bg-blue-gray-50 hover:scale-110 cursor-pointer"
                    onClick={() => toggleLike(post.idBaiViet)}
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
                </div>
                <div className="flex justify-center  w-1/4 items-center text-gray-700   hover:border-blue-gray-50 hover:rounded-md hover:bg-blue-gray-50 hover:scale-110 cursor-pointer">
                    <FaComment className="w-5 h-5" />
                    <span className="ml-2">Bình luận</span>
                </div>
                <div className="  flex justify-center  w-1/4 items-center text-white bg-green-600 rounded-md   hover:border-blue-900 hover:rounded-md hover:scale-110  cursor-pointer">
                    Tư vấn
                </div>
            </div>
        </div>
    );
}

export default forwardRef(Post);
