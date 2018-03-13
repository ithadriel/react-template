const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    context: `${__dirname}/src`,

    entry: ['babel-polyfill', './index.js'],
    output: {
        filename: 'bundle.js',
        path: `${__dirname}/dist`,
        publicPath: ''
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
            {
                test: /(\.less|\.css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ],
            }, {
                test: /\.(svg)$/,
                loader: 'file-loader?&name=images/[name].[ext]'
            }, {
                test: /\.(gif)$/,
                loader: 'file-loader?&name=images/[name].[ext]'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'staticCode/index.html',
            inject: 'body',
            hash: true
        }),
        new UglifyJSPlugin()
    ],
    devtool: 'eval-source-map',
};
