import React from 'react';
import {
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Alert,
    Input,
    Drawer,
    Card,
} from '@material-tailwind/react';
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from '@heroicons/react/24/solid';
import {
    ChevronRightIcon,
    ChevronDownIcon,
    CubeTransparentIcon,
    MagnifyingGlassIcon,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useState, useEffect } from 'react';
import { IoChevronBackCircle } from 'react-icons/io5';
import { FaUserAstronaut, FaMemory } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';
import { MdManageAccounts } from 'react-icons/md';
import { IoCreateSharp } from 'react-icons/io5';
import { IoMdSearch } from 'react-icons/io';
import { GoBookmark } from 'react-icons/go';
import { Tooltip } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-tailwind/react';
import { CiLogout } from 'react-icons/ci';
import { HiMenu } from 'react-icons/hi';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import Sidebar from '../SideBar/Sidebar';
import config from '~/config';
import images from '~/assets/images';
const menuSidebar = [
    { lable: 'Video', icon: <IoLogoYoutube className="w-5 h-5" />, path: config.routes.video },
    { lable: 'Manage', icon: <MdManageAccounts className="w-5 h-5" />, path: config.routes.manage },
    { lable: 'Memory', icon: <FaMemory className="w-5 h-5" />, path: config.routes.memory },
    { lable: 'Post', icon: <IoCreateSharp className="w-5 h-5" />, path: config.routes.post },
    { lable: 'Search', icon: <IoMdSearch className="w-5 h-5" />, path: config.routes.search },
    { lable: 'Reservation', icon: <GoBookmark className="w-5 h-5" />, path: config.routes.reservation },
    { lable: 'Video', icon: <IoLogoYoutube className="w-5 h-5" />, path: config.routes.video },
    { lable: 'Manage', icon: <MdManageAccounts className="w-5 h-5" />, path: config.routes.manage },
    { lable: 'Reservation', icon: <GoBookmark className="w-5 h-5" />, path: config.routes.reservation },
    { lable: 'Video', icon: <IoLogoYoutube className="w-5 h-5" />, path: config.routes.video },
    { lable: 'Manage', icon: <MdManageAccounts className="w-5 h-5" />, path: config.routes.manage },
    { lable: 'Reservation', icon: <GoBookmark className="w-5 h-5" />, path: config.routes.reservation },
    { lable: 'Video', icon: <IoLogoYoutube className="w-5 h-5" />, path: config.routes.video },
    { lable: 'Manage', icon: <MdManageAccounts className="w-5 h-5" />, path: config.routes.manage },
];

export default function SidebarWithBurgerMenu() {
    const [open, setOpen] = React.useState(0);
    const [openAlert, setOpenAlert] = React.useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    return (
        <>
            <IconButton variant="text" size="lg" onClick={openDrawer}>
                {isDrawerOpen ? <XMarkIcon className="h-8 w-8 stroke-2" /> : <Bars3Icon className="h-8 w-8 stroke-2" />}
            </IconButton>
            <Drawer open={isDrawerOpen} onClose={closeDrawer}>
                <Card color="white" shadow={false} className="h-[calc(100vh-2rem)] w-full p-4 flex-col overflow-y-auto ">
                    <div>
                        <div className="flex items-center ps-5 gap-x-4 h-30">
                            <Link to={config.routes.profile}>
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
                            </Link>

                            <div className={` origin-left font-bold text-md flex-col duration-500 `}>
                                <h1>Hong Hao</h1>
                                <span className="text-[10px] text-light-green-600">honghaocp@gmail.com</span>
                            </div>
                            <IoIosCloseCircleOutline className='w-6 h-6 px-2 flex-grow rounded-full hover:bg-red-100 hover:rounded-full' onClick={closeDrawer}/>
                        </div>

                        
                    </div>
                    <ul className="mt-4 border-y-2">
                        {menuSidebar.map((item, index) => (
                            <Link to={item.path} key={index}>
                                <li
                                    className={`flex items-center p-5 gap-x-4 text-sm hover:bg-gray-200 hover:rounded-md cursor-pointer`}
                                >
                                    {item.icon}
                                    <span className={` origin-left duration-500`}>{item.lable}</span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                    <div className="flex p-5  items-center gap-x-4 top-10 hover:bg-blue-gray-300 hover:rounded-md">
                        <CiLogout className="w-5 h-5" />
                        <span className="">Logout</span>
                    </div>
                </Card>
            </Drawer>
        </>
    );
}
