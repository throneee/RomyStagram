import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

import { Modal, Image, Button } from 'react-bootstrap';

const FollowingModal = () => {
    // ************************************* State *************************************
    const {
        userState: { user },
        showFollowingModal,
        setShowFollowingModal,
        setShowUnFollowModal,
        followUser,
    } = useContext(UserContext);

    // ************************************* Function *************************************
    const closeModal = () => {
        setShowFollowingModal({
            show: false,
            datas: [],
        });
    };

    const handleFollow = (id) => {
        followUser(id);
    };

    const handleShowUnFollowModal = (data) => {
        setShowUnFollowModal({
            show: true,
            userData: data,
        });
    };

    // ************************************* Return *************************************
    return (
        <Modal
            show={showFollowingModal.show}
            onHide={closeModal}
            centered
            className='following-modal'>
            <Modal.Header className='py-2' closeButton>
                <Modal.Title className='w-100 text-center fw-bold'>
                    Following
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='d-flex flex-column pb-0'>
                {showFollowingModal.datas.length === 0 ? (
                    <>
                        <span className='pb-3 text-center'>No Following.</span>
                    </>
                ) : (
                    <>
                        {showFollowingModal.datas.map((data) => {
                            return (
                                <div
                                    key={data._id}
                                    className='d-flex align-items-center justify-content-between mb-3'>
                                    <Link
                                        to={`/profile/${data._id}`}
                                        onClick={closeModal}
                                        className='d-flex align-items-center text-decoration-none text-dark'>
                                        <Image
                                            className='img-cover border'
                                            roundedCircle={true}
                                            src={data.avatar}
                                            width='30px'
                                            height={'30px'}></Image>
                                        <h6 className='mb-0 ms-3'>
                                            {data.username}
                                        </h6>
                                    </Link>

                                    {user.following.includes(data._id) ? (
                                        <Button
                                            className='btn-unfollow'
                                            onClick={() =>
                                                handleShowUnFollowModal(data)
                                            }>
                                            Unfollow
                                        </Button>
                                    ) : (
                                        <Button
                                            className='btn-follow'
                                            onClick={() => {
                                                handleFollow(data._id);
                                            }}>
                                            Follow
                                        </Button>
                                    )}
                                </div>
                            );
                        })}
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default FollowingModal;
