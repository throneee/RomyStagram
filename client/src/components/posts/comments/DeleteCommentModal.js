import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { PostContext } from '../../../contexts/PostContext';

import { Modal, Button } from 'react-bootstrap';

const DeleteCommentModal = () => {
    // ************************************* State *************************************
    const { setShowToast } = useContext(UserContext);

    const {
        showCommentModal: { postData },
        showActionCommentModal: { commentData },
        setShowActionCommentModal,
        showDeleteCommentModal,
        setShowDeleteCommentModal,
        deleteComment,
    } = useContext(PostContext);

    // ************************************* Function *************************************
    const closeModal = () => {
        setShowDeleteCommentModal(false);
    };

    const handleDeleteComment = () => {
        const deleteCommentArray = [
            ...postData.comments.filter(
                (comment) => comment.reply === commentData._id
            ),
            commentData,
        ];

        deleteCommentArray.forEach(async (comment) => {
            await deleteComment(comment._id);
        });

        setShowToast({
            show: true,
            message: 'Comment is deleted.',
        });

        setShowActionCommentModal({
            show: false,
        });

        closeModal();
    };

    // ************************************* Return *************************************
    return (
        <Modal
            show={showDeleteCommentModal}
            centered
            onHide={closeModal}
            className='delete-post-modal'>
            <Modal.Header className='p-2 w-100'>
                <Modal.Title className='w-100 text-center fw-bold'>
                    Delete Comment
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='p-2 text-center'>
                <p>
                    After you finish deleting, comment will be permanently
                    deleted.
                </p>
            </Modal.Body>

            <Modal.Footer className='p-0 w-100'>
                <Button onClick={closeModal} className='flex-fill'>
                    Cancle
                </Button>
                <span className='text-secondary'>|</span>
                <Button
                    className='flex-fill text-danger'
                    onClick={handleDeleteComment}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteCommentModal;
