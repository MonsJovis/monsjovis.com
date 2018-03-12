const path = require('path')
const package = require('./package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = env => {

  const isProduction = env && env.production

  const plugins = [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: 'index.html',
      minify: true
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css'
    })
  ]

  const devPlugins = [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    })
  ]

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

  const devPostCssPlugins = [
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

  return {
    entry: {
      app: './src/scripts/app.js',
      // vendor: Object.keys(package.dependencies),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js'
    },
    devServer: {
      contentBase: './dist',
      stats: 'errors-only',
      open: true
    },
    devtool: isProduction ? null : 'inline-source-map',
    optimization: {
      minimizer: [
        new UglifyJSPlugin()
      ]
    },
    module: {
      rules: [{
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          use: [{
              loader: 'style-loader',
              options: {
                sourceMap: !isProduction
              }
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProduction
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProduction
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !isProduction,
                plugins: isProduction ? postCssPlugins : devPostCssPlugins
              }
            },
          ]
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './dist/images/'
            },
          }, {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 81
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              }
            },
          }]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader']
        }
      ],
    },
    plugins: isProduction ? plugins : devPlugins
  }
}