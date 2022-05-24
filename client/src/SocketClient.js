import React, { useContext, useEffect } from 'react';
import { NotifyContext } from './contexts/NotifyContext';
import { PostContext } from './contexts/PostContext';
import { SocketContext } from './contexts/SocketContext';

import { UserContext } from './contexts/UserContext';

const SocketClient = () => {
    // ************************************* State *************************************
    const {
        userState: { user },
        updateUser,
    } = useContext(UserContext);

    const { socket } = useContext(SocketContext);

    const { getPosts } = useContext(PostContext);

    const { getNotifies } = useContext(NotifyContext);

    // ************************************* Function *************************************
    // 1. Connect
    useEffect(() => {
        socket && user && socket.emit('UsersConnected', user._id);
    }, [socket, user]);

    // 2. Like Post
    useEffect(() => {
        socket &&
            socket.on('LikePostToClient', (post) => {
                getPosts();
            });

        return () => socket && socket.off('LikePostToClient');
    }, [socket, getPosts]);

    // 3. UnLike Post
    useEffect(() => {
        socket &&
            socket.on('UnLikePostToClient', (post) => {
                getPosts();
            });

        return () => socket && socket.off('UnLikePostToClient');
    }, [socket, getPosts]);

    // 4. Comment Post
    useEffect(() => {
        socket &&
            socket.on('CommentPostToClient', (post) => {
                getPosts();
            });

        return () => socket && socket.off('CommentPostToClient');
    }, [socket, getPosts]);

    // 5. Comment Post
    useEffect(() => {
        socket &&
            socket.on('DeleteCommentPostToClient', (post) => {
                getPosts();
            });

        return () => socket && socket.off('DeleteCommentPostToClient');
    }, [socket, getPosts]);

    // 6. Follow User
    useEffect(() => {
        socket &&
            socket.on('FollowUserToClient', (newUser) => {
                updateUser(newUser._id, newUser);
            });

        return () => socket && socket.off('FollowUserToClient');
    }, [socket]);

    // 7. UnFollow User
    useEffect(() => {
        socket &&
            socket.on('UnFollowUserToClient', (newUser) => {
                updateUser(newUser._id, newUser);
            });

        return () => socket && socket.off('UnFollowUserToClient');
    }, [socket]);

    // 8. Create Notify
    useEffect(() => {
        socket &&
            socket.on('CreateNotifyToClient', (notify) => {
                getNotifies();
            });

        return () => socket && socket.off('CreateNotifyToClient');
    }, [socket]);

    // 9. Delete Notify
    useEffect(() => {
        socket &&
            socket.on('DeleteNotifyToClient', (notify) => {
                getNotifies();
            });

        return () => socket && socket.off('DeleteNotifyToClient');
    }, [socket]);

    // ************************************* Return *************************************
    return <></>;
};

export default SocketClient;
