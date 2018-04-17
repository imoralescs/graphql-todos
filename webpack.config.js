const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;
const mode = 'development';
const enabledSourceMap = (mode === 'development');

module.exports = {
    mode: mode,
    entry: {
        bundle: ['babel-polyfill', './client/src/index.js']
    },
    output: {
        path: path.resolve(__dirname, './client/public/assets'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: enabledSourceMap,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: enabledSourceMap,
                        }
                    }]
                }),
            },
        ]
    },
    plugins: [
        // Export CSS
        //new ExtractTextPlugin('main.css'),
        new HtmlWebpackPlugin({
            template: 'client/public/index.html',
            favicon: 'client/public/favicon.ico'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host: 'localhost',
        port: port,
        historyApiFallback: true,
        open: true,
        hot:true,
        proxy: {'/graphql': `http://localhost:7000`},
    }
}