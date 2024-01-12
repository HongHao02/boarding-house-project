import { useState, useEffect } from 'react';
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

import images from '~/assets/images';
import config from '~/config';

const menuSidebar = [
    { lable: 'Video', icon: <IoLogoYoutube className="w-5 h-5" />, path: config.routes.video },
    { lable: 'Manage', icon: <MdManageAccounts className="w-5 h-5" />, path: config.routes.manage },
    { lable: 'Memory', icon: <FaMemory className="w-5 h-5" />, path: config.routes.memory },
    { lable: 'Post', icon: <IoCreateSharp className="w-5 h-5" />, path: config.routes.post },
    { lable: 'Search', icon: <IoMdSearch className="w-5 h-5" />, path: config.routes.search },
    { lable: 'Reservation', icon: <GoBookmark className="w-5 h-5" />, path: config.routes.reservation },
    { lable: 'Video', icon: <IoLogoYoutube className="w-5 h-5" />, path: config.routes.video },
    { lable: 'Manage', icon: <MdManageAccounts className="w-5 h-5" />, path: config.routes.manage },
];

function Sidebar() {
    const [open, setOpen] = useState(true);
    const [showToggle, setShowToggle] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 560) {
                setShowToggle(true);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        // <aside className="fixed  top-0 z-[999] h-screen w-80 overflow-y-auto overflow-x-hidden pb-4 pr-4 transition-all duration-300 lg:sticky lg:left-0 lg:top-16 lg:z-10 lg:w-56 -left-96">
        //     <div className="fixed left-0 top-0 h-screen w-screen bg-gray-900/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden pointer-events-none opacity-0"></div>
        //     <div className="fixed top-0 z-[9999] h-screen w-80 overflow-y-auto overflow-x-hidden !bg-white pb-6 pl-6 lg:relative lg:w-56 lg:bg-transparent lg:pl-0 lg:pt-0">

        //     </div>
        // </aside>
        <aside
            className={` ${
                open ? 'w-72' : 'w-24'
            }  hidden fixed top-14 z-[999]  max-h-screen pb-8 pr-4 transition-all duration-300 lg:block lg:sticky overflow-y-hidden hover:overflow-y-scroll hover: duration-300 overflow-x-hidden`}
        >
            <IoChevronBackCircle
                className={`${
                    !open && 'rotate-180'
                } hidden lg:block absolute cursor-pointer right-0 top-4 w-7 h-7 z-[99999]`}
                onClick={() => setOpen(!open)}
            />
            <div className="fixed left-0 top-0 h-screen w-screen bg-gray-900/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden pointer-events-none opacity-0">
                {/* <div className="inline-flex ">
                    <AiOutlineMenuUnfold className="w-5 h-5" onClick={() => setShowToggle(!showToggle)} />
                </div> */}
            </div>

            <div
                className={` fixed top-0 z-[999] h-screen w-80  !bg-white pb-6 pl-6 lg:relative  lg:bg-transparent lg:pl-0 lg:pt-0`}
            >
                {/* <HiMenu className="sm:block lg:hidden w-5 h-5 " onClick={() => setShowNav(!showNav)} /> */}
                {/* className={`${
                    open ? 'w-72' : 'w-24'
                } w-24 lg:w-72 fixed top-0 z-[9999] h-screen bg-white p-4 xl:mt-[2px]  overflow-y-auto  duration-500 border-1 rounded-md origin-right`} */}
                <div
                    className={` bg-white  xl:mt-[2px]  overflow-y-auto  duration-500 border-1 rounded-md origin-right`}
                >
                    {/* <IoChevronBackCircle
                        className={`${
                            !open && 'rotate-180'
                        } hidden lg:block absolute cursor-pointer right-0 top-11 w-7 h-7 `}
                        onClick={() => setOpen(!open)}
                    /> */}
                    <Link to={config.routes.profile}>
                        <div className="flex items-center px-5 gap-x-4 h-30">
                            <Avatar
                                variant="rounded"
                                size="sm"
                                alt="nhiệt ba"
                                src={images.NhietBa}
                                withBorder={true}
                                className={`${
                                    open && 'rotate-[360deg]'
                                } w-auto rounded-full cursor-pointer duration-500`}
                            />

                            <div
                                className={` origin-left font-bold text-md flex-col duration-500 ${!open && 'scale-0'}`}
                            >
                                <h1>Hong Hao</h1>
                                <span className="text-[10px] text-light-green-600">honghaocp@gmail.com</span>
                            </div>
                        </div>
                    </Link>
                    <ul className="mt-4 border-y-2">
                        {menuSidebar.map((item, index) => (
                            <Tooltip
                                content={item.lable}
                                placement="right-start"
                                className={`${open && 'hidden'} -mr-10`}
                                key={index}
                            >
                                <Link to={item.path}>
                                    <li
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
            </div>
        </aside>
    );
}

export default Sidebar;
