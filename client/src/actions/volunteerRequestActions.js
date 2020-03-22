import request from 'request';
import serverConf from '../config'
import { GET_ERRORS, SET_TEAMS_REQ, SET_VOLUNTEERS_REQ } from './types';

// get teams from database
export const getTeamRequest = pid => dispatch => {
    console.log("pid: ", pid)

    const endpoint = `${serverConf.uri}${serverConf.endpoints.team.getTeamInfo}/${pid}`;

    request.get(endpoint, (error, response, body) => {
        
        const res = JSON.parse(body);

        console.log("RES_Teams: ", res)

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
        }
        else {
            res.forEach(pids => {
                console.log("PID ARRAY: ", pids.volunteerPIs)
                dispatch(getVolunteersRequest(pids.volunteerPIs))
            });

            // set current teams
            dispatch(setTeams(res));
            //dispatch(getVolunteersRequest(pids.volunteerPIs))
        }    
    });
};

export const getVolunteersRequest = pids => dispatch => {
    let volunteerInfo = []
    console.log("ORIGINAL:", pids)
    let pantherIDs = (pids.join()).toString()
    console.log("CHANGED:", pantherIDs)
    const endpoint = `${serverConf.uri}${serverConf.endpoints.volunteers.getVolunteerInfo}/${pantherIDs}`;

    request.get(endpoint, (error, response, body) => {
        
        const res = JSON.parse(body);

        console.log("RES_Volunteers: ", res)

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
        }
        else {
            dispatch(setVolunteers(res));
        }    
    });

};

 function getVolunteerRequest(pid) {

    var EventEmitter = require("events").EventEmitter;
    var finalResult = new EventEmitter();
    const endpoint = `${serverConf.uri}${serverConf.endpoints.volunteers.getVolunteerInfo}/${pid}`;

    request.get(endpoint, (error, response, body) => {
        
        const res = JSON.parse(body);

        console.log("RES_Volunteers: ", res)

        if (error) {
            finalResult = null
        }
        else {
            // set current teams
           /*  dispatch(setVolunteers(res)); */
           finalResult.res = res
           finalResult.emit('update');
        }    
    });
    finalResult.on('update', function () {
        console.log("Yo", finalResult.res); 
        return finalResult.res
    });
};

// set teams
export const setTeams = teams => {
    return {
        type: SET_TEAMS_REQ,
        payload: teams
    };
};

// set teams
export const setVolunteers = volunteers => {
    return {
        type: SET_VOLUNTEERS_REQ,
        payload: volunteers
    };
};
