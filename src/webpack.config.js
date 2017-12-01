const path = require('path');

module.exports = {
  entry: './js/index',
  output: {
    path: path.resolve(__dirname, '../www/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
