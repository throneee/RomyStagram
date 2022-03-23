import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

import { Image, Button } from 'react-bootstrap';

const Info = ({ userData, countPost }) => {
    // ************************************* State *************************************
    const { id } = useParams();

    const {
        userState: { user },
        setShowUpdateUserModal,
        setShowFollowingModal,
        setShowFollowersModal,
        setShowUnFollowModal,
        followUser,
    } = useContext(UserContext);

    // ************************************* Function *************************************
    const handleUpdateUser = () => {
        setShowUpdateUserModal(true);
    };

    const handleFollow = () => {
        followUser(id);
    };

    const handleShowUnFollowModal = () => {
        setShowUnFollowModal({
            show: true,
            userData,
        });
    };

    const handleShowFollowing = () => {
        setShowFollowingModal({
            show: true,
            datas: userData.following,
        });
    };

    const handleShowFollowers = () => {
        setShowFollowersModal({
            show: true,
            datas: userData.followers,
        });
    };

    // ************************************* Return *************************************
    return (
        <div className='profile-top d-flex align-items-center py-5'>
            <div className='profile-top-left text-center'>
                <Image
                    className='img-cover border'
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
                                onClick={handleShowUnFollowModal}>
                                Unfollow
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
                        <span className='fw-bolder'>{countPost}</span>{' '}
                        {countPost > 1 ? 'posts' : 'post'}
                    </span>

                    <span
                        className={
                            user._id === id ? 'mx-5 show-modal-follow' : 'mx-5'
                        }
                        onClick={user._id === id ? handleShowFollowers : null}>
                        <span className='fw-bolder'>
                            {userData.followers.length}
                        </span>
                        &nbsp;followers
                    </span>

                    <span
                        className={user._id === id ? 'show-modal-follow' : ''}
                        onClick={user._id === id ? handleShowFollowing : null}>
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
