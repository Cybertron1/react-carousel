import * as webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';

module.exports = (env: any): webpack.Configuration => {
  const production = env === 'production';
  return {
    target: "web",
    entry: ['./src/index.jsx'],
    mode: production ? 'production' : 'development',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    resolve: {
      alias: {
        react: path.resolve('./node_modules/react'),
      },
      extensions: ['.jsx', '.js']
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: { loader: 'eslint-loader' }
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: true
            }
          }
        },
        {
          test: /\.(s)?css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
            { loader: 'sass-loader' }
          ]
        },
        {
          test: /\.(ttf|svg|eot|woff)$/,
          loader: 'file-loader',
        },
      ]
    },
    optimization: {
      minimize: production
    },
    devtool: production ? false : 'inline-source-map',
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new HtmlWebpackPlugin({
        template: './index.html'
      })
    ]
  };
};
