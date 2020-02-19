import request from 'request';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import serverConf from '../config'
import { GET_ERRORS, SET_USER, USER_LOADING, SET_AUTH } from './types';

// login - get user token
export const loginUser = form => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.account.login}`;

    request.post(endpoint, { form }, (error, response, body) => {
        
        const res = JSON.parse(body);
        const token = res.token

        //REMOVE- only for debugging
        console.log(res)

        if (error || !res.token) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
        }
        else {
            // save token to localStorage
            localStorage.setItem('jwt', token);
            
            // set token to auth header
            setAuthToken(token);

            // decode token to get user data
            const decoded = jwt_decode(token);

            // set current user
            dispatch(setAuth(decoded)); // role
            dispatch(setCurrentUser(decoded)) // add user data
        }    
    });
 };

// set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_USER,
        payload: decoded
    };
};

// set auth
export const setAuth = decoded => {
    return {
        type: SET_AUTH,
        payload: decoded.role
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
    dispatch(setAuth({}));

    //this.props.history.push("/login"); 
};
