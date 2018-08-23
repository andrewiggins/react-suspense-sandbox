const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const expand = (...args) => path.join(__dirname, ...args);

const entry = {
  fiber: expand("./src/fiber/index.jsx"),
  suspense: expand("./src/suspense/index.jsx"),
  "movie-app": expand("./src/movie-app/index.jsx")
};

const getExcludedChunks = currentChunkId =>
  Object.keys(entry).filter(chunk => chunk !== currentChunkId);

module.exports = {
  mode: "development",
  entry,
  output: {
    path: expand("./dist/"),
    filename: "[name].bundle.js"
  },
  devtool: "source-map",
  resolve: {
    alias: {
      react: expand("./lib/react.5cefd9b1e.development.js"),
      "react-dom": expand("./lib/react-dom.5cefd9b1e.development.js")
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
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "img"
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { importLoaders: 1 } },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React Suspense Sandbox",
      template: expand("./src/suspense/index.html"),
      excludeChunks: getExcludedChunks("suspense"),
      filename: "suspense/index.html"
    }),
    new HtmlWebpackPlugin({
      title: "React Fiber Sandbox",
      template: expand("./src/fiber/index.html"),
      excludeChunks: getExcludedChunks("fiber"),
      filename: "fiber/index.html"
    }),
    new HtmlWebpackPlugin({
      title: "React Movie App",
      template: expand("./src/movie-app/index.html"),
      excludeChunks: getExcludedChunks("movie-app"),
      filename: "movie-app/index.html"
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
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
