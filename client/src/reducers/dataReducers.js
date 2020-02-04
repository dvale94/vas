import { SET_VOLUNTEERS} from '../actions/types';

  const initialState = {
    volunteers: {}
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_VOLUNTEERS:
        return {
          ...state,
          volunteers: action.payload
        };
      default:
        return state;
    }
  }