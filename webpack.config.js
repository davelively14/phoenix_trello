'use strict'

var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')

// The path.resolve is a Node.js function takes a sequence of paths and returns
// an absolute path. __dirname refers to whatever the current directory
// in which the script is executed, in this case the root directory. Used in the
// creation of the output path. Name is confusing
function join(dest) { return path.resolve(__dirname, dest) }

// Calls the preivously defined join function, but includes the 'web/static' as
// part of the call. This is where all the pre-compiled assets are loaded.
function web(dest) { return join('web/static' + dest) }

var config = module.exports = {
  // We set two entries here. One for style sheets (sass), one for JS. These
  // will appear as requires in the output file.
  entry: {
    application: [
      web('css/application.sass'),
      web('js/application.js')
    ],
  },

  output: {
    path: join('priv/static'),
    filename: 'js/application.js'
  },

  resolve: {
    extension: ['', '.js', '.sass'],
    modulesDirectories: ['node_modules']
  },

  module: {
    noParse: /vendor\/phoenix/,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy'],
          presets: ['react', 'es2015', 'stage-2', 'stage-0']
        }
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass?indentedSyntax&includePaths[]=' + __dirname +  '/node_modules')
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('css/application.css')
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  )
}
