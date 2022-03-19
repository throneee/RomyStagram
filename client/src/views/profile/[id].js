import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import UpdateUserModal from '../../components/profile/UpdateUserModal';
import ToastMessages from '../../components/layout/ToastMessages';

import { Image, Button } from 'react-bootstrap';

const Profile = () => {
    // ************************************* State *************************************
    const {
        userState: { user },
        setShowUpdateUserModal,
        getUser,
        followUser,
    } = useContext(UserContext);

    const [usersData, setUsersData] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        if (user._id === id) {
            setUsersData([user]);
        } else {
            const fetchUserData = async () => {
                const userFetch = await getUser(id);
                setUsersData([userFetch]);
            };
            fetchUserData();
        }
    }, [id, user]);

    // ************************************* Function *************************************
    const handleUpdateUser = () => {
        setShowUpdateUserModal(true);
    };

    const handleFollow = (e) => {
        e.preventDefault();

        followUser(id);
    };

    // ************************************* Return *************************************
    return (
        <>
            <UpdateUserModal />
            <ToastMessages />
            <div className='content'>
                <div className='content-body'>
                    {usersData.map((userData) => {
                        return (
                            <div key={userData._id}>
                                <div className='profile-top d-flex align-items-center pt-4 pb-5'>
                                    <div className='profile-top-left text-center'>
                                        <Image
                                            className='img-cover'
                                            roundedCircle={true}
                                            src={userData.avatar}
                                            width='150px'
                                            height={'150px'}></Image>
                                    </div>

                                    <div className='profile-top-right flex-fill'>
                                        <div className='d-flex align-items-center'>
                                            <h3 className='fw-light'>
                                                {userData.username}
                                            </h3>
                                            {user._id === id ? (
                                                <>
                                                    <Button
                                                        className='mx-4 text-dark'
                                                        onClick={
                                                            handleUpdateUser
                                                        }>
                                                        Edit Profile
                                                    </Button>
                                                    <i className='bi bi-gear'></i>
                                                </>
                                            ) : (
                                                <>
                                                    <Button
                                                        className='mx-4 btn-follow'
                                                        onClick={handleFollow}>
                                                        Follow
                                                    </Button>
                                                    <i className='bi bi-three-dots'></i>
                                                </>
                                            )}
                                        </div>

                                        <div className='my-3'>
                                            <span>0 posts</span>
                                            <span className='mx-5'>
                                                {userData.followers.length}
                                                &nbsp; followers
                                            </span>
                                            <span>
                                                {userData.following.length}
                                                &nbsp; following
                                            </span>
                                        </div>

                                        <div>
                                            <h6>{userData.fullname}</h6>
                                        </div>

                                        <span>{userData.bio}</span>
                                    </div>
                                </div>

                                <div className='profile-middle border-top'>
                                    <div className='profile-middle-top text-center'>
                                        <Button className='text-dark border-top border-secondary py-3'>
                                            <i className='bi bi-table me-2'></i>
                                            Posts
                                        </Button>
                                    </div>

                                    <div className='profile-middle-bottom'>
                                        Post
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
