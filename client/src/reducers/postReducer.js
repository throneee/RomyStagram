import { ADD_POST, GET_POSTS_SUCCESS, GET_POSTS_FAIL } from '../utils/contants';

export const postReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_POST: {
            return {
                ...state,
                postLoading: false,
                posts: [...state.posts, payload],
            };
        }
        case GET_POSTS_SUCCESS: {
            return {
                ...state,
                postLoading: false,
                posts: payload,
            };
        }
        case GET_POSTS_FAIL: {
            return {
                ...state,
                postLoading: false,
                posts: [],
            };
        }
        default:
            return state;
    }
};
