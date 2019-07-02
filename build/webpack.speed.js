const webpack = require('webpack');
const path = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const extPlugins = [];
/**
 * 根据打包执行命令传参`npm run build --report`，判断是否输出report
 */
if (process.env.npm_config_report) {
  extPlugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  mode: 'production',
  performance: {
    hints: false
  },
  /*入口*/
  entry: {
    app: path.resolve('./src/index.js')
  },
  devtool: 'inline-source-map',

  /*输出到dist目录，输出文件名字为bundle.js*/
  output: {
    publicPath: '/',
    path: path.resolve('./dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js'
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
        // use: ['babel-loader?cacheDirectory=true'],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: [['import', { libraryName: 'antd', style: 'css' }]]
          }
        },
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
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsPlugin(),
    // 拷贝静态文件
    new CopyWebpackPlugin([
      { from: path.resolve('./public/dll'), to: path.resolve('./dist') }
    ]),
    // 查找动态链接库文
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve('./public/dll/vendor.manifest.json')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve('./public/index.html')
    }),
    // 自动引入dll文件
    new HtmlIncludeAssetsPlugin({
      assets: ['./vendor.dll.js'], // 添加的资源相对html的路径
      append: false // false 在其他资源的之前添加 true 在其他资源之后添加
    }),
    ...extPlugins
  ]
};
