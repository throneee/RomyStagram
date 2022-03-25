import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { PostContext } from '../../../contexts/PostContext';

import { Modal, Button } from 'react-bootstrap';

const ActionCommentModal = () => {
    // ************************************* State *************************************
    const {
        userState: { user },
    } = useContext(UserContext);

    const {
        showCommentModal: { postData },
        showActionCommentModal,
        setShowActionCommentModal,
        setIsEditComment,
        setShowDeleteCommentModal,
    } = useContext(PostContext);

    // ************************************* Function *************************************
    const closeModal = () => {
        setShowActionCommentModal({
            show: false,
        });
    };

    const handleShowEditComment = () => {
        setIsEditComment({
            show: true,
            commentID: showActionCommentModal.commentData._id,
        });
        setShowActionCommentModal({
            show: false,
        });
    };

    // ************************************* Return *************************************
    if (showActionCommentModal.commentData) {
        return (
            <Modal
                show={showActionCommentModal.show}
                onHide={closeModal}
                centered
                className='action-post-modal p-0'>
                <Modal.Header className='p-0'>
                    <Button className='text-danger fw-bold'>Report</Button>
                </Modal.Header>

                {showActionCommentModal.commentData.user._id === user._id && (
                    <Modal.Header className='p-0'>
                        <Button
                            className='text-dark'
                            onClick={handleShowEditComment}>
                            Edit Comment
                        </Button>
                    </Modal.Header>
                )}

                {(showActionCommentModal.commentData.user._id === user._id ||
                    postData.user._id === user._id) && (
                    <Modal.Header className='p-0'>
                        <Button
                            className='text-dark'
                            onClick={() => setShowDeleteCommentModal(true)}>
                            Delete
                        </Button>
                    </Modal.Header>
                )}

                <div>
                    <Button onClick={closeModal} className='text-dark'>
                        Cancle
                    </Button>
                </div>
            </Modal>
        );
    }

    return <></>;
};

export default ActionCommentModal;
