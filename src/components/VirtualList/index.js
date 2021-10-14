import React, { useRef, useEffect, useState, useMemo, Fragment } from 'react';
import style from './style.less';
const Noop = () => {};
export default function VirtualList({
  data = [],
  defaultItemHeigth = 30,
  renderItem = Noop
}) {
  const contentRef = useRef(null);
  const [startOffset, setStartOffset] = useState(0);
  const [visibleCount, setVisibleCount] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [listHeight, setListHeight] = useState(data.length * defaultItemHeigth);
  const visibleData = useMemo(() => {
    const newData = data.slice(startIndex, visibleCount);
    return newData;
  });
  useEffect(() => {
    // 可视窗口高度
    contentRef.current.clientHeight / defaultItemHeigth;
    console.log(
      '🚀 ~ file: index.js ~ line 32 ~ useEffect ~ contentRef.current.height',
      contentRef.current.clientHeight
    );

    // 计算容器高度
    setListHeight(data.length * defaultItemHeigth);
    // 监听滚动事件
    contentRef.current.addEventListener('scroll', e => {
      console.log(
        '🚀 ~ file: index.js ~ line 21 ~ contentRef.addEventListener ~ e',
        e
      );
    });
  }, []);
  return (
    <div ref={contentRef} className={style['VirtualListContent']}>
      <div
        className={style['VirtualListScroll']}
        style={{
          height: `${listHeight}px`,
          transform: `translate3d(0,${startOffset}px,0)`
        }}
      >
        {visibleData.map(item => (
          <Fragment>{renderItem(item)}</Fragment>
        ))}
      </div>
    </div>
  );
}
