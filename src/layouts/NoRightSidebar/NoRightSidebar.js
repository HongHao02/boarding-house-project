import { Header } from "../components";
import {Sidebar} from '~/layouts/components'

function NoRightSidebar({ children }) {
    return (
        <div className="flex-col">
            <Header />
            <div className="flex">
                <Sidebar></Sidebar>
                <div className="flex flex-grow">{children}</div>
            </div>
        </div>
    );
}

export default NoRightSidebar;
