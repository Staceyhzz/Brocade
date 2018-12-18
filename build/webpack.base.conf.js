var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

// 手动添加
var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // 添加别名，require模块可直接引用别名
    alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        'assets': resolve('src/assets'),
        'components': resolve('src/components'),
        'utils': resolve('src/utils'),
        'view': resolve('src/view'),
        'static': resolve('static'),
        'libs': resolve('static/libs')
    }
  },
  // 插件项，手动添加
  plugins: [
      // 自定义的变量注入，添加全局依赖
      new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'windows.jQuery': 'jquery',
          'window.jQuery': 'jquery',
          _: 'lodash',
          moment: 'moment'
      })
      //extractSass
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}