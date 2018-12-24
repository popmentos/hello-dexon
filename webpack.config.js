const path = require('path');
const webpack = require('webpack');
console.log();

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
  },
  devServer: {
    port: 8080,
    contentBase: './dist',
    hot: true,
    historyApiFallback: {
      index: './dist/index.html'
    }
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        network: JSON.stringify((process.argv.find(x => x.includes('--network')) || 'development').replace('--network=', ''))
      },
    })


  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  }
};
