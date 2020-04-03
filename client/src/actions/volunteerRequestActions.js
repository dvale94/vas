import request from 'request';
import serverConf from '../config'
import { GET_ERRORS, SET_TEAMS_REQ, SET_VOLUNTEERS_REQ, SET_SCHOOLS_REQ, SET_SCHOOL_PERSONNEL_REQ, SET_ADMINS_REQ } from './types';
import { compose } from 'redux';
const _ = require("underscore"); 

// get teams from database
export const getTeamRequest = pid => dispatch => {
    //console.log("pid: ", pid)

    const endpoint = `${serverConf.uri}${serverConf.endpoints.team.getTeamInfo}/${pid}`;

    request.get(endpoint, (error, response, body) => {
        
        const res = JSON.parse(body);

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
        }
        else {
            let allVolunteers = []
            let allSchools = []

            res.forEach(team => {
                allVolunteers.push(team.volunteerPIs)
                allSchools.push(team.schoolCode)
            });

            let allVolunteers_INT = allVolunteers.map(String).toString().split(',').map(x=>+x)

            var filtered_Volunteers = allVolunteers_INT.filter(item => item !== pid )

            dispatch(setTeams(res));
            dispatch(getVolunteersRequest(filtered_Volunteers))
            dispatch(getSchoolsRequest(allSchools))
            dispatch(getSchoolPersonnelsRequest(allSchools))
            dispatch(getAdmins())
            
        }    
    });
};

export const getVolunteersRequest = pids => dispatch => {

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

export const getSchoolsRequest = schoolCodes => dispatch => {

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

export const getSchoolPersonnelsRequest = schoolCodes => dispatch => {

    let codes = schoolCodes.join()

    const endpoint = `${serverConf.uri}${serverConf.endpoints.schoolPersonnels.getPersonnelInfo}/${codes}`;

    request.get(endpoint, (error, response, body) => {
        
        const res = JSON.parse(body);

        //console.log("RES_Personnels ", res)

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
        }
        else {
            dispatch(setSchool_Personnel(res));
        }    
    });

};

export const getAdmins = () => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.admin.fetch}`;

    request.get(endpoint, (error, response, body) => {
        
        const res = JSON.parse(body);

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res.errors
              })
        }
        else {
            // set current admins
            dispatch(setAdmins(res));
        }    
    });
};

// set teams
export const setTeams = teams => {
    return {
        type: SET_TEAMS_REQ,
        payload: teams
    };
};

// set volunteers
export const setVolunteers = volunteers => {
    return {
        type: SET_VOLUNTEERS_REQ,
        payload: volunteers
    };
};

// set schools
export const setSchools = schools => {
    return {
        type: SET_SCHOOLS_REQ,
        payload: schools
    };
};

// set school personnel
export const setSchool_Personnel = schPersonnel => {
    return {
        type: SET_SCHOOL_PERSONNEL_REQ,
        payload: schPersonnel
    };
};

// set admins
export const setAdmins = admins => {
    return {
        type: SET_ADMINS_REQ,
        payload: admins
    };
};
