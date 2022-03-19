import React from 'react';
import { Image } from 'react-bootstrap';

const UserSearch = ({ user }) => {
    const { fullname, username, avatar } = user;

    return (
        <div className='d-flex align-items-center p-2'>
            <Image
                className='img-cover'
                roundedCircle={true}
                width={'40px'}
                height={'40px'}
                src={avatar}></Image>
            <div className='d-flex flex-column ms-3'>
                <span>{username}</span>
                <small className='text-secondary'>{fullname}</small>
            </div>
        </div>
    );
};

export default UserSearch;
