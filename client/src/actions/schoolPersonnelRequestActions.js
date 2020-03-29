import request from 'request';
import serverConf from '../config'
import { GET_ERRORS, SET_TEAMS_REQ_SCH, SET_VOLUNTEERS_REQ_SCH, SET_SCHOOL_REQ_SCH, SET_SCHOOL_PERSONNEL_REQ_SCH, SET_ADMINS_REQ_SCH} from './types';

// get teams from database
export const getTeamRequest = schoolCode => dispatch => {
    console.log("school code: ", schoolCode)

    const endpoint = `${serverConf.uri}${serverConf.endpoints.team.getTeamInfoSch}/${schoolCode}`;

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
            console.log(res)

            res.forEach(team => {
                console.log("PID ARRAY: ", team.volunteerPIs)
                allVolunteers.push(team.volunteerPIs)
            });

            dispatch(setTeams(res));
            dispatch(getVolunteersRequest(allVolunteers))
            dispatch(getSchoolRequest(schoolCode))
            dispatch(getSchoolPersonnelsRequest(schoolCode))
            dispatch(getAdmins())
        }    
    });
};

export const getVolunteersRequest = pids => dispatch => {

    let pantherIDs = pids.join()

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

export const getSchoolRequest = schoolCode => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.schools.getSchoolInfo}/${schoolCode}`;

    request.get(endpoint, (error, response, body) => {
        
        const res = JSON.parse(body);

        console.log("RES_Schools ", res)

        if (error) {
            dispatch({
                type: GET_ERRORS,
                payload: res
              })
        }
        else {
            dispatch(setSchool(res));
        }    
    });

};

export const getSchoolPersonnelsRequest = schoolCode => dispatch => {

    const endpoint = `${serverConf.uri}${serverConf.endpoints.schoolPersonnels.getPersonnelInfo}/${schoolCode}`;

    request.get(endpoint, (error, response, body) => {
        
        const res = JSON.parse(body);

        console.log("RES_Personnels ", res)

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
        type: SET_TEAMS_REQ_SCH,
        payload: teams
    };
};

// set volunteers
export const setVolunteers = volunteers => {
    return {
        type: SET_VOLUNTEERS_REQ_SCH,
        payload: volunteers
    };
};

// set schools
export const setSchool = school => {
    return {
        type: SET_SCHOOL_REQ_SCH,
        payload: school
    };
};

// set school personnel
export const setSchool_Personnel = schPersonnel => {
    return {
        type: SET_SCHOOL_PERSONNEL_REQ_SCH,
        payload: schPersonnel
    };
};

// set admins
export const setAdmins = admins => {
    return {
        type: SET_ADMINS_REQ_SCH,
        payload: admins
    };
};