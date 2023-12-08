// @ts-nocheck

import dotenv from "dotenv";
import electronReload from "electron-reload-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as path from "path";
import {
  DefinePlugin
} from "webpack";
import merge from "webpack-merge";


dotenv.config({path: "./variable.env"});

const electronReloadPlugin = electronReload({
  path: path.join(__dirname, "dist", "index.js"),
  stopOnClose: true,
  logLevel: 0
});

export const commonMain = {
  target: "electron-main",
  entry: {
    index: "./main/index.ts",
    preload: "./main/preload.ts"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.node$/,
        loader: "node-loader",
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".node"],
    alias: {
      "/renderer": path.resolve(__dirname, "renderer"),
      "/main": path.resolve(__dirname, "main")
    }
  }
};

export const commonRenderer = {
  target: "electron-renderer",
  entry: ["./renderer/index.tsx"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "./script/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "@linaria/webpack5-loader",
            options: {
              sourceMap: "development",
              babelOptions: {
                presets: [
                  "@babel/preset-typescript"
                ]
              }
            }
          },
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "@linaria/webpack-loader",
            options: {
              sourceMap: process.env.NODE_ENV !== "production",
            },
          }
        ],
      },
      {
        test: /\.js$/,
        enforce: "pre",
        loader: "source-map-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: process.env.NODE_ENV !== "production",
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: {localIdentName: "[name]_[local]_[hash:base64:5]"},
              sourceMap: process.env.NODE_ENV !== "production",
              url: false
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".scss"],
    alias: {
      "/renderer": path.resolve(__dirname, "renderer"),
      "/main": path.resolve(__dirname, "main")
    }
  },
  plugins: [
    new DefinePlugin({
      "process.env": {},
      "process.env.REDMINE_URL": JSON.stringify(process.env["REDMINE_URL"]),
      "global": "globalThis"
    }),
    new HtmlWebpackPlugin({
      template: "./renderer/public/index.html"
    }),
    new MiniCssExtractPlugin({filename: "style.css"}),
  ]
};

const main = merge(commonMain, {
  mode: "development",
  devtool: "source-map",
  plugins: [
    electronReloadPlugin()
  ]
});

const renderer = merge(commonRenderer, {
  mode: "development",
  devtool: "source-map",
  plugins: [
    electronReloadPlugin()
  ]
});

export default [main, renderer];