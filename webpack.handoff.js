const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
  mode: "none", // No minification, readable output
  devtool: false, // No source maps for handoff

  output: {
    filename: "bundle.js", // Clean and readable
    path: path.resolve(__dirname, "dist-handoff"),
    assetModuleFilename: "assets/[name][ext]", // No hashing
    clean: true,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "main.css", // Clean and readable
    }),
  ],

  optimization: {
    minimize: false, // No code minification
    splitChunks: false,
    concatenateModules: false,
    emitOnErrors: false,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["svgo"],
              ["optipng", { optimizationLevel: 5 }],
              ["mozjpeg", { quality: 75 }],
            ],
          },
        },
      }),
    ],
  },
});