import { SET_AUTH, AUTH_LOADING} from '../actions/types';
import isEmpty from 'is-empty';

  const initialState = {
    isAuthenticated: false,
    role: '',
    loading: false
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_AUTH:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          role: action.payload
        };
      case AUTH_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }