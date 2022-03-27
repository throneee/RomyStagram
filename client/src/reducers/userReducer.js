import { SET_AUTH, UPDATE_USER, GET_USER_POST } from '../utils/contants';

export const userReducer = (state, action) => {
    const {
        type,
        payload: { isAuthenticated, user, posts, postsCount },
    } = action;

    switch (type) {
        case SET_AUTH:
            return {
                ...state,
                isLoading: false,
                isAuthenticated,
                user,
            };
        case GET_USER_POST:
            return {
                ...state,
                postOfUser: posts,
                postOfUserCount: postsCount,
            };
        case UPDATE_USER: {
            return {
                ...state,
                user,
            };
        }
        default:
            return state;
    }
};
