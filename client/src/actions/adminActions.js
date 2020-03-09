import request from 'request';
import serverConf from '../config'
import { GET_ERRORS, GET_SUCCESS, ADMINS_LOADING, SET_ADMINS} from './types';

// get volunteers from database
export const getAdmins = () => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.admin.fetch}`;

    request.get(endpoint, (error, response, body) => {
        
        const res = JSON.parse(body);

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res.errors
              })
        }
        else {
            // set current volunteers
            dispatch(setCurrentAdmins(res));
        }    
    });
};

// add volunteer to database and refresh the store
export const addAdmin = form => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.admin.signup}`;

    request.post(endpoint, { form }, (error, response, body) => {
        
        const res = JSON.parse(body);

        if (!res.success) {
            dispatch({
                type: GET_ERRORS,
                payload: res.errors
              })
        }
        else {
            // set current volunteers
            dispatch(getAdmins());
            dispatch({
                type: GET_SUCCESS,
                payload: res.message
            });
        }   
    });
 };

// make chanhes to volunteer in the database and refresh the store
export const editAdmin = (id, form) => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.admin.update}/${id}`;

    request.put(endpoint, { form }, (error, response, body) => {
        
        const res = JSON.parse(body);

        if (!res.success) {
            dispatch({
                type: GET_ERRORS,
                payload: res.errors
              })
        }
        else {
            dispatch(getAdmins());
            dispatch({
                type: GET_SUCCESS,
                payload: res.message
            });
        }   
    });
 };
// volunteers loading
export const setAdminsLoading = () => {
    return {
        type: ADMINS_LOADING
    };
};

// set volunteers
export const setCurrentAdmins = admins => {
    return {
        type: SET_ADMINS,
        payload: admins
    };
};
