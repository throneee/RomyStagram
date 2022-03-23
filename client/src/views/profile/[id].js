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
import CarouselPostImages from '../../components/posts/CarouselPostImages';
import UnFollowModal from '../../components/profile/UnFollowModal';

import { Button, Row, Col, Image } from 'react-bootstrap';

const Profile = () => {
    // ************************************* State *************************************
    const {
        userState: { user },
        getUser,
    } = useContext(UserContext);

    const [usersData, setUsersData] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            const userFetch = await getUser(id);
            setUsersData([userFetch]);
        };
        fetchUserData();
    }, [id, user]);

    const {
        postState: { posts },
        getPosts,
    } = useContext(PostContext);
    useEffect(() => {
        getPosts();
    }, []);

    // ************************************* Function or Variable declare *************************************
    let PostsOfUserCount = 0;
    posts.forEach((post) => {
        if (post.user._id === id) {
            PostsOfUserCount += 1;
        }
    });

    let postsOfUser = null;
    if (PostsOfUserCount === 0) {
        postsOfUser = (
            <div className='no-post d-flex flex-column align-items-center py-3 w-100'>
                <div className='rounded-circle d-flex justify-content-center align-items-center'>
                    <i className='bi bi-camera text-secondary'></i>
                </div>

                <h4 className='mb-0 mt-2 text-secondary'>No Posts Yet</h4>
            </div>
        );
    } else {
        postsOfUser = (
            <>
                <Row className='row-cols-1 row-cols-md-3'>
                    {posts.map((post) =>
                        post.user._id === id ? (
                            <Col key={post._id} className='mb-3'>
                                {post.images.length > 1 ? (
                                    <CarouselPostImages
                                        images={post.images}
                                        path='profile'
                                    />
                                ) : (
                                    <Image
                                        className='w-100 rounded-3 border'
                                        height={'200px'}
                                        src={post.images[0].url}></Image>
                                )}
                            </Col>
                        ) : null
                    )}
                </Row>
            </>
        );
    }

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
                                    countPost={PostsOfUserCount}
                                />

                                <div className='profile-middle border-top'>
                                    <div className='profile-middle-top text-center'>
                                        <Button className='text-dark border-top border-secondary py-3'>
                                            <i className='bi bi-table me-2'></i>
                                            Posts
                                        </Button>
                                    </div>

                                    <div className='profile-middle-bottom'>
                                        {postsOfUser}
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
