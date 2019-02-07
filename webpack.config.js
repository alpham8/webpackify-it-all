const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const prodMode = process.env.NODE_ENV === 'production';
const options = {
    cssProcessorOptions: {
        map: {
            inline: false
        }
    }
};

if (prodMode) {
    const cssLoaders = [{
        loader: MiniCssExtractPlugin.loader
    }, {
        loader: 'css-loader'
    }, {
        loader: 'postcss-loader',
        options: {
            ctx: {
                'postcss-preset-env': {...options},
                'autoprefixer': {...options},
                'cssnano': {...options},
            }
        }
    }, {
        loader: 'sass-loader',
        options: {
            sourceMap: true,
            sourceComments: true,
            outputStyle: 'expanded'
        }
    }
    ];
} else {
    const cssLoaders = [{
        loader: 'css-loader'
    }, {
        loader: 'postcss-loader',
        options: {
            ctx: {
                'postcss-preset-env': {...options},
                'cssnano': {...options},
            },
            loader: 'postcss-loader',
            plugins: [
                require('postcss-preset-env')({...options}),
                require('cssnano')({...options})
            ]
        }
    }, {
        loader: 'sass-loader',
        options: {
            sourceMap: true,
            outputStyle: 'compressed'
        }
    }
    ];
}

module.exports = cssLoaders => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssLoaders
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: prodMode ? '[name].[hash].css' : '[name].css',
            chunkFilename: '[id].css'
        })
    ]
});
