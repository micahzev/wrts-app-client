export default {
  resolve: {
    extensions: ['', '.js', 'jsx'],
  },
  devtool: "cheap-eval-source-map",
  entry: [
    './src/index'
  ]
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
