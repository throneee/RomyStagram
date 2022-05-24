import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExploreContext } from '../contexts/ExploreContext';
import ToastMessages from '../components/layout/ToastMessages';
import AddPostModal from '../components/posts/AddPostModal';
import CarouselPostImages from '../components/posts/CarouselPostImages';
import InfiniteScroll from 'react-infinite-scroller';

import { Spinner, Row, Col, Image } from 'react-bootstrap';

const Explore = () => {
    // ************************************* State *************************************
    const {
        exploreState: { exploreLoading, posts },
        getPostsExplore,
    } = useContext(ExploreContext);

    const [loading, setLoading] = useState(exploreLoading);

    useEffect(() => {
        getPostsExplore();
        setLoading(false);
    }, [getPostsExplore]);

    const itemsPerPage = 9;
    const [hasMoreItems, sethasMoreItems] = useState(true);
    const [records, setrecords] = useState(itemsPerPage);

    // ************************************* Function *************************************
    const showPost = (posts) => {
        var items = [];

        for (var i = 0; i < records; i++) {
            if (posts[i] === undefined) {
                continue;
            } else {
                items.push(
                    <Col key={i} className='mb-3'>
                        {posts[i].images.length > 1 ? (
                            <CarouselPostImages
                                post={posts[i]}
                                images={posts[i].images}
                                path='profile'
                            />
                        ) : (
                            <Link to={`/post/${posts[i]._id}`}>
                                <div className='profile-single-post position-relative'>
                                    <Image
                                        className='w-100 rounded-3 border'
                                        height={'200px'}
                                        src={posts[i].images[0].url}></Image>

                                    <div className='profile-post-thumb position-absolute w-100 h-100 d-flex justify-content-center align-items-center rounded-3'>
                                        <div className='text-white me-3'>
                                            <i className='bi bi-suit-heart-fill me-2'></i>
                                            <span>{posts[i].likes.length}</span>
                                        </div>
                                        <div className='text-white ms-3'>
                                            <i className='bi bi-chat-fill me-2'></i>
                                            <span>
                                                {posts[i].comments.length}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </Col>
                );
            }
        }
        return items;
    };

    const loadFunc = () => {
        if (records >= posts.length) {
            sethasMoreItems(false);
        } else {
            setTimeout(() => {
                setrecords(records + itemsPerPage);
            }, 1000);
        }
    };

    // ************************************* Return *************************************
    return (
        <>
            <div className='content'>
                <div className='content-body'>
                    <div className='explore d-flex flex-column justify-content-between align-items-center'>
                        {loading ? (
                            <div className='text-center my-5'>
                                <Spinner animation='border' variant='info' />
                            </div>
                        ) : posts.length === 0 ? (
                            <div className='pb-4'>
                                <div className='no-post d-flex flex-column align-items-center py-3 mt-4 w-100'>
                                    <div className='rounded-circle d-flex justify-content-center align-items-center'>
                                        <i className='bi bi-camera text-secondary'></i>
                                    </div>

                                    <h4 className='mb-0 mt-3 text-secondary'>
                                        No Posts Yet
                                    </h4>
                                </div>
                            </div>
                        ) : (
                            <>
                                <InfiniteScroll
                                    className='w-100'
                                    loadMore={loadFunc}
                                    hasMore={hasMoreItems}
                                    loader={
                                        <div
                                            className='text-center loader'
                                            key={0}>
                                            <Spinner
                                                animation='border'
                                                variant='info'
                                            />
                                        </div>
                                    }>
                                    <Row className='row-cols-1 row-cols-md-3 mt-4'>
                                        {showPost(posts)}
                                    </Row>
                                </InfiniteScroll>
                            </>
                        )}

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
                                <span className='me-3'>Top Account</span>
                                <span className='me-3'>Hashtags</span>
                                <span className='me-3'>Locations</span>
                                <span>Instagram Lite</span>
                            </div>

                            <div className='mt-3'>
                                <span className='me-3'>English</span>
                                <span>@ 2022 RomyStagram from Luong</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastMessages />
            <AddPostModal />
        </>
    );
};

export default Explore;
