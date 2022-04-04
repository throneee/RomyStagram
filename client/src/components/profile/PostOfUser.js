import React, { useState } from 'react';
import CarouselPostImages from '../../components/posts/CarouselPostImages';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import { Row, Col, Image, Spinner } from 'react-bootstrap';

const PostOfUser = ({ posts, postsCount }) => {
    // ************************************* State *************************************
    const itemsPerPage = 6;
    const [hasMoreItems, sethasMoreItems] = useState(true);
    const [records, setrecords] = useState(itemsPerPage);

    // ************************************* Function or Variable declare *************************************
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

    let body;
    if (postsCount === 0) {
        body = (
            <div className='no-post d-flex flex-column align-items-center py-3 w-100'>
                <div className='rounded-circle d-flex justify-content-center align-items-center'>
                    <i className='bi bi-camera text-secondary'></i>
                </div>

                <h4 className='mb-0 mt-2 text-secondary'>No Posts Yet</h4>
            </div>
        );
    } else {
        body = (
            <InfiniteScroll
                loadMore={loadFunc}
                hasMore={hasMoreItems}
                loader={
                    <div className='text-center loader' key={0}>
                        <Spinner animation='border' variant='info' />
                    </div>
                }>
                <Row className='row-cols-1 row-cols-md-3'>
                    {showPost(posts)}
                </Row>
            </InfiniteScroll>
        );
    }

    // ************************************* Return *************************************
    return <>{body}</>;
};

export default PostOfUser;
