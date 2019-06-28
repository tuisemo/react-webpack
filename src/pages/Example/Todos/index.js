import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Button } from "antd";

const mapStateToProps = state => state;

class TodoList extends PureComponent {
  constructor(props) {
    super(props);
  }
  // 同步增加
  add = () => {
    const { dispatch } = this.props;
    dispatch({ type: "INCREMENT" });
  };
  // 异步增加
  addAsync = () => {
    const { dispatch } = this.props;
    dispatch({ type: "INCREMENT_ASYNC" });
  };
  // 同步减少
  derc = () => {
    const { dispatch } = this.props;
    dispatch({ type: "DECREMENT" });
  };
  // 同步减少
  pushAsync = () => {
    const { dispatch } = this.props;
    dispatch({ type: "PUSH_LIST_ASYNC" });
  };
  render() {
    const { counter } = this.props;
    return (
      <div>
        current Num: <span>{counter}</span>
        <Button onClick={this.add}>add</Button>
        <Button onClick={this.derc}>derc</Button>
        <Button onClick={this.addAsync}>addAsync</Button>
        <Button onClick={this.pushAsync}>pushAsync</Button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TodoList);
