import React from 'react';

import SingleComment from './SingleComment';

const Comments = ({ comment, replyComments }) => {
    return (
        <>
            {!comment.reply && (
                <SingleComment comment={comment} commentParentID={comment._id}>
                    <div className='ms-5'>
                        {replyComments &&
                            replyComments.map((item, index) => {
                                return (
                                    <SingleComment
                                        key={index}
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
