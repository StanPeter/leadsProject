import axios from 'axios';
import { returnErrors } from './messages';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS
} from './types';

//check token & load user
export const loadUser = () => (dispatch, getState) => {
    //user loading
    dispatch({ type: USER_LOADING });

    //get token from state
    const token = getState().authReducer.token;

    //headers
    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    };

    //if token -> add to headers config
    if (token) config.headers['Authorization'] = `Token ${token}`;

    axios.get('/api/auth/user', config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));

            dispatch({ type: AUTH_ERROR });
        });
};

//login user
export const login = (username, password) => (dispatch) => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    };

    //turn BODY into JSON
    const body = JSON.stringify({ username, password });

    axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));

            dispatch({ type: LOGIN_FAIL });
        });
};

//logout user
export const logout = () => (dispatch, getState) => {
    //get token from state
    const token = getState().authReducer.token;

    //headers
    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    };

    //if token -> add to headers config
    if (token) config.headers['Authorization'] = `Token ${token}`;

    axios.get('/api/auth/logout', null, config)
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));

            dispatch({ type: AUTH_ERROR });
        });
};