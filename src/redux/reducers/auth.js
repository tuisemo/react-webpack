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
  loadingState: false,
  authState: false
};

// Reducer
export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_AUTH:
      return { ...state, loadingState: true, authState: action.payload };
    default:
      return state;
  }
}
