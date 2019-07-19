const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  /*入口*/
  entry: {
    app: path.resolve('./src/index.js'),
    // 提取库文件
    vendor: [
      'react',
      'react-router-dom',
      'redux',
      'react-dom',
      'react-redux',
      'redux-saga'
    ]
  },
  devtool: 'inline-source-map',

  /*输出到dist目录，输出文件名字为bundle.js*/
  output: {
    publicPath: '/',
    path: path.resolve('./dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  // 依赖库分离（配合入口文件的vendor）
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: path.resolve('./node_modules'),
          chunks: 'initial',
          enforce: true
        }
      }
    }
  },
  //路径别名配置
  resolve: {
    alias: {
      mocks: path.resolve('./mocks'),
      '@': path.resolve('./src'),
      pages: path.resolve('./src/pages'),
      layouts: path.resolve('./src/layouts'),
      components: path.resolve('./src/components'),
      router: path.resolve('./src/router'),
      utils: path.resolve('./src/utils'),
      images: path.resolve('./src/assets/images')
    },
    extensions: ['.js', '.jsx']
  },
  /*src目录下面的以.js结尾的文件，要使用babel解析*/
  /*cacheDirectory是用来缓存编译结果，下次编译加速*/
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader?cacheDirectory=true'],
        exclude: /node_modules/,
        include: path.resolve('./src')
      },
      {
        test: /\.(css|less)$/,
        include: path.resolve('./src'),
        exclude: /node_modules|antd\.(css|less)/,
        use: [
          'style-loader',
          // { loader: MiniCssExtractPlugin.loader }, // 放弃style-loader,可将样式文件提取成独立文件
          {
            loader: 'css-loader',
            options: {
              modules: true,
              modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                context: path.resolve('./src')
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              modules: true,
              plugins: [require('postcss-cssnext')()]
            }
          },
          'less-loader?modules'
        ]
      },
      //  引入antd时，无法同时开启CSS Modules，需要针对antd开启独立编译规则
      {
        test: /\.(css|less)$/,
        include: /node_modules|antd/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      // 字体文件loader
      {
        test: /\.(ttf|eot|woff|woff2|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(process.env.ENV)
      }
    }),
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   // 压缩css
    //   filename: '[name].[contenthash].css',
    //   chunkFilename: '[id].[contenthash].css'
    // }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve('./public/index.html')
    })
  ]
};
