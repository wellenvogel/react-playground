var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin= require('copy-webpack-plugin');
var ratchet=__dirname+"/node_modules/goratchet/dist";

module.exports = {
    entry: './app/main.jsx',
    output: { path: __dirname+"/build", filename: 'bundle.js' },
    module: {
        loaders: [
            {
                test: /.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.less$/,
                loader: "style!css!less",

            },

            {
                test: /\.png$|\.svg$|\.ttf$|\.woff$|\.eot$/,
                loader: 'file-loader',
                //we are not really able to tell the file loader to copy files correctly
                //so we let it copy them and afterwards copy them again by the copy plugin
                query:{
                    name: "build/fonts/[name].[ext]"
                }
            }


        ]
    },
    plugins:[
        new CopyWebpackPlugin([
            {
                from: ratchet+"/css",
                to: "css"
            },
            {
                from: ratchet+"/fonts",
                to: "fonts"
            },
            {
                from: __dirname+"/app/css/fonts",
                to: "fonts"
            }
        ])
    ],
    devtool:"source-map"
};