import React, { PureComponent, Fragment } from 'react';
import TreeItem from './TreeItem';

class TreeSelect extends PureComponent {
  constructor(props) {
    super(props);
    const { value = [] } = props;
    this.state = {
      checked: value
    };
  }
  diff = (arr, selectAll) => {
    let { checked = [] } = this.state;
    let newArray = checked;
    if (selectAll) {
      // 全选
      newArray = [...new Set([...checked, ...arr])];
    } else {
      // 取消全选
      arr.forEach(el => {
        newArray = newArray.filter(item => {
          return el != item;
        });
      });
    }

    this.setState({ checked: newArray });
    this.triggerChange(newArray);
  };
  emit = (data, selectAll) => {
    //   判断是否'全选'=>入参为数组
    if (data instanceof Array) {
      this.diff(data, selectAll);
      return;
    }
    const { checked } = this.state;
    const index = checked.indexOf(data);
    if (index > -1) {
      const newChecked = checked.filter(el => {
        return el !== data;
      });
      this.setState({ checked: newChecked });
      this.triggerChange(newChecked);
    } else {
      this.setState({ checked: [...checked, data] });
      this.triggerChange([...checked, data]);
    }
  };
  triggerChange = data => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(data);
    }
  };
  render() {
    const { treeData = [] } = this.props;
    const { checked } = this.state;
    return (
      <Fragment>
        {treeData.map(item => {
          const { name, value, children } = item;
          return (
            <TreeItem
              name={name}
              value={value}
              children={children}
              key={`${value}`}
              defaultValue={checked}
              $emit={this.emit}
              index={0}
            ></TreeItem>
          );
        })}
      </Fragment>
    );
  }
}
export default TreeSelect;
