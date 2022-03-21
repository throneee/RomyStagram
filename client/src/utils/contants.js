export const apiURL =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5000/api'
        : 'someURLdeploy';

export const LOCAL_STORAGE_TOKEN_NAME = 'romy-stagram';

export const SET_AUTH = 'SET_AUTH';
export const UPDATE_USER = 'UPDATE_USER';
export const FOLLOW = 'FOLLOW';

export const ADD_POST = 'ADD_POST';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAIL = 'GET_POSTS_FAIL';
