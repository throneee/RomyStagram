import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Button } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';

const Info = ({ userData }) => {
    // ************************************* State *************************************
    const { id } = useParams();

    const {
        userState: { user },
        setShowUpdateUserModal,
        setShowFollowingModal,
        setShowFollowersModal,
        followUser,
        unFollowUser,
    } = useContext(UserContext);

    // ************************************* Function *************************************
    const handleUpdateUser = () => {
        setShowUpdateUserModal(true);
    };

    const handleFollow = (e) => {
        e.preventDefault();

        followUser(id);
    };

    const handleUnFollow = (e) => {
        e.preventDefault();

        unFollowUser(id);
    };

    const handleShowFollowing = () => {
        setShowFollowingModal(true);
    };

    // ************************************* Return *************************************
    return (
        <div className='profile-top d-flex align-items-center py-5'>
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
                    <h3 className='fw-light'>{userData.username}</h3>
                    {user._id === id ? (
                        <>
                            <Button
                                className='mx-4 text-dark'
                                onClick={handleUpdateUser}>
                                Edit Profile
                            </Button>
                            <i className='bi bi-gear'></i>
                        </>
                    ) : user.following.includes(id) ? (
                        <>
                            <Button
                                className='mx-4 btn-unfollow'
                                onClick={handleUnFollow}>
                                UnFollow
                            </Button>
                            <i className='bi bi-three-dots'></i>
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
                    <span>
                        <span className='fw-bolder'>0</span> posts
                    </span>

                    <span className='mx-5 show-modal-follow'>
                        <span className='fw-bolder'>
                            {userData.followers.length}
                        </span>
                        &nbsp;followers
                    </span>

                    <span
                        className='show-modal-follow'
                        onClick={handleShowFollowing}>
                        <span className='fw-bolder'>
                            {userData.following.length}
                        </span>
                        &nbsp;following
                    </span>
                </div>

                <div>
                    <h6>{userData.fullname}</h6>
                </div>

                <span>{userData.bio}</span>
            </div>
        </div>
    );
};

export default Info;
