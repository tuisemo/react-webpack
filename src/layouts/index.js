import React, { PureComponent } from 'react';
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
    checkAuth().then(res => {
      this.setState({
        loadingState: false
      });
    });
  }
  render() {
    const { children } = this.props;
    const { loadingState } = this.state;
    return (
      <div className={styles['rootContainer']}>
        {loadingState ? children : <Loading></Loading>}
      </div>
    );
  }
}

export default EnterLayout;
