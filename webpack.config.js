const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "examples/src/index.html"),
  filename: "./index.html"
});

// const extractLESS = new ExtractTextPlugin("stylesheets/[name]-two.css");

module.exports = {
  entry: path.join(__dirname, "examples/src/index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   "css-loader",
        //   {
        //     loader: "less-loader",
        //     options: {
        //       javascriptEnabled: true
        //     }
        //   }
        // ]
        // use: extractLESS.extract([ 'css-loader', {
        //   loader: "less-loader",
        //   options: {
        //     javascriptEnabled: true
        //   }
        // } ])
        use: ["style-loader", "css-loader",
        {
          loader: "less-loader",
          options: {
            javascriptEnabled: true
          }
        }]
      }
    ]
  },
  plugins: [
    htmlWebpackPlugin
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    port: 3001
  }
};
