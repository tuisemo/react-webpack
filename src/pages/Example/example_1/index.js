import React from 'react';
import ShowArea from './component/showArea';
import Buttons from './component/buttons';
import { Provider } from './redux'; //引入ColorProvider组件

function Example6() {
  return (
    <div>
      <Provider>
        <ShowArea />
        <Buttons />
      </Provider>
    </div>
  );
}

export default Example6;
