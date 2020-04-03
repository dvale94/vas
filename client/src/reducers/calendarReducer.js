import { SET_TEAMS_CALENDAR, TEAMS_LOADING, RESET_STATE, SET_VOLUNTEERS_CALENDAR, SET_SCHOOLS_CALENDAR} from '../actions/types';

  const initialState = {
    teams: [],
    volunteers: [],
    schools: [],
    loading: false
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_TEAMS_CALENDAR:
        return {
          ...state,
          teams: action.payload
        };
      case SET_VOLUNTEERS_CALENDAR:
        return {
          ...state,
          volunteers: action.payload
        };
      case SET_SCHOOLS_CALENDAR:
      return {
        ...state,
        schools: action.payload
      };
      case TEAMS_LOADING:
        return {
          ...state,
          loading: true
        };
      case RESET_STATE:
          return initialState;
      default:
        return state;
    }
  }