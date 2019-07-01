import React, { PureComponent } from 'react';
import { Layout, Menu } from 'antd';
import styles from './index.less';

const { Header, Content, Footer } = Layout;
class EnterLayout extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return <div className={styles['rootContainer']}>{children}</div>;
  }
}

export default EnterLayout;
