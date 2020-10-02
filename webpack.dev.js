const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");
const postCssPlugins = [require("autoprefixer")()];

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: postCssPlugins,
              },
            },
          },
        ],
      },
    ],
  },
});
