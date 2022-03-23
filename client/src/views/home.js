import React, { useContext, useEffect } from 'react';
import { PostContext } from '../contexts/PostContext';
import ToastMessages from '../components/layout/ToastMessages';
import AddPostModal from '../components/posts/AddPostModal';
import UpdatePostModal from '../components/posts/UpdatePostModal';
import SinglePost from '../components/posts/SinglePost';
import ActionModal from '../components/posts/ActionModal';
import DeletePostModal from '../components/posts/DeletePostModal';
import UnFollowModal from '../components/profile/UnFollowModal';
import CommentModal from '../components/posts/CommentModal';

import { Spinner, Row, Col } from 'react-bootstrap';

const Home = () => {
    // ************************************* State *************************************
    const {
        postState: { postLoading, posts },
        getPosts,
    } = useContext(PostContext);
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    // ************************************* Function and Variable declare *************************************
    let body = null;

    if (postLoading) {
        body = (
            <div className='text-center my-5 col-12 col-md-8'>
                <Spinner animation='border' variant='info' />
            </div>
        );
    } else if (posts.length === 0) {
        body = (
            <div className='pb-4 col-12 col-md-8'>
                <div className='no-post d-flex flex-column align-items-center py-3 mt-4 w-100'>
                    <div className='rounded-circle d-flex justify-content-center align-items-center'>
                        <i className='bi bi-camera text-secondary'></i>
                    </div>

                    <h4 className='mb-0 mt-3 text-secondary'>No Posts Yet</h4>
                </div>
            </div>
        );
    } else {
        body = (
            <div className='pb-4 col-12 col-md-8'>
                <Row className='row-cols-1'>
                    {posts.map((post) => {
                        return (
                            <Col key={post._id} className='mt-4'>
                                <SinglePost post={post} />
                            </Col>
                        );
                    })}
                </Row>
            </div>
        );
    }

    // ************************************* Return *************************************
    return (
        <>
            <div className='content'>
                <div className='content-body row'>
                    {body}

                    <div className='col-0 col-md-4'></div>
                </div>
            </div>

            <ToastMessages />
            <AddPostModal />
            <ActionModal />
            <UpdatePostModal />
            <DeletePostModal />
            <UnFollowModal />
            <CommentModal />
        </>
    );
};

export default Home;
