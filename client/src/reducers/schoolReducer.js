import { SET_SCHOOLS, SCHOOLS_LOADING, RESET_STATE} from '../actions/types';

  const initialState = {
    schools: [],
    loading: false
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_SCHOOLS:
        return {
          ...state,
          schools: action.payload
        };
      case SCHOOLS_LOADING:
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