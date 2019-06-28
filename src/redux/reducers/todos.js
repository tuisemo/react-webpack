/**
 * 本项目Redux结构采用了目前新提出的Ducks(Redux Reducer Bundles)
 */

/**
 * action type
 */
const PUSH_LIST = "PUSH_LIST";
const EMPTY_LIST = "EMPTY_LIST";

// Action Creators
/**
 * Action创建函数
 */

export function pushList(item) {
  return {
    type: PUSH_LIST,
    item
  };
}

export function emptyList() {
  return {
    type: EMPTY_LIST
  };
}

// Initial State
const initialState = {
  list: [{ item: "test", done: false }]
};
// Reducer

export default function todos(state = initialState, action) {
  switch (action.type) {
    case PUSH_LIST:
      return {
        ...state,
        list: [...state.list, action.item]
      };
    case EMPTY_LIST:
      return { ...state, list: [] };
    default:
      return state;
  }
}
