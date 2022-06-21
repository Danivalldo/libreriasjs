const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Handlebars = require("handlebars");
const WatchRunPlugin = require("./WatchRunPlugin");
const ExtraWatchWebpackPlugin = require("extra-watch-webpack-plugin");
const {
  handlebarsHelperInc,
  getHomeUrlFactory,
  handlebarsDataCompile,
} = require("./handlebarsData");
const registerPartials = require("./registerPartials");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
  },
  devtool: "source-map",
  module: {
    rules: [
      // HTML
      {
        test: /\.(html)$/,
        loader: "html-loader",
        options: {
          sources: false,
        },
      },
      //Handlebars
      {
        test: /\.hbs$/i,
        loader: "html-loader",
        options: {
          preprocessor: async (content, loaderContext) => {
            let result;
            try {
              registerPartials();
              handlebarsDataCompile.isHomeView =
                loaderContext.resourcePath ===
                path.resolve(__dirname, "../src/index.hbs");
              Handlebars.registerHelper("inc", handlebarsHelperInc);
              Handlebars.registerHelper(
                "getHomeUrl",
                getHomeUrlFactory(handlebarsDataCompile.isHomeView)
              );
              result = await Handlebars.compile(content)(handlebarsDataCompile);
            } catch (err) {
              console.log(err);
              await loaderContext.emitError(error);
              return content;
            }
            return result;
          },
          sources: false,
        },
      },
      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      // CSS
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      // SASS
      {
        test: /\.scss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      // Images
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/images/",
            },
          },
        ],
      },
      // Cursors
      {
        test: /\.(cur)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/cursor/",
            },
          },
        ],
      },
      // Fonts
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/fonts/",
            },
          },
        ],
      },
      //Shaders
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: "/node_modules/",
        use: ["raw-loader"],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, "../static") }],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      minify: true,
    }),
    new MiniCSSExtractPlugin({
      filename: "[name].[fullhash].css",
    }),
    new CleanWebpackPlugin(),
    new ExtraWatchWebpackPlugin({
      dirs: [path.resolve(__dirname, "../src/partials")],
    }),
    new WatchRunPlugin(),
  ],
};
