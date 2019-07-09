const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const port = 8080;
module.exports = merge.smart(common, {
  devServer: {
    overlay: true,
    port: port,
    quiet: true, //need this for FriendlyErrorsWebpackPlugin
    watchContentBase: true,
    contentBase: path.join(__dirname, "src"),
    watchOptions: {
      ignored: /node_modules/,
    },
  },
  optimization: {
    nodeEnv: "development",
  },
  mode: "development",
  devtool: "cheap-module-source-map",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve("./src"),
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          compact: false,
        },
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `Your application is running here: http://localhost:${port}`,
        ],
      },
    }),
  ],
});
