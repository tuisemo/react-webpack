/**
 * 本项目Redux结构采用了目前新提出的Ducks(Redux Reducer Bundles)
 */

/**
 * action type
 */
const PUSH_LIST = 'PUSH_LIST';
const PUSH_ITEM = 'PUSH_ITEM';
const EMPTY_LIST = 'EMPTY_LIST';

// Action Creators
/**
 * Action创建函数
 */

export function pushList(payload) {
  return {
    type: PUSH_LIST,
    payload
  };
}

export function pushItem(payload) {
  return {
    type: PUSH_ITEM,
    payload
  };
}

export function emptyList() {
  return {
    type: EMPTY_LIST
  };
}

// Initial State
const initialState = {
  list: []
};
// Reducer

export default function todos(state = initialState, action) {
  switch (action.type) {
    case PUSH_LIST:
      return {
        ...state,
        list: action.payload
      };
    case PUSH_ITEM:
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    case EMPTY_LIST:
      return { ...state, list: [] };
    default:
      return state;
  }
}
