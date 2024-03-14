import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { PostCreate } from '~/components/Post';

function Post() {
    const users = useSelector((state) => state.users);
    const [isLandlord, setIsLandlord] = useState(false);

    useEffect(() => {
        if (users.user) {
            const isLandlordRole = users.user.user.roles.some((role) => role.nameRole === 'CHUTRO');
            if (isLandlordRole) {
                setIsLandlord(true);
            }
        } else {
            setIsLandlord(false);
        }
    }, [users.user]);
    return (
        <div className="w-full rounded-md bg-white min-h-full">
            {isLandlord ? (
                <PostCreate className={'w-[80%] mx-auto h-full'} />
            ) : (
                <div className="flex justify-center items-center mx-auto h-screen">
                    Tính năng đăng bài viết chỉ dành cho chủ trọ.
                </div>
            )}
        </div>
    );
}

export default Post;
