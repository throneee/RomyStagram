import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import UserContextProvider from './contexts/UserContext';
import PostContextProvider from './contexts/PostContext';
import ExploreContextProvider from './contexts/ExploreContext';
import SocketContextProvider from './contexts/SocketContext';
import Loading from './components/layout/Loading';
import NotifyContextProvider from './contexts/NotifyContext';

ReactDOM.render(
    <React.StrictMode>
        <SocketContextProvider>
            <UserContextProvider>
                <NotifyContextProvider>
                    <PostContextProvider>
                        <ExploreContextProvider>
                            <Loading />
                            <App />
                        </ExploreContextProvider>
                    </PostContextProvider>
                </NotifyContextProvider>
            </UserContextProvider>
        </SocketContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
