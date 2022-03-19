import React, { createContext, useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import { userReducer } from '../reducers/userReducer';
import {
    apiURL,
    FOLLOWERS,
    FOLLOWING,
    LOCAL_STORAGE_TOKEN_NAME,
    SET_AUTH,
    UPDATE_USER,
} from '../utils/contants';
import setUserToken from '../utils/setUserToken';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    // ************************************* State *************************************

    // 1. Main User
    const [userState, dispatch] = useReducer(userReducer, {
        isLoading: true,
        isAuthenticated: false,
        user: null,
    });

    // 2. Modal
    const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);

    // 3. Toast
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
    });

    // 4. Loading
    const [showLoading, setShowLoading] = useState(false);

    // 5. List user Search
    const [usersSearch, setUsersSearch] = useState([]);

    // ************************************* Function *************************************

    // 1. Authenticated User
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setUserToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }

        try {
            const response = await axios.get(`${apiURL}/user`);
            if (response.data.success) {
                dispatch({
                    type: SET_AUTH,
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user,
                    },
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setUserToken(null);
            dispatch({
                type: SET_AUTH,
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            });
        }
    };
    useEffect(() => {
        loadUser();
    }, []);

    // 2. Sign Up
    const signUp = async (signUpForm) => {
        try {
            const response = await axios.post(
                `${apiURL}/user/signup`,
                signUpForm
            );

            if (response.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                );
            }

            await loadUser();

            return response.data;
        } catch (error) {
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    // 3. Sign In
    const signIn = async (signInForm) => {
        try {
            const response = await axios.post(
                `${apiURL}/user/signin`,
                signInForm
            );

            if (response.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                );
            }

            await loadUser();

            return response.data;
        } catch (error) {
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    // 4. Logout
    const logout = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch({
            type: SET_AUTH,
            payload: {
                isAuthenticated: false,
                user: null,
            },
        });
    };

    // 5. Search User
    const searchUser = async (search) => {
        try {
            const response = await axios.get(
                `${apiURL}/user/search?username=${search}`
            );

            if (response.data.success) {
                setUsersSearch(response.data.users);
            }
        } catch (error) {
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    // 6. Get User
    const getUser = async (id) => {
        try {
            const response = await axios.get(`${apiURL}/user/${id}`);

            if (response.data.success) {
                return response.data.user;
            }
        } catch (error) {
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    // 7. Update User
    const updateUser = async (id, updateUserForm) => {
        try {
            const response = await axios.put(
                `${apiURL}/user/update/${id}`,
                updateUserForm
            );

            if (response.data.success) {
                dispatch({
                    type: UPDATE_USER,
                    payload: { user: response.data.user },
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Internal Server Error' };
        }
    };

    // 8. Follow User
    const followUser = async (id) => {
        try {
            const response = await axios.post(`${apiURL}/user/follow/${id}`);

            if (response.data.success) {
                dispatch({
                    type: FOLLOWERS,
                    payload: { user: response.data.userFollowers },
                });

                dispatch({
                    type: FOLLOWING,
                    payload: { user: response.data.userFollowing },
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Internal Server Error' };
        }
    };

    // ************************************* User Data *************************************
    const userContextData = {
        userState,
        usersSearch,
        setUsersSearch,
        showUpdateUserModal,
        setShowUpdateUserModal,
        showToast,
        setShowToast,
        showLoading,
        setShowLoading,
        getUser,
        searchUser,
        updateUser,
        followUser,
        signUp,
        signIn,
        logout,
    };

    // ************************************* Return Provider *************************************
    return (
        <UserContext.Provider value={userContextData}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;