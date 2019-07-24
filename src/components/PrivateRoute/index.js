import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
//私有路由，只有登录的用户才能访问
class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      component: Component,
      path = '/',
      exact = false,
      strict = false,
      auth: { authState }
    } = this.props;
    console.log('authState: ', authState);
    return authState ? (
      <Route
        path={path}
        exact={exact}
        strict={strict}
        render={props => <Component {...props} />}
      />
    ) : (
      // '请登录'
      <Redirect to="/login"></Redirect>
    );
  }
}
const mapStateToProps = state => state;
export default withRouter(connect(mapStateToProps)(PrivateRoute));
