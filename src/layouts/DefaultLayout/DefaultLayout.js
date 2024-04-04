import { Header } from '../components';
import { Sidebar, SidebarWithBurgerMenu } from '../components';
import RightSidebar from '~/layouts/components/RightSidebar';

function DefaultLayout({ children }) {
    return (
        <div>
            <div className="flex flex-col">
                <Header />
                <div className="flex flex-row mt-20  md:mt-14 overflow-scroll w-full">
                    <div className="lg:hidden fixed overflow-y-auto ">
                        <SidebarWithBurgerMenu />
                    </div>
                    <div className="hidden lg:block h-screen fixed overflow-y-auto ">
                        <Sidebar />
                    </div>
                    <div className="flex-grow overflow-y-auto p-x-2  sm:pl-80 lg:px-[296px]">{children}</div>
                    <div className="hidden lg:block mt-1 h-screen fixed right-0 overflow-y-auto bg-gray-100 ">
                        {/* Right Sidebar Content */}
                        <RightSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
