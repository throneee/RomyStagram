let users = [];

const SocketServer = (socket) => {
    // 1. Connect and disconnect
    socket.on('UsersConnected', (id) => {
        users.push({ id, socketID: socket.id });
    });

    socket.on('disconnect', () => {
        users = users.filter((user) => user.socketID !== socket.id);
    });

    // 2. Like post
    socket.on('LikePost', (post) => {
        const ids = [...post.user.followers, post.user._id];
        const clients = users.filter((user) => ids.includes(user.id));
        if (clients.length > 0) {
            clients.forEach((client) => {
                socket.to(`${client.socketID}`).emit('LikePostToClient', post);
            });
        }
    });

    // 3. UnLike post
    socket.on('UnLikePost', (post) => {
        const ids = [...post.user.followers, post.user._id];
        const clients = users.filter((user) => ids.includes(user.id));
        if (clients.length > 0) {
            clients.forEach((client) => {
                socket
                    .to(`${client.socketID}`)
                    .emit('UnLikePostToClient', post);
            });
        }
    });

    // 4. Comment post
    socket.on('CommentPost', (post) => {
        const ids = [...post.user.followers, post.user._id];
        const clients = users.filter((user) => ids.includes(user.id));
        if (clients.length > 0) {
            clients.forEach((client) => {
                socket
                    .to(`${client.socketID}`)
                    .emit('CommentPostToClient', post);
            });
        }
    });

    // 5. Delete Comment post
    socket.on('DeleteCommentPost', (post) => {
        const ids = [...post.user.followers, post.user._id];
        const clients = users.filter((user) => ids.includes(user.id));
        if (clients.length > 0) {
            clients.forEach((client) => {
                socket
                    .to(`${client.socketID}`)
                    .emit('DeleteCommentPostToClient', post);
            });
        }
    });

    // 6. Follow User
    socket.on('FollowUser', (newUser) => {
        const user = users.find((user) => user.id === newUser._id);
        user &&
            socket.to(`${user.socketID}`).emit('FollowUserToClient', newUser);
    });

    // 7. UnFollow User
    socket.on('UnFollowUser', (newUser) => {
        const user = users.find((user) => user.id === newUser._id);
        user &&
            socket.to(`${user.socketID}`).emit('UnFollowUserToClient', newUser);
    });

    // 8. Create Notify
    socket.on('CreateNotify', (notify) => {
        const clients = users.filter((user) =>
            notify.recipients.includes(user.id)
        );

        if (clients.length > 0) {
            clients.forEach((client) => {
                socket
                    .to(`${client.socketID}`)
                    .emit('CreateNotifyToClient', notify);
            });
        }
    });

    // 9. Delete Notify
    socket.on('DeleteNotify', (notify) => {
        const clients = users.filter((user) =>
            notify.recipients.includes(user.id)
        );

        if (clients.length > 0) {
            clients.forEach((client) => {
                socket
                    .to(`${client.socketID}`)
                    .emit('DeleteNotifyToClient', notify);
            });
        }
    });
};

module.exports = SocketServer;
