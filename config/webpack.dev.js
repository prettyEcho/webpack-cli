const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const baseWebpackConfig = require("./webpack.base.js");

module.exports = merge(baseWebpackConfig, {
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("dev")
        })
    ],
    output: {
        filename: '[name].js', 
        publicPath: '/assets/'
    },
    devtool: 'source-map',
    devServer: {
        publicPath: '/assets/',
        compress: true,
        port: 8800,
        inline: true
    }
})