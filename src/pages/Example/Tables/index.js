import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Input, Table } from 'antd';
import { getEmployees } from '@/api/demo';

const mapStateToProps = state => state;

class Tables extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataList: []
    };
  }
  getDataList = async () => {
    this.setState({
      loading: true
    });
    const res = await getEmployees();
    this.setState({
      loading: false,
      dataList: res.data
    });
  };
  componentDidMount() {
    this.getDataList();
  }

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    const { dataList = [], loading } = this.state;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name'
      },
      {
        title: '年龄',
        dataIndex: 'age'
      },
      {
        title: '性别',
        dataIndex: 'gender',
        render: gender => {
          return gender ? '男' : '女';
        }
      },
      {
        title: '电话',
        dataIndex: 'mobile'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <Fragment>
              <Link to={`/example/details/${record.id}`}>详情</Link>
              <Button type="link" size="small">
                操作
              </Button>
            </Fragment>
          );
        }
      }
    ];
    return (
      <Fragment>
        <Form layout="inline">
          <Form.Item label="name">
            {getFieldDecorator('name', {})(<Input></Input>)}
          </Form.Item>
          <Form.Item>
            <Button onClick={this.getDataList}>Search</Button>
          </Form.Item>
        </Form>
        <Table
          style={{ marginTop: 15 }}
          rowKey={record => record.id}
          columns={columns}
          dataSource={dataList}
          loading={loading}
        ></Table>
      </Fragment>
    );
  }
}

export default Form.create({})(connect(mapStateToProps)(Tables));
