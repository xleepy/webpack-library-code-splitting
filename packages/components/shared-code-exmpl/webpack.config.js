const { createConfig } = require("@test/webpack-config");
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

const components = ["bee", "bass"];

const entries = Object.fromEntries(
  components.map((component) => [
    component,
    resolve(__dirname, "src", component, "index.tsx"),
  ])
);

let config;

if (isDev) {
  config = createConfig({
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
      splitChunks: {
        chunks: "all",
      },
    },
  });
} else {
  config = createConfig({
    mode: "production",
    entry: entries,
    output: {
      filename: "[name]/index.js",
      libraryTarget: "umd",
      clean: true,
    },
    externals: ["preact", "preact/hooks"],
    resolve: {
      modules: [resolve(__dirname, "../../../node_modules")],
    },
    optimization: {
      chunkIds: "deterministic",
      splitChunks: {
        cacheGroups: {
          commons: {
            name: "commons",
            chunks: "initial",
            minChunks: 2,
            minSize: 0,
          },
        },
      },
    },
  });
}

module.exports = config;
