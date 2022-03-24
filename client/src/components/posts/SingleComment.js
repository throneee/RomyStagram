import React, { useState } from 'react';
import moment from 'moment';
import { Image } from 'react-bootstrap';

const SingleComment = ({ comment }) => {
    const [readMoreComment, setReadMoreComment] = useState(false);

    return (
        <div className='comment d-flex align-items-center justify-content-between mt-3'>
            <div className='comment-left d-flex align-items-center'>
                <Image
                    className='img-cover border'
                    roundedCircle={true}
                    src={comment.user.avatar}
                    width={'30px'}
                    height={'30px'}></Image>

                <div className='ms-3'>
                    <div className='d-flex align-items-center post-comment'>
                        <h6 className='mb-0'>{comment.user.username}</h6>
                        <span className='ms-2'>
                            {comment.content.length < 30
                                ? comment.content
                                : readMoreComment
                                ? comment.content
                                : comment.content.slice(0, 30) + ' ...'}
                            {comment.content.length > 30 && (
                                <span
                                    onClick={() =>
                                        setReadMoreComment(!readMoreComment)
                                    }
                                    className='ms-1 seemore'>
                                    {readMoreComment ? 'Hide' : 'See more'}
                                </span>
                            )}
                        </span>
                    </div>

                    <div
                        className='d-flex align-items-center mt-1'
                        style={{ fontSize: '12px' }}>
                        <p className='text-secondary mb-0 me-3'>
                            {moment(comment.createdAt).fromNow()}
                        </p>

                        {comment.likes.length === 0 ? (
                            <></>
                        ) : (
                            <p className='mb-0 me-3'>
                                {comment.likes.length}{' '}
                                {comment.likes.length > 1 ? 'likes' : 'like'}
                            </p>
                        )}

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
};

export default SingleComment;
