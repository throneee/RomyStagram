import { GET_MORE_POSTS_EXPLORE, GET_POSTS_EXPLORE } from '../utils/contants';

export const exploreReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_POSTS_EXPLORE: {
            return {
                ...state,
                exploreLoading: false,
                posts: payload.posts,
                postsCount: payload.postsCount,
                firstLoad: true,
            };
        }
        case GET_MORE_POSTS_EXPLORE: {
            return {
                ...state,
                posts: payload.posts,
                postsCount: payload.postsCount,
                page: state.page + 1,
            };
        }
        default:
            return state;
    }
};
