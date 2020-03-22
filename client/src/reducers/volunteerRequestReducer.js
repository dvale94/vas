import { SET_TEAMS_REQ, SET_VOLUNTEERS_REQ} from '../actions/types';

  const initialState = {
    teams: [],
    volunteers: [],
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
      default:
        return state;
    }
  }