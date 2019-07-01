import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Button, Modal, Form, Input, DatePicker } from 'antd';
import Mock from 'mockjs';
import moment from 'moment';

const mapStateToProps = state => state;

class TodoList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  // 移除某项todo
  handleRemove = id => {
    const { dispatch } = this.props;
    dispatch({ type: 'REMOVE_TODO', payload: id });
  };
  // 弹窗状态切换
  toogleModal = state => {
    this.setState({
      showModal: state
    });
  };
  // 确定事件捕获
  handleOk = () => {
    const {
      form: { validateFields }
    } = this.props;
    validateFields((err, data) => {
      if (err) return false;
      this.handleSubmit(data);
    });
  };
  // 取消事件捕获
  handleCancle = () => {
    this.toogleModal(false);
  };
  // 提交事件
  handleSubmit = data => {
    const { dispatch } = this.props;
    const { id } = Mock.mock({ id: '@id' });
    const { dealLine } = data;
    dispatch({
      type: 'PUSH_ITEM',
      payload: { ...data, id, dealLine: moment(dealLine).format('YYYY-MM-DD') }
    });
    this.toogleModal(false);
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'GET_TODOS'
    });
  }
  render() {
    const {
      todos: { list },
      form: { getFieldDecorator }
    } = this.props;
    const { showModal } = this.state;
    const formItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 18
      }
    };
    return (
      <Fragment>
        <Button type="primary" onClick={this.toogleModal.bind(this, true)}>
          新增
        </Button>
        <Row gutter={16}>
          {list.map((el, k) => {
            return (
              <Col span={6} style={{ marginTop: 16 }} key={k}>
                <Card
                  title={el.title}
                  extra={
                    <Button
                      type="danger"
                      onClick={this.handleRemove.bind(this, el.id)}
                    >
                      移除
                    </Button>
                  }
                >
                  <p>截止日期:{el.dealLine}</p>
                  <p>地址:{el.address}</p>
                  <p>备注:{el.remarks}</p>
                </Card>
              </Col>
            );
          })}
        </Row>
        <Modal
          title="新增任务"
          visible={showModal}
          onCancel={this.handleCancle}
          onOk={this.handleOk}
        >
          <Form {...formItemLayout}>
            <Form.Item label="标题">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请填写标题'
                  }
                ]
              })(<Input placeholder="请输入标题"></Input>)}
            </Form.Item>
            <Form.Item label="截止日期">
              {getFieldDecorator('dealLine', {
                rules: [
                  {
                    required: true,
                    message: '请填写日期'
                  }
                ]
              })(<DatePicker format="YYYY-MM-DD"></DatePicker>)}
            </Form.Item>
            <Form.Item label="地址">
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: '请填写地址'
                  }
                ]
              })(<Input placeholder="请输入地址"></Input>)}
            </Form.Item>
            <Form.Item label="备注">
              {getFieldDecorator('remarks', {})(
                <Input.TextArea></Input.TextArea>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

export default Form.create()(connect(mapStateToProps)(TodoList));
