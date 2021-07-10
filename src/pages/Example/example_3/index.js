import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef
} from 'react';
// hooks实现节流函数
const useThrottle = (fn, ms = 30, deps = []) => {
  let previous = useRef(0);
  const [time, setTime] = useState(ms);
  useEffect(() => {
    let now = Date.now();
    if (now - previous.current > time) {
      fn();
      previous.current = now;
    }
  }, deps);
  const quit = () => {
    setTime(0);
  };
  return [quit];
};
// hooks实现防抖函数
const useDebounce = (fn, ms = 30, deps = []) => {
  let timeout = useRef();
  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      fn();
    }, ms);
  }, deps);

  const cancel = () => {
    clearTimeout(timeout.current);
    timeout = null;
  };

  return [cancel];
};
/**
 * 如果你需要在组件ref挂载完成之后调用一个你自己的方法，你需要使用callback ref
 * @returns
 */
function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
    console.log('🚀 ~ file: index.js ~ line 43 ~ MeasureExample ~ node', node);
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  );
}

const Parent = () => {
  const childRef = useRef(null);

  useEffect(() => {
    childRef.current.focus();
  }, []);

  return (
    <>
      <Child ref={childRef} />
    </>
  );
};
const Child = forwardRef((props, ref) => {
  // 对于函数组件，useRef无法直接获取到当前组件的实例，需要使用forwardRef包裹实现
  return <input type="text" name="child" ref={ref} />;
});

const Home = props => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [cancel] = useDebounce(
    () => {
      setB(a);
    },
    2000,
    [a]
  );
  const [quit] = useThrottle(
    () => {
      setC(a);
    },
    2000,
    [a]
  );

  const changeIpt = e => {
    setA(e.target.value);
  };
  /**
   * useRef可以用于获取dom实例
   */
  const iptref = useRef(null);
  const onButtonClick = () => {
    iptref.current.focus();
  };
  return (
    <div>
      <input type="text" onChange={changeIpt} />
      <p>
        {b} {a}
      </p>
      <p>
        {b} {c}
      </p>
      <div>
        <input ref={iptref}></input>
        <button onClick={onButtonClick}>Focus the input</button>
      </div>
      <MeasureExample></MeasureExample>
      <Parent></Parent>
    </div>
  );
};

export default Home;
/**
 * useRef与createRef的区别，可以简单的划分为：
 * useRef只能在函数式组件中使用；createRef只能在类组件中使用
 * ---------
 * useRef常常有两种作用：
 * 1.作为一个不变量在整个组件的生命周期内存在
 * 2.用于获取当前组件的实例使用，从而可以对组件做一些dom操作
 */
