import React, { createContext, useReducer } from 'react';

const initialState = {
  color: 'blue'
};
// 纯函数
const Reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_COLOR':
      return { ...state, color: action.payload };
    default:
      return state;
  }
};
export const PropsContext = createContext({});

export const Provider = props => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <PropsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PropsContext.Provider>
  );
};
