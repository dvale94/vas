import { SET_VOLUNTEERS, VOLUNTEERS_LOADING} from '../actions/types';

  const initialState = {
    volunteers: [],
    loading: false
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_VOLUNTEERS:
        return {
          ...state,
          volunteers: action.payload
        };
      case VOLUNTEERS_LOADING:
        return {
          ...state,
          loading: true
        };  
      default:
        return state;
    }
  }