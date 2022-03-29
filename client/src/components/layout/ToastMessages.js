import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

import { Toast, Image } from 'react-bootstrap';

const ToastMessages = () => {
    // ************************************* State *************************************
    const {
        userState: {
            user: { _id, username, avatar },
        },
        showToast: { show, type, message },
        setShowToast,
    } = useContext(UserContext);

    // ************************************* Return *************************************
    return (
        <Toast
            show={show}
            className={`toast-messages shadow rounded-3 border border-1 border-${type}`}
            onClose={setShowToast.bind(this, {
                show: false,
                message: '',
            })}
            delay={5000}
            autohide>
            <Toast.Header className='justify-content-between'>
                <Link
                    to={`/profile/${_id}`}
                    className='d-flex align-items-center text-decoration-none text-dark'>
                    <Image
                        className='border img-cover'
                        src={avatar}
                        roundedCircle={true}
                        width={'30px'}
                        height={'30px'}></Image>
                    <h6 className='mb-0 ms-2'>{username}</h6>
                </Link>
            </Toast.Header>
            <Toast.Body className='d-flex flex-column align-items-center'>
                <p className='mb-0 fw-bold'>{message}</p>
                <div className='d-flex align-items-center'>
                    <i className='bi bi-clock'></i>
                    <p className='mb-0 text-secondary ms-2'>
                        a few seconds ago
                    </p>
                </div>
            </Toast.Body>
        </Toast>
    );
};

export default ToastMessages;
