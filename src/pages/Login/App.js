import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import LoginPage from './index';
import styles from './app.less';

class Login extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      auth: { authState }
    } = this.props;
    return (
      <Fragment>
        {authState ? (
          <Redirect to="/"></Redirect>
        ) : (
          <div className={styles['App']}>
            <div className={styles['App-wrap']}>
              <div className={styles['taiji']}>
                <div className={styles['yang']}>
                  <div className={styles['inner']}></div>
                </div>
                <div className={styles['yin']}>
                  <div className={styles['inner']}></div>
                </div>
              </div>
            </div>
            <LoginPage></LoginPage>
          </div>
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = state => state;
export default withRouter(connect(mapStateToProps)(Login));
