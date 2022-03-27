import React from 'react';

import SingleComment from './SingleComment';

const Comments = ({ post, comment, replyComments }) => {
    return (
        <>
            {!comment.reply && (
                <SingleComment
                    post={post}
                    comment={comment}
                    commentParentID={comment._id}>
                    <div className='ms-5'>
                        {replyComments &&
                            replyComments.map((item, index) => {
                                return (
                                    <SingleComment
                                        key={index}
                                        post={post}
                                        comment={item}
                                        commentParentID={comment._id}
                                    />
                                );
                            })}
                    </div>
                </SingleComment>
            )}
        </>
    );
};

export default Comments;
