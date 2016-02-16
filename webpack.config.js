var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin= require('copy-webpack-plugin');
var ratchet=__dirname+"/node_modules/goratchet/dist";

module.exports = {
    //see http://humaan.com/getting-started-with-webpack-and-react-es6-style/
    entry: getEntrySources(['./app/main.jsx']),
    //entry: './app/main.jsx',
    publicPath: 'http://localhost:8081/test',
    output: { path: __dirname+"/build", filename: 'bundle.js' },
    module: {
        loaders: [
            {
                test: /.jsx$/,
                exclude: /node_modules/,
                loaders: ['babel-loader?presets[]=react&presets[]=es2015']

            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.less$/,
                loader: "style!css!less"

            },

            {
                test: /fonts\/.*\.png$|fonts\/.*\.svg$|fonts\/.*\.ttf$|fonts\/.*\.woff$|fonts\/.*\.eot$/,
                loader: 'file-loader',
                //we are not really able to tell the file loader to copy files correctly
                //so we let it copy them and afterwards copy them again by the copy plugin
                query:{
                    name: "build/fonts/[name].[ext]"
                }
            },
            {
                test: /images\/.*\.png$|images\/.*\.svg$/,
                loader: 'file-loader',
                //we are not really able to tell the file loader to copy files correctly
                //so we let it copy them and afterwards copy them again by the copy plugin
                query:{
                    name: "build/images/[name].[ext]"
                }
            }


        ]
    },
    plugins:[
        new CopyWebpackPlugin([
            {
                from: __dirname+"/app/css/fonts",
                to: "fonts"
            },
            {
                from: "index.html",
                to: "index.html"
            },
            {
                from:__dirname+"/node_modules/jquery/dist/jquery.min.js",
                to: "libs/jquery.min.js"
            },
            {
                from:__dirname+"/node_modules/bootstrap/dist/css/bootstrap.min.css",
                to: "css/bootstrap.min.css"
            }

        ])
    ],
    devtool:"eval"
};

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        //sources.push('webpack-dev-server/client?http://localhost:8082');
    }

    return sources;
};
