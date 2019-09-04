import React, { createContext, useReducer } from 'react';
// 初始值
const initialState = {
  age: 18
};
// 纯函数
const Reducer = (state, action) => {
  switch (action) {
    case 'add':
      return { ...state, age: state.age + 1 };
    default:
      return state;
  }
};
// 构造上下文
export const PropsContext = createContext({});
// 暴露对外组件
export const Provider = props => {
  // 构造Reducer
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <PropsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PropsContext.Provider>
  );
};
