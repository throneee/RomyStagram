import React, { createContext, useReducer, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { SocketContext } from './SocketContext';
import { NotifyContext } from './NotifyContext';
import { postReducer } from '../reducers/postReducer';

import {
    apiURL,
    ADD_POST,
    GET_POSTS_SUCCESS,
    UPDATE_POST,
    FIND_POST,
    DELETE_POST,
    DETAIL_POST,
} from '../utils/contants';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    // ************************************* State *************************************
    const { socket } = useContext(SocketContext);

    const { createNotify, deleteNotify } = useContext(NotifyContext);

    // 0. Use userContext
    const {
        userState: { user },
    } = useContext(UserContext);

    // 1. Main state
    const [postState, dispatch] = useReducer(postReducer, {
        postLoading: true,
        posts: [],
        post: null,
    });

    // 2. Modal add post
    const [showAddPostModal, setShowAddPostModal] = useState(false);

    // 3. Modal action
    const [showActionModal, setShowActionModal] = useState(false);

    // 4. Modal update post
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);

    // 5. Modal delete post
    const [showDeletePostModal, setShowDeletePostModal] = useState(false);

    // 6. Modal comment
    const [showCommentModal, setShowCommentModal] = useState({
        show: false,
        postData: null,
    });

    // 7. Modal action comment
    const [showActionCommentModal, setShowActionCommentModal] = useState({
        show: false,
        commentData: null,
    });

    // 8. Edit Content comment
    const [isEditComment, setIsEditComment] = useState({
        show: false,
        commentID: null,
    });

    // 9. Modal delete Comment
    const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);

    // ************************************* Function *************************************

    // 0. Find Post
    const findPost = (postID) => {
        const post = postState.posts.find((post) => {
            return post._id === postID;
        });
        dispatch({
            type: FIND_POST,
            payload: post,
        });
    };

    // 1. Create Post
    const createPost = async (addPostForm) => {
        try {
            const response = await axios.post(`${apiURL}/posts`, addPostForm);

            await createNotify({
                postID: response.data.post._id,
                text: 'added a new post: ',
                recipients: user.followers,
                url: `/post/${response.data.post._id}`,
                content: response.data.post.content,
                image: response.data.post.images[0].url,
            });

            if (response.data.success) {
                dispatch({
                    type: ADD_POST,
                    payload: { ...response.data.post, user },
                });
                return response.data;
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    // 2. Get Post
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiURL}/posts`);

            if (response.data.success) {
                dispatch({
                    type: GET_POSTS_SUCCESS,
                    payload: {
                        posts: response.data.posts,
                        postsCount: response.data.postsCount,
                    },
                });
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    // 3. Update Post
    const updatePost = async (postID, updatedPostForm) => {
        try {
            const response = await axios.put(
                `${apiURL}/posts/update/${postID}`,
                updatedPostForm
            );

            if (response.data.success) {
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data.post,
                });
                return response.data;
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    // 4. Delete Post
    const deletePost = async (postID) => {
        try {
            const response = await axios.delete(
                `${apiURL}/posts/delete/${postID}`
            );

            await deleteNotify(
                response.data.post._id,
                `/post/${response.data.post._id}`
            );

            if (response.data.success) {
                dispatch({
                    type: DELETE_POST,
                    payload: response.data.post,
                });

                return response.data;
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    // 5. Like Post
    const likePost = async (postID) => {
        try {
            const response = await axios.post(`${apiURL}/posts/like/${postID}`);

            socket.emit('LikePost', response.data.post);

            if (user._id !== response.data.post.user._id) {
                await createNotify({
                    postID: user._id,
                    text: 'like your post.',
                    recipients: [response.data.post.user._id],
                    url: `/post/${response.data.post._id}`,
                    content: response.data.post.content,
                    image: response.data.post.images[0].url,
                });
            }

            if (response.data.success) {
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data.post,
                });
                return response.data;
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    // 6. UnLike Post
    const unLikePost = async (postID) => {
        try {
            const response = await axios.post(
                `${apiURL}/posts/unlike/${postID}`
            );

            socket.emit('UnLikePost', response.data.post);

            if (user._id !== response.data.post.user._id) {
                await deleteNotify(user._id, `/post/${response.data.post._id}`);
            }

            if (response.data.success) {
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data.post,
                });
                return response.data;
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    // 7. Comment Post
    const commentPost = async (commentForm) => {
        try {
            const response = await axios.post(
                `${apiURL}/comments`,
                commentForm
            );

            socket.emit('CommentPost', response.data.post);

            if (
                user._id !== response.data.post.user._id &&
                !response.data.comment.reply
            ) {
                await createNotify({
                    postID: response.data.comment._id,
                    text: 'has commented on your post.',
                    recipients: [response.data.post.user._id],
                    url: `/post/${response.data.post._id}`,
                    content: response.data.post.content,
                    image: response.data.post.images[0].url,
                });
            }

            if (
                response.data.comment.reply &&
                response.data.comment.tag._id !== user._id
            ) {
                await createNotify({
                    postID: response.data.comment._id,
                    text: 'mentioned you in a comment.',
                    recipients: [response.data.comment.tag._id],
                    url: `/post/${response.data.post._id}`,
                    content: response.data.post.content,
                    image: response.data.post.images[0].url,
                });
            }

            if (response.data.success) {
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data.post,
                });
                return response.data;
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    // 8. Update comment
    const updateComment = async (commentID, commentForm) => {
        try {
            const response = await axios.put(
                `${apiURL}/comments/${commentID}`,
                commentForm
            );

            if (response.data.success) {
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data.post,
                });
                return response.data;
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    // 9. Delete comment
    const deleteComment = async (commentID) => {
        try {
            const response = await axios.delete(
                `${apiURL}/comments/${commentID}`
            );

            socket.emit('DeleteCommentPost', response.data.post);

            // if (user._id !== response.data.post.user._id) {
            //     await deleteNotify(
            //         response.data.commentDelete._id,
            //         `/post/${response.data.post._id}`
            //     );
            // }

            if (response.data.success) {
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data.post,
                });
                return response.data;
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    // 10. Like comment
    const likeComment = async (commentID, commentData) => {
        try {
            const response = await axios.put(
                `${apiURL}/comments/like/${commentID}`,
                commentData
            );

            if (response.data.success) {
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data.post,
                });
                return response.data;
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    // 10. UnLike comment
    const unLikeComment = async (commentID, commentData) => {
        try {
            const response = await axios.put(
                `${apiURL}/comments/unlike/${commentID}`,
                commentData
            );

            if (response.data.success) {
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data.post,
                });
                return response.data;
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    // 11. Get Post Detail
    const getPostDetail = async (postID) => {
        try {
            const response = await axios.get(`${apiURL}/posts/${postID}`);

            if (response.data.success) {
                dispatch({
                    type: DETAIL_POST,
                    payload: response.data.post,
                });
                return response.data;
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    // ************************************* Post Data *************************************
    const PostContextData = {
        postState,
        showAddPostModal,
        setShowAddPostModal,
        showActionModal,
        setShowActionModal,
        showUpdatePostModal,
        setShowUpdatePostModal,
        showDeletePostModal,
        setShowDeletePostModal,
        showCommentModal,
        setShowCommentModal,
        showActionCommentModal,
        setShowActionCommentModal,
        isEditComment,
        setIsEditComment,
        showDeleteCommentModal,
        setShowDeleteCommentModal,
        createPost,
        getPosts,
        updatePost,
        deletePost,
        findPost,
        likePost,
        unLikePost,
        commentPost,
        updateComment,
        deleteComment,
        likeComment,
        unLikeComment,
        getPostDetail,
    };

    // ************************************* Return Provider *************************************
    return (
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
