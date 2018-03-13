const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
    rules: [
      {
        test: /\.scss$/,
        use: [{
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: postCssPlugins
            }
          },
        ]
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJSPlugin()
    ]
  },
}