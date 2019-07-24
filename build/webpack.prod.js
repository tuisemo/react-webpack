const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const extPlugins = [];
/**
 * 根据打包执行命令传参`npm run build --report`，判断是否输出report
 */
if (process.env.npm_config_report) {
  extPlugins.push(new BundleAnalyzerPlugin());
}
module.exports = merge(common, {
  mode: 'production',
  performance: {
    hints: false
  },
  plugins: [new OptimizeCssAssetsPlugin(), ...extPlugins]
});
