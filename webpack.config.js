const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {

    entry: './src/javascript/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        filename: 'bundle.js',
        clean: true,
    },
    mode: 'development',

    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [{

                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass")
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        // name: '[path][name].[ext]',
                        outputPath: 'images',
                        // name: '[name].[ext]',
                    }
                }]
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [{

                    loader: "file-loader",
                    options: {
                        outputPath: 'fonts',
                        name: '[name].[ext]',
                    }
                }]
            },
            // {
            //     test: /\.json$/,
            //     use: [{
            //         loader: "file-loader",
            //         options: {
            //             outputPath: 'images'
            //         }
            //     }]
            // }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Treasure Hunter',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "styles/bundle.css"
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/images", to: "images" },
            ],
        }),
    ]
};