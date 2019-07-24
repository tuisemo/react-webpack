import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Loadable from 'react-loadable'; // 按路由拆分代码
import Loading from '@/components/Loading'; // Loading组件

import PrivateRoute from '@/components/PrivateRoute'; // 权限路由组件
import PrimaryLayout from '@/layouts/PrimaryLayout'; // 布局组件
// import HocPrivateRoute from '@/components/PrivateRoute/HocPrivateRoute'; // 权限路由-高阶封装
// const PrivateRoute = HocPrivateRoute(Route);

// 异步引入页面
const Login = Loadable({
  loader: () => import('pages/Login/App'),
  loading: Loading
});
const Counter = Loadable({
  loader: () => import('pages/Example/Counter/index'),
  loading: Loading
});
const Todos = Loadable({
  loader: () => import('pages/Example/Todos/index'),
  loading: Loading
});
const Tables = Loadable({
  loader: () => import('pages/Example/Tables/index'),
  loading: Loading
});
const Details = Loadable({
  loader: () => import('pages/Example/Tables/Details'),
  loading: Loading
});
const PageNotFound = Loadable({
  loader: () => import('pages/404'),
  loading: Loading
});

/**
 * React Router不再提倡中心化路由，取而代之的是将路由分散至各布局及UI之间
 */
// 路由
const getRouter = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <PrimaryLayout>
      <Switch>
        <PrivateRoute exact path="/" component={Counter} />
        <Route
          exact
          path="/example"
          render={() => <Redirect to="/example/counter"></Redirect>}
        />
        <PrivateRoute path="/example/counter" component={Counter} />
        <PrivateRoute path="/example/todos" component={Todos} />
        <PrivateRoute path="/example/tables" component={Tables} />
        <PrivateRoute path="/example/details/:id" component={Details} />
        <Route component={PageNotFound} />
      </Switch>
    </PrimaryLayout>
    <Route component={PageNotFound} />
  </Switch>
);

export default getRouter;
