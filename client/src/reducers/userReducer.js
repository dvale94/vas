import { SET_USER, USER_LOADING, RESET_STATE } from '../actions/types';

  const initialState = {
    user: {},
    loading: false
  };

  export default function(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
        return {
          ...state,
          user: action.payload
        };
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };
        case RESET_STATE:
          return initialState
      default:
        return state;
    }
  }