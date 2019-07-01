import React, { PureComponent } from 'react';
import { Descriptions } from 'antd';
import { getEmployeeDetails } from '@/api/demo';

class Details extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      info: {}
    };
  }
  getDetails = async id => {
    const res = await getEmployeeDetails({ id });
    this.setState({
      info: res.data
    });
  };
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.getDetails(id);
  }
  render() {
    const {
      info: { name, age, gender, mobile, address, remarks }
    } = this.state;
    return (
      <Descriptions title="User Info">
        <Descriptions.Item label="name">{name}</Descriptions.Item>
        <Descriptions.Item label="age">{age}</Descriptions.Item>
        <Descriptions.Item label="gender">{gender}</Descriptions.Item>
        <Descriptions.Item label="mobile">{mobile}</Descriptions.Item>
        <Descriptions.Item label="address">{address}</Descriptions.Item>
        <Descriptions.Item label="remarks">{remarks}</Descriptions.Item>
      </Descriptions>
    );
  }
}
export default Details;
