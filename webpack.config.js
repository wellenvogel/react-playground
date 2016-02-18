var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin= require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ratchet=__dirname+"/node_modules/goratchet/dist";

var copyList=[
    {
        from: __dirname+"/app/css/fonts",
        to: "css/fonts"
    },
    {
        from: "index.html",
        to: "index.html"
    }


];
['jquery'].map(function(el){
    copyList.push({
        from: __dirname+"/node_modules/"+el+"/dist/"+el+".min.js",
        to:  "libs/"+el+".min.js"
    });
});
module.exports = {
    //see http://humaan.com/getting-started-with-webpack-and-react-es6-style/
    entry: getEntrySources(['./app/main.jsx']),
    //entry: './app/main.jsx',
    publicPath: 'http://localhost:8081/test',
    output: { path: __dirname+"/build", filename: 'bundle.js' },
    module: {
        loaders: [
            {
                test: /.jsx$|.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }

            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader","css-loader")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader","css-loader!less-loader")

            },

            {
                test: /fonts\/.*\.png$|fonts\/.*\.svg$|fonts\/.*\.ttf$|fonts\/.*\.woff$|fonts\/.*\.eot$/,
                loader: 'file-loader',
                //we are not really able to tell the file loader to copy files correctly
                //so we let it copy them and afterwards copy them again by the copy plugin
                query:{
                    name: "fonts/[name].[ext]"
                }
            },
            {
                test: /images\/.*\.png$|images\/.*\.svg$/,
                loader: 'file-loader',
                //we are not really able to tell the file loader to copy files correctly
                //so we let it copy them and afterwards copy them again by the copy plugin
                query:{
                    name: "images/[name].[ext]"
                }
            }


        ]
    },
    plugins:[

        new CopyWebpackPlugin(copyList),
        new ExtractTextPlugin("css/[name].css")
    ],
    devtool:"eval"
};

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        //sources.push('webpack-dev-server/client?http://localhost:8082');
    }

    return sources;
};
