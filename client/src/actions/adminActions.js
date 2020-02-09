import request from 'request';
import serverConf from '../config'
import { GET_ERRORS, SET_ADMIN } from './types';
import { loginUser } from './authActions'


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

    const endpoint = `${serverConf.uri}${serverConf.endpoints.admin.fetch}/${id}`;

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
            dispatch(setCurrentAdmin(res))
        }    
    });
};

export const setCurrentAdmin = admin => {
    return {
        type: SET_ADMIN,
        payload: admin
    };
};
