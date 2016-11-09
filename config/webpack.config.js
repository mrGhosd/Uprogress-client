var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      './app/app.jsx'
    ]
  },
  output: {
    path: path.resolve(__dirname, '..', 'production'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.EnvironmentPlugin("NODE_ENV")
  ],
  module: {
    loaders: [
    // js
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude:/node_modules/,
        query: {
            plugins: ['transform-runtime', 'transform-decorators-legacy'],
            presets: [ 'es2015', 'stage-0', 'react']
          }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            plugins: ['transform-runtime', 'transform-decorators-legacy'],
            presets: [ 'es2015', 'stage-0', 'react']
          }
      },
      // CSS
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader?sourceMap&localIdentName=[path][name]_[local]__[hash:base64:6]!postcss-loader!stylus-loader?paths=' + path.resolve(__dirname, '../app/stylus')
      },
      {
        test: /\.html?$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'file-loader?name=[name].[ext]',
        exclude: /bootstrap/
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    modulesDirectories: [
      'web_modules',
      'node_modules',
      '../app',
      path.join(__dirname, '../app/components'),
      path.join(__dirname, '../app/elements')
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '..', 'app'),
    hot: true,
    noInfo: true,
    inline: true,
    stats: { colors: true },
    historyApiFallback: true
  }
  // resolve: {
  //   modulesDirectories: ['node_modules', 'bower_components', 'client', path.join(__dirname, 'components')],
  // }
};
