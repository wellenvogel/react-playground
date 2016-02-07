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
            }
        ])
    ],
    devtool:"source-map"
};