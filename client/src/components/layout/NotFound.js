import React from 'react';

const NotFound = () => {
    return (
        <div className='position-relative' style={{ minHeight: '100vh' }}>
            <h1
                className='position-absolute text-secondary mb-0'
                style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                404 | Not Found
            </h1>
        </div>
    );
};

export default NotFound;
