import config from '~/config';
import { HeaderOnly, NoRightSidebar } from '~/layouts';
import Home from '~/pages/Home';
import Post from '~/pages/Post';
import CreatePost from '~/pages/CreatePost';
import Event from '~/pages/Event';
import Manage from '~/pages/Manage';
import Memory from '~/pages/Memory';
import Profile from '~/pages/Profile';
import Reservation from '~/pages/Reservation';
import Search from '~/pages/Search';
import Video from '~/pages/Video';
import Comment from '~/pages/Comment';
import MyInfo from '~/pages/MyInfo';

//publicRoutes for not log in
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.createpost, component: CreatePost, layout: HeaderOnly },
    { path: config.routes.event, component: Event, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: NoRightSidebar },
    { path: config.routes.memory, component: Memory, layout: NoRightSidebar },
    { path: config.routes.profile, component: Profile, layout: HeaderOnly },
    { path: config.routes.reservation, component: Reservation },
    { path: config.routes.video, component: Video },
    { path: config.routes.post, component: Post },
    { path: config.routes.manage, component: Manage, layout: NoRightSidebar },
    { path: config.routes.comment, component: Comment, layout: HeaderOnly },
    { path: config.routes.myInfo, component: MyInfo, layout: HeaderOnly },
];

const privateRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.post, component: Post },
    { path: config.routes.createpost, component: CreatePost, layout: HeaderOnly },
    { path: config.routes.event, component: Event, layout: HeaderOnly },
    { path: config.routes.search, component: Search ,layout: NoRightSidebar},
    { path: config.routes.manage, component: Manage, layout: NoRightSidebar },
    { path: config.routes.memory, component: Memory, layout: NoRightSidebar },
    { path: config.routes.profile, component: Profile, layout: HeaderOnly },
    { path: config.routes.reservation, component: Reservation, layout: NoRightSidebar },
    { path: config.routes.video, component: Video },
];

export { publicRoutes, privateRoutes };
