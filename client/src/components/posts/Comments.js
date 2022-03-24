import React from 'react';

import SingleComment from './SingleComment';

const Comments = ({ comments }) => {
    return (
        <>
            {comments
                .map((comment) => {
                    return (
                        <SingleComment key={comment._id} comment={comment} />
                    );
                })
                .reverse()}
        </>
    );
};

export default Comments;
