import request from 'request';
import serverConf from '../config'
import { GET_ERRORS, SET_SCHOOLS, SCHOOLS_LOADING} from './types';

// get schools from database
export const getSchools = () => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.schools.fetch}`;

    request.get(endpoint, (error, response, body) => {
        
        const res = JSON.parse(body);

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
        }
        else {
            // set current schools
            dispatch(setCurrentSchools(res));
        }    
    });
};

// add schools to database and refresh the store
export const addSchool = form => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.schools.create}`;

    request.post(endpoint, { form }, (error, response, body) => {
        
        const res = JSON.parse(body);

        //REMOVE- only for debugging
        console.log(res)

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
        }
        else {
            // set current schools
            dispatch(getSchools());
        }   
    });
 };

 // make chanhes to schools in the database and refresh the store
export const editSchool = (id, form) => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.schools.update}/${id}`;

    request.post(endpoint, { form }, (error, response, body) => {
        
        const res = JSON.parse(body);

        //REMOVE- only for debugging
        console.log(res)

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
        }
        else {
            // get updated schools
            dispatch(getSchools());
        }   
    });
 };

// schools loading
export const setSchoolsLoading = () => {
    return {
        type: SCHOOLS_LOADING
    };
};

// set schools
export const setCurrentSchools = schools => {
    return {
        type: SET_SCHOOLS,
        payload: schools
    };
};