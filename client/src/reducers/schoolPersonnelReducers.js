import { SET_SCHOOL_PERSONNELS, SCHOOL_PERSONNELS_LOADING, RESET_STATE} from '../actions/types';

  const initialState = {
    schoolPersonnels: [],
    loading: false
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_SCHOOL_PERSONNELS:
        return {
          ...state,
          schoolPersonnels: action.payload
        };
      case SCHOOL_PERSONNELS_LOADING:
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