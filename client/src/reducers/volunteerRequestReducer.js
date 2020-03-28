import { SET_TEAMS_REQ, SET_VOLUNTEERS_REQ, SET_SCHOOLS_REQ, SET_SCHOOL_PERSONNEL_REQ, RESET_STATE, SET_ADMINS_REQ} from '../actions/types';

  const initialState = {
    teams: [],
    volunteers: [],
    schools: [],
    school_personnel: [],
    admins: []
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_TEAMS_REQ:
        return {
          ...state,
          teams: action.payload
      };
      case SET_VOLUNTEERS_REQ:
        return {
          ...state,
          volunteers: action.payload
      };
      case SET_SCHOOLS_REQ:
        return {
          ...state,
          schools: action.payload
      };
      case SET_SCHOOL_PERSONNEL_REQ:
        return {
          ...state,
          school_personnel: action.payload
      };
      case SET_ADMINS_REQ:
        return {
          ...state,
          admins: action.payload
      };
      case RESET_STATE:
          return initialState;
      default:
        return state;
    }
  }