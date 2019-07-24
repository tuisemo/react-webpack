const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    vendor: [
      'react',
      'react-router-dom',
      'redux',
      'react-dom',
      'react-redux',
      'redux-saga'
    ]
  },
  output: {
    filename: '[name].dll.js', // 动态链接库输出的文件名称
    path: path.resolve('public/dll'), // 动态链接库输出路径
    library: '_dll_[name]_[hash]' // 全局变量名称 导出库将被以var的形式赋给这个全局变量 通过这个变量获取到里面模块
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         name: 'vendor',
  //         test: path.resolve('./node_modules'),
  //         chunks: 'initial',
  //         enforce: true
  //       }
  //     }
  //   }
  // },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve('public/dll', '[name].manifest.json'),
      name: '_dll_[name]_[hash]' // 和library 一致，输出的manifest.json中的name值
    })
  ]
};
