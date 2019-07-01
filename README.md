## React-Webpack

> - react 16.8.6
> - webpack 4.34.0
> - react-router-dom 5.0.1
> - redux 4.0.1

### 使用

安装

```
npm install
```

开发模式

```
npm run start
```

打包

```
npm run build
```

### 区分环境打包

```bash
// 目录结构
└───build
        webpack.common.js
        webpack.dev.js
        webpack.prod.js

// npm scripts
  "scripts": {
    "start": "webpack-dev-server --config ./build/webpack.dev.js",
    "build": "webpack --config ./build/webpack.prod.js"
  },
```

### babel 编译

- @babel/core 调用 Babel 的 API 进行转码
- @babel/preset-env 用于解析 ES6
- @babel/preset-react 用于解析 JSX
- babel-loader 加载器

### HtmlWebpackPlugin 优化

```javascript
plugins: [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve('./public/index.html')
  })
];
```

### 集成 PostCSS 优化

> PostCSS 提供了 Autoprefixer 这个插件来帮我们完成添加浏览器前缀的工作

```css
// 编译前
.page-box {
  border: 1px solid red;
  display: flex;
}

// 编译后
.page-box {
  border: 1px solid red;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
```

### CSS Modules 优化

我们在 webpack.common.js 中启用 modules

```
use: ['style-loader', 'css-loader?modules', 'postcss-loader']
```

以上配置即可开启，我们也可进一步美化一下，在使用 cssmodules 的同时，也能看清楚原先是哪个样式

```javascript
// 之前
'css-loader?modules'

// 之后
{
    loader:'css-loader',
    options: {
        modules: true,
        localIdentName: '[local]--[hash:base64:5]'
    }
}
```

### 图片编译压缩

```javascript
{
    test: /\.(png|jpg|gif)$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 8192
        }
    }]
}
```

_options limit 8192 意思是，小于等于 8K 的图片会被转成 base64 编码，直接插入 HTML 中，减少 HTTP 请求_

### 按需加载

> 按路由或按组件区分，动态加载，有助于切割代码

```javascript
import Loadable from 'react-loadable';
import Loading from './my-loading-component';

const LoadableComponent = Loadable({
  loader: () => import('./my-component'),
  loading: Loading
});

/**
 *Loading组件是预置的过滤组件
 */
```

### proxy 代理

```javascript
  devServer: {
    contentBase: path.resolve('./dist'),
    compress: true, // gzip压缩
    host: '0.0.0.0', // 允许ip访问
    hot: true, // 热更新
    historyApiFallback: true, // 解决启动后刷新404
    port: 8000, // 端口
    proxy: {
      // 配置服务代理
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' }, //可转换
        changeOrigin: true
      }
    }
  }
```

### 文件路径别名

```javascript
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      pages: path.resolve('./src/pages'),
      components: path.resolve('./src/components'),
      router: path.resolve('./src/router'),
      images: path.resolve('./src/assets/images')
    }
  },
```

### Husky

Git 提交钩子，在代码提交至仓库前，可执行一些配置命令。当前项目结合下面的`prettier`配置了代码格式化

```json
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx,json,css,md}": ["prettier --write", "git add"]
  }
```

### prettier 代码格式化

```json
"scripts": {
  "prettier": "prettier --write \"src/**/*.{js,jsx}\""
 }

// 项目加入npm scripts命令，可执行 npm run scripts 自动化格式
```
