import request from 'request';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import serverConf from '../config'
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

// login - get user token
export const loginUser = userData => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.account.login}`;

    request.post(endpoint, userData, (error, response, body) => {
        
        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
              })
        }
        else {
            // save token to localStorage
            const {token} = response.data;
            localStorage.setItem('jwt', token);

            // set token to auth header
            setAuthToken(token);

            // decode token to get user data
            const decoded = jwt_decode(token);

            // set current user
            dispatch(setCurrentUser(decoded))
        }    
    });
 };

// set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// user loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// log user out
export const logoutUser = () => dispatch => {

    // remove token from local storage
    localStorage.removeItem('jwt');

    // remove auth header for future requests
    setAuthToken(false);

    // set current user to empty object which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};
