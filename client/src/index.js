import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import UserContextProvider from './contexts/UserContext';
import Loading from './components/layout/Loading';

ReactDOM.render(
    <React.StrictMode>
        <UserContextProvider>
            <Loading />
            <App />
        </UserContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
