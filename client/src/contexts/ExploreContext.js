import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import { exploreReducer } from '../reducers/exploreReducer';
import {
    apiURL,
    GET_MORE_POSTS_EXPLORE,
    GET_POSTS_EXPLORE,
} from '../utils/contants';

export const ExploreContext = createContext();

const ExploreContextProvider = ({ children }) => {
    // ************************************* State *************************************
    const [exploreState, dispatch] = useReducer(exploreReducer, {
        exploreLoading: true,
        posts: [],
        postsCount: 9,
        page: 2,
        firstLoad: false,
    });

    // ************************************* Function *************************************
    const getPostsExplore = async () => {
        try {
            const response = await axios.get(`${apiURL}/posts/explore`);

            if (response.data.success) {
                dispatch({
                    type: GET_POSTS_EXPLORE,
                    payload: {
                        posts: response.data.posts,
                        postsCount: response.data.postsCount,
                    },
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

    const getMorePostsExplore = async (page) => {
        try {
            const response = await axios.get(
                `${apiURL}/posts/explore?limit=${page * 9}`
            );

            if (response.data.success) {
                dispatch({
                    type: GET_MORE_POSTS_EXPLORE,
                    payload: {
                        posts: response.data.posts,
                        postsCount: response.data.postsCount,
                    },
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
    const ExploreContextData = {
        exploreState,
        getPostsExplore,
        getMorePostsExplore,
    };

    // ************************************* Return Provider *************************************
    return (
        <ExploreContext.Provider value={ExploreContextData}>
            {children}
        </ExploreContext.Provider>
    );
};

export default ExploreContextProvider;
