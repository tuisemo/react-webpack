import React, { useEffect, useContext } from 'react';
import { PropsContext } from '../redux';

function ShowArea() {
  const { state } = useContext(PropsContext);
  // useEffect(() => {
  //     console.log('state: ', state);
  // }, [state])

  return <div style={{ color: state.color }}>字体颜色为{state.color}</div>;
}

export default ShowArea;
