import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { PostContext } from '../../contexts/PostContext';

import { Modal, Button } from 'react-bootstrap';

const DeletePostModal = () => {
    // ************************************* State *************************************
    const { setShowToast } = useContext(UserContext);

    const {
        postState: { post },
        setShowActionModal,
        showDeletePostModal,
        setShowDeletePostModal,
        deletePost,
    } = useContext(PostContext);

    // ************************************* Function *************************************
    const closeModal = () => {
        setShowDeletePostModal(false);
    };

    const handleDeletePost = async (e) => {
        e.preventDefault();

        await deletePost(post._id);
        setShowToast({
            show: true,
            message: 'Post is deleted.',
        });

        setShowActionModal(false);
        closeModal();
    };

    // ************************************* Return *************************************
    return (
        <Modal
            show={showDeletePostModal}
            centered
            onHide={closeModal}
            className='delete-post-modal'>
            <Modal.Header className='p-2 w-100'>
                <Modal.Title className='w-100 text-center fw-bold'>
                    Delete Post
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='p-2 text-center'>
                <p>
                    After you finish deleting, post will be permanently deleted.
                </p>
            </Modal.Body>

            <Modal.Footer className='p-0 w-100'>
                <Button onClick={closeModal} className='flex-fill'>
                    Cancle
                </Button>
                <span className='text-secondary'>|</span>
                <Button
                    className='flex-fill text-danger'
                    onClick={handleDeletePost}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeletePostModal;
