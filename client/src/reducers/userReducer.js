import { SET_USER, USER_LOADING } from '../actions/types';
import isEmpty from 'is-empty';

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
      default:
        return state;
    }
  }