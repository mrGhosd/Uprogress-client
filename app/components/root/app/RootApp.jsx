var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, 'client/reduxstagram.jsx')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
    // js
    {
      test: /\.jsx$/,
      loader: 'babel-loader',
      query: {
          plugins: ['transform-runtime', 'transform-decorators-legacy'],
          presets: [ 'es2015', 'stage-0', 'react']
        }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader'
    },
    // CSS
    {
      test: /\.styl$/,
      include: path.join(__dirname, 'client'),
      loader: 'style-loader!css-loader!stylus-loader'
    }
    ]
  }
  // resolve: {
  //   modulesDirectories: ['node_modules', 'bower_components', 'client', path.join(__dirname, 'components')],
  // }
};
