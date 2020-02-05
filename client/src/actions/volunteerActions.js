import request from 'request';
import serverConf from '../config'
import { GET_ERRORS, SET_VOLUNTEERS, VOLUNTEERS_LOADING, ADD_VOLUNTEER} from './types';

// get volunteers from database
export const getVolunteers = () => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.volunteers.fetch}`;

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
            dispatch(setCurrentVolunteers(res))
        }    
    });
};

// add volunteer to database and refresh the store
export const addVolunteer = form => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.volunteers.signup}`;

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
            // set current volunteers
            dispatch(getVolunteers())
        }   
    });
 };

// volunteers loading
export const setVolunteersLoading = () => {
    return {
        type: VOLUNTEERS_LOADING
    };
};

// set volunteers
export const setCurrentVolunteers = volunteers => {
    return {
        type: SET_VOLUNTEERS,
        payload: volunteers
    };
};
