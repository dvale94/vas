import { SET_ADMINS, ADMINS_LOADING, RESET_STATE} from '../actions/types';

  const initialState = {
    admins: [],
    loading: false
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_ADMINS:
        return {
          ...state,
          admins: action.payload
        };
      case ADMINS_LOADING:
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