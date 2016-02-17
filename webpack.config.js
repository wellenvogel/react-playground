var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin= require('copy-webpack-plugin');
var ratchet=__dirname+"/node_modules/goratchet/dist";

var copyList=[
    {
        from: __dirname+"/app/css/fonts",
        to: "css/fonts"
    },
    {
        from: __dirname+"/app/css/avnav_viewer.less",
        to: "css/avnav_viewer.less"
    },
    {
        from: "index.html",
        to: "index.html"
    },
    /*
     {
     from:__dirname+"/node_modules/babel-polyfill/dist/polyfill.min.js",
     to: "libs/polyfill.min.js"
     },
     */
    {
        from:__dirname+"/node_modules/bootstrap/dist/css/bootstrap.min.css",
        to: "css/bootstrap.min.css"
    }

];
['jquery','less'].map(function(el){
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

        new CopyWebpackPlugin(copyList)
    ],
    devtool:"eval"
};

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        //sources.push('webpack-dev-server/client?http://localhost:8082');
    }

    return sources;
};
