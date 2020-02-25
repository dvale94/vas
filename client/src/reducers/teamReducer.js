import { SET_TEAMS, TEAMS_LOADING} from '../actions/types';

  const initialState = {
    teams: [],
    loading: false
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_TEAMS:
        return {
          ...state,
          teams: action.payload
        };
      case TEAMS_LOADING:
        return {
          ...state,
          loading: true
        };  
      default:
        return state;
    }
  }