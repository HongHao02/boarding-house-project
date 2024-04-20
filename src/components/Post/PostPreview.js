import { FaHeart } from 'react-icons/fa';
import { FaComment } from 'react-icons/fa';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { FaHouse } from 'react-icons/fa6';
import { IoMapOutline } from 'react-icons/io5';
import {  useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoHeartCircleSharp } from 'react-icons/io5';
import { IoHeartDislike } from 'react-icons/io5';

import PostTimeStamp from '../Time/PostTimeStamp';
import images from '~/assets/images';

function PostPreview({ post, ...passProps }) {
    const [postData, setPostData] = useState({ ...post });
    console.log("postdata Preview ", postData);
    const users = useSelector((state) => state.users);
    const [expand, setExpand] = useState(false);
    const [active, setActive] = useState(images.NhietBa);
    const [liked, setLiked] = useState(true);

    useEffect(() => {
        setPostData((prev) => ({ ...prev, ...post }));
        if(post?.files.length > 0){
            setActive(URL.createObjectURL(post.files[0]))
        }
    }, [post]);

    //
    const toggleLike = () => {
        setLiked(!liked);
    };
    const fallback =
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80';
    const toggleExpand = () => {
        setExpand(!expand);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-[80%] mx-auto h-[600px] overflow-auto">
            {/* Phần 1: Ảnh và thông tin người đăng */}
            {postData && users.user ? (
                <>
                    <div className="flex items-center mb-4">
                        <img
                            src={users.user.user.avt || fallback}
                            alt={users.user.user.lastName}
                            className="w-10 h-10 rounded-full mr-2"
                        />
                        <div className="">
                            <p className="flex justify-start font-bold">
                                {users.user.user.firstName && users.user.user.lastName
                                    ? `${users.user.user.firstName} ${users.user.user.lastName}`
                                    : users.user.user.username}
                            </p>
                            <PostTimeStamp published_at={'2024-03-08T23:46:29.803'} />
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
                                {postData.description}
                                <button onClick={toggleExpand} className="font-bold">
                                    Thu gọn
                                </button>
                            </div>
                        ) : (
                            <div>
                                {postData.description.length > 100
                                    ? `${postData.description.slice(0, 100)} ...`
                                    : postData.description}
                                {postData.description.length > 100 ? (
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
                                <span className="ml-2">{postData.tenNhaTro}</span>
                            </div>
                            <div className="flex  items-center border-2 rounded-md bg-gray-100 p-1">
                                <FaHouse />
                                <span className="ml-2">Loại phòng: {postData.loaiPhong}</span>
                            </div>
                            <div className="flex items-center border-2 rounded-md bg-gray-100 p-1">
                                <FaHouse />
                                <span className="ml-2">SĐT: {users.user.user.numberPhone || ''}</span>
                            </div>
                        </div>
                        <div className="flex-col space-y-2">
                            <div className="flex  items-center border-2 rounded-md bg-gray-100 p-1">
                                <FaHouse />
                                <span className="ml-2">Lầu: {postData.sttLau === 0 ? 'Trệt' : postData.sttLau}</span>
                            </div>
                            <div className="flex items-center border-2 rounded-md bg-gray-100 p-1">
                                <FaHouse />
                                <span className="ml-2">Số Phòng: {postData.sttPhong}</span>
                            </div>
                            <div className="flex items-center border-2 rounded-md bg-gray-100 p-1">
                                <FaHouse />
                                <span className="ml-2">Giá phòng: {postData.giaPhong}</span>
                            </div>
                        </div>
                    </div>
                    <div className=" text-[10px] flex items-center justify-center border-2 rounded-md bg-gray-100  p-1 mb-1">
                        <IoMapOutline />
                        <span className="ml-2">{`3/2 Mậu Thân Xuân Khánh Ninh Kiều Cần Thơ`}</span>
                    </div>

                    {/* Phần 3: Ảnh bài viết */}
                    <div className="mb-2 max-h-[500px] w-full flex overflow-hidden flex-wrap justify-between">
                        <div className="h-full grid gap-4">
                            <div>
                                <img
                                    className="h-[300px] w-full max-w-full rounded-lg object-cover object-center md:h-[400px]"
                                    src={active}
                                    alt=""
                                />
                            </div>
                            <div className="grid grid-cols-5 gap-4">
                                {postData.files.map((file, index) => (
                                    <div key={index}>
                                        <img
                                            onClick={() => setActive(URL.createObjectURL(file))}
                                            src={URL.createObjectURL(file)}
                                            className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
                                            alt="gallery"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Phần 4: Nút like và bình luận */}
                    <div className="flex items-center mb-2">
                        <button className="flex items-center text-gray-700 mr-4 ">
                            {liked ? (
                                <IoHeartCircleSharp color="red" className={`w-6 h-6 rounded-full`} />
                            ) : (
                                <IoHeartCircleSharp className={`w-6 h-6 rounded-full`} />
                            )}
                            <span className="ml-2">10</span>
                        </button>
                        <button className="flex ml-auto items-center text-gray-700 ">
                            <FaComment className="w-5 h-5 rounded-full" />
                            <span className="ml-2">5</span>
                        </button>
                    </div>
                    <div className=" bg-blue-gray-100  h-[1px] mx-auto mb-2"></div>
                    <div className="flex items-center justify-evenly">
                        <div
                            className="flex justify-center  w-1/4  items-center text-gray-700   hover:border-blue-gray-50 hover:rounded-md hover:bg-blue-gray-50 hover:scale-110 cursor-pointer"
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
                        </div>
                        <div className="flex justify-center  w-1/4 items-center text-gray-700   hover:border-blue-gray-50 hover:rounded-md hover:bg-blue-gray-50 hover:scale-110 cursor-pointer">
                            <FaComment className="w-5 h-5" />
                            <span className="ml-2">Bình luận</span>
                        </div>
                        <div className="  flex justify-center  w-1/4 items-center text-white bg-green-600 rounded-md   hover:border-blue-900 hover:rounded-md hover:scale-110  cursor-pointer">
                            Tư vấn
                        </div>
                    </div>
                </>
            ) : (
                <div>Khong co noi dung</div>
            )}
        </div>
    );
}

export default PostPreview;
