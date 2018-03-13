const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const postCssPlugins = [
  require('pixrem')(),
  require('postcss-color-rgba-fallback')(),
  require('postcss-flexbugs-fixes')(),
  require('postcss-pseudoelements')(),
  require('autoprefixer')({
    browsers: ['last 4 versions']
  }),
  require('postcss-ordered-values')(),
  require('postcss-merge-longhand')(),
  require('postcss-merge-rules')(),
  require('postcss-discard-empty')(),
  require('perfectionist')()
]

module.exports = merge.smart(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
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
  }
});