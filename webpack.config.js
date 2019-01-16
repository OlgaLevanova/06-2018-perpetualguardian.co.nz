let webpack = require('webpack');
let path = require('path');

// Naming and path settings
let appName = 'app';
let entryPoint = path.resolve(__dirname, './src/js/app.js');
let exportPath = path.resolve(__dirname, './app/web/build');

let plugins = [
    new webpack.ProvidePlugin({
        Promise: 'es6-promise-promise',
        $: "jquery",
        jQuery: "jquery"
    })
];

// Differ settings based on production flag
if (process.env.NODE_ENV === 'production') {

    plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
    plugins.push(new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}));
    plugins.push(new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}));

    //appName = appName + '.min.js';
    appName = appName + '.js';
} else {
    appName = appName + '.js';
}

// Main Settings config
module.exports = {
    cache: true,
    entry: ['babel-polyfill', entryPoint],
    devtool: 'source-map',
    output: {
        path: exportPath,
        filename: appName
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css?$/,
                loaders: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    // Use this anly if you need full compilation, not runtime-only.
    // Warning! It makes compilation slower!
    plugins // please keep all plugins in plugins variable. Otherwise plugins for optimisation are overwritten
};