const path = require('path');
const KintonePlugin = require('@kintone/webpack-plugin-kintone-plugin');
const dirname = path.resolve();
const version = require('./package.json').version;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require("webpack");

module.exports = {
  entry: {
    desktop: './src/js/desktop/index.ts',
    config: './src/js/config/index.ts',
    pluginLayout: './src/js/pluginLayout/index.ts',
  },
  output: {
    path: dirname + '/',
    filename: 'build/js/[name].js',
  },
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        exclude: [/node_modules/],
        use: [{loader: 'babel-loader'}, {loader: 'ts-loader'}],
      },
      {
        test: /\.(css)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ]
  },
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer/"),
    },
    extensions: ['.ts', '.js', ".css"],
  },
  performance: {
    maxEntrypointSize: 10000000,
    maxAssetSize: 10000000,
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.DefinePlugin({
      ENCRYPTED_DOMAINS: JSON.stringify(
        "5b1358c41bf366a6bfa62845a770f0dcb06eb8c724b8b8dc62a3cd68ddd278cf94c5b114d27543f762931a6a502de494"
      ),
    }),
    new MiniCssExtractPlugin({
      filename: 'build/css/[name].css',
    }),
    new KintonePlugin({
      manifestJSONPath: './manifest.json',
      privateKeyPath: './key/private.ppk',
      pluginZipPath: `./release/bulk_update_status_v${version}.zip`
    })
  ],
};
