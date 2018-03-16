const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const common = require('./webpack.common.js')

const postCssPlugins = [
  require('pixrem')(),
  require('postcss-color-rgba-fallback')(),
  require('postcss-flexbugs-fixes')(),
  require('postcss-pseudoelements')(),
  require('autoprefixer')({
    browsers: ['last 4 versions']
  }),
  require('postcss-discard-comments')(),
  require('postcss-colormin')(),
  require('postcss-convert-values')(),
  require('postcss-ordered-values')(),
  require('postcss-minify-font-values')(),
  require('postcss-merge-longhand')(),
  require('postcss-merge-rules')(),
  require('postcss-discard-empty')(),
  require('perfectionist')({
    format: 'compressed'
  })
]

module.exports = merge.smart(common, {
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader"
        },
        {
          loader: "postcss-loader",
          options: {
            plugins: postCssPlugins
          },
        },
        {
          loader: "sass-loader"
        }
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css', // TODO: add [contenthash] see https://github.com/webpack-contrib/mini-css-extract-plugin/pull/30
      outputPath: 'css/'
    }),
    new CopyWebpackPlugin([
      './src/.htaccess'
    ])
  ],
  optimization: {
    minimizer: [
      new UglifyJSPlugin()
    ]
  }
})