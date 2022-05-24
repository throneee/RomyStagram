import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';
import { notifyReducer } from '../reducers/notifyReducer';
import { apiURL, NOTIFY } from '../utils/contants';
import { SocketContext } from './SocketContext';
import { UserContext } from './UserContext';

export const NotifyContext = createContext();

const NotifyContextProvider = ({ children }) => {
    // ************************************* State *************************************
    const [notifiesState, dispatch] = useReducer(notifyReducer, {
        notifies: [],
        notifiesLoading: true,
        sound: false,
    });

    const { socket } = useContext(SocketContext);

    const {
        userState: { user },
    } = useContext(UserContext);

    // ************************************* Function *************************************
    const createNotify = async (notifyForm) => {
        try {
            // if (user._id === notifyForm.recipients[0]) return;

            const response = await axios.post(`${apiURL}/notifies`, notifyForm);

            socket.emit('CreateNotify', response.data.notify);
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    const getNotifies = async () => {
        try {
            const response = await axios.get(`${apiURL}/notifies`);

            if (response.data.success) {
                dispatch({
                    type: NOTIFY,
                    payload: response.data.notifies,
                });
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    const deleteNotify = async (postID, url) => {
        try {
            const response = await axios.delete(
                `${apiURL}/notifies/${postID}?url=${url}`
            );

            socket.emit('DeleteNotify', response.data.notify);
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    // ************************************* Socket data *************************************
    const NotifyContextData = {
        notifiesState,
        createNotify,
        getNotifies,
        deleteNotify,
    };

    // ************************************* Return *************************************

    return (
        <NotifyContext.Provider value={NotifyContextData}>
            {children}
        </NotifyContext.Provider>
    );
};

export default NotifyContextProvider;
