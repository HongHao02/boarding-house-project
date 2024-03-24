import React, { useState } from 'react';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import { Square3Stack3DIcon, UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';

import PostCreatePattern from './PostCreatePattern';
import PostPreview from './PostPreview';

export default function PostCreate({ className, nhaTroList }) {
    const [postData, setPostData] = useState({
        tenNhaTro: '',
        sttLau: '',
        sttPhong: '',
        giaPhong: '',
        loaiPhong: '',
        description: '',
        lock: false,
        files: [],
    });
    const handleChangePostData = (prevPost) => {
        console.log('prevPost ', prevPost);
        setPostData((prev) => ({ ...prev, ...prevPost }));
    };
    const data = [
        {
            label: 'Tạo bài viết',
            value: 'createPost',
            icon: Square3Stack3DIcon,
            desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people
      who are like offended by it, it doesn't matter.`,
            component: <PostCreatePattern onChange={handleChangePostData} />,
        },
        {
            label: 'Xem lại',
            value: 'review',
            icon: UserCircleIcon,
            desc: `Xem lại bài viết`,
            component: <PostPreview post={postData} />,
        },
        {
            label: 'Cài đặt',
            value: 'settings',
            icon: Cog6ToothIcon,
            desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
        },
    ];

    console.log('Post create ', typeof className);
    return (
        <Tabs value="dashboard" className={className.toString()}>
            <TabsHeader>
                {data.map(({ label, value, icon }) => (
                    <Tab key={value} value={value}>
                        <div className="flex items-center gap-2">
                            {React.createElement(icon, { className: 'w-5 h-5' })}
                            {label}
                        </div>
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody className='z-[9999]'>
                {data.map(({ value, component, desc }) => (
                    <TabPanel key={value} value={value}>
                        {component || desc}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}
