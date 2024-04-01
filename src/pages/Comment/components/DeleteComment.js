import { Button } from '@material-tailwind/react';

import * as postServices from '~/services/postServices';
function DeleteComment({ idBL, onHidden = () => {} }) {
    const fetchDeleteComment = async (idBL) => {
        const response = await postServices.deleteComment(idBL);
        if (response) {
            if (response.data) {
                console.log('Delete comment successfully');
                onHidden();
            } else {
                console.log('Delete comment fail ', response.message);
            }
        } else {
            console.log('ERROR when delete comment');
        }
    };

    const handleDelete = () => {
        fetchDeleteComment(idBL);
    };
    return (
        <div className="flex flex-col">
            <p>Bạn chắc chắn muốn xóa bình luận?</p>
            <div className="flex justify-end">
                <Button color="red" onClick={handleDelete}>
                    Xác nhận
                </Button>
            </div>
        </div>
    );
}

export default DeleteComment;
