import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import store from './redux';
import getRouter from './router';
import EnterLayouts from '@/layouts/index'; // 基础布局
import 'antd/dist/antd.css';
import './assets/styles/global.less';

// 仅在开发模式下使用mock
if (process.env.NODE_ENV === 'development') {
  require('mocks/index.js');
}

ReactDom.render(
  <Provider store={store}>
    <EnterLayouts>
      <Router>{getRouter()}</Router>
    </EnterLayouts>
  </Provider>,
  document.getElementById('app')
);
