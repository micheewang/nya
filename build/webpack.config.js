const path = require('path');

const resolve = dir => path.join(__dirname, '..', dir);

module.exports = {
  entry: {
    index: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        },
        include: [resolve('src'), resolve('test')],
      },
    ],
  },
};
