import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Icon, message } from 'antd';
import { checkAuth, loginRequest } from '@/api/user';
import styles from './index.less';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      identifyCodeNeed: false,
      identifyCodePath: ''
    };
  }
  handlerLogin = () => {
    const {
      form: { validateFields },
      history,
      dispatch
    } = this.props;
    console.log('history: ', history);
    validateFields((err, val) => {
      if (err) return false;
      const { name, password } = val;
      loginRequest({
        name,
        password
      }).then(res => {
        if (res.data) {
          dispatch({ type: 'UPDATE_AUTH', payload: true });
          history.push('/');
        } else {
          message.error(res.msg);
        }
      });
    });
  };
  render() {
    const { identifyCodeNeed, identifyCodePath } = this.state;
    const {
      form: { getFieldDecorator }
    } = this.props;
    return (
      <div className={styles['login-container']}>
        <Form className={styles['login-form']}>
          <Form.Item className={styles['login-title']}>Admin Manage</Form.Item>
          <Form.Item>
            {getFieldDecorator('name', {
              initialValue: 'admin',
              rules: [{ required: true, message: '用户名' }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                allowClear
                placeholder="用户名"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              initialValue: '123456',
              rules: [{ required: true, message: '请输入密码' }]
            })(
              <Input.Password
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                allowClear
                type="password"
                placeholder="请输入密码"
              />
            )}
          </Form.Item>

          {// 图片验证码
          identifyCodeNeed ? (
            <Form.Item>
              {getFieldDecorator('identifyCode', {
                rules: [{ required: true, message: '请输入密码' }]
              })(
                <Input
                  prefix={
                    <Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="请输入图片验证码"
                  suffix={
                    <img
                      className={styles['identifyCodeImg']}
                      src={identifyCodePath}
                      alt="图片验证码"
                    />
                  }
                />
              )}
            </Form.Item>
          ) : null}

          <Form.Item>
            <Button block type="primary" onClick={this.handlerLogin}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default withRouter(Form.create({})(connect(mapStateToProps)(Login)));
