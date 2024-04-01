import { Button } from '@material-tailwind/react';

import * as postServices from '~/services/postServices';
function DeletePost({ idBaiViet, onLoading= ()=>{}}) {
    const fetchDeleteComment = async (idBaiViet) => {
        const response = await postServices.deletePost(idBaiViet);
        if (response) {
            if (response.data) {
                console.log('Delete post successfully');
                onLoading()
            } else {
                console.log('Delete post fail ', response.message);
            }
        } else {
            console.log('ERROR when delete post');
        }
    };

    const handleDelete = () => {
        fetchDeleteComment(idBaiViet);
    };
    return (
        <div className="flex flex-col">
            <p>Bạn chắc chắn muốn xóa bài viết?</p>
            <div className="flex justify-end">
                <Button color="red" onClick={handleDelete}>
                    Xác nhận
                </Button>
            </div>
        </div>
    );
}

export default DeletePost;
