process.env.NODE_ENV = 'prod'; //定义环境变量

const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const baseWebpackConfig = require("./webpack.base");
const { prodPublicPath } = require("./config");


module.exports = merge(baseWebpackConfig, {
    output: {
        filename: 'js/[name]-[hash].js', 
        publicPath: prodPublicPath,  //cdn地址
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        new webpack.optimize.CommonsChunkPlugin('common'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('prod')
            } 
        }),
    ]
})