import { SET_ADMIN, ADMIN_LOADING } from '../actions/types';
import isEmpty from 'is-empty';

  const initialState = {
    admin: {},
    loading: false
  };

  export default function(state = initialState, action) {
    switch (action.type) {
        case SET_ADMIN:
        return {
          ...state,
          admin: action.payload
        };
      case ADMIN_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }