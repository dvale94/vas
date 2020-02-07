import request from 'request';
import serverConf from '../config'
import { GET_ERRORS, UPDATE_USER, SET_CURRENT_USER } from './types';
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
            console.log("Hello there: " + res.id)
            dispatch(getAdmin(res.id))
            
            
        }   
    });
 };

 // get volunteers from database
export const getAdmin = (id) => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.admin.fetch}/${id}`;

    request.get(endpoint, (error, response, body) => {
        
        const res = JSON.parse(body);

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
              console.log("HEREHEREHERE1 " + res);
        }
        else {
            // set current volunteers
            dispatch(setCurrentUser(res))
            console.log("HEREHEREHERE2 " + res);
        }    
    });
};

export const setCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    };
};
