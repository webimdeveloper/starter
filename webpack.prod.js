const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",

  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[name].[contenthash][ext]",
    clean: true,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "main.[contenthash].css",
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      `...`, // default JS/CSS minification
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