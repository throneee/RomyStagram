export const apiURL =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5000/api'
        : 'someURLdeploy';

export const BASE_URL = 'http://localhost:3000';

export const LOCAL_STORAGE_TOKEN_NAME = 'romy-stagram';

export const SET_AUTH = 'SET_AUTH';
export const UPDATE_USER = 'UPDATE_USER';
export const GET_USER_POST = 'GET_USER_POST';

export const ADD_POST = 'ADD_POST';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const FIND_POST = 'FIND_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const DETAIL_POST = 'DETAIL_POST';
