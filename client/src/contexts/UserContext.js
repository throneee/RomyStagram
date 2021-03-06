import React, {
    createContext,
    useReducer,
    useEffect,
    useState,
    useContext,
} from 'react';
import axios from 'axios';
import { SocketContext } from './SocketContext';
import { userReducer } from '../reducers/userReducer';
import {
    apiURL,
    LOCAL_STORAGE_TOKEN_NAME,
    SET_AUTH,
    UPDATE_USER,
    GET_USER_POST,
    GET_USER_SAVED_POST,
} from '../utils/contants';
import setUserToken from '../utils/setUserToken';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    // ************************************* State *************************************
    const { socket } = useContext(SocketContext);
    // 1. Main User
    const [userState, dispatch] = useReducer(userReducer, {
        isLoading: true,
        isAuthenticated: false,
        user: null,
        socket: null,
        postOfUser: [],
        postOfUserCount: 0,
        postSavedOfUser: [],
        postSavedOfUserCount: 0,
    });

    // 2. Modal Update User
    const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);

    // 3. Toast
    const [showToast, setShowToast] = useState({
        show: false,
        type: '',
        message: '',
    });

    // 4. Loading
    const [showLoading, setShowLoading] = useState(false);

    // 5. List user Search
    const [usersSearch, setUsersSearch] = useState([]);

    // 6. Modal Following
    const [showFollowingModal, setShowFollowingModal] = useState({
        show: false,
        datas: [],
    });

    // 7. Modal Followers
    const [showFollowersModal, setShowFollowersModal] = useState({
        show: false,
        datas: [],
    });

    // 8. Modal Unfollow
    const [showUnFollowModal, setShowUnFollowModal] = useState({
        show: false,
        userData: null,
    });

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
            console.log(error.response.data);
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
            console.log(error.response.data);
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
                if (
                    JSON.stringify(usersSearch) !==
                    JSON.stringify(response.data.users)
                ) {
                    setUsersSearch(response.data.users);
                }
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    // 6. Get User
    const getUser = async (id) => {
        try {
            const response = await axios.get(`${apiURL}/user/${id}`);

            const response1 = await axios.get(`${apiURL}/posts/user/${id}`);

            const response2 = await axios.get(`${apiURL}/posts/savedpost`);

            if (response1.data.success && response2.data.success) {
                dispatch({
                    type: GET_USER_POST,
                    payload: {
                        posts: response1.data.posts,
                        postsCount: response1.data.postsCount,
                    },
                });

                dispatch({
                    type: GET_USER_SAVED_POST,
                    payload: {
                        postSavedOfUser: response2.data.posts,
                        postSavedOfUserCount: response2.data.postsCount,
                    },
                });

                return response.data.user;
            }
        } catch (error) {
            console.log(error.response.data);
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
            console.log(error.response.data);
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Internal Server Error' };
        }
    };

    // 8. Follow User
    const followUser = async (id) => {
        try {
            const response = await axios.post(`${apiURL}/user/follow/${id}`);

            socket.emit('FollowUser', response.data.userIsFollowed[0]);

            if (response.data.success) {
                dispatch({
                    type: UPDATE_USER,
                    payload: { user: response.data.userFollow[0] },
                });

                return response.data;
            }
        } catch (error) {
            console.log(error.response.data);
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Internal Server Error' };
        }
    };

    // 9. UnFollow User
    const unFollowUser = async (id) => {
        try {
            const response = await axios.post(`${apiURL}/user/unfollow/${id}`);

            socket.emit('UnFollowUser', response.data.userIsUnFollowed[0]);

            if (response.data.success) {
                dispatch({
                    type: UPDATE_USER,
                    payload: { user: response.data.userUnFollow[0] },
                });

                return response.data;
            }
        } catch (error) {
            console.log(error.response.data);
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Internal Server Error' };
        }
    };

    // 10. Suggestion User
    const suggestionUser = async () => {
        try {
            const response = await axios.get(`${apiURL}/user/suggestion`);

            return response.data;
        } catch (error) {
            console.log(error.response.data);
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Internal Server Error' };
        }
    };

    // 12. Saved Post
    const savedPost = async (postID) => {
        try {
            const response = await axios.post(
                `${apiURL}/posts/saved/${postID}`
            );

            if (response.data.success) {
                dispatch({
                    type: UPDATE_USER,
                    payload: { user: response.data.user },
                });
                return response.data;
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    // 13. Unsaved Post
    const unSavedPost = async (postID) => {
        try {
            const response = await axios.post(
                `${apiURL}/posts/unsaved/${postID}`
            );

            if (response.data.success) {
                dispatch({
                    type: UPDATE_USER,
                    payload: { user: response.data.user },
                });
                return response.data;
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data) {
                return error.response.data;
            } else return { success: false, message: error.message };
        }
    };

    // ************************************* User Data *************************************
    const userContextData = {
        userState,
        usersSearch,
        setUsersSearch,
        showUpdateUserModal,
        setShowUpdateUserModal,
        showFollowingModal,
        setShowFollowingModal,
        showFollowersModal,
        setShowFollowersModal,
        showUnFollowModal,
        setShowUnFollowModal,
        showToast,
        setShowToast,
        showLoading,
        setShowLoading,
        getUser,
        searchUser,
        updateUser,
        followUser,
        unFollowUser,
        suggestionUser,
        savedPost,
        unSavedPost,
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
