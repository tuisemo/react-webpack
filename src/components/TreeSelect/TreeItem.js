import React, { PureComponent, Fragment } from 'react';
import { Checkbox, Button, Collapse } from 'antd';
import Loading from '@/components/Loading';
import * as api from '@/api/demo';
import './index.less';

class TreeItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      defaultArr: [],
      loadMore: true,
      initLoad: true,
      pageNum: 1,
      initLoading: false,
      spinLoading: false
    };
  }
  onChange = e => {
    const { $emit } = this.props;
    $emit(e.target.value);
  };
  initLoadTreeNode = () => {
    const { initLoad, defaultArr } = this.state;
    this.setState({
      initLoading: true
    });
    if (initLoad) {
      api.getTreeList().then(res => {
        console.log('TCL: TreeItem -> loadMoreTreeNode -> res', res);
        const { data = [] } = res;
        this.setState({
          initLoading: false,
          initLoad: false,
          defaultArr: [...defaultArr, ...data]
        });
      });
    }
  };
  loadMoreTreeNode = () => {
    const { defaultArr } = this.state;
    this.setState({
      spinLoading: true
    });
    api.getTreeList().then(res => {
      console.log('TCL: TreeItem -> loadMoreTreeNode -> res', res);
      const { data = [] } = res;
      this.setState({
        spinLoading: false,
        initLoad: false,
        defaultArr: [...defaultArr, ...data]
      });
    });
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
  reduceFilter = arr => {
    let obj = {};
    const res = arr.reduce((cur, next) => {
      obj[next.value] ? '' : (obj[next.value] = true && cur.push(next));
      return cur;
    }, []);
    return res;
  };
  render() {
    let {
      name,
      value,
      children: propsChildren = [],
      defaultValue = [],
      index = 0,
      $emit
    } = this.props;
    // 合并树结构数据
    const { defaultArr, initLoading, spinLoading } = this.state;
    const children = this.reduceFilter([...propsChildren, ...defaultArr]);
    console.log('TCL: TreeItem -> render -> children==========', children);
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
    return (
      <Collapse
        bordered={false}
        key={`${value}`}
        className="treeNode"
        onChange={this.initLoadTreeNode}
      >
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
          {initLoading ? (
            <Loading />
          ) : (
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
              <Button
                type="link"
                size="small"
                onClick={this.loadMoreTreeNode}
                style={{ paddingLeft: 40 }}
              >
                {spinLoading ? <Loading /> : '加载更多'}
              </Button>
            </Fragment>
          )}
        </Collapse.Panel>
      </Collapse>
    );
    // return children.length ? (
    //   <Collapse
    //     bordered={false}
    //     key={`${value}`}
    //     className="treeNode"
    //     onChange={this.initLoadTreeNode}
    //   >
    //     <Collapse.Panel
    //       header={
    //         <div
    //           className="control"
    //           onClick={event => {
    //             event.stopPropagation();
    //           }}
    //         >
    //           <Checkbox
    //             onChange={this.onChange}
    //             value={value}
    //             checked={checked}
    //           ></Checkbox>
    //           <span>{name}</span>
    //         </div>
    //       }
    //       style={{ ...customPanelStyle }}
    //     >
    //       <Fragment>
    //         {/* 全选按钮 */}
    //         {children.length >= 3 ? (
    //           <Button
    //             type="link"
    //             size="small"
    //             onClick={$emit.bind(null, childrenDataArray, !isAllSelect)}
    //             style={{ paddingLeft: 40 }}
    //           >
    //             全选
    //           </Button>
    //         ) : null}
    //         {/* 子集递归 */}
    //         {children.map(item => {
    //           let { name, value, children: nextChildren = [] } = item;
    //           return (
    //             <Fragment key={`${value}`}>
    //               <TreeItem
    //                 name={name}
    //                 value={value}
    //                 children={nextChildren}
    //                 key={`${value}`}
    //                 defaultValue={defaultValue}
    //                 $emit={$emit}
    //                 index={index + 1}
    //               ></TreeItem>
    //             </Fragment>
    //           );
    //         })}
    //         <Button
    //           type="link"
    //           size="small"
    //           onClick={this.loadMoreTreeNode}
    //           style={{ paddingLeft: 40 }}
    //         >
    //           加载更多
    //         </Button>
    //       </Fragment>
    //     </Collapse.Panel>
    //   </Collapse>
    // ) : (
    //   <div className="treeNode" style={{ paddingLeft: 40 }}>
    //     <div
    //       className="control"
    //       onClick={event => {
    //         event.stopPropagation();
    //       }}
    //     >
    //       <Checkbox
    //         onChange={this.onChange}
    //         value={value}
    //         checked={checked}
    //       ></Checkbox>
    //       <span>{name}</span>
    //     </div>
    //   </div>
    // );
  }
}
export default TreeItem;
