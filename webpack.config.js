const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: path.join(__dirname, "src", "index.tsx"),
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[bundle].[contenthash:8].js',
        chunkFilename: '[id].[contenthash:8].js',
        sourceMapFilename: '[bundle].[contenthash:8].map',
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true
    },
    optimization: {
        runtimeChunk: 'single'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css'],
    },    
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader'
                },
            },
            {
                test: /\.(css)$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}