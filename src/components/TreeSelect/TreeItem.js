import React, { PureComponent, Fragment } from 'react';
import { Checkbox, Button } from 'antd';
import classnames from 'classnames';
import './index.less';

class TreeItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }
  onChange = e => {
    const { $emit } = this.props;
    $emit(e.target.value);
  };
  toogleExpand = () => {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded
    });
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
    const { expanded } = this.state;
    let checked = defaultValue.includes(value);
    const svgIcon = (
      <svg
        viewBox="0 0 1024 1024"
        data-icon="caret-down"
        width="10px"
        height="10px"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
      </svg>
    );
    return (
      <div
        key={`${value}`}
        className="treeNode"
        style={{ paddingLeft: index * 15 }}
      >
        <div className="control">
          <span
            className={classnames('controlBtn', { expanded: expanded })}
            onClick={this.toogleExpand}
          >
            {svgIcon}
          </span>
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
