import { NOTIFY } from '../utils/contants';

export const notifyReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case NOTIFY: {
            return {
                ...state,
                notifiesLoading: false,
                notifies: payload,
            };
        }
        default:
            return state;
    }
};
