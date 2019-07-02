import React, { PureComponent, Fragment } from 'react';
import { Checkbox, Button } from 'antd';
import './index.less';

class TreeItem extends PureComponent {
  constructor(props) {
    super(props);
  }
  onChange = e => {
    const { $emit } = this.props;
    $emit(e.target.value);
  };
  render() {
    let {
      name,
      value,
      children = [],
      defaultValue = [],
      index = 0,
      $emit
    } = this.props;
    let checked = defaultValue.includes(value);
    return (
      <div
        key={`${value}`}
        className="treeNode"
        style={{ paddingLeft: index * 15 }}
      >
        <div className="control">
          <Checkbox
            onChange={this.onChange}
            value={value}
            checked={checked}
          ></Checkbox>
          <span>{name}</span>
        </div>
        {/* 子集dom */}
        <div className="childrenContainer">
          {/* 全选按钮 */}
          {children.length >= 3 ? (
            <Button
              type="link"
              size="small"
              onClick={$emit.bind(null, children)}
            >
              全选
            </Button>
          ) : null}
          {/* 子集递归 */}
          {children.map(item => {
            let { name, value, children: nextChildren = [] } = item;
            let checked = defaultValue.includes(value);
            if (children.length) {
              return (
                <Fragment key={`${value}`}>
                  <TreeItem
                    name={name}
                    value={value}
                    children={nextChildren}
                    key={`${value}`}
                    defaultValue={defaultValue}
                    $emit={$emit}
                    index={index + 1}
                  ></TreeItem>
                </Fragment>
              );
            }
            return (
              <div
                key={`${value}`}
                className="treeNode"
                style={{ paddingLeft: (index + 1) * 15 }}
              >
                <Checkbox
                  onChange={this.onChange}
                  value={value}
                  checked={checked}
                ></Checkbox>
                <span>{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default TreeItem;
