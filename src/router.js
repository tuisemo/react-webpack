import React from 'react';
import { Route, Switch, IndexRoute, Redirect } from 'react-router-dom';

import Loadable from 'react-loadable'; // 按路由拆分代码
import Loading from '@/components/Loading'; // Loading组件

// 异步引入页面
const Home = Loadable({
  loader: () => import('pages/Example/App'),
  loading: Loading
});
const Example = Loadable({
  loader: () => import('pages/Example/index'),
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
    <Route exact path="/" component={Home} />
    <Example path="/example">
      <Switch>
        <Route
          exact
          path="/example"
          render={() => <Redirect to="/example/counter"></Redirect>}
        />
        <Route path="/example/counter" component={Counter} />
        <Route path="/example/todos" component={Todos} />
        <Route path="/example/tables" component={Tables} />
        <Route path="/example/details/:id" component={Details} />
        <Route component={PageNotFound} />
      </Switch>
    </Example>
    <Route component={PageNotFound} />
  </Switch>
);

export default getRouter;
