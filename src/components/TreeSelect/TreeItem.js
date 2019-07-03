import React, { PureComponent, Fragment } from 'react';
import { Checkbox, Button, Collapse } from 'antd';
import classnames from 'classnames';
import './index.less';

class TreeItem extends PureComponent {
  constructor(props) {
    super(props);
  }
  onChange = e => {
    const { $emit } = this.props;
    $emit(e.target.value);
  };
  isChildrenAllSelect = (defaultValue, children) => {
    // 方法一:循环遍历
    return children.every(el => {
      return defaultValue.includes(el.value);
    });
    // 方法二:巧妙利用合并数组长度
    // const length = defaultValue.length;
    // const curArray = children.map(el => {
    //   return el.value;
    // });
    // const newArray = [...new Set([...defaultValue, ...curArray])];
    // return newArray.length == length;
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
    // 当前组件是否选中
    let checked = defaultValue.includes(value);
    // 子项是否全选
    let isAllSelect = this.isChildrenAllSelect(defaultValue, children);
    const childrenDataArray = children.map(el => el.value);
    console.log(isAllSelect);
    const customPanelStyle = {
      border: 0,
      overflow: 'hidden'
    };
    return children.length ? (
      <Collapse bordered={false} key={`${value}`} className="treeNode">
        <Collapse.Panel
          header={
            <div
              className="control"
              onClick={event => {
                event.stopPropagation();
              }}
            >
              <Checkbox
                onChange={this.onChange}
                value={value}
                checked={checked}
              ></Checkbox>
              <span>{name}</span>
            </div>
          }
          style={{ ...customPanelStyle }}
        >
          <Fragment>
            {/* 全选按钮 */}
            {children.length >= 3 ? (
              <Button
                type="link"
                size="small"
                onClick={$emit.bind(null, childrenDataArray, !isAllSelect)}
                style={{ paddingLeft: 40 }}
              >
                全选
              </Button>
            ) : null}
            {/* 子集递归 */}
            {children.map(item => {
              let { name, value, children: nextChildren = [] } = item;
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
            })}
          </Fragment>
        </Collapse.Panel>
      </Collapse>
    ) : (
      <div className="treeNode" style={{ paddingLeft: 40 }}>
        <div
          className="control"
          onClick={event => {
            event.stopPropagation();
          }}
        >
          <Checkbox
            onChange={this.onChange}
            value={value}
            checked={checked}
          ></Checkbox>
          <span>{name}</span>
        </div>
      </div>
    );
  }
}
export default TreeItem;
