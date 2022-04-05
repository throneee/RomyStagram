import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { PostContext } from '../../contexts/PostContext';
import ToastMessages from '../../components/layout/ToastMessages';
import AddPostModal from '../../components/posts/AddPostModal';
import CarouselPostImages from '../../components/posts/CarouselPostImages';
import Comments from '../../components/posts/comments/Comments';
import ActionCommentModal from '../../components/posts/comments/ActionCommentModal';
import DeleteCommentModal from '../../components/posts/comments/DeleteCommentModal';
import moment from 'moment';
import ActionModal from '../../components/posts/ActionModal';
import UpdatePostModal from '../../components/posts/UpdatePostModal';
import DeletePostModal from '../../components/posts/DeletePostModal';
import UnFollowModal from '../../components/profile/UnFollowModal';
import { BASE_URL } from '../../utils/contants';
import SharePost from '../../components/posts/SharePost';

import { Image, Form, Button } from 'react-bootstrap';

const PostDetail = () => {
    // ************************************* State *************************************
    const {
        userState: { user },
        setShowToast,
    } = useContext(UserContext);

    const {
        postState: { posts, post },
        setShowActionModal,
        likePost,
        unLikePost,
        getPostDetail,
        commentPost,
    } = useContext(PostContext);

    const { id } = useParams();

    // scrollTop when click in a link
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // get detail post when posts change
    useEffect(() => {
        const fetchData = async () => {
            await getPostDetail(id);
        };
        fetchData();
    }, [id, posts, getPostDetail]);

    // check each comment have reply or not
    const [replyComments, setReplyComments] = useState([]);
    useEffect(() => {
        const newRep = post && post.comments.filter((comment) => comment.reply);
        setReplyComments(newRep);
    }, [post]);

    // check post liked or not
    const [isLiked, setIsLiked] = useState(false);
    useEffect(() => {
        if (post && post.likes.find((like) => like._id === user._id)) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, [post, user._id]);

    // input content comment
    const [content, setContent] = useState('');

    const [isShare, setIsShare] = useState(false);

    // ************************************* Function *************************************
    const onChangeContent = (e) => {
        setContent(e.target.value);
    };

    // show action modal
    const handleShowActionModal = () => {
        setShowActionModal(true);
    };

    // like post
    const handleLikePost = async () => {
        const response = await likePost(post._id);
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

    // unlike post
    const handleUnLikePost = async () => {
        const response = await unLikePost(post._id);
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

    // create comment
    const handleComment = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            return;
        }

        const response = await commentPost({
            postID: post._id,
            content,
            createdAt: new Date().toISOString(),
            postUserID: post.user._id,
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
            message: 'You have commented a post.',
        });

        setContent('');
    };

    // ************************************* Return *************************************
    return (
        <>
            <div className='content'>
                <div className='content-body'>
                    {post && (
                        <>
                            <div className='post-detail d-flex border mt-3'>
                                <div className='post-detail-left'>
                                    {post.images.length > 1 ? (
                                        <CarouselPostImages
                                            images={post.images}
                                            path='post-detail'
                                        />
                                    ) : (
                                        <Image
                                            className='w-100 h-100'
                                            src={post.images[0].url}></Image>
                                    )}
                                </div>

                                <div className='post-detail-right border-start d-flex flex-column'>
                                    <div className='post-detail-righ-top border-bottom d-flex align-items-center justify-content-between p-3'>
                                        <Link
                                            to={`/profile/${post.user._id}`}
                                            className='d-flex align-items-center text-decoration-none text-dark'>
                                            <Image
                                                className='img-cover border'
                                                roundedCircle={true}
                                                src={post.user.avatar}
                                                width={'30px'}
                                                height={'30px'}></Image>

                                            <h6 className='mb-0 ms-3'>
                                                {post.user.username}
                                            </h6>
                                        </Link>

                                        <i
                                            className='bi bi-three-dots'
                                            onClick={handleShowActionModal}
                                            style={{ cursor: 'pointer' }}></i>
                                    </div>

                                    <div className='post-detail-comments px-3 flex-fill overflow-auto'>
                                        {post.comments.length === 0 ? (
                                            <div
                                                className='h-100 d-flex flex-column justify-content-center align-items-center'
                                                style={{ fontSize: '24px' }}>
                                                <i className='bi bi-chat-dots'></i>
                                                <span
                                                    style={{
                                                        fontStyle: 'italic',
                                                    }}>
                                                    No comment
                                                </span>
                                            </div>
                                        ) : (
                                            post.comments.map((comment) => {
                                                return (
                                                    <Comments
                                                        key={comment._id}
                                                        post={post}
                                                        comment={comment}
                                                        replyComments={
                                                            replyComments &&
                                                            replyComments.filter(
                                                                (item) =>
                                                                    item.reply ===
                                                                    comment._id
                                                            )
                                                        }
                                                    />
                                                );
                                            })
                                        )}
                                    </div>

                                    <div className='post-detail-info p-3 border-top'>
                                        <div className='post-interact d-flex justify-content-between w-100'>
                                            <div>
                                                {isLiked ? (
                                                    <i
                                                        className='bi bi-suit-heart-fill text-danger'
                                                        onClick={
                                                            handleUnLikePost
                                                        }></i>
                                                ) : (
                                                    <i
                                                        className='bi bi-suit-heart'
                                                        onClick={
                                                            handleLikePost
                                                        }></i>
                                                )}
                                                <i className='bi bi-chat mx-4'></i>
                                                <i
                                                    className='bi bi-send'
                                                    onClick={() =>
                                                        setIsShare(!isShare)
                                                    }></i>
                                            </div>

                                            <div>
                                                <i className='bi bi-bookmark'></i>
                                            </div>
                                        </div>

                                        {isShare && (
                                            <div className='w-100 my-2'>
                                                <SharePost
                                                    url={`${BASE_URL}/post/${post._id}`}
                                                />
                                            </div>
                                        )}

                                        <div className='w-100'>
                                            <h6 className='m-0'>
                                                {post.likes.length}{' '}
                                                {post.likes.length > 1
                                                    ? 'likes'
                                                    : 'like'}
                                            </h6>

                                            <p
                                                className='text-secondary m-0 mt-1'
                                                style={{ fontSize: '14px' }}>
                                                {moment(
                                                    post.createdAt
                                                ).fromNow()}
                                            </p>
                                        </div>
                                    </div>

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
                                                disabled={
                                                    content ? false : true
                                                }
                                                type='submit'>
                                                Post
                                            </Button>
                                        </Form>
                                    </div>
                                </div>
                            </div>

                            <div className='profile-bottom text-center py-5'>
                                <div className='d-flex flex-wrap justify-content-center'>
                                    <span className='me-3'>Meta</span>
                                    <span className='me-3'>About</span>
                                    <span className='me-3'>Blog</span>
                                    <span className='me-3'>Jobs</span>
                                    <span className='me-3'>Help</span>
                                    <span className='me-3'>API</span>
                                    <span className='me-3'>Privacy</span>
                                    <span className='me-3'>Terms</span>
                                    <span className='me-3'>Top Account</span>
                                    <span className='me-3'>Hashtags</span>
                                    <span className='me-3'>Locations</span>
                                    <span>Instagram Lite</span>
                                </div>

                                <div className='mt-3'>
                                    <span className='me-3'>English</span>
                                    <span>@ 2022 RomyStagram from Luong</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <ToastMessages />
            <AddPostModal />
            <ActionModal />
            <UpdatePostModal />
            <DeletePostModal path='post-detail' />
            <UnFollowModal path='post-detail' />
            <ActionCommentModal />
            <DeleteCommentModal />
        </>
    );
};

export default PostDetail;
