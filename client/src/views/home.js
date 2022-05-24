import React, { useContext, useEffect, useState } from 'react';
import { PostContext } from '../contexts/PostContext';
import { UserContext } from '../contexts/UserContext';
import ToastMessages from '../components/layout/ToastMessages';
import AddPostModal from '../components/posts/AddPostModal';
import UpdatePostModal from '../components/posts/UpdatePostModal';
import SinglePost from '../components/posts/SinglePost';
import ActionModal from '../components/posts/ActionModal';
import DeletePostModal from '../components/posts/DeletePostModal';
import UnFollowModal from '../components/profile/UnFollowModal';
import CommentModal from '../components/posts/comments/CommentModal';
import ActionCommentModal from '../components/posts/comments/ActionCommentModal';
import DeleteCommentModal from '../components/posts/comments/DeleteCommentModal';
import InfiniteScroll from 'react-infinite-scroller';

import { Spinner, Row, Col } from 'react-bootstrap';
import SuggestionUser from '../components/profile/SuggestionUser';

const Home = () => {
    // ************************************* State *************************************
    const {
        userState: { user },
        suggestionUser,
    } = useContext(UserContext);

    const {
        postState: { postLoading, posts },
        getPosts,
    } = useContext(PostContext);

    const [loading, setLoading] = useState(postLoading);

    const [usersSuggestion, setUsersSuggestion] = useState([]);
    const [usersSuggestionCount, setUsersSuggestionCount] = useState(0);

    useEffect(() => {
        getPosts();
        setLoading(postLoading);
    }, [posts, user, getPosts, postLoading]);

    useEffect(() => {
        const fetchUserSuggestion = async () => {
            const userFetch = await suggestionUser();
            setUsersSuggestion([userFetch.users]);
            setUsersSuggestionCount(userFetch.usersCount);
        };
        fetchUserSuggestion();
    }, [suggestionUser]);

    const itemsPerPage = 10;
    const [hasMoreItems, sethasMoreItems] = useState(true);
    const [records, setrecords] = useState(itemsPerPage);

    // ************************************* Function and Variable declare *************************************
    const showPost = (posts) => {
        var items = [];

        for (var i = 0; i < records; i++) {
            if (posts[i] === undefined) {
                continue;
            } else {
                items.push(
                    <Col key={i} className='mt-4'>
                        <SinglePost post={posts[i]} />
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

    let body = null;

    if (loading) {
        body = (
            <div className='text-center my-5 col-12 col-md-8'>
                <Spinner animation='border' variant='info' />
            </div>
        );
    } else if (posts.length === 0) {
        body = (
            <div className='pb-4 col-12 col-md-8'>
                <div className='no-post d-flex flex-column align-items-center py-3 mt-4 w-100'>
                    <div className='rounded-circle d-flex justify-content-center align-items-center'>
                        <i className='bi bi-camera text-secondary'></i>
                    </div>

                    <h4 className='mb-0 mt-3 text-secondary'>No Posts Yet</h4>
                </div>
            </div>
        );
    } else {
        body = (
            <div className='pb-4 col-12 col-md-8'>
                <InfiniteScroll
                    loadMore={loadFunc}
                    hasMore={hasMoreItems}
                    loader={
                        <div className='text-center loader mt-4' key={0}>
                            <Spinner animation='border' variant='info' />
                        </div>
                    }>
                    <Row className='row-cols-1'>{showPost(posts)}</Row>
                </InfiniteScroll>
            </div>
        );
    }

    // ************************************* Return *************************************
    return (
        <>
            <div className='content'>
                <div className='content-body row'>
                    {body}

                    <div className='home-right d-none d-md-block col-md-4'>
                        <SuggestionUser
                            suggestionUser={usersSuggestion[0]}
                            usersSuggestionCount={usersSuggestionCount}
                        />
                    </div>
                </div>
            </div>

            <ToastMessages />
            <AddPostModal />
            <ActionModal />
            <UpdatePostModal />
            <DeletePostModal />
            <UnFollowModal />
            <CommentModal />
            <ActionCommentModal />
            <DeleteCommentModal />
        </>
    );
};

export default Home;
