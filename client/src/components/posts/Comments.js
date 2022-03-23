import React from 'react';
import moment from 'moment';

import { Image } from 'react-bootstrap';

const Comments = ({ comments }) => {
    return (
        <>
            {comments.map((comment) => {
                return (
                    <div
                        key={comment._id}
                        className='comment d-flex align-items-center justify-content-between mt-3'>
                        <div className='comment-left d-flex align-items-center'>
                            <Image
                                className='img-cover border'
                                roundedCircle={true}
                                src={comment.user.avatar}
                                width={'30px'}
                                height={'30px'}></Image>

                            <div className='ms-3'>
                                <div className='d-flex align-items-center'>
                                    <h6 className='mb-0'>
                                        {comment.user.username}
                                    </h6>
                                    <span className='ms-3'>
                                        {comment.content}
                                    </span>
                                </div>

                                <div className='d-flex align-items-center mt-1'>
                                    <p
                                        className='text-secondary mb-0'
                                        style={{ fontSize: '14px' }}>
                                        {moment(comment.createdAt).fromNow()}
                                    </p>

                                    <p className='mb-0 mx-3'>
                                        {comment.likes.length} like
                                    </p>

                                    <p className='mb-0 me-3'>Reply</p>

                                    <i className='bi bi-three-dots'></i>
                                </div>
                            </div>
                        </div>

                        <div className='comment-right'>
                            <i className='bi bi-suit-heart'></i>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default Comments;
