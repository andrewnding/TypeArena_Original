var path = require('path');

const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components/'),
            actions: path.resolve(__dirname, 'src/actions/'),
            reducers: path.resolve(__dirname, 'src/reducers/'),
            store: path.resolve(__dirname, 'src/store/'),
            utils: path.resolve(__dirname, 'src/utils/'),
        },
        extensions: ['.js', '.jsx', '.json']
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
        })
    ],
    devServer: {
        port: 8080,
        contentBase: path.resolve(__dirname, 'dist'),
        proxy: {
            '/api': {
                target: 'http://localhost:8001',
                pathRewrite: {'^/api' : ''},
                secure: false,
                changeOrigin: true
            }
        },
        historyApiFallback: true,
    }
};