import React, { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';
import { UserContext } from '../../contexts/UserContext';

import { Modal, Button } from 'react-bootstrap';

const ActionModal = () => {
    // ************************************* State *************************************
    const {
        userState: { user },
        setShowUnFollowModal,
    } = useContext(UserContext);

    const {
        postState: { post },
        setShowUpdatePostModal,
        showActionModal,
        setShowActionModal,
        setShowDeletePostModal,
    } = useContext(PostContext);

    // ************************************* Function *************************************
    const closeModal = () => {
        setShowActionModal(false);
    };

    const handleShowUpdatePostModal = () => {
        setShowUpdatePostModal(true);
    };

    const handleShowDeletePostModal = () => {
        setShowDeletePostModal(true);
    };

    const handleShowUnFollowModal = () => {
        setShowUnFollowModal({
            show: true,
        });
    };

    // ************************************* Return *************************************
    return (
        <Modal
            show={showActionModal}
            onHide={closeModal}
            centered
            className='action-post-modal p-0'>
            <Modal.Header className='p-0'>
                <Button className='text-danger fw-bold'>Report</Button>
            </Modal.Header>
            <Modal.Header className='p-0'>
                {post && post.user._id === user._id ? (
                    <>
                        <Button className='text-dark'>Go to post</Button>
                    </>
                ) : (
                    <>
                        <Button
                            className='text-danger fw-bold'
                            onClick={handleShowUnFollowModal}>
                            Unfollow
                        </Button>
                    </>
                )}
            </Modal.Header>
            <Modal.Header className='p-0'>
                {post && post.user._id === user._id ? (
                    <>
                        <Button
                            className='text-dark'
                            onClick={handleShowUpdatePostModal}>
                            Update
                        </Button>
                    </>
                ) : (
                    <>
                        <Button className='text-dark'>Go to post</Button>
                    </>
                )}
            </Modal.Header>

            {post && post.user._id === user._id ? (
                <Modal.Header className='p-0'>
                    <Button
                        className='text-dark'
                        onClick={handleShowDeletePostModal}>
                        Delete
                    </Button>
                </Modal.Header>
            ) : (
                <></>
            )}

            <div>
                <Button onClick={closeModal} className='text-dark'>
                    Cancle
                </Button>
            </div>
        </Modal>
    );
};

export default ActionModal;
