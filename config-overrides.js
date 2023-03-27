const webpack = require('webpack');
const _ = require('lodash');
const process = require('process');


module.exports = function override(config, env) {
    _.merge(config, {
        resolve: {
            fallback: {
                crypto: require.resolve('crypto-browserify'),
                http: require.resolve('stream-http'),
                https: require.resolve('https-browserify'),
                fs: require.resolve('browserify-fs'),
                os: require.resolve('os-browserify'),
                path: require.resolve('path-browserify'),
                stream: require.resolve('stream-browserify'),
                zlib: require.resolve('browserify-zlib'),
                process: require.resolve('process/browser')
            },
        },
        // Also provide polyfills for some Node globals.
        plugins: [
            ...(config.plugins ?? []),
            new webpack.ProvidePlugin({
                Buffer: ['buffer/', 'Buffer']
            }),
        ],
    });

    return config;
}
