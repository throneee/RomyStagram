import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

import { Nav, Image, Dropdown, Button } from 'react-bootstrap';

const Menu = () => {
    // ************************************* State *************************************
    const {
        userState: {
            user: { _id, avatar },
        },
        logout,
    } = useContext(UserContext);

    const { pathname } = useLocation();

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

    // ************************************* Return *************************************
    return (
        <div className='navbar-left d-flex align-items-center'>
            {menuLinks.map((link, index) => {
                return (
                    <Nav className='me-2' key={index}>
                        {link.label === 'AddPost' ||
                        link.label === 'Notification' ? (
                            <Nav.Link>
                                <i className={`${link.icon} text-white`}></i>
                            </Nav.Link>
                        ) : link.path === pathname ? (
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
                            className='img-cover'
                            roundedCircle={true}
                            width={'26px'}
                            height={'26px'}
                            src={avatar}></Image>
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
