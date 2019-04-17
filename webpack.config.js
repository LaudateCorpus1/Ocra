let path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    'main': './src/index.js',
    'worker.dev': 'pdfjs-dist/build/pdf.worker.entry',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [ 'file-loader' ]
      }
    ],
  },
  watch: false
};
