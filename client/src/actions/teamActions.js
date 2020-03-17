import request from 'request';
import serverConf from '../config'
import { GET_ERRORS, SET_TEAMS, TEAMS_LOADING, GET_SUCCESS} from './types';

// get teams from database
export const getTeams = () => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.team.fetch}`;

    request.get(endpoint, (error, response, body) => {
        
        const res = JSON.parse(body);

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
        }
        else {
            // set current teams
            dispatch(setCurrentTeams(res));
        }    
    });
};

// add teams to database and refresh the store
export const addTeam = uneditedform => dispatch => {

    let form = JSON.parse(JSON.stringify(uneditedform));

    form.volunteerPIs = form.volunteerPIs.join()

    console.log(form)

    const endpoint = `${serverConf.uri}${serverConf.endpoints.team.create}`;

    request.post(endpoint, { form }, (error, response, body) => {
        const res = JSON.parse(body);

        //REMOVE- only for debugging
        console.log(res)

        if (!res.success) {
            dispatch({
                type: GET_ERRORS,
                payload: res.errors
              })
        }
        else {
            // set current teams
            dispatch(getTeams());
            dispatch({
                type: GET_SUCCESS,
                payload: res.message
            });
        }   
    });
 };

 // make changes to teams in the database and refresh the store
export const editTeam = (id, uneditedform) => dispatch => {

    let form = JSON.parse(JSON.stringify(uneditedform));

    form.volunteerPIs = form.volunteerPIs.join()

    console.log(form)

    const endpoint = `${serverConf.uri}${serverConf.endpoints.team.update}/${id}`;

    request.post(endpoint, { form }, (error, response, body) => {
        
        const res = JSON.parse(body);

        //REMOVE- only for debugging
        console.log(res)

        if (!res.success) {
            dispatch({
                type: GET_ERRORS,
                payload: res.errors
              })
        }
        else {
            // set current teams
            dispatch(getTeams());
            dispatch({
                type: GET_SUCCESS,
                payload: res.message
            });
        }   
    });
 };

// teams loading
export const setTeamsLoading = () => {
    return {
        type: TEAMS_LOADING
    };
};

// set teams
export const setCurrentTeams = teams => {
    return {
        type: SET_TEAMS,
        payload: teams
    };
};
