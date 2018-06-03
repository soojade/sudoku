const path = require('path')

module.exports = {
  // mode: 'development',
  // watch: true,
  entry: './js/index',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../www/js')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        },
        include: [
          path.resolve(__dirname, 'js')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ]
      }
    ]
  }
}
