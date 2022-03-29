import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import AlertMessages from '../layout/AlertMessages';

import { Form, Button } from 'react-bootstrap';

const Signin = () => {
    // ************************************* State *************************************
    const { signIn, setShowToast, setShowLoading } = useContext(UserContext);

    const [signInForm, setSignInForm] = useState({
        email: '',
        password: '',
    });
    const { email, password } = signInForm;

    const [alertState, setAlertState] = useState(null);

    const [showPassword, setShowPassword] = useState(false);

    // ************************************* Function *************************************
    const onChangeSignInForm = (e) => {
        setSignInForm({ ...signInForm, [e.target.name]: e.target.value });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        setShowLoading(true);

        try {
            const signInData = await signIn(signInForm);

            if (!signInData.success) {
                setAlertState({ message: signInData.message });
                setTimeout(() => {
                    setAlertState(null);
                }, 5000);
            }

            setShowToast({
                show: true,
                type: 'info',
                message: 'Login Successfully.',
            });
        } catch (error) {
            console.log(error.message);
        }

        setShowLoading(false);
    };

    // ************************************* Return *************************************
    return (
        <div className='form signinForm w-100'>
            <Form onSubmit={handleSignIn}>
                <h3 className='mb-4'>Sign In</h3>
                <AlertMessages info={alertState}></AlertMessages>
                <Form.Group className='form-group mb-3'>
                    <Form.Control
                        className='rounded-3'
                        name='email'
                        type='email'
                        placeholder='Email'
                        required
                        value={email}
                        onChange={onChangeSignInForm}></Form.Control>
                </Form.Group>
                <Form.Group className='form-group mb-3 auth-pass'>
                    <Form.Control
                        className='rounded-3'
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        required
                        value={password}
                        onChange={onChangeSignInForm}></Form.Control>
                    <small
                        onClick={() => {
                            setShowPassword(!showPassword);
                        }}>
                        {showPassword ? 'Hide' : 'Show'}
                    </small>
                </Form.Group>
                <Form.Group className='form-group'>
                    <Button
                        className='form-submit rounded-3'
                        type='submit'
                        disabled={email && password ? false : true}>
                        Sign In
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default Signin;
