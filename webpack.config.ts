import * as path from 'path';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const devServer: DevServerConfiguration = { hot: true, port: 3000 };

const config: Configuration = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devServer,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.tsx', '.ts', '.js', '.json']
        },
        use: [
          { loader: 'ts-loader', options: { onlyCompileBundledFiles: true } }
        ]
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'React memory game',
      favicon: './src/assets/favicon.ico'
    })
  ]
};

export default config;
