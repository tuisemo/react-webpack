import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './index.less';

class BasicLayout extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { children } = this.props;
    return <Layout className={styles['container']}>{children}</Layout>;
  }
}
const mapStateToProps = state => state;
export default withRouter(connect(mapStateToProps)(BasicLayout));
