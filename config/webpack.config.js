var path = require('path');
var webpack = require('webpack');
console.log(path.resolve(__dirname, '../app/index.html'));
module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      './app/app.jsx'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
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
    },
    {
      test: /\.html?$/,
      loader: 'file-loader'
    }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    modulesDirectories: ['web_modules', 'node_modules', '../app', path.join(__dirname, '../app/components')]
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
