const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './index.js',
    devtool: 'inline-source-map',
    devServer: {
        liveReload: true,
        hot: true,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            filename: './index.html',
            template: './index.html',
            use: {
                loader: 'html-loader',
                options: {
                  attrs: [':data-src']
                }
              }
        }),
        new CopyPlugin({
            patterns: [
                { from: "./images", to: "./images" },
            ],
        }),
    ]
};``