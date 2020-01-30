import request from 'request';
import serverConf from '../config'
import { GET_ERRORS, SET_VOLUNTEERS} from './types';

// get volunteers from database
export const getVolunteers = dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.volunteers.fetch}`;

    request.get(endpoint, (error, response, body) => {
        
        const res = JSON.parse(body);

        if (error || !res.token) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
        }
        else {
            // set current volunteers
            dispatch(getVolunteers(res))
        }    
    });
};

// set volunteers
export const setCurrentUser = volunteers => {
    return {
        type: SET_VOLUNTEERS,
        payload: volunteers
    };
};
