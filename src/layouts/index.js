import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { checkAuth } from '@/api/user';
import Loading from '@/components/Loading';
import styles from './index.less';
class EnterLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loadingState: true
    };
  }
  // 挂载前判断异步鉴权;
  componentWillMount() {
    const { dispatch } = this.props;
    checkAuth().then(res => {
      dispatch({ type: 'UPDATE_AUTH', payload: res.data });
      this.setState({
        loadingState: true
      });
    });
  }
  render() {
    const { children } = this.props;
    const { loadingState } = this.state;
    return (
      <div className={styles['rootContainer']}>
        {children}
        {loadingState ? children : <Loading></Loading>}
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(EnterLayout);
