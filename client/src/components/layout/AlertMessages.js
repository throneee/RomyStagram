import React from 'react';

const AlertMessages = ({ info }) => {
    return info === null ? null : (
        <h6 className='mb-3 alert-messages d-flex align-items-center'>
            <i className='bi bi-x'></i> {info.message}
        </h6>
    );
};

export default AlertMessages;
