var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin= require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var cssLoaderQuery="&localIdentName=[path][name]---[local]---[hash:base64:5]";
if (process.env.NODE_ENV === 'production') {
    cssLoaderQuery="";
}

var copyList=[
    {
        from: __dirname+"/app/css/fonts",
        to: "css/fonts"
    },
    {
        from: "index.html",
        to: "index.html"
    },
    {
        from: "lib/material-framework-gh-pages/dist/material.min.js",
        to: 'libs'
    },
    {
        from: "lib/material-framework-gh-pages/css/material.css",
        to: "css/material.min.css"
    },
    {
        from: "lib/material-framework-gh-pages/css/fonts",
        to: 'css/fonts'
    },


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
    //for react-toolbox
    resolve: {
        extensions: ['', '.jsx', '.scss', '.js', '.json']
    },
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
                exclude: /avnav_viewer\.less/,
                loader: ExtractTextPlugin.extract("style-loader","css?-url&modules&"+cssLoaderQuery+"!less-loader")

            },
            {
                test: /(\.scss)$/,
                exclude: /commons\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader','css?modules&'+cssLoaderQuery+'!sass')
            },
            {
                test: /commons\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader','css!sass')
            },

            {
                test: /avnav_viewer\.less$/,
                loader: ExtractTextPlugin.extract('style-loader','css?-url!less')
            },
            {
                test: /images[\\\/].*\.png$|images[\\\/].*\.svg$/,
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
        new ExtractTextPlugin("css/[name].css",{ allChunks: true })
    ],
    devtool:"eval"
};

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        //sources.push('webpack-dev-server/client?http://localhost:8082');
    }

    return sources;
};
