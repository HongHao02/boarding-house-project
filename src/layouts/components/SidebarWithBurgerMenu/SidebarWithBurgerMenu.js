<<<<<<< HEAD
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
=======
import React from "react";
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
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import Sidebar from "../SideBar/Sidebar";
 
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
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          {/* <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="blue-gray">
              Sidebar
            </Typography>
          </div>
          <div className="p-2">
            <Input
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
            />
          </div>
          <List>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Dashboard
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Analytics
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Reporting
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Projects
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <ShoppingBagIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    E-Commerce
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Orders
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Products
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <hr className="my-2 border-blue-gray-50" />
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List> */}
          <Sidebar/>
          <Alert
            open={openAlert}
            className="mt-auto"
            onClose={() => setOpenAlert(false)}
          >
            <CubeTransparentIcon className="mb-4 h-12 w-12" />
            <Typography variant="h6" className="mb-1">
              Upgrade to PRO
            </Typography>
            <Typography variant="small" className="font-normal opacity-80">
              Upgrade to Material Tailwind PRO and get even more components,
              plugins, advanced features and premium.
            </Typography>
            <div className="mt-4 flex gap-3">
              <Typography
                // as="a"
                // href="#"
                variant="small"
                className="font-medium opacity-80"
                onClick={() => setOpenAlert(false)}
              >
                Dismiss
              </Typography>
              <Typography
                // as="a"
                // href="#"
                variant="small"
                className="font-medium"
              >
                Upgrade Now
              </Typography>
            </div>
          </Alert>
        </Card>
      </Drawer>
    </>
  );
}
>>>>>>> master
