import request from 'request';
import serverConf from '../config'
import { GET_ERRORS, TEAMS_LOADING, SET_TEAMS_CALENDAR, SET_VOLUNTEERS_CALENDAR, SET_SCHOOLS_CALENDAR} from './types';

// get teams from database
export const getTeams = form => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.team.fetch}`;

    request.get(endpoint, {form}, (error, response, body) => {
        
        const res = JSON.parse(body);

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
        }
        else {

            let teams = [];

            teams = res.filter( team => team.semester === form.semester && team.year === form.year)

            let allVolunteers = []
            let allSchools = []

            teams.forEach(team => {
                allVolunteers.push(team.volunteerPIs)
                allSchools.push(team.schoolCode)
            });

            let allVolunteers_INT = allVolunteers.map(String).toString().split(',').map(x=>+x)

            // set current teams
            dispatch(setSemesterTeams(teams));
            dispatch(getVolunteers(allVolunteers_INT))
            dispatch(getSchools(allSchools))
        }    
    });
};

export const getVolunteers = pids => dispatch => {

    let pantherIDs = pids.join()

    const endpoint = `${serverConf.uri}${serverConf.endpoints.volunteers.getVolunteerInfo}/${pantherIDs}`;

    request.get(endpoint, (error, response, body) => {
        
        const res = JSON.parse(body);

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

export const getSchools = schoolCodes => dispatch => {

    let codes = schoolCodes.join()

    const endpoint = `${serverConf.uri}${serverConf.endpoints.schools.getSchoolInfo}/${codes}`;

    request.get(endpoint, (error, response, body) => {
        
        const res = JSON.parse(body);

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
        }
        else {
            dispatch(setSchools(res));
        }    
    });

};

// set teams
export const setSemesterTeams = teams => {
    return {
        type: SET_TEAMS_CALENDAR,
        payload: teams
    };
};

// set volunteers
export const setVolunteers = volunteers => {
    return {
        type: SET_VOLUNTEERS_CALENDAR,
        payload: volunteers
    };
};

// set schools
export const setSchools = schools => {
    return {
        type: SET_SCHOOLS_CALENDAR,
        payload: schools
    };
};

// teams loading
export const setTeamsLoading = () => {
    return {
        type: TEAMS_LOADING
    };
};
