import React from 'react';
import ToastMessages from '../components/layout/ToastMessages';
import AddPostModal from '../components/posts/AddPostModal';

const Messages = () => {
    return (
        <>
            <div className='content'>
                <div className='content-body'>Messages</div>
            </div>
            <ToastMessages />
            <AddPostModal />
        </>
    );
};

export default Messages;
