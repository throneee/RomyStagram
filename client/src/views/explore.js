import React from 'react';
import ToastMessages from '../components/layout/ToastMessages';
import AddPostModal from '../components/posts/AddPostModal';

const Explore = () => {
    return (
        <>
            <div className='content'>
                <div className='content-body'>Explore</div>
            </div>
            <ToastMessages />
            <AddPostModal />
        </>
    );
};

export default Explore;
