import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { PostContext } from '../../../contexts/PostContext';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Image, Form, Button } from 'react-bootstrap';

const SingleComment = ({ children, post, comment, commentParentID }) => {
    // ************************************* State *************************************
    const {
        userState: { user },
        setShowToast,
    } = useContext(UserContext);

    const {
        showCommentModal: { postData },
        setShowCommentModal,
        setShowActionCommentModal,
        isEditComment,
        setIsEditComment,
        commentPost,
        updateComment,
        likeComment,
        unLikeComment,
    } = useContext(PostContext);

    // read more comment
    const [readMoreComment, setReadMoreComment] = useState(false);

    // content comment
    const [content, setContent] = useState(comment.content);

    // check comment is liked or not
    const [isLiked, setIsLiked] = useState(false);
    useEffect(() => {
        if (comment.likes.find((like) => like._id === user._id)) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, [comment, user._id]);

    // set post datail
    useEffect(() => {
        if (post) {
            setShowCommentModal({
                postData: post,
            });
        }
    }, [post, setShowCommentModal]);

    // check on reply or not
    const [onReply, setOnReply] = useState(false);

    // content reply comment
    const [contentReply, setContentReply] = useState('');

    // ************************************* Function *************************************

    // close update comment
    const closeUpdateComment = () => {
        setIsEditComment({ show: false });
        setContent(comment.content);
    };

    // onchange content comment
    const onChangeContent = (e) => {
        setContent(e.target.value);
    };

    // onchange content reply comment
    const onChangeContentReply = (e) => {
        setContentReply(e.target.value);
    };

    //show action comment modal
    const handleShowActionCommentModal = () => {
        setShowActionCommentModal({
            show: true,
            commentData: comment,
        });
    };

    // update comment
    const handleUpdateComment = async () => {
        const response = await updateComment(comment._id, {
            postID: postData._id,
            content,
        });
        if (!response.success) {
            setShowToast({
                show: true,
                type: 'danger',
                message: response.message,
            });
            return;
        }

        setShowToast({
            show: true,
            type: 'info',
            message: 'You have updated comment.',
        });

        closeUpdateComment();
    };

    // like comment
    const handleLikeComment = async () => {
        const response = await likeComment(comment._id, {
            postID: postData._id,
        });
        if (!response.success) {
            setShowToast({
                show: true,
                type: 'danger',
                message: response.message,
            });
            return;
        }

        setIsLiked(true);
    };

    // unlike comment
    const handleUnLikeComment = async () => {
        const response = await unLikeComment(comment._id, {
            postID: postData._id,
        });

        if (!response.success) {
            setShowToast({
                show: true,
                type: 'danger',
                message: response.message,
            });
            return;
        }

        setIsLiked(false);
    };

    // show on reply
    const handleOnReply = () => {
        if (onReply) {
            return setOnReply(false);
        }
        setOnReply({ ...comment, commentParentID });
    };

    // reply comment
    const handleReplyComment = async (e) => {
        e.preventDefault();

        if (!contentReply.trim()) {
            return;
        }

        const newReplyComment = {
            postID: postData._id,
            content: contentReply,
            createdAt: new Date().toISOString(),
            reply: onReply && onReply.commentParentID,
            tag: onReply && onReply.user,
            postUserID: postData.user._id,
        };

        const response = await commentPost(newReplyComment);
        if (!response.success) {
            setShowToast({
                show: true,
                type: 'danger',
                message: response.message,
            });
            return;
        }

        setShowToast({
            show: true,
            type: 'info',
            message: 'You have reply a comment in a post.',
        });

        if (onReply) {
            return setOnReply(false);
        }
    };

    // ************************************* Return *************************************
    return (
        <>
            <div className='comment d-flex align-items-center justify-content-between mt-3 rounded-3 p-2'>
                <div className='comment-left d-flex align-items-center flex-fill'>
                    <Link to={`/profile/${comment.user._id}`}>
                        <Image
                            className='img-cover border'
                            roundedCircle={true}
                            src={comment.user.avatar}
                            width={'30px'}
                            height={'30px'}></Image>
                    </Link>

                    <div className='ms-3 flex-fill'>
                        {/* username and content */}
                        <div className='d-flex align-items-center post-comment'>
                            <Link
                                to={`/profile/${comment.user._id}`}
                                className='text-decoration-none text-dark fw-bolder'>
                                {comment.user.username}
                            </Link>
                            <span className='mx-2 flex-fill'>
                                {isEditComment.show &&
                                isEditComment.commentID === comment._id ? (
                                    <>
                                        <textarea
                                            className='edit-comment-input w-100 p-2 rounded-3'
                                            rows={3}
                                            type='text'
                                            value={content}
                                            onChange={onChangeContent}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {comment.tag && (
                                            <Link
                                                className='text-decoration-none text-dark me-2 tag-name'
                                                to={`/profile/${comment.tag._id}`}>
                                                @{comment.tag.username}
                                            </Link>
                                        )}
                                        {comment.content.length < 20
                                            ? comment.content
                                            : readMoreComment
                                            ? comment.content
                                            : comment.content.slice(0, 20)}
                                        {comment.content.length > 20 && (
                                            <span
                                                onClick={() =>
                                                    setReadMoreComment(
                                                        !readMoreComment
                                                    )
                                                }
                                                className='ms-1 seemore'>
                                                {readMoreComment
                                                    ? 'Hide'
                                                    : '...See more'}
                                            </span>
                                        )}
                                    </>
                                )}
                            </span>
                        </div>

                        {/* time, reply, menu */}
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
                                    {comment.likes.length > 1
                                        ? 'likes'
                                        : 'like'}
                                </p>
                            )}

                            {isEditComment.show &&
                            isEditComment.commentID === comment._id ? (
                                <>
                                    <p
                                        className='mb-0 me-3'
                                        style={{ cursor: 'pointer' }}
                                        onClick={closeUpdateComment}>
                                        Cancle
                                    </p>
                                    <p
                                        className='mb-0 me-3'
                                        style={{ cursor: 'pointer' }}
                                        onClick={handleUpdateComment}>
                                        Update
                                    </p>
                                </>
                            ) : onReply ? (
                                <p
                                    className='mb-0 me-3'
                                    style={{ cursor: 'pointer' }}
                                    onClick={handleOnReply}>
                                    Cancle
                                </p>
                            ) : (
                                <p
                                    className='mb-0 me-3'
                                    style={{ cursor: 'pointer' }}
                                    onClick={handleOnReply}>
                                    Reply
                                </p>
                            )}

                            <i
                                className='bi bi-three-dots'
                                style={{ cursor: 'pointer' }}
                                onClick={handleShowActionCommentModal}></i>
                        </div>
                    </div>
                </div>

                {/* like icon */}
                <div className='comment-right-icon'>
                    {isLiked ? (
                        <i
                            className='bi bi-suit-heart-fill text-danger'
                            onClick={handleUnLikeComment}></i>
                    ) : (
                        <i
                            className='bi bi-suit-heart'
                            onClick={handleLikeComment}></i>
                    )}
                </div>
            </div>

            {/* input reply */}
            {onReply && (
                <div className='post-comment d-flex ps-3 py-2 border-top border-bottom'>
                    <div>
                        <i className='bi bi-emoji-smile'></i>
                    </div>

                    <Form
                        className='d-flex align-items-center flex-fill ms-2'
                        onSubmit={handleReplyComment}>
                        <Link
                            to={`/profile/${onReply.user._id}`}
                            className='text-decoration-none text-dark'>
                            @{onReply.user.username}:
                        </Link>

                        <Form.Control
                            type='text'
                            name='comment'
                            value={contentReply}
                            onChange={onChangeContentReply}
                            placeholder='Add a comment...'></Form.Control>
                        <Button disabled={content ? false : true} type='submit'>
                            Post
                        </Button>
                    </Form>
                </div>
            )}

            {children}
        </>
    );
};

export default SingleComment;
