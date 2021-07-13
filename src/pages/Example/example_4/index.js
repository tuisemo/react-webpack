import React from 'react';
import MousePoint from './MousePoint';
export default class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <MousePoint
          render={state => {
            return (
              <div>
                <span>鼠标横坐标是{state.positionX}</span>
                <span>鼠标纵坐标是{state.positionY}</span>
              </div>
            );
          }}
        />
      </div>
    );
  }
}
/**
 * Render Props
 * React官方给出的定义是：Render Props是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术
 * 对比props.children,Render Props的优势在于，父组件可以操作子组件的state并作出相应的渲染
 * props.children一般用于样式上的封装
 *
 */
