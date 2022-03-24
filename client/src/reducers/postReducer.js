import {
    ADD_POST,
    GET_POSTS_SUCCESS,
    FIND_POST,
    UPDATE_POST,
    DELETE_POST,
} from '../utils/contants';

export const postReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case FIND_POST: {
            return {
                ...state,
                post: payload,
            };
        }
        case ADD_POST: {
            return {
                ...state,
                postLoading: false,
                posts: [...state.posts, payload],
            };
        }
        case GET_POSTS_SUCCESS: {
            if (JSON.stringify(state.posts) === JSON.stringify(payload)) {
                return state;
            } else {
                return {
                    ...state,
                    postLoading: false,
                    posts: payload,
                };
            }
        }
        case UPDATE_POST: {
            const updatedPosts = state.posts.map((post) =>
                post._id === payload._id ? payload : post
            );
            return {
                ...state,
                posts: updatedPosts,
            };
        }
        case DELETE_POST: {
            const newPosts = state.posts.filter(
                (post) => post._id !== payload._id
            );
            return {
                ...state,
                posts: newPosts,
            };
        }
        default:
            return state;
    }
};
