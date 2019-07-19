import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

function withHocPrivateRoute(WrappedComponent, hocProps) {
  if (!!!WrappedComponent) {
    throw new Error('缺少组件参数');
    return false;
  }
  //withRouter 也是一个高阶组件 传递 history
  return withRouter(
    connect()(
      class extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            auth: false
          };
        }

        componentWillMount() {
          console.log('---');
        }

        render() {
          const { auth } = this.state;
          return auth ? <WrappedComponent {...hocProps} /> : '请重新登录';
        }
      }
    )
  );
}

export default withHocPrivateRoute;
