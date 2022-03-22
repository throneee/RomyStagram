import React, { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';
import { UserContext } from '../../contexts/UserContext';

import { Modal, Button, Image } from 'react-bootstrap';

const UnFollowModal = () => {
    // ************************************* State *************************************
    const { unFollowUser } = useContext(UserContext);

    const {
        postState: { post },
        setShowActionModal,
        showUnFollowModal,
        setShowUnFollowModal,
    } = useContext(PostContext);

    // ************************************* Function *************************************
    const closeModal = () => {
        setShowUnFollowModal(false);
    };

    const handleUnFollowUser = () => {
        unFollowUser(post.user._id);

        setShowActionModal(false);
        closeModal();
    };

    // ************************************* Return *************************************
    return (
        <Modal
            show={showUnFollowModal}
            onHide={closeModal}
            centered
            className='unfollow-post-modal p-0'>
            <Modal.Header className='p-4 d-flex flex-column align-items-center'>
                <Image
                    className='img-cover border'
                    roundedCircle={true}
                    src={post ? post.user.avatar : ''}
                    width={'100px'}
                    height={'100px'}></Image>

                <span className='mb-0 mt-3 text-center'>
                    If you change your mind, you'll have to request to follow{' '}
                    <span className='fw-bolder'>
                        @{post && post.user.username}
                    </span>{' '}
                    again.
                </span>
            </Modal.Header>

            <Modal.Header className='p-0'>
                <Button
                    className='text-danger fw-bold'
                    onClick={handleUnFollowUser}>
                    Unfollow
                </Button>
            </Modal.Header>

            <div>
                <Button onClick={closeModal} className='text-dark w-100'>
                    Cancle
                </Button>
            </div>
        </Modal>
    );
};

export default UnFollowModal;
