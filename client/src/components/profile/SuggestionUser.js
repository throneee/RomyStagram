import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

import { Image, Button } from 'react-bootstrap';

const SuggestionUser = ({ suggestionUser, usersSuggestionCount }) => {
    // ************************************* State *************************************
    const {
        userState: { user },
        followUser,
        logout,
    } = useContext(UserContext);

    // ************************************* Function *************************************
    const handleLogout = () => {
        logout();
    };

    const handleFollow = (id) => {
        followUser(id);
    };

    // ************************************* Return *************************************
    if (suggestionUser) {
        return (
            <>
                <div className='home-right-top d-flex justify-content-between align-items-center'>
                    <div className='d-flex align-items-center'>
                        <Link to={`/profile/${user._id}`}>
                            <Image
                                className='img-cover border'
                                roundedCircle={true}
                                src={user.avatar}
                                width={'60px'}
                                height={'60px'}></Image>
                        </Link>

                        <div className='ms-3'>
                            <h6 className='mb-0'>
                                {
                                    <Link
                                        to={`/profile/${user._id}`}
                                        className='home-right-profileName'>
                                        {user.username}
                                    </Link>
                                }
                            </h6>
                            <span className='text-secondary'>
                                {user.fullname}
                            </span>
                        </div>
                    </div>

                    <Button onClick={handleLogout}>Logout</Button>
                </div>

                <div className='home-right-middle flex-fill my-4 d-flex flex-column'>
                    <h6 className=' text-secondary'>Suggestions For You</h6>

                    <div className='flex-fill d-flex flex-column'>
                        {usersSuggestionCount === 0 ? (
                            <div className='d-flex flex-column align-items-center mt-3 text-secondary display-3'>
                                <i className='bi bi-emoji-neutral'></i>
                                <h6 className='mb-0'>No suggestion.</h6>
                            </div>
                        ) : (
                            <>
                                {suggestionUser.map((user) => (
                                    <div
                                        key={user._id}
                                        className='home-right-top mt-2 d-flex justify-content-between align-items-center'>
                                        <div className='d-flex align-items-center'>
                                            <Link to={`/profile/${user._id}`}>
                                                <Image
                                                    className='img-cover border'
                                                    roundedCircle={true}
                                                    src={user.avatar}
                                                    width={'34px'}
                                                    height={'34px'}></Image>
                                            </Link>

                                            <div className='ms-3'>
                                                <h6 className='mb-0'>
                                                    {
                                                        <Link
                                                            to={`/profile/${user._id}`}
                                                            className='home-right-profileName'>
                                                            {user.username}
                                                        </Link>
                                                    }
                                                </h6>
                                                <span className='text-secondary'>
                                                    {user.fullname}
                                                </span>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={() =>
                                                handleFollow(user._id)
                                            }>
                                            Follow
                                        </Button>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>

                <div className='home-right-bottom'>
                    <div>
                        About - Help - Press - API - Jobs - Privacy - Terms -
                        Locations - Top Accounts - Hashtags - Languages
                    </div>
                    <div className='mt-3'>@ 2022 ROMYSTAGRAM FROM LUONG</div>
                </div>
            </>
        );
    }
    return <></>;
};

export default SuggestionUser;
