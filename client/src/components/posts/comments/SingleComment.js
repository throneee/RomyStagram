import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { PostContext } from '../../../contexts/PostContext';
import moment from 'moment';
import { Image } from 'react-bootstrap';

const SingleComment = ({ comment }) => {
    // ************************************* State *************************************
    const {
        userState: { user },
        setShowToast,
    } = useContext(UserContext);

    const {
        showCommentModal: { postData },
        setShowActionCommentModal,
        isEditComment,
        setIsEditComment,
        updateComment,
        likeComment,
        unLikeComment,
    } = useContext(PostContext);

    const [readMoreComment, setReadMoreComment] = useState(false);

    const [content, setContent] = useState(comment.content);

    const [isLiked, setIsLiked] = useState(false);
    useEffect(() => {
        if (comment.likes.find((like) => like._id === user._id)) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, []);

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

    //show action comment modal
    const handleShowActionCommentModal = () => {
        setShowActionCommentModal({
            show: true,
            commentData: comment,
        });
    };

    // update comment
    const handleUpdateComment = async () => {
        await updateComment(comment._id, {
            postID: postData._id,
            content,
        });

        setShowToast({
            show: true,
            message: 'You have updated comment.',
        });

        closeUpdateComment();
    };

    // like comment
    const handleLikeComment = () => {
        setIsLiked(true);
        likeComment(comment._id, {
            postID: postData._id,
        });
    };

    // unlike comment
    const handleUnLikeComment = () => {
        setIsLiked(false);
        unLikeComment(comment._id, {
            postID: postData._id,
        });
    };

    // ************************************* Return *************************************
    return (
        <div className='comment d-flex align-items-center justify-content-between mt-3'>
            <div className='comment-left d-flex align-items-center flex-fill'>
                <Image
                    className='img-cover border'
                    roundedCircle={true}
                    src={comment.user.avatar}
                    width={'30px'}
                    height={'30px'}></Image>

                <div className='ms-3 flex-fill'>
                    <div className='d-flex align-items-center post-comment'>
                        <h6 className='mb-0'>{comment.user.username}</h6>
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
                                    {comment.content.length < 30
                                        ? comment.content
                                        : readMoreComment
                                        ? comment.content
                                        : comment.content.slice(0, 30)}
                                    {comment.content.length > 30 && (
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
                        ) : (
                            <p
                                className='mb-0 me-3'
                                style={{ cursor: 'pointer' }}>
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

            <div className='comment-right-icon'>
                {/* <i className='bi bi-suit-heart'></i> */}
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
    );
};

export default SingleComment;
