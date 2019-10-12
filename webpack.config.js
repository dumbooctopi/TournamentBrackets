const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build/'),
  },
  devServer: {
    index: '',
    publicPath: '/build/',
    compress: true,
    proxy: {
      // https://webpack.js.org/configuration/dev-server/#devserver-proxy
      // return true for the context which means for all endpoints, proxy to the target
      // the index also had to be set
      context: () => true,
      target: 'http://localhost:3000',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        },
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
