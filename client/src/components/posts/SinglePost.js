import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { PostContext } from '../../contexts/PostContext';
import { Link } from 'react-router-dom';
import moment from 'moment';
import CarouselPostImages from './CarouselPostImages';

import { Image, Form, Button } from 'react-bootstrap';

const SinglePost = ({ post }) => {
    // ************************************* State *************************************
    const {
        userState: { user },
        setShowToast,
    } = useContext(UserContext);

    const {
        setShowActionModal,
        setShowCommentModal,
        findPost,
        likePost,
        unLikePost,
        commentPost,
    } = useContext(PostContext);

    const [readMore, setReadMore] = useState(false);

    const [content, setContent] = useState('');

    const [isLike, setIsLike] = useState(false);
    useEffect(() => {
        if (post.likes.find((like) => like._id === user._id)) {
            setIsLike(true);
        }
    }, []);

    // ************************************* Function *************************************
    const onChangeContent = (e) => {
        setContent(e.target.value);
    };

    const handleShowActionModal = () => {
        findPost(post._id);
        setShowActionModal(true);
    };

    const handleLikePost = () => {
        setIsLike(true);
        likePost(post._id);
    };

    const handleUnLikePost = () => {
        setIsLike(false);
        unLikePost(post._id);
    };

    const handleShowCommentModal = () => {
        setShowCommentModal({
            show: true,
            postData: post,
        });
    };

    const handleComment = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            return;
        }

        await commentPost({
            postID: post._id,
            content,
            createdAt: new Date().toISOString(),
        });

        setShowToast({
            show: true,
            message: 'You have commented a post.',
        });
    };

    // ************************************* Return *************************************
    return (
        <div className='shadow rounded-3 bg-white border'>
            <div className='p-3 d-flex align-items-center justify-content-between'>
                <Link
                    to={`/profile/${post.user._id}`}
                    className='d-flex align-items-center text-decoration-none text-dark'>
                    <Image
                        className='img-cover border'
                        roundedCircle={true}
                        src={post.user.avatar}
                        width={'30px'}
                        height={'30px'}></Image>

                    <h6 className='mb-0 ms-3'>{post.user.username}</h6>
                </Link>

                <div
                    className='post-header-right'
                    onClick={handleShowActionModal}>
                    <i className='bi bi-three-dots'></i>
                </div>
            </div>

            <div>
                {post.images.length > 1 ? (
                    <CarouselPostImages images={post.images} />
                ) : (
                    <Image
                        className='w-100'
                        height={'600px'}
                        src={post.images[0].url}></Image>
                )}
            </div>

            <div className='post-interact d-flex justify-content-between px-3 py-2'>
                <div>
                    {isLike ? (
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

            <div className='px-3 mb-3'>
                <p className='mb-0'>
                    {post.likes.length}{' '}
                    {post.likes.length > 1 ? 'likes' : 'like'}
                </p>
                <div className='d-flex align-items-center'>
                    <h6 className='mb-0'>{post.user.username}</h6>

                    <div className='ms-2 d-flex align-items-center post-content'>
                        <p className='mb-0'>
                            {post.content.length < 50
                                ? post.content
                                : readMore
                                ? post.content
                                : post.content.slice(0, 50) + ' ...'}
                            {post.content.length > 50 && (
                                <span
                                    onClick={() => setReadMore(!readMore)}
                                    className='ms-1 seemore'>
                                    {readMore ? 'Hide' : 'See more'}
                                </span>
                            )}
                        </p>
                    </div>
                </div>
                <p className='text-secondary mb-0' style={{ fontSize: '14px' }}>
                    {moment(post.createdAt).fromNow()}
                </p>

                {post.comments.length > 0 ? (
                    <div className='mt-1 view-comment'>
                        <span
                            className='text-secondary'
                            onClick={handleShowCommentModal}>
                            View{` ${post.comments.length} `}
                            {post.comments.length > 1 ? 'comments' : 'comment'}
                        </span>
                    </div>
                ) : (
                    <></>
                )}
            </div>

            <div className='post-comment d-flex px-3 py-2 border-top'>
                <div>
                    <i className='bi bi-emoji-smile'></i>
                </div>

                <Form className='d-flex flex-fill' onSubmit={handleComment}>
                    <Form.Control
                        type='text'
                        name='comment'
                        value={content}
                        onChange={onChangeContent}
                        placeholder='Add a comment...'></Form.Control>
                    <Button disabled={content ? false : true} type='submit'>
                        Post
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default SinglePost;
