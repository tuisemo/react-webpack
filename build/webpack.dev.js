const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  /*打包模式*/
  mode: 'development',
  //webpack-dev-server
  devServer: {
    contentBase: path.resolve('./dist'),
    compress: true, // gzip压缩
    host: 'localhost', // 允许ip访问
    hot: true, // 热更新
    historyApiFallback: true, // 解决启动后刷新404
    port: 8080, // 端口
    open: true,
    proxy: {
      // 配置服务代理
      '/api': {
        target: 'http://localhost:3000',
        // pathRewrite: { "^/api": "" }, //可转换
        changeOrigin: true
      }
    }
  }
});
