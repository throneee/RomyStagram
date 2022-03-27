import React from 'react';
import CarouselPostImages from '../../components/posts/CarouselPostImages';
import { Link } from 'react-router-dom';

import { Row, Col, Image } from 'react-bootstrap';

const PostOfUser = ({ posts, postsCount }) => {
    // ************************************* State *************************************

    // ************************************* Function or Variable declare *************************************
    let body;
    if (postsCount === 0) {
        body = (
            <div className='no-post d-flex flex-column align-items-center py-3 w-100'>
                <div className='rounded-circle d-flex justify-content-center align-items-center'>
                    <i className='bi bi-camera text-secondary'></i>
                </div>

                <h4 className='mb-0 mt-2 text-secondary'>No Posts Yet</h4>
            </div>
        );
    } else {
        body = (
            <>
                <Row className='row-cols-1 row-cols-md-3'>
                    {posts.map((post) => {
                        return (
                            <Col key={post._id} className='mb-3'>
                                {post.images.length > 1 ? (
                                    <CarouselPostImages
                                        post={post}
                                        images={post.images}
                                        path='profile'
                                    />
                                ) : (
                                    <Link to={`/post/${post._id}`}>
                                        <div className='profile-single-post position-relative'>
                                            <Image
                                                className='w-100 rounded-3 border'
                                                height={'200px'}
                                                src={
                                                    post.images[0].url
                                                }></Image>

                                            <div className='profile-post-thumb position-absolute w-100 h-100 d-flex justify-content-center align-items-center rounded-3'>
                                                <div className='text-white me-3'>
                                                    <i className='bi bi-suit-heart-fill me-2'></i>
                                                    <span>
                                                        {post.likes.length}
                                                    </span>
                                                </div>
                                                <div className='text-white ms-3'>
                                                    <i className='bi bi-chat-fill me-2'></i>
                                                    <span>
                                                        {post.comments.length}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </Col>
                        );
                    })}
                </Row>
            </>
        );
    }

    // ************************************* Return *************************************
    return <>{body}</>;
};

export default PostOfUser;
