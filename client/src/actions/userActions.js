import request from 'request';
import serverConf from '../config'
import { GET_ERRORS, SET_USER } from './types';


export const updateAdmin = (id, form) => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.admin.update}/${id}`;

    request.put(endpoint, { form }, (error, response, body) => {
        
        const res = JSON.parse(body);


        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
        }
        else {
            //console.log("Hello there: " + res.id)
            dispatch(getAdmin(res.id))
            
            
        }   
    });
 };

 // get admin from database
export const getAdmin = (id) => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.admin.fetchByid}/${id}`;

    request.get(endpoint, (error, response, body) => {
        
        const res = JSON.parse(body);

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
        }
        else {
            // set current volunteers
            dispatch(setCurrentUser(res))
        }    
    });
};

export const getVolunteer = (id) => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.volunteers.fetchByid}/${id}`;

    request.get(endpoint, (error, response, body) => {
        
        const res = JSON.parse(body);

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
        }
        else {
            // set current volunteers
            dispatch(setCurrentUser(res))
        }    
    });
};

export const getSchoolPersonnel = (id) => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.schoolPersonnels.fetchByid}/${id}`;

    request.get(endpoint, (error, response, body) => {
        
        const res = JSON.parse(body);

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
        }
        else {
            // set current volunteers
            dispatch(setCurrentUser(res))
        }    
    });
};

export const updateVolunteer = (id, form) => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.volunteers.update}/${id}`;

    request.put(endpoint, { form }, (error, response, body) => {
        console.log("Hello there: " + body)
        const res = JSON.parse(body);

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
        }
        else {
            console.log("Hello there: " + body)
            dispatch(getVolunteer(res.id))
        }   
    });
 };

 export const updateVolunteer_Profile = (id, form) => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.volunteers.updateProfile}/${id}`;

    request.put(endpoint, { form }, (error, response, body) => {

        const res = JSON.parse(body);

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
        }
        else {
            //console.log("Hello there2: " + body)
            dispatch(getVolunteer(res.id))
        }   
    });
 };


export const setCurrentUser = user => {
    return {
        type: SET_USER,
        payload: user
    };
};
