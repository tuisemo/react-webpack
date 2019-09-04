import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { checkAuth } from '@/api/user';
import Loading from '@/components/Loading';
import PrimaryLayout from './PrimaryLayout';
import BasicLayout from './BasicLayout';
import styles from './index.less';
class EnterLayout extends PureComponent {
  constructor(props) {
    super(props);
  }
  // 挂载前判断异步鉴权;
  componentWillMount() {
    const { dispatch } = this.props;
    checkAuth().then(res => {
      dispatch({ type: 'UPDATE_AUTH', payload: res.data });
    });
  }
  render() {
    const {
      children,
      auth: { loadingState, authState }
    } = this.props;
    return (
      <div className={styles['rootContainer']}>
        {loadingState ? (
          authState ? (
            <PrimaryLayout>{children}</PrimaryLayout>
          ) : (
            <BasicLayout>{children}</BasicLayout>
          )
        ) : (
          <Loading></Loading>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(EnterLayout);
