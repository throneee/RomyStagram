import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import AlertMessages from '../layout/AlertMessages';

import { Form, Button } from 'react-bootstrap';

const Signup = () => {
    // ************************************* State *************************************
    const { signUp, setShowToast, setShowLoading } = useContext(UserContext);

    const [signUpForm, setSignUpForm] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const { fullname, username, email, password, confirmPassword } = signUpForm;

    const [alertState, setAlertState] = useState(null);

    const [showPassword, setShowPassword] = useState(false);

    // ************************************* Function *************************************
    const onChangeSignUpForm = (e) => {
        setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        setShowLoading(true);

        if (password !== confirmPassword) {
            setAlertState({ message: 'Password not match' });
            setTimeout(() => {
                setAlertState(null);
            }, 5000);
            return;
        }

        try {
            const signUpData = await signUp(signUpForm);
            if (!signUpData.success) {
                setAlertState({ message: signUpData.message });
                setTimeout(() => {
                    setAlertState(null);
                }, 5000);
            }

            setShowToast({
                show: true,
                message: 'Register Successfully.',
            });
        } catch (error) {
            console.log(error.message);
        }

        setShowLoading(false);
    };

    // ************************************* Return *************************************
    return (
        <div className='form signupForm w-100'>
            <Form onSubmit={handleSignUp}>
                <h3 className='text-end mb-4'>Sign Up</h3>
                <AlertMessages info={alertState}></AlertMessages>
                <Form.Group className='form-group mb-3'>
                    <Form.Control
                        className='rounded-3'
                        name='fullname'
                        type='text'
                        placeholder='Full Name'
                        required
                        value={fullname}
                        onChange={onChangeSignUpForm}
                    />
                </Form.Group>

                <Form.Group className='form-group mb-4 position-relative'>
                    <Form.Control
                        className='rounded-3'
                        name='username'
                        type='text'
                        placeholder='Username'
                        required
                        value={username.toLowerCase().replace(/ /g, '')}
                        onChange={onChangeSignUpForm}
                    />
                    <span className='text-muted small-note'>
                        <i className='bi bi-caret-right-fill'></i>
                        Only lowercase letters allowed and not spacing.
                    </span>
                </Form.Group>

                <Form.Group className='form-group mb-3'>
                    <Form.Control
                        className='rounded-3'
                        name='email'
                        type='email'
                        placeholder='Email'
                        required
                        value={email}
                        onChange={onChangeSignUpForm}
                    />
                </Form.Group>

                <Form.Group className='form-group mb-4 auth-pass'>
                    <Form.Control
                        className='rounded-3'
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        required
                        value={password}
                        onChange={onChangeSignUpForm}></Form.Control>
                    <small
                        onClick={() => {
                            setShowPassword(!showPassword);
                        }}>
                        {showPassword ? 'Hide' : 'Show'}
                    </small>
                    <span className='text-muted small-note'>
                        <i className='bi bi-caret-right-fill'></i>
                        Password must be at least 6 characters.
                    </span>
                </Form.Group>

                <Form.Group className='form-group mb-3'>
                    <Form.Control
                        className='rounded-3'
                        name='confirmPassword'
                        type='password'
                        placeholder='Confirm Password'
                        required
                        value={confirmPassword}
                        onChange={onChangeSignUpForm}
                    />
                </Form.Group>

                <Form.Group className='form-group d-flex justify-content-end'>
                    <Button
                        className='form-submit rounded-3'
                        type='submit'
                        disabled={
                            fullname &&
                            username &&
                            email &&
                            password &&
                            confirmPassword
                                ? false
                                : true
                        }>
                        Sign Up
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default Signup;
