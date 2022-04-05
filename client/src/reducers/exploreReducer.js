import { GET_POSTS_EXPLORE } from '../utils/contants';

export const exploreReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_POSTS_EXPLORE: {
            if (JSON.stringify(state.posts) === JSON.stringify(payload)) {
                return state;
            } else {
                return {
                    ...state,
                    exploreLoading: false,
                    posts: payload,
                };
            }
        }
        default:
            return state;
    }
};
