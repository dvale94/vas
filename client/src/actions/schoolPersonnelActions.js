import request from 'request';
import serverConf from '../config'
import { GET_ERRORS, SET_SCHOOL_PERSONNELS, SCHOOL_PERSONNELS_LOADING, GET_SUCCESS} from './types';

// get school personnels from database
export const getSchoolPersonnels = () => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.schoolPersonnels.fetch}`;

    request.get(endpoint, (error, response, body) => {
        
        const res = JSON.parse(body);

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res.errors
              })
        }
        else {
            // set current school personnels
            dispatch(setCurrentSchoolPersonnels(res));
        }    
    });
};

// add school personnel to database and refresh the store
export const addSchoolPersonnel = form => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.schoolPersonnels.signup}`;

    request.post(endpoint, { form }, (error, response, body) => {
        
        const res = JSON.parse(body);
        if (!res.success) {
            dispatch({
                type: GET_ERRORS,
                payload: res.errors
              })
        }
        else {
            // set current school personnels
            dispatch(getSchoolPersonnels());
            dispatch({
                type: GET_SUCCESS,
                payload: res.message
            });
        }   
    });
 };

 // make chanhes to school personnel in the database and refresh the store
export const editSchoolPersonnel = (id, form) => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.schoolPersonnels.update}/${id}`;

    request.post(endpoint, { form }, (error, response, body) => {
        
        const res = JSON.parse(body);

        if (!res.success) {
            dispatch({
                type: GET_ERRORS,
                payload: res.errors
              })
        }
        else {
            // get updated school personnels
            dispatch(getSchoolPersonnels());
            dispatch({
                type: GET_SUCCESS,
                payload: res.message
            });
        }   
    });
 };

// school personnels loading
export const setSchoolPersonnelsLoading = () => {
    return {
        type: SCHOOL_PERSONNELS_LOADING
    };
};

// set school personnels
export const setCurrentSchoolPersonnels = schoolPersonnels => {
    return {
        type: SET_SCHOOL_PERSONNELS,
        payload: schoolPersonnels
    };
};