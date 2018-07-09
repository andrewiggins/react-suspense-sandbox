const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const expand = (...args) => path.join(__dirname, ...args);

module.exports = {
  mode: "development",
  entry: expand("./src/index.jsx"),
  output: {
    path: expand("./dist"),
    filename: "[name].bundle.js"
  },
  devtool: "source-map",
  resolve: {
    alias: {
      react: expand("./lib/react.095dd5049.development.js"),
      "react-dom": expand("./lib/react-dom.095dd5049.development.js")
    },
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: "ts-loader",
        exclude: /node_modules|lib/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React Suspense Sandbox",
      template: expand("./src/index.html")
    })
  ]
};
