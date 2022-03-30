import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostContext } from '../../contexts/PostContext';
import { UserContext } from '../../contexts/UserContext';
import { BASE_URL } from '../../utils/contants';

import { Modal, Button } from 'react-bootstrap';

const ActionModal = () => {
    // ************************************* State *************************************
    const {
        userState: { user },
        setShowUnFollowModal,
        setShowToast,
    } = useContext(UserContext);

    const {
        postState: { post },
        setShowUpdatePostModal,
        showActionModal,
        setShowActionModal,
        setShowDeletePostModal,
    } = useContext(PostContext);

    // clear state
    useEffect(() => {
        return () => {
            setShowActionModal(false);
        };
    }, []);

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

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
        setShowToast({
            show: true,
            type: 'info',
            message: 'Copy link to clipboard.',
        });
        closeModal();
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
                        <Link to={`/post/${post._id}`} className='w-100'>
                            <Button className='text-dark' onClick={closeModal}>
                                Go to post
                            </Button>
                        </Link>
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
                            Edit Post
                        </Button>
                    </>
                ) : (
                    <>
                        {post && (
                            <Link to={`/post/${post._id}`} className='w-100'>
                                <Button
                                    className='text-dark'
                                    onClick={closeModal}>
                                    Go to post
                                </Button>
                            </Link>
                        )}
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

            <Modal.Header className='p-0'>
                <Button className='text-dark' onClick={handleCopyLink}>
                    Copy link
                </Button>
            </Modal.Header>

            <div>
                <Button onClick={closeModal} className='text-dark'>
                    Cancle
                </Button>
            </div>
        </Modal>
    );
};

export default ActionModal;
