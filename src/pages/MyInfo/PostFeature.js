import PostView from './post-components/PostView';

function PostFeature({ data, onLoading = () => {} }) {
    const { posts } = data;
    return (
        <div className="grid grid-cols-3 gap-4">
            {posts.length > 0 ? (
                <>
                    {posts.map((post, index) => (
                        <PostView key={index} post={post} onLoading={onLoading}></PostView>
                    ))}
                </>
            ) : (
                <div>Không có bài viết vào</div>
            )}
        </div>
    );
}

export default PostFeature;
