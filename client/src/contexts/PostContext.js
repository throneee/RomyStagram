import React, { createContext, useReducer, useState } from 'react';
import axios from 'axios';
import { postReducer } from '../reducers/postReducer';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    // ************************************* State *************************************
    // 1. Modal add post
    const [showAddPostModal, setShowAddPostModal] = useState(false);

    // ************************************* Function *************************************

    // ************************************* Post Data *************************************
    const PostContextData = {
        showAddPostModal,
        setShowAddPostModal,
    };

    // ************************************* Return Provider *************************************
    return (
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
