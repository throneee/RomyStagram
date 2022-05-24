import { SOCKET } from '../utils/contants';

export const socketReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case SOCKET: {
            return payload;
        }
        default:
            return state;
    }
};
