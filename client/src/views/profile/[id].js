import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { PostContext } from '../../contexts/PostContext';
import UpdateUserModal from '../../components/profile/UpdateUserModal';
import ToastMessages from '../../components/layout/ToastMessages';
import Info from '../../components/profile/Info';
import FollowingModal from '../../components/profile/FollowingModal';
import FollowersModal from '../../components/profile/FollowersModal';
import AddPostModal from '../../components/posts/AddPostModal';
import UnFollowModal from '../../components/profile/UnFollowModal';
import PostOfUser from '../../components/profile/PostOfUser';

import { Button } from 'react-bootstrap';
import SavedPostOfUser from '../../components/profile/SavedPostOfUser';

const Profile = () => {
    // ************************************* State *************************************
    const {
        userState: {
            user,
            postOfUser,
            postOfUserCount,
            postSavedOfUser,
            postSavedOfUserCount,
        },
        getUser,
    } = useContext(UserContext);

    const {
        postState: { posts },
    } = useContext(PostContext);

    const [usersData, setUsersData] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            const userFetch = await getUser(id);
            setUsersData([userFetch]);
        };
        fetchUserData();
    }, [id, user, posts, getUser]);

    const [saveTab, setSaveTab] = useState(false);

    // ************************************* Return *************************************
    return (
        <>
            <UpdateUserModal />
            <ToastMessages />
            <FollowingModal />
            <FollowersModal />
            <AddPostModal />
            <UnFollowModal />

            <div className='content'>
                <div className='content-body'>
                    {usersData.map((userData) => {
                        return (
                            <div key={userData._id}>
                                <Info
                                    userData={userData}
                                    postsCount={postOfUserCount}
                                />

                                <div className='profile-middle border-top'>
                                    <div className='profile-middle-top text-center'>
                                        {id === user._id ? (
                                            <>
                                                <Button
                                                    className={
                                                        saveTab
                                                            ? 'text-dark border-secondary py-3 me-4'
                                                            : 'text-dark border-top border-secondary py-3 me-4'
                                                    }
                                                    onClick={() =>
                                                        setSaveTab(false)
                                                    }>
                                                    <i className='bi bi-table me-2'></i>
                                                    Posts
                                                </Button>
                                                <Button
                                                    className={
                                                        saveTab
                                                            ? 'text-dark border-top border-secondary py-3 ms-4'
                                                            : 'text-dark border-secondary py-3 ms-4'
                                                    }
                                                    onClick={() =>
                                                        setSaveTab(true)
                                                    }>
                                                    <i className='bi bi-bookmark me-2'></i>
                                                    Saved
                                                </Button>
                                            </>
                                        ) : (
                                            <Button className='text-dark border-top border-secondary py-3 me-4'>
                                                <i className='bi bi-table me-2'></i>
                                                Posts
                                            </Button>
                                        )}
                                    </div>

                                    <div className='profile-middle-bottom'>
                                        {saveTab ? (
                                            <SavedPostOfUser
                                                posts={postSavedOfUser}
                                                postsCount={
                                                    postSavedOfUserCount
                                                }
                                            />
                                        ) : (
                                            <PostOfUser
                                                posts={postOfUser}
                                                postsCount={postOfUserCount}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className='profile-bottom text-center py-5'>
                                    <div className='d-flex flex-wrap justify-content-center'>
                                        <span className='me-3'>Meta</span>
                                        <span className='me-3'>About</span>
                                        <span className='me-3'>Blog</span>
                                        <span className='me-3'>Jobs</span>
                                        <span className='me-3'>Help</span>
                                        <span className='me-3'>API</span>
                                        <span className='me-3'>Privacy</span>
                                        <span className='me-3'>Terms</span>
                                        <span className='me-3'>
                                            Top Account
                                        </span>
                                        <span className='me-3'>Hashtags</span>
                                        <span className='me-3'>Locations</span>
                                        <span>Instagram Lite</span>
                                    </div>

                                    <div className='mt-3'>
                                        <span className='me-3'>English</span>
                                        <span>
                                            @ 2022 RomyStagram from Luong
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Profile;
