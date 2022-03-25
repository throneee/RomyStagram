import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import { PostContext } from '../../../contexts/PostContext';
import CarouselPostImages from '../CarouselPostImages';
import Comments from './Comments';
import moment from 'moment';

import { Modal, Button, Image, Form } from 'react-bootstrap';

const CommentModal = () => {
    // ************************************* State *************************************
    const {
        userState: { user },
        setShowToast,
    } = useContext(UserContext);

    const {
        showCommentModal: { show, postData },
        setShowCommentModal,
        likePost,
        unLikePost,
        commentPost,
    } = useContext(PostContext);

    const [content, setContent] = useState('');

    const [isLiked, setIsLiked] = useState(false);
    useEffect(() => {
        if (postData && postData.likes.find((like) => like._id === user._id)) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, [postData]);

    // ************************************* Function *************************************
    const closeModal = () => {
        setShowCommentModal({
            show: false,
        });
    };

    const onChangeContent = (e) => {
        setContent(e.target.value);
    };

    // like post
    const handleLikePost = () => {
        setIsLiked(true);
        likePost(postData._id);
    };

    // unlike post
    const handleUnLikePost = () => {
        setIsLiked(false);
        unLikePost(postData._id);
    };

    // create comment
    const handleComment = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            return;
        }

        await commentPost({
            postID: postData._id,
            content,
            createdAt: new Date().toISOString(),
        });

        setShowToast({
            show: true,
            message: 'You have commented a post.',
        });

        setContent('');
    };

    // ************************************* Return *************************************
    if (postData) {
        return (
            <Modal
                show={show}
                onHide={closeModal}
                centered
                className='comment-modal'>
                <div className='flex-fill w-100 p-2'>
                    {postData.images.length > 1 ? (
                        <CarouselPostImages images={postData.images} />
                    ) : (
                        <Image
                            className='w-100 h-100'
                            src={postData.images[0].url}></Image>
                    )}
                </div>

                <div className='flex-fill w-100 border-start d-flex flex-column'>
                    <Modal.Header>
                        <Link
                            to={`/profile/${postData.user._id}`}
                            className='d-flex align-items-center text-decoration-none text-dark'>
                            <Image
                                className='img-cover border'
                                roundedCircle={true}
                                src={postData.user.avatar}
                                width={'30px'}
                                height={'30px'}></Image>

                            <h6 className='mb-0 ms-3'>
                                {postData.user.username}
                            </h6>
                        </Link>

                        <i className='bi bi-three-dots'></i>
                    </Modal.Header>

                    <Modal.Body className='flex-fill'>
                        <Comments comments={postData.comments} />
                    </Modal.Body>

                    <Modal.Footer className='flex-start'>
                        <div className='post-interact d-flex justify-content-between w-100'>
                            <div>
                                {isLiked ? (
                                    <i
                                        className='bi bi-suit-heart-fill text-danger'
                                        onClick={handleUnLikePost}></i>
                                ) : (
                                    <i
                                        className='bi bi-suit-heart'
                                        onClick={handleLikePost}></i>
                                )}
                                <i className='bi bi-chat mx-4'></i>
                                <i className='bi bi-send'></i>
                            </div>

                            <div>
                                <i className='bi bi-bookmark'></i>
                            </div>
                        </div>

                        <div className='w-100'>
                            <h6 className='m-0'>
                                {postData.likes.length}{' '}
                                {postData.likes.length > 1 ? 'likes' : 'like'}
                            </h6>

                            <p
                                className='text-secondary m-0 mt-1'
                                style={{ fontSize: '14px' }}>
                                {moment(postData.createdAt).fromNow()}
                            </p>
                        </div>
                    </Modal.Footer>

                    <div className='post-comment d-flex px-3 py-2 border-top'>
                        <div>
                            <i className='bi bi-emoji-smile'></i>
                        </div>

                        <Form
                            className='d-flex flex-fill'
                            onSubmit={handleComment}>
                            <Form.Control
                                type='text'
                                name='comment'
                                value={content}
                                onChange={onChangeContent}
                                placeholder='Add a comment...'></Form.Control>
                            <Button
                                disabled={content ? false : true}
                                type='submit'>
                                Post
                            </Button>
                        </Form>
                    </div>
                </div>
            </Modal>
        );
    }

    return <></>;
};

export default CommentModal;
