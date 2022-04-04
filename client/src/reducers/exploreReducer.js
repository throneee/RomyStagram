import { GET_POSTS_EXPLORE } from '../utils/contants';

export const exploreReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_POSTS_EXPLORE: {
            return {
                ...state,
                exploreLoading: false,
                posts: payload,
            };
        }
        default:
            return state;
    }
};
