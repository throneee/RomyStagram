import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

import { Spinner } from 'react-bootstrap';

const Loading = () => {
    const { showLoading } = useContext(UserContext);

    if (showLoading) {
        return (
            <div
                className='position-fixed w-100 h-100 text-center text-white d-flex justify-content-center align-items-center'
                style={{ background: '#0008', top: 0, left: 0, zIndex: 2000 }}>
                <Spinner animation='border' variant='info'></Spinner>
            </div>
        );
    }
    return <></>;
};

export default Loading;
