const { createConfig } = require("@test/webpack-config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

module.exports = createConfig({
  mode: "development",
  entry: resolve(__dirname, "src", "index.tsx"),
  output: {
    filename: "[name]-[contenthash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "public", "index.html"),
      inject: "body",
    }),
  ],
  optimization: {
    chunkIds: "deterministic",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](preact)[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
});
