import React, { useState, useCallback } from 'react';
import Button from './component/button';
import Demo from './demo';
import VirtualList from '@/components/VirtualList';

export default function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [obj, setObj] = useState({ a: 1, b: 2 });
  const [arrays, setArrays] = useState(new Array(200).fill('虚拟数据'));

  const handleClickButton1 = () => {
    setCount1(count1 + 1);
  };

  const handleClickButton2 = useCallback(() => {
    setCount2(count2 + 1);
  }, [count2]);

  const handleChange = e => {
    console.log('🚀 ~ file: index.js ~ line 21 ~ handleChange ~ e', e);
    obj.b = 4;
    setObj({ ...obj, b: 4 });
  };
  const renderItem = item => {
    return <p>{item}</p>;
  };

  return (
    <div>
      <Demo></Demo>
      <div>
        <Button onClickButton={handleClickButton1}>Button1</Button>
      </div>
      <div>
        <Button onClickButton={handleClickButton2}>Button2</Button>
      </div>
      <div>
        <Button
          onClickButton={() => {
            setCount3(count3 + 1);
          }}
        >
          Button3
        </Button>
      </div>
      <button onClick={handleChange}>点击{obj.b}</button>
      <div
        style={{
          height: '400px',
          overflow: 'auto'
        }}
      >
        <VirtualList data={arrays} renderItem={renderItem}></VirtualList>
      </div>
    </div>
  );
}
/**
 * useCallback用于缓存函数执行
 * useMemo用于缓存值（与该值依赖的组件，在值没有发生变化的时候，可以避免无用的render渲染）
 */
