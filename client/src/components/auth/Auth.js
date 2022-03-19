import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

import SignIn from './Signin';
import SignUp from './Signup';

import { Button, Spinner } from 'react-bootstrap';

const Auth = ({ authRoute }) => {
    // ************************************* State *************************************
    const {
        userState: { isLoading, isAuthenticated },
    } = useContext(UserContext);

    // ************************************* Variable Declare *************************************
    let body;
    if (isLoading) {
        body = (
            <div className='d-flex justify-content-center align-items-center'>
                <Spinner animation='border' variant='info'></Spinner>
            </div>
        );
    } else if (isAuthenticated) {
        return <Navigate to='/home' />;
    } else {
        body = (
            <>
                {authRoute === 'signin' && <SignIn />}
                {authRoute === 'signup' && <SignUp />}
            </>
        );
    }

    // ************************************* Return *************************************
    return (
        <div
            className={
                authRoute === 'signin'
                    ? 'landing d-flex justify-content-center align-items-center min-vh-100'
                    : 'landing active d-flex justify-content-center align-items-center min-vh-100'
            }>
            <div
                className={
                    authRoute === 'signin' ? 'auth' : 'auth auth-signUp-mb'
                }>
                <div className='primary-bg d-flex justify-content-center align-items-center w-100 rounded-3'>
                    <div className='box signin w-50 h-100 d-flex flex-column justify-content-center align-items-center'>
                        <h2 className='text-white'>Already Have an Account?</h2>
                        <Link to='/signin'>
                            <Button className='bg-white text-secondary fw-bolder rounded-3'>
                                Sign In
                            </Button>
                        </Link>
                    </div>

                    <div className='box signup w-50 h-100 d-flex flex-column justify-content-center align-items-center'>
                        <h2 className='text-white'>Don't Have an Account?</h2>
                        <Link to='/signup'>
                            <Button className='bg-white text-secondary fw-bolder rounded-3'>
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>

                <div
                    className={
                        authRoute === 'signin'
                            ? 'authForm w-50 h-100 bg-white d-flex flex-column justify-content-center shadow overflow-hidden rounded-3'
                            : 'authForm w-50 h-100 bg-white d-flex flex-column justify-content-center shadow overflow-hidden rounded-3 active'
                    }>
                    {body}
                </div>
            </div>
        </div>
    );
};

export default Auth;
