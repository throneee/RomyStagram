import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Navigate } from 'react-router-dom';

import Header from '../components/header/Header';

import { Spinner } from 'react-bootstrap';

const PrivateRoute = ({ children }) => {
    const {
        userState: { isLoading, isAuthenticated },
    } = useContext(UserContext);

    if (isLoading) {
        return (
            <div>
                <Spinner animation='border' variant='info'></Spinner>
            </div>
        );
    }

    return isAuthenticated ? (
        <>
            <Header />
            {children}
        </>
    ) : (
        <Navigate to='/signin' />
    );
};

export default PrivateRoute;
