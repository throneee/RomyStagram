import React, { createContext, useReducer } from 'react';
import { socketReducer } from '../reducers/socketReducer';
import { SOCKET } from '../utils/contants';

export const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
    // ************************************* State *************************************
    const [socket, dispatch] = useReducer(socketReducer, null);

    // ************************************* Function *************************************
    const getSocket = (socket) => {
        dispatch({
            type: SOCKET,
            payload: socket,
        });
    };

    // ************************************* Socket data *************************************
    const SocketContextData = { socket, getSocket };

    // ************************************* Return *************************************

    return (
        <SocketContext.Provider value={SocketContextData}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContextProvider;
