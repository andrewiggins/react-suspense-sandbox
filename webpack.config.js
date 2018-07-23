const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const expand = (...args) => path.join(__dirname, ...args);

module.exports = {
  mode: "development",
  entry: {
    fiber: expand("./src/fiber/index.jsx"),
    suspense: expand("./src/suspense/index.jsx")
  },
  output: {
    path: expand("./dist/"),
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
        loader: "ts-loader",
        exclude: /node_modules|lib/,
        // exclude: m => { let result = m.includes('node_modules') || m.includes('lib'); console.log(result, m); return result; },
        options: {
          transpileOnly: true,
          onlyCompileBundledFiles: true
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React Suspense Sandbox",
      template: expand("./src/suspense/index.html"),
      excludeChunks: ["fiber"],
      filename: "suspense/index.html"
    }),
    new HtmlWebpackPlugin({
      title: "React Fiber Sandbox",
      template: expand("./src/fiber/index.html"),
      excludeChunks: ["suspense"],
      filename: "fiber/index.html"
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minChunks: 2,
      cacheGroups: {
        react: {
          test: /react\./,
          name: "react"
        },
        "react-dom": {
          test: /react-dom\./,
          name: "react-dom"
        }
      }
    }
  }
};
