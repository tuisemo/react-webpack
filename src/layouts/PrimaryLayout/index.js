import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import SiderMenu from '@/components/SiderMenu';
import HeaderNav from '@/components/HeaderNav';
import styles from './index.less';
const { Header, Content, Footer } = Layout;

class Example extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  render() {
    const { children } = this.props;
    return (
      <Layout className={styles['container']}>
        {/* 侧边导航组件 */}
        <SiderMenu></SiderMenu>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <HeaderNav></HeaderNav>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className={styles['wrap']}>
              {/* 存放子路由 */}
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default Example;
