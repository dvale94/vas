import { RESET_STATE, SET_TEAMS_REQ_SCH, SET_VOLUNTEERS_REQ_SCH, SET_SCHOOL_REQ_SCH, SET_SCHOOL_PERSONNEL_REQ_SCH, SET_ADMINS_REQ_SCH} from '../actions/types';

  const initialState = {
    teams: [],
    volunteers: [],
    school: [],
    school_personnels: [],
    admins: []
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_TEAMS_REQ_SCH:
        return {
          ...state,
          teams: action.payload
      };
      case SET_VOLUNTEERS_REQ_SCH:
        return {
          ...state,
          volunteers: action.payload
      };
      case SET_SCHOOL_REQ_SCH:
        return {
          ...state,
          school: action.payload
      };
      case SET_SCHOOL_PERSONNEL_REQ_SCH:
        return {
          ...state,
          school_personnels: action.payload
      };
      case SET_ADMINS_REQ_SCH:
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