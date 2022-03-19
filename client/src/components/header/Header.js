import React from 'react';
import { Link } from 'react-router-dom';

import Search from './Search';
import Menu from './Menu';

import { Navbar } from 'react-bootstrap';

const Header = () => {
    // ************************************* Return *************************************
    return (
        <Navbar
            expand='lg'
            className='shadow header justify-content-between fixed-top'>
            <Navbar.Brand className='font-weight-bolder text-white me-0'>
                <h3 className='navbar-brand mb-0 me-0'>
                    {
                        <Link
                            to='/home'
                            className='text-decoration-none fst-italic text-white'>
                            ROMY
                        </Link>
                    }
                </h3>
            </Navbar.Brand>

            <Search />

            <Menu />
        </Navbar>
    );
};

export default Header;
