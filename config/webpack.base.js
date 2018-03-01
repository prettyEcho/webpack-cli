/**
 * webpack.base.js
 * @authors echo 
 */

const webpack = require('webpack');
const path = require("path");
const { HTMLDirs, JSDirs } = require('./config');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");//将css独立引入变成link标签形式, 使用该插件需要独立下载'npm install extract-text-webpack-plugin --save-dev', 同时下面的rules也必须更改
const CleanWebpackPlugin = require('clean-webpack-plugin');

let config = {
	entry: JSDirs, 
	output: {
        path: path.join(__dirname,　'../dist/')
	},
	module : {
        rules: [
            {
                test: /.js$/, 
                loader: 'babel-loader',
                exclude: /node_modules/  //babel会对js进行编译，编译/node_modules/中依赖js会产生未知错误。
            },
            //{test: /.css$/, loader: 'style-loader!css-loader'},/*解析css, 并把css添加到html的style标签里*/
            /*解析css, 并把css变成文件通过link标签引入*/
            {
                test: /.css$/, 
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!postcss-loader'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                  use: ['css-loader','postcss-loader', 'sass-loader']
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  //如果需要，可以在 less-loader 之前将 resolve-url-loader 链接进来
                  use: ['css-loader','postcss-loader', 'less-loader']
                })
            },
            /*解析图片*/
            {
                test: /.(jpg|png|gif|svg)$/, 
                loader: process.env.NODE_ENV == 'prod'
                    ? 'url-loader?limit=8192&name=[name].[hash:8].[ext]'
                    : 'url-loader?limit=8192&name=[name].[ext]'
            }
        ]
    },
    plugins: [//插件集合
        new ExtractTextPlugin({
            filename: process.env.NODE_ENV == 'prod' 
                ? 'css/[name]_[md5:contenthash:base64:8].css'
                : '[name].css'   
        }),
        new CleanWebpackPlugin(['dist/*'],{
            root: process.cwd(),
            verbose: true, 
            dry: false
        })
    ],
    resolve: {
    	 //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.js', '.json', '.css']
    }
}

HTMLDirs.forEach(page => {
    let htmlPlugin;
    if( process.env.NODE_ENV == 'prod' ){
        htmlPlugin = new HtmlWebpackPlugin({
            filename: `${page}.html`, //相对于output.publicPath
            template: 'html-withimg-loader!' + path.resolve(__dirname, `../src/html/${page}.html`),
            chunks: [page, 'common'] 
        });
    }else{
        htmlPlugin = new HtmlWebpackPlugin({
            filename: `${page}.html`, //相对于output.publicPath
            template: 'html-withimg-loader!' + path.resolve(__dirname, `../src/html/${page}.html`),
            chunks: [page] 
        });
    }
    config.plugins.push(htmlPlugin);
})

module.exports = config;