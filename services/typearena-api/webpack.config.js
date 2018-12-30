var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: {
            config: path.resolve(__dirname, 'config/'),
            middleware: path.resolve(__dirname, 'src/middleware/'),
            types: path.resolve(__dirname, 'src/types/'),
            routes: path.resolve(__dirname, 'src/routes/'),
            utils: path.resolve(__dirname, 'src/utils/'),
        },
        extensions: ['.js']
    },
    watch: true,
    devtool: 'source-map',
    target: 'node',
    externals: [nodeExternals()]
};