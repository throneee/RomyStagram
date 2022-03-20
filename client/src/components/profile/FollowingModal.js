import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

import { Modal } from 'react-bootstrap';

const FollowingModal = () => {
    // ************************************* State *************************************
    const { showFollowingModal, setShowFollowingModal } =
        useContext(UserContext);

    // ************************************* Function *************************************
    const closeModal = () => {
        setShowFollowingModal(false);
    };

    // ************************************* Return *************************************
    return (
        <Modal
            show={showFollowingModal}
            onHide={closeModal}
            centered
            className='following-modal'>
            <Modal.Header className='py-2' closeButton>
                <Modal.Title className='w-100 text-center fw-bold'>
                    Following
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='d-flex flex-column'>
                List user following
            </Modal.Body>
        </Modal>
    );
};

export default FollowingModal;
