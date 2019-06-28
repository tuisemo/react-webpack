const babelConfig = {
  presets: [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        modules: false,
        useBuiltIns: "usage"
      }
    ]
  ],
  plugins: [
    [
      "import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css" // `style: true` 会加载 less 文件
      }
    ],
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: false,
        helpers: true, // 默认，可以不写
        regenerator: false,
        useESModules: true
      }
    ],
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-proposal-class-properties"
  ]
};

module.exports = babelConfig;
