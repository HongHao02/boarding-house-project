import React from 'react';
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Card,
    IconButton,
    Input,
    Image,
    Collapse
} from '@material-tailwind/react';
import {
    CubeTransparentIcon,
    UserCircleIcon,
    CodeBracketSquareIcon,
    Square3Stack3DIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    RocketLaunchIcon,
    Bars2Icon,
} from '@heroicons/react/24/solid';
import { GoVideo } from 'react-icons/go';
import { IoBookmarkOutline } from 'react-icons/io5';
import { HiBellAlert } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import LoginForm from '../../../components/LoginForm';
import NotifyMenu from '../../../components/NotifyMenu';
import images from '~/assets/images';
import config from '~/config';
import * as request from '~/utils/httpRequest'
import { loginUserSuccess } from '~/features/user/userSlice';
// profile menu component
const profileMenuItems = [
    {
        label: 'My Profile',
        icon: UserCircleIcon,
    },
    {
        label: 'Edit Profile',
        icon: Cog6ToothIcon,
    },
    {
        label: 'Inbox',
        icon: InboxArrowDownIcon,
    },
    {
        label: 'Help',
        icon: LifebuoyIcon,
    },
    {
        label: 'Sign Out',
        icon: PowerIcon,
    },
];

function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);
    const dispatch = useDispatch();
    const users = useSelector((state)=> state.users);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <div className="hidden items-center gap-x-2 lg:flex  lg:justify-end lg:grow lg:ml-5">
                <div className="relative flex w-full gap-2 md:w-max">
                    <Input
                        type="search"
                        placeholder="Search"
                        containerProps={{
                            className: 'min-w-[288px]',
                        }}
                        className=" !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
                        labelProps={{
                            className: 'before:content-none after:content-none',
                        }}
                    />
                    <div className="!absolute left-3 top-[13px]">
                        <svg width="13" height="14" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                                fill="#CFD8DC"
                            />
                            <path
                                d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                                stroke="#CFD8DC"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
                <Button size="md" className="rounded-lg ">
                    Search
                </Button>
            </div>
            <div className="flex justify-end flex-grow-0 ">
                <NotifyMenu NotifyIcon={<HiBellAlert className="w-6 h-6" />} />
                <NotifyMenu NotifyIcon={<HiBellAlert className="w-6 h-6" />} />
                <NotifyMenu NotifyIcon={<HiBellAlert className="w-6 h-6" />} />
            </div>
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="tania andrew"
                        className="border border-gray-900 p-0.5"
                        src={users.user ? users.user.user.avt : images.noAVTMale}
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                    />
                </Button>
            </MenuHandler>

            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={closeMenu}
                            className={`flex items-center gap-2 rounded ${
                                isLastItem ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10' : ''
                            }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? 'red' : 'inherit'}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

// nav list menu
const navListMenuItems = [
    {
        title: '@material-tailwind/html',
        description: 'Learn how to use @material-tailwind/html, packed with rich components and widgets.',
    },
    {
        title: '@material-tailwind/react',
        description: 'Learn how to use @material-tailwind/react, packed with rich components for React.',
    },
    {
        title: 'Material Tailwind PRO',
        description: 'A complete set of UI Elements for building faster websites in less time.',
    },
];

function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const renderItems = navListMenuItems.map(({ title, description }) => (
        <Link to={'/'} key={title}>
            <MenuItem>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                    {title}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                    {description}
                </Typography>
            </MenuItem>
        </Link>
    ));

    return (
        <React.Fragment>
            <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
                <MenuHandler>
                    <Link to={config.routes.home}>
                        <Typography   variant="small" className="font-normal">
                            <MenuItem className="hidden items-center gap-2 font-medium text-blue-gray-900 lg:flex lg:rounded-full">
                                <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" /> Pages{' '}
                                <ChevronDownIcon
                                    strokeWidth={2}
                                    className={`h-3 w-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                                />
                            </MenuItem>
                        </Typography>
                    </Link>
                </MenuHandler>
                <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
                    <Card
                        color="blue"
                        shadow={false}
                        variant="gradient"
                        className="col-span-3 grid h-full w-full place-items-center rounded-md"
                    >
                        <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
                    </Card>
                    <ul className="col-span-4 flex w-full flex-col gap-1">{renderItems}</ul>
                </MenuList>
            </Menu>
            <MenuItem className="flex items-center gap-2 font-medium text-blue-gray-900 lg:hidden">
                <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" /> Pages{' '}
            </MenuItem>
            <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">{renderItems}</ul>
        </React.Fragment>
    );
}

// nav list component
const navListItems = [
    {
        label: 'Reservation',
        icon: IoBookmarkOutline,
        path: config.routes.reservation,
    },
    {
        label: 'Blocks',
        icon: CubeTransparentIcon,
    },
    {
        label: 'Docs',
        icon: CodeBracketSquareIcon,
    },
];

function NavList() {
    return (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            <NavListMenu />
            {navListItems.map(({ label, icon, path }, key) => (
                <Link to={path} key={label}>
                    <Typography
                        variant="small"
                        color="gray"
                        className="font-medium text-blue-gray-500"
                    >
                        <MenuItem className="flex items-center gap-2 lg:rounded-full">
                            {React.createElement(icon, { className: 'h-[18px] w-[18px]' })}{' '}
                            <span className="text-gray-900"> {label}</span>
                        </MenuItem>
                    </Typography>
                </Link>
            ))}
        </ul>
    );
}

function Header() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener('resize', () => window.innerWidth >= 960 && setIsNavOpen(false));
    }, []);

    const dispatch = useDispatch();
    const users = useSelector((state)=> state.users);
    console.log(users)

    useEffect(()=>{
        const storageUser = JSON.parse(localStorage.getItem("user"));
        if(storageUser != null){
            request.updateToken(storageUser.token);
            dispatch(loginUserSuccess(storageUser))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Navbar fullWidth className="fixed top-0 w-full p-2 sm:mx-auto md:mx-0  lg:pl-6 ">
            <div className="relative mx-auto my-auto flex items-center justify-between text-blue-gray-900 ">
                <Link to={config.routes.home}>
                    <Typography
                        // as="a"
                        color="purple"
                        // href="#"
                        className="mr-4 ml-2 cursor-pointer py-1.5 font-medium font-bold"
                    >
                        {/* <img className="relative max-w-16 mx-auto flex items-center justify-between text-blue-gray-900" src={images.logo} alt="logo"/> */}
                        BOARDING HOUSE
                    </Typography>
                </Link>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <IconButton
                    size="sm"
                    color="blue-gray"
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-auto mr-2 lg:hidden z-[999]"
                >
                    <Bars2Icon className="h-6 w-6" />
                </IconButton>
                <LoginForm />
                <ProfileMenu />
            </div>
            <Collapse open={isNavOpen} className="overflow-scroll">
                <NavList />
                <div className="flex flex-col gap-x-2 sm:flex-row sm:items-center">
                    <div className="relative w-full gap-2 md:w-max">
                        <Input
                            type="search"
                            placeholder="Search"
                            containerProps={{
                                className: 'min-w-[288px]',
                            }}
                            className=" !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
                            labelProps={{
                                className: 'before:content-none after:content-none',
                            }}
                        />
                        <div className="!absolute left-3 top-[13px]">
                            <svg
                                width="13"
                                height="14"
                                viewBox="0 0 14 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                                    fill="#CFD8DC"
                                />
                                <path
                                    d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                                    stroke="#CFD8DC"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                    <Button size="md" className="mt-1 rounded-lg sm:mt-0">
                        Search
                    </Button>
                </div>
            </Collapse>
        </Navbar>
    );
}

export default Header;
