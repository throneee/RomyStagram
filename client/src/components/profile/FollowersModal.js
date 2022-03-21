import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

import { Modal, Image, Button } from 'react-bootstrap';

const FollowersModal = () => {
    // ************************************* State *************************************
    const { showFollowersModal, setShowFollowersModal } =
        useContext(UserContext);

    // ************************************* Function *************************************
    const closeModal = () => {
        setShowFollowersModal({
            show: false,
            datas: [],
        });
    };

    // ************************************* Return *************************************
    return (
        <Modal
            show={showFollowersModal.show}
            onHide={closeModal}
            centered
            className='followers-modal'>
            <Modal.Header className='py-2' closeButton>
                <Modal.Title className='w-100 text-center fw-bold'>
                    Followers
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='d-flex flex-column pb-0'>
                {showFollowersModal.datas.length === 0 ? (
                    <>
                        <span className='pb-3 text-center'>No Followers.</span>
                    </>
                ) : (
                    <>
                        {showFollowersModal.datas.map((data) => {
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

                                    <Link to={`/profile/${data._id}`}>
                                        <Button
                                            onClick={closeModal}
                                            className='text-dark'>
                                            View Profile
                                        </Button>
                                    </Link>
                                </div>
                            );
                        })}
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default FollowersModal;
