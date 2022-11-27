import { Configuration, WatchIgnorePlugin } from "webpack";
import { merge } from "webpack-merge";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const useAnalyzerPlugin = process.env.ANALYZE === "true";

export function createConfig(customConfig?: Configuration): Configuration {
  const baseConfig: Configuration = {
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
    plugins: [
      new WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.[cm]ts$/],
      }),
      ...(useAnalyzerPlugin ? [new BundleAnalyzerPlugin()] : []),
    ],
    module: {
      rules: [
        {
          test: /\.svg/i,
          type: "asset/inline",
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
                mode: "local",
                exportLocalsConvention: "camelCase",
              },
            },
          ],
        },
      ],
    },
  };

  return customConfig ? merge(baseConfig, customConfig) : baseConfig;
}
