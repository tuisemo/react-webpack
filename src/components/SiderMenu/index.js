import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import styles from './index.less';

const { Sider } = Layout;

export default () => {
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className={styles['slogon']}>React</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1">
          <Link to="/example/counter" className="nav-text">
            <Icon type="calculator" />
            <span className="nav-text">Counter</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/example/todos" className="nav-text">
            <Icon type="schedule" />
            <span className="nav-text">TodoList</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/example/tables" className="nav-text">
            <Icon type="table" />
            <span className="nav-text">Tables</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
