import React from 'react';
import ToastMessages from '../components/layout/ToastMessages';
import AddPostModal from '../components/posts/AddPostModal';

const Home = () => {
    return (
        <>
            <div className='content'>
                <div className='content-body'>HOME</div>
            </div>

            <ToastMessages />
            <AddPostModal />
        </>
    );
};

export default Home;
