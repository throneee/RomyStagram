import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { PostContext } from '../../contexts/PostContext';
import NotifyContent from './NotifyContent';

import { Nav, Image, Dropdown, Button } from 'react-bootstrap';
import { NotifyContext } from '../../contexts/NotifyContext';

const Menu = () => {
    // ************************************* State *************************************
    // 1. User state
    const {
        userState: {
            user: { _id, avatar },
        },
        logout,
    } = useContext(UserContext);

    // 2. Path name
    const { pathname } = useLocation();

    // 3. Post state
    const { showAddPostModal, setShowAddPostModal } = useContext(PostContext);

    const {
        notifiesState: { notifies },
    } = useContext(NotifyContext);

    // ************************************* Function and Variable Declare *************************************
    const menuLinks = [
        {
            label: 'Home',
            icon: 'bi bi-house-door',
            iconfill: 'bi bi-house-door-fill',
            path: '/home',
        },
        {
            label: 'Messages',
            icon: 'bi bi-send',
            iconfill: 'bi bi-send-fill',
            path: '/messages',
        },
        {
            label: 'AddPost',
            icon: 'bi bi-plus-square',
            iconfill: 'bi bi-plus-square-fill',
            path: '/',
        },
        {
            label: 'Explore',
            icon: 'bi bi-compass',
            iconfill: 'bi bi-compass-fill',
            path: '/explore',
        },
        {
            label: 'Notification',
            icon: 'bi bi-suit-heart',
            iconfill: 'bi bi-suit-heart-fill',
            path: '/',
        },
    ];

    const handleLogout = () => {
        logout();
    };

    const handleShowAddPostModal = () => {
        setShowAddPostModal(true);
    };

    // ************************************* Return *************************************
    return (
        <div className='navbar-left d-flex align-items-center'>
            {menuLinks.map((link, index) => {
                return (
                    <Nav className='me-2' key={index}>
                        {link.label === 'AddPost' ? (
                            <Nav.Link
                                onClick={
                                    link.label === 'AddPost'
                                        ? handleShowAddPostModal
                                        : null
                                }>
                                {showAddPostModal &&
                                link.label === 'AddPost' ? (
                                    <i
                                        className={`${link.iconfill} text-white`}></i>
                                ) : (
                                    <i
                                        className={`${link.icon} text-white`}></i>
                                )}
                            </Nav.Link>
                        ) : link.label === 'Notification' ? (
                            <Nav className='notification p-0 ms-2'>
                                <Dropdown>
                                    <Dropdown.Toggle>
                                        <i
                                            className={`${link.iconfill} text-white`}></i>
                                        {notifies.length > 0 && (
                                            <div className='notifies-count rounded-circle bg-danger d-flex align-items-center justify-content-center border border-1'>
                                                {notifies.length}
                                            </div>
                                        )}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className='dropdown-menu-end p-0 m-0 border-0 shadow rounded-3'>
                                        <NotifyContent />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav>
                        ) : link.path === pathname && !showAddPostModal ? (
                            <Nav.Link to={link.path} as={Link}>
                                <i
                                    className={`${link.iconfill} text-white`}></i>
                            </Nav.Link>
                        ) : (
                            <Nav.Link to={link.path} as={Link}>
                                <i className={`${link.icon} text-white`}></i>
                            </Nav.Link>
                        )}
                    </Nav>
                );
            })}

            <Nav>
                <Dropdown className='dropdown-header-menu'>
                    <Dropdown.Toggle className='bg-transparent'>
                        <Image
                            className={
                                pathname === `/profile/${_id}` &&
                                !showAddPostModal
                                    ? 'img-cover border border-2'
                                    : 'img-cover border'
                            }
                            roundedCircle={true}
                            width={'26px'}
                            height={'26px'}
                            src={avatar}
                            style={
                                pathname === `/profile/${_id}` &&
                                !showAddPostModal
                                    ? { padding: '2px' }
                                    : {}
                            }></Image>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='dropdown-menu-end mb-0 p-0 border-0 shadow rounded-3'>
                        <Dropdown.Item
                            to={`/profile/${_id}`}
                            as={Link}
                            className='d-flex align-items-center rounded-top rounded-3'>
                            <i className='bi bi-person-circle text-dark me-3'></i>
                            Profile
                        </Dropdown.Item>

                        <Dropdown.Item className='d-flex align-items-center'>
                            <i className='bi bi-gear text-dark me-3'></i>
                            Setting
                        </Dropdown.Item>

                        <Dropdown.Divider className='m-0' />
                        <Button
                            className='py-2 text-dark text-start rounded-3'
                            onClick={handleLogout}>
                            <span className='ms-2'>Logout</span>
                        </Button>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </div>
    );
};

export default Menu;
