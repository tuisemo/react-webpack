import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Form, Input } from 'antd';
import styles from './index.less';
import TreeSelect from '@/components/TreeSelect';
import * as api from '@/api/demo';

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
  log = () => {
    const {
      form: { getFieldsValue }
    } = this.props;
    const res = getFieldsValue();
    console.log('res: ', res);
  };
  loadMoreTreeNode = () => {
    api.getTreeList().then(res => {
      console.log('TCL: TreeItem -> loadMoreTreeNode -> res', res);
      const { data = [] } = res;
      this.setState({
        treeData: data
      });
    });
  };
  componentDidMount() {
    this.loadMoreTreeNode();
  }
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
