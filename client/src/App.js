import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';

import PageRender from './customRouter/PageRender';
import Landing from './components/layout/Landing';
import Auth from './components/auth/Auth';
import PrivateRoute from './customRouter/PrivateRoute';
import { SocketContext } from './contexts/SocketContext';

import SocketClient from './SocketClient';
import { NotifyContext } from './contexts/NotifyContext';
import { UserContext } from './contexts/UserContext';

const App = () => {
    const {
        userState: { user },
    } = useContext(UserContext);
    const { getSocket } = useContext(SocketContext);
    const { getNotifies } = useContext(NotifyContext);

    useEffect(() => {
        const socket = io('http://localhost:5000');

        getSocket(socket);

        return () => socket.close();
    }, []);

    useEffect(() => {
        if (user) {
            getNotifies();
        }
    }, [user]);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route
                        path='/signin'
                        element={<Auth authRoute='signin' />}></Route>
                    <Route
                        path='/signup'
                        element={<Auth authRoute='signup' />}></Route>
                    <Route
                        path='/:page'
                        element={
                            <PrivateRoute>
                                <PageRender />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/:page/:id'
                        element={
                            <PrivateRoute>
                                <PageRender />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
            <SocketClient></SocketClient>
        </>
    );
};

export default App;
