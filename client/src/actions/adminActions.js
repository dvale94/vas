import request from 'request';
import serverConf from '../config'
import { GET_ERRORS} from './types';

/* // get volunteers from database
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
 */
// add volunteer to database and refresh the store
export const updateAdmin = form => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.admin.update}`;

    request.put(endpoint, { form }, (error, response, body) => {
        
        const res = JSON.parse(body);
         //REMOVE- only for debugging
         console.log(res)

        //REMOVE- only for debugging
        //console.log(res)

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
        }
        else {
            // set current volunteers
            //dispatch(getVolunteers())
            console.log("here");
        }   
    });
 };
