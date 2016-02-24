/**
 * Created by Timko on 20.01.2016.
 */
var webpack = require('webpack');

module.exports = {
    entry: [
        //'webpack-dev-server/client?http://localhost:8080',
        //'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/www/js',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './www',
        hot: true
    },
    plugins: [
        //new webpack.HotModuleReplacementPlugin()//,
        //new webpack.optimize.UglifyJsPlugin({
        //    sourceMap: false,
        //    mangle: false
        //})
    ]
};