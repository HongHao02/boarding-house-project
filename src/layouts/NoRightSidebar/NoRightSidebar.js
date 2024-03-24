import { Header } from '../components';
import { Sidebar } from '~/layouts/components';

function NoRightSidebar({ children }) {
    return (
        <div className="flex-col">
            <Header />
            <div className="flex mt-16">
                <Sidebar></Sidebar>
                <div className="flex flex-grow min-h-screen lg:mt-6 lg:ml-[300px]">{children}</div>
            </div>
        </div>
    );
}

export default NoRightSidebar;
