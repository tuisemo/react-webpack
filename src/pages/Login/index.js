import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Icon } from 'antd';
import styles from './index.less';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      identifyCodeNeed: false,
      identifyCodePath: ''
    };
  }

  render() {
    const { identifyCodeNeed, identifyCodePath } = this.state;
    const {
      form: { getFieldDecorator }
    } = this.props;
    return (
      <div className={styles['login-container']}>
        <Form className={styles['login-form']}>
          <Form.Item className={styles['login-title']}>登录</Form.Item>
          <Form.Item>
            {getFieldDecorator('loginName', {
              rules: [{ required: true, message: '用户名' }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="用户名"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }]
            })(
              <Input.Password
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
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
            <Link to={`/Register`} className={styles['link_left']}>
              立即注册
            </Link>
            <Link to={`/ResetPassword`} className={styles['link_right']}>
              忘记密码？
            </Link>
            <Button block type="primary">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Form.create()(Login);
