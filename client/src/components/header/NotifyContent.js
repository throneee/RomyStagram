import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NotifyContext } from '../../contexts/NotifyContext';
import moment from 'moment';

import { Spinner, Image } from 'react-bootstrap';

const NotifyContent = () => {
    // ************************************* State *************************************
    const {
        notifiesState: { notifiesLoading, notifies, sound },
    } = useContext(NotifyContext);

    // ************************************* Function and Variable declare *************************************
    let body = null;

    if (notifiesLoading) {
        body = (
            <div className='d-flex align-items-center justify-content-center'>
                <Spinner animation='border' variant='info' />
            </div>
        );
    } else if (notifies.length === 0) {
        body = (
            <div className='d-flex align-item-center justify-content-center px-5 py-3'>
                <div className='no-post d-flex flex-column align-items-center justify-content-center'>
                    <div
                        className='rounded-circle d-flex justify-content-center align-items-center'
                        style={{ width: '70px', height: '70px' }}>
                        <i
                            className='bi bi-suit-heart text-secondary'
                            style={{ fontSize: '40px' }}></i>
                    </div>

                    <h6 className='mb-0 mt-3 text-secondary'>
                        Activity On Your Posts
                    </h6>
                    <span
                        className='mb-0 mt-3 text-secondary text-center'
                        style={{ fontSize: '14px' }}>
                        When someone likes or comments on one of your posts,
                        you'll see it here.
                    </span>
                </div>
            </div>
        );
    } else {
        body = (
            <div className='d-flex flex-column w-100'>
                {notifies.map((notify) => {
                    return (
                        <Link
                            key={notify._id}
                            className='single-notify text-black d-flex align-items-center my-1 mx-2 p-3 rounded-3'
                            to={notify.url}>
                            <div>
                                <Image
                                    className='img-cover border'
                                    roundedCircle={true}
                                    src={notify.user.avatar}
                                    width={'50px'}
                                    height={'50px'}></Image>
                            </div>

                            <div className='flex-fill ms-3'>
                                <div className='d-flex align-items-center'>
                                    <h6 className='mb-0'>
                                        {notify.user.username}
                                    </h6>
                                    <span className='text-secondary ms-1'>
                                        {notify.text}
                                        {/* <em>
                                            {notify.content &&
                                                notify.content.slice(0, 5)}
                                        </em>
                                        {notify.content.length > 5 && '...'} */}
                                    </span>
                                </div>
                                <span
                                    className={
                                        notify.isRead
                                            ? 'text-secondary'
                                            : 'text-info'
                                    }>
                                    {moment(notify.createdAt).fromNow()}
                                </span>
                            </div>

                            <div className='d-flex align-items-center'>
                                <Image
                                    className='img-cover border rounded-3'
                                    src={notify.image}
                                    width={'50px'}
                                    height={'50px'}></Image>
                                {!notify.isRead && (
                                    <i
                                        className='bi bi-circle-fill text-info ms-3'
                                        style={{ fontSize: '12px' }}></i>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>
        );
    }

    // ************************************* Return *************************************
    return (
        <div className='notify-content d-flex flex-column align-item-center justify-content-center'>
            <div className='notify-content-top d-flex align-items-center px-4 py-2 justify-content-between'>
                <h6
                    className='mb-0 fw-bold text-secondary'
                    style={{ fontSize: '24px' }}>
                    Notifications
                </h6>
                <div>
                    {sound ? (
                        <i className='bi bi-bell-fill text-info'></i>
                    ) : (
                        <i className='bi bi-bell-slash-fill text-info'></i>
                    )}
                </div>
            </div>
            <hr className='m-0' />
            {body}
        </div>
    );
};

export default NotifyContent;
