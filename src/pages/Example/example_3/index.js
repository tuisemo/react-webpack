import React, { useState, useEffect, useRef } from 'react';
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
  return (
    <div>
      <input type="text" onChange={changeIpt} />
      <p>
        {b} {a}
      </p>
      <p>
        {b} {c}
      </p>
    </div>
  );
};

export default Home;
