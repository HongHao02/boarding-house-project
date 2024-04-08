import { useState } from 'react';
import { IoChevronBackCircle } from 'react-icons/io5';
import { FaMemory } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';
import { MdManageAccounts } from 'react-icons/md';
import { IoCreateSharp } from 'react-icons/io5';
import { IoMdSearch } from 'react-icons/io';
import { GoBookmark } from 'react-icons/go';
import { Tooltip } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-tailwind/react';
import { CiLogout } from 'react-icons/ci';
import { useSelector } from 'react-redux';

import images from '~/assets/images';
import config from '~/config';

const menuSidebar = [
    { lable: 'Video', icon: <IoLogoYoutube className="w-5 h-5" />, path: config.routes.video },
    { lable: 'Manage', icon: <MdManageAccounts className="w-5 h-5" />, path: config.routes.manage },
    { lable: 'Memory', icon: <FaMemory className="w-5 h-5" />, path: config.routes.memory },
    { lable: 'Post', icon: <IoCreateSharp className="w-5 h-5" />, path: config.routes.post },
    { lable: 'Search', icon: <IoMdSearch className="w-5 h-5" />, path: config.routes.search },
    { lable: 'Reservation', icon: <GoBookmark className="w-5 h-5" />, path: config.routes.reservation },
];

function Sidebar({ className = '' }) {
    const [open, setOpen] = useState(true);
    // const [showNav, setShowNav] = useState(true);

    const users = useSelector((state) => state.users);
    console.log('USER SIDEBAR ', users);

    console.log("CLASSNAME ", className)
    return (
        <>
            {/* <HiMenu className="sm:block lg:hidden w-5 h-5 " onClick={() => setShowNav(!showNav)} /> */}

            <div
                className={`${className !== '' ? className : 'fixed'} ${
                    open ? 'w-72' : 'w-24'
                }  h-screen bg-white p-4 xl:mt-[2px] overflow-y-auto  duration-500 border-1 rounded-md origin-right`}
            >
                <IoChevronBackCircle
                    className={`${
                        !open && 'rotate-180'
                    } hidden lg:block absolute cursor-pointer right-0 top-11 w-7 h-7 `}
                    onClick={() => setOpen(!open)}
                />
                <Link to={users.user ? `/my-info/:${users.user.user.username}` : config.routes.home}>
                    <div className="flex items-center p-5 gap-x-4">
                        <Avatar
                            variant="rounded"
                            size="sm"
                            alt="nhiệt ba"
                            src={users.user && users.user.user.avt ? users.user.user.avt : images.noAVTMale}
                            withBorder={true}
                            className={`${open && 'rotate-[360deg]'}  rounded-full cursor-pointer duration-500`}
                        />

                        <div className={` origin-left font-bold text-md flex-col duration-500 ${!open && 'scale-0'}`}>
                            <h1>{users.user && users.user.user.firstName ? `${users.user.user.firstName} ${users.user.user.lastName}` : 'NO_NAME'}</h1>
                            <span className="text-[10px] text-light-green-600">
                                {users.user ? users.user.user.username : 'Tài khoản khách'}
                            </span>
                        </div>
                    </div>
                </Link>
                <ul className="mt-4 border-y-2">
                    {menuSidebar.map((item, index) => (
                        <Tooltip key={index} content={item.lable} placement="right" className={`${open && 'hidden'}`}>
                            <Link to={item.path}>
                                <li
                                    key={index}
                                    className={`flex items-center p-5 gap-x-4 text-sm hover:bg-gray-200 hover:rounded-md cursor-pointer`}
                                >
                                    {item.icon}
                                    <span className={`${!open && 'hidden'} origin-left duration-500`}>
                                        {item.lable}
                                    </span>
                                </li>
                            </Link>
                        </Tooltip>
                    ))}
                </ul>

                <div className="flex p-5  items-center gap-x-4 top-10 ">
                    <CiLogout className="w-5 h-5" />
                    <span className={`${!open && 'hidden'}`}>Logout</span>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
