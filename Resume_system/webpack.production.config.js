var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.join(__dirname),
  entry: "./src/js/root.js",
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015", "stage-0"],
          plugins: ["react-html-attrs"] //添加组件的插件配置
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: "url-loader?limit=8192",
        use: ["file-loader"]
      }
    ]
  },
  entry: {
    app: path.resolve(__dirname, "./src/js/root.js")
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./src/bundle.js"
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new HtmlWebpackPlugin({
      title: "resume-system-front",
      filename: "app.html",
      template: "./index.html" //Load a custom template
    })
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  }
};
