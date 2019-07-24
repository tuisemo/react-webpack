import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dropdown, Menu, Avatar, Icon } from 'antd';
import { logoutRequest } from '@/api/user';
import styles from './index.less';

class HeaderNav extends PureComponent {
  constructor(props) {
    super(props);
  }
  logOut = () => {
    const { history, dispatch } = this.props;
    logoutRequest().then(res => {
      history.push('/login');
    });
  };
  componentDidMount() {}
  render() {
    return (
      <nav className={styles['nav']}>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={this.logOut}>
                <Icon type="logout" />
                退出登录
              </Menu.Item>
            </Menu>
          }
        >
          <div style={{ cursor: 'pointer' }}>
            <Avatar icon="user"></Avatar>
            <span className={styles['userName']}>nick_name</span>
          </div>
        </Dropdown>
      </nav>
    );
  }
}
const mapStateToProps = state => state;
export default withRouter(connect(mapStateToProps)(HeaderNav));
