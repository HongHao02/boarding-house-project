import React, { useEffect, useState } from 'react';
import moment from 'moment';

const PostTimeStamp = ({ published_at }) => {
    const [timeDiff, setTimeDiff] = useState('');

    useEffect(() => {
        const calculateTimeDifference = () => {
            const currentTime = moment();
            const postTime = moment(published_at, 'YYYY-MM-DD HH:mm:ss');
            const duration = moment.duration(currentTime.diff(postTime));
            // console.log("DURATION ",duration)

            if (duration.asMinutes() < 60) {
                // Đăng cách đây x phút
                setTimeDiff(`Đăng cách đây ${Math.round(duration.asMinutes())} phút`);
            } else if (duration.asHours() < 24) {
                // Đăng cách đây x giờ
                setTimeDiff(`Đăng cách đây ${Math.round(duration.asHours())} giờ`);
            } else {
                // Đăng cách đây x ngày
                setTimeDiff(`Đăng cách đây ${Math.round(duration.asDays())} ngày`);
            }
        };

        calculateTimeDifference();
    }, [published_at]);

    return <div className="text-blue-gray-200 font-thin text-sm flex justify-start">{timeDiff}</div>;
};

export default PostTimeStamp;
