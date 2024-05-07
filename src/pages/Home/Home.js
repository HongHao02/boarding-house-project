import { useEffect, useState, useRef, useCallback } from 'react';
import * as postServices from '~/services/postServices';
import { useSelector } from 'react-redux';

import Post from '~/components/Post';
import CardPlacehoderSkeleton from '~/components/Skeleton';
import ScrollButton from '~/layouts/components/ScrollButton';
import { CiCircleAlert } from 'react-icons/ci';

function Home() {
    const [page, setPage] = useState(0);
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(true);
    const observer = useRef(null);

    const [likedPosts, setLikedPosts] = useState([]);

    /**
     * likedPosts Redux
     */
    /**
     * users Redux
     */
    const users = useSelector((state) => state.users);

    /**
     * for crolling at the last element
     */
    const lastPostElementRef = useCallback(
        (node) => {
            if (loading || !fetching) return; // if the data is loading or no data to show -> do nothing
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    console.log('node_intersectionObserver ', node);
                    setPage((prev) => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        [loading, fetching],
    );

    const fetchLikedPost = async () => {
        const response = await postServices.getAllLikedPosts();
        if (response) {
            setLikedPosts((prev) => [...response.data]);
        }
    };
    useEffect(() => {
        if (users.user) {
            fetchLikedPost();
        } else {
            setLikedPosts([]);
        }
    }, [users.user]);

    const fetchPost = async () => {
        try {
            setLoading(true);
            const response = await postServices.getVideoFollowPage(page);
            if (response.data.length === 0) {
                setMessage('Xin lỗi! Không còn gì để lướt nữa rồi');
                setFetching(false);
                console.log('NO DATA TO SHOW');
            } else {
                setPosts((prev) => [...prev, ...response.data]);
            }
        } catch (error) {
            console.log('error when fetching data ', error);
            setMessage(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (fetching) {
            fetchPost();
            fetchLikedPost();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetching, page]);

    return (
        <div className="w-full mb-28 mt-4">
            <ScrollButton></ScrollButton>
            {posts.map((post, index) => {
                if (posts.length === index + 1) {
                    //Su dung forwardRef cho viec truyen ref qua component
                    return <Post ref={lastPostElementRef} key={index} post={post} likedPosts={likedPosts} />;
                } else {
                    return <Post key={index} post={post} likedPosts={likedPosts} />;
                }
            })}
            {loading && <CardPlacehoderSkeleton />}
            {message && (
                <div className="flex justify-center items-center gap-x-2">
                    <CiCircleAlert></CiCircleAlert>
                    {message}
                </div>
            )}
        </div>
    );
}

export default Home;
