import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Form, Input } from 'antd';

const mapStateToProps = state => state;

class Page extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      treeData: []
    };
  }
  // 同步增加
  add = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'INCREMENT' });
  };
  // 同步增加携带入参
  addParams = async () => {
    const {
      form: { getFieldsValue },
      dispatch
    } = this.props;
    const { addParams } = await getFieldsValue();
    dispatch({ type: 'INCREMENT_PARAMS', payload: +addParams });
  };
  // 异步增加携带入参
  addAsyncParams = async () => {
    const {
      form: { getFieldsValue },
      dispatch
    } = this.props;
    const { addParamsAsync } = await getFieldsValue();
    dispatch({ type: 'INCREMENT_ASYNC_PARAMS', payload: +addParamsAsync });
  };
  // 异步增加
  addAsync = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'INCREMENT_ASYNC' });
  };
  // 同步减少
  derc = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'DECREMENT' });
  };
  // 异步减少
  decAsync = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'DECREMENT_ASYNC' });
  };
  render() {
    const {
      form: { getFieldDecorator },
      counter
    } = this.props;
    return (
      <Row>
        <Col span={8}>
          <span style={{ fontSize: '30px' }}>current Num: {counter}</span>
        </Col>
        <Col span={16}>
          <Form layout="inline">
            <Form.Item>
              <Button type="primary" onClick={this.add}>
                add
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={this.derc}>
                derc
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={this.addAsync}>
                addAsync
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={this.decAsync}>
                decAsync
              </Button>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('addParams', {
                initialValue: 0
              })(
                <Input
                  className="append-no-padding"
                  addonAfter={
                    <Button type="primary" onClick={this.addParams}>
                      addParams
                    </Button>
                  }
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('addParamsAsync', {
                initialValue: 0
              })(
                <Input
                  className="append-no-padding"
                  addonAfter={
                    <Button type="primary" onClick={this.addAsyncParams}>
                      addAsyncParams
                    </Button>
                  }
                />
              )}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Form.create({})(connect(mapStateToProps)(Page));
