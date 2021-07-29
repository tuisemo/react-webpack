import React from 'react';
import MousePoint from './MousePoint';

class SpanItem extends React.Component {
  render() {
    const { list, handleSetIndex } = this.props;
    return (
      <div>
        {list.map((item, index) => {
          return (
            <span key={index} onClick={handleSetIndex(index)}>
              方块{item}_{index}
            </span>
          );
        })}
      </div>
    );
  }
}
// 高阶函数——返回一个组件
const FoldHoc = WrapComponent => {
  return class FoldComp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        foldState: true,
        showFoldBtn: false
      };
    }
    componentDidMount() {
      const { data } = this.props;
      this.setState({
        data: data.slice(0, 5),
        foldState: true,
        showFoldBtn: data.length > 5
      });
    }
    showAllData = () => {
      const { data } = this.props;
      this.setState({
        data: data,
        foldState: false
      });
    };
    showSomeData = () => {
      const { data } = this.props;
      this.setState({
        data: data.slice(0, 5),
        foldState: true
      });
    };
    render() {
      const { data, showFoldBtn, foldState } = this.state;
      return (
        <div>
          <WrapComponent {...this.props} list={data}></WrapComponent>
          {showFoldBtn && (
            <div>
              {foldState ? (
                <button onClick={this.showAllData}>展开</button>
              ) : (
                <button onClick={this.showSomeData}>收起</button>
              )}
            </div>
          )}
        </div>
      );
    }
  };
};
// 构造出新组建
const ListComp = FoldHoc(SpanItem);

export default class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    const mockData = new Array(9);
    this.state = {
      data: mockData.fill('data'),
      currenIndex: null
    };
  }
  handleSetIndex = index => e => {
    e.persist();
    console.log('🚀 ~ file: index.js ~ line 13 ~ MouseTracker ~ index', index);
    this.setState({
      currenIndex: index
    });
  };
  render() {
    const { data, currenIndex } = this.state;
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
        <ListComp data={data} handleSetIndex={this.handleSetIndex}></ListComp>
        <p>{currenIndex}</p>
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
