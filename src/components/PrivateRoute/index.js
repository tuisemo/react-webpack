import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
//私有路由，只有登录的用户才能访问
class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    };
  }
  componentWillMount() {}
  render() {
    let {
      component: Component,
      path = '/',
      exact = false,
      strict = false
    } = this.props;
    const { auth } = this.state;
    return auth ? (
      <Route
        path={path}
        exact={exact}
        strict={strict}
        render={props => <Component {...props} />}
      />
    ) : (
      // '请登录'
      <Redirect to="/404"></Redirect>
    );
  }
}
export default withRouter(connect()(PrivateRoute));
