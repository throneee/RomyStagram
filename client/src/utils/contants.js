export const apiURL =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5000/api'
        : 'someURLdeploy';

export const LOCAL_STORAGE_TOKEN_NAME = 'romy-stagram';

export const SET_AUTH = 'SET_AUTH';
export const UPDATE_USER = 'UPDATE_USER';
export const GET_USER = 'GET_USER';
export const FOLLOW = 'FOLLOW';
