import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Form, Input } from 'antd';
import styles from './index.less';
import TreeSelect from '@/components/TreeSelect';

const mapStateToProps = state => state;

class Page extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [
        {
          name: '001',
          value: '001',
          children: [
            {
              name: '010',
              value: '010',
              children: [
                {
                  name: '100',
                  value: '100',
                  children: []
                },
                {
                  name: '101',
                  value: '101',
                  children: []
                },
                {
                  name: '102',
                  value: '102',
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: '002',
          value: '002',
          children: [
            {
              name: '020',
              value: '020',
              children: [
                {
                  name: '200',
                  value: '200',
                  children: []
                }
              ]
            },
            {
              name: '021',
              value: '021',
              children: [
                {
                  name: '201',
                  value: '201',
                  children: [
                    {
                      name: '300',
                      value: '300'
                    }
                  ]
                }
              ]
            },
            {
              name: '022',
              value: '022',
              children: [
                {
                  name: '202',
                  value: '202',
                  children: []
                }
              ]
            }
          ]
        }
      ]
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
  log = () => {
    const {
      form: { getFieldsValue }
    } = this.props;
    const res = getFieldsValue();
    console.log('res: ', res);
  };
  render() {
    const {
      form: { getFieldDecorator },
      counter
    } = this.props;
    const { treeData } = this.state;
    return (
      <Row>
        <Col span={8}>
          current Num: <span>{counter}</span>
          <br />
          {/* <TreeSelect treeData={treeData}></TreeSelect> */}
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
            <br />
            <Form.Item>
              {getFieldDecorator('ssss', {
                initialValue: ['100']
              })(<TreeSelect treeData={treeData}></TreeSelect>)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={this.log}>
                log
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Form.create({})(connect(mapStateToProps)(Page));
