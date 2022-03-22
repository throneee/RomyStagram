import React, { createContext, useReducer, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { postReducer } from '../reducers/postReducer';

import {
    apiURL,
    ADD_POST,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAIL,
    UPDATE_POST,
    FIND_POST,
    DELETE_POST,
} from '../utils/contants';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    // ************************************* State *************************************
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

    // 5. Modal add post
    const [showDeletePostModal, setShowDeletePostModal] = useState(false);

    // 6. Modal add post
    const [showUnFollowModal, setShowUnFollowModal] = useState(false);

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
                    payload: response.data.posts,
                });
            }
        } catch (error) {
            dispatch({ type: GET_POSTS_FAIL });
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

            return response.data;
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

            return response.data;
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
        showUnFollowModal,
        setShowUnFollowModal,
        createPost,
        getPosts,
        updatePost,
        deletePost,
        findPost,
        likePost,
        unLikePost,
    };

    // ************************************* Return Provider *************************************
    return (
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
