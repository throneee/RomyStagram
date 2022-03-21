import React, { createContext, useReducer, useState } from 'react';
import axios from 'axios';
import { postReducer } from '../reducers/postReducer';

import {
    apiURL,
    ADD_POST,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAIL,
} from '../utils/contants';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    // ************************************* State *************************************
    // 1. Main state
    const [postState, dispatch] = useReducer(postReducer, {
        postLoading: true,
        posts: [],
        post: null,
    });

    // 1. Modal add post
    const [showAddPostModal, setShowAddPostModal] = useState(false);

    // ************************************* Function *************************************

    // 1. Create Post
    const createPost = async (addPostForm) => {
        try {
            const response = await axios.post(`${apiURL}/posts`, addPostForm);

            if (response.data.success) {
                dispatch({
                    type: ADD_POST,
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

    // ************************************* Post Data *************************************
    const PostContextData = {
        postState,
        showAddPostModal,
        setShowAddPostModal,
        createPost,
        getPosts,
    };

    // ************************************* Return Provider *************************************
    return (
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
