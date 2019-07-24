// actionType
const UPDATE_AUTH = 'UPDATE_AUTH';
// Action Creators
export function updateAuth(state) {
  return {
    type: UPDATE_AUTH,
    payload: state
  };
}

// Initial State
const initialState = {
  authState: false
};

// Reducer
export default function counter(state = initialState, action) {
  switch (action.type) {
    case UPDATE_AUTH:
      return { ...state, authState: action.payload };
    default:
      return state;
  }
}
