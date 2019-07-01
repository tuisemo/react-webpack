// actionType
const INCREMENT = 'INCREMENT';
const INCREMENT_PARAMS = 'INCREMENT_PARAMS';
const DECREMENT = 'DECREMENT';
// Action Creators
export function increment(item) {
  return {
    type: INCREMENT,
    item
  };
}

export function increment_params(payload) {
  return {
    type: INCREMENT_PARAMS,
    payload
  };
}

export function decrement() {
  return {
    type: DECREMENT
  };
}
// Reducer
export default function counter(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case INCREMENT_PARAMS:
      return state + action.payload;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}
