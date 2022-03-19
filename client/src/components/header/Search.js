import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import UserSearch from './UserSearch';

import { Form } from 'react-bootstrap';

const Search = () => {
    // ************************************* State *************************************
    const { usersSearch, setUsersSearch, searchUser } = useContext(UserContext);

    const [search, setSearch] = useState('');

    useEffect(() => {
        if (search) {
            searchUser(search);
        }
    }, [search]);

    // ************************************* Function *************************************
    const handleClose = () => {
        setSearch('');
        setUsersSearch([]);
    };

    // ************************************* Return *************************************
    return (
        <div className='navbar-middle d-flex align-items-center rounded-3 position-relative'>
            <div>
                <i className='bi bi-search'></i>
            </div>

            <Form className='position-relative'>
                <Form.Control
                    type='text'
                    name='search'
                    value={search}
                    onChange={(e) => {
                        setSearch(
                            e.target.value.toLowerCase().replace(/ /g, '')
                        );
                    }}
                    placeholder='Search'
                    className='rounded-3'
                    autoComplete='off'></Form.Control>

                <i
                    className='bi bi-x position-absolute'
                    style={{
                        opacity: search ? 1 : 0,
                        cursor: 'pointer',
                    }}
                    onClick={handleClose}></i>
            </Form>

            {search && (
                <div className='position-absolute search-list bg-white mt-3 shadow rounded-3'>
                    {usersSearch.length !== 0 ? (
                        <>
                            {usersSearch.map((user) => {
                                return (
                                    <Link
                                        key={user._id}
                                        to={`/profile/${user._id}`}
                                        onClick={handleClose}
                                        className='text-dark text-decoration-none'>
                                        <UserSearch user={user} />
                                    </Link>
                                );
                            })}
                        </>
                    ) : (
                        <span className='d-block text-center text-secodary p-3'>
                            No results.
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
