import { SET_AUTH, UPDATE_USER } from '../utils/contants';

export const userReducer = (state, action) => {
    const {
        type,
        payload: { isAuthenticated, user },
    } = action;

    switch (type) {
        case SET_AUTH:
            return {
                ...state,
                isLoading: false,
                isAuthenticated,
                user,
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
