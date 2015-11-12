var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function makeWebpackConfig(options) {

  var BUILD = !!options.BUILD;

  return {
    // Efficiently evaluate modules with source maps
    devtool: 'eval',

    // Cache the build
    cache: true,

    entry: './src/app.js',
    /**
    * This will not actually create a bundle.js file in ./dist.
    * It is used by the dev server for dynamic hot loading.
    */
    output: {
      publicPath: BUILD ? '/' : 'http://localhost:8080/',
      path: path.join(__dirname, '/dist'),
      filename: BUILD ? '[name].[hash].js' : '[name].bundle.js',
      chunkFilename: BUILD ? '[name].[hash].js' : '[name].bundle.js'
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body'
      })
    ],

    /**
    * Transform JS source code using Babel configured to Stage 0, transform CSS
    * source code using PostCSS and require binary files with file-loader.
    */
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          loaders: ['style-loader', 'css-loader']
        },
        {
          test: /\.woff(2)?(\?.*)?$/,
          loader: "url-loader?limit=30000&name=[name]-[hash].[ext]"
        },
        {
          test: /\.(ttf|eot|svg)(\?.*)?$/,
          loader: "file"
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          loader: 'file'
        },
        {
          test: /\.html$/,
          loader: 'raw'
        }
      ]
    },
    devServer: {
      contentBase: './dist',
      stats: {
        modules: false,
        cached: false,
        colors: true,
        chunk: false
      }
    }
  };
};
