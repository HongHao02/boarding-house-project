import { useState } from 'react';
import { Drawer } from '@material-tailwind/react';

import { Sidebar, SidebarWithBurgerMenu } from '../components';
import Home from '../../pages/Home';
import RightSidebar from '~/layouts/components/RightSidebar';
import { Header, Footer } from '../components';

function DefaultLayout2({ children }) {
    return (
        <div className="">
            <div className="relative mb-8 h-full w-full bg-white">
                <div className="sticky top-0 z-[10000] flex-col w-full items-center">
                    <Header />
                    <div className="sticky flex items-center border-t border-blue-gray-50 bg-white pb-2  lg:hidden backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80">
                        {/* <button type="button" class="text-blue-gray-900" >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7"></path>
                            </svg>
                        </button> */}

                        <SidebarWithBurgerMenu />

                        <ol className="ml-4 flex min-w-0 whitespace-nowrap text-sm leading-6 text-blue-gray-700">
                            <li className="flex items-center capitalize">
                                Boarding house
                                <svg width="3" height="6" className="mx-3 overflow-visible text-blue-gray-300">
                                    <path
                                        d="M0 0L3 3L0 6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    ></path>
                                </svg>
                            </li>
                            <li className="flex items-center capitalize">Sidebar</li>
                        </ol>
                    </div>
                </div>

                <div className="py-2 mx-auto">
                    <div className=" mx-0 flex">
                        <Sidebar />
                        <div className=" w-full lg:w-[60%] lg:px-6">{children}</div>
                        <aside className="sticky top-16 ml-auto hidden h-screen w-64 pb-4 lg:block ">
                            <div className="h-screen w-64 overflow-y-scroll pb-40">
                                <h2>Right sidebar</h2>
                                <ul>
                                    <li>Content 1</li>
                                    <li>Content 2</li>
                                    <li>Content 3</li>
                                    <li>Content 4</li>
                                    <li>Content 5</li>
                                    <li>Content 6</li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default DefaultLayout2;
