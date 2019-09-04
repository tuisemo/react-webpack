import React, { useState, useEffect } from 'react';
import { Provider } from './redux/index';
import { Button } from 'antd';
import ChildrenDom from './components/children';
function useStatePage() {
  // const props = useContext(PropsContext)
  // console.log('props: ', props);
  const [age, setAge] = useState(18);
  const [sex, setSex] = useState('男');
  const [work, setWork] = useState('前端程序员');
  useEffect(() => {
    console.log('======update====');
  });
  // componentWillUnMount
  useEffect(() => {
    return () => {
      console.log('====unMounted=====');
    };
  }, []);
  const addAge = () => {
    // dispatch({ type: 'add' })
    setAge(age + 1);
  };
  return (
    <div>
      <p>JSPang 今年:{age}岁</p>
      <p>性别:{sex}</p>
      <p>工作是:{work}</p>
      {/* <Provider> */}
      <ChildrenDom></ChildrenDom>
      {/* </Provider> */}
      <Button onClick={addAge}>add</Button>
    </div>
  );
}
export default useStatePage;
