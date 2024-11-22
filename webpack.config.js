const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const package = require('./package.json'); // To access the homepage field

const isProduction = process.env.NODE_ENV === 'production';
const publicPath = isProduction ? `/${path.basename(package.homepage)}/` : '/';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: publicPath, // Dynamic publicPath based on environment
    clean: true, // Cleans the build folder before each build
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      // Optional: Handle image assets
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]', // Output images to build/images/
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    // Generate index.html
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    // Generate 404.html for client-side routing
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: '404.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true, // Handles client-side routing
    open: true, // Automatically opens the browser
  },
  devtool: isProduction ? 'source-map' : 'eval-source-map', // Appropriate source maps
  mode: isProduction ? 'production' : 'development', // Dynamic mode based on environment
};
