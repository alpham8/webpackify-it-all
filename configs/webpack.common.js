const path = require('path');
const webpack = require('webpack');
const ROOT_DIR = path.resolve(__dirname, '../');
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
module.exports = {
    entry: [
        'babel-polyfill',
        path.join(SRC_DIR, 'index'),
    ],
    resolve: {
        modules: [
            'src',
            'node_modules',
            'theme',
            'theme/fonts',
            'src/_scss',
        ],
        extensions: ['.js', '.css', '.scss'],
        alias: {
            theme: path.resolve(ROOT_DIR, 'theme'),
        },
    },
    module: {
        rules: [
            // js
            {
                test: /\.js$/i,
                use: 'babel-loader',
                exclude: [
                    path.resolve(ROOT_DIR, 'node_modules'),
                ],
            },
            // images
            {
                test: /\.(png|ico|gif|svg|jpe?g)(\?[a-z0-9]+)?$/i,
                use: 'url-loader',
            },
            // fonts
            { test: /\.(woff|woff2|eot|ttf|otf)$/i, use: ['url-loader'] }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                CUSTOM_HOST: JSON.stringify(process.env.CUSTOM_HOST),
                HTTPS: JSON.stringify(process.env.HTTPS),
                RUBY_BACKEND: JSON.stringify(process.env.RUBY_BACKEND),
            }
        }),
    ]
};
