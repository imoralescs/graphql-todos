const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const MODE = 'development';
const enabledSourceMap = (MODE === 'development');

module.exports = {
    mode: MODE,
    entry: {
        bundle: './client/src/index.js'
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
        //new ExtractTextPlugin('main.css')
    ]
}