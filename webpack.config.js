const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin')
//const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
//const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

var distRoot = "./dist"
module.exports = {
    //entry: './src/index.js',
    //mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: {
        app: './src/main.js',
        vendor: ["vue", "vue-router", "axios", "vuex"]
    },
    output:
        {
            //filename: 'main.js',
            filename: '[name].bundle.js',
            path: path.resolve(distRoot, 'm')
        }
    ,
    devtool: process.env.NODE_ENV === 'production' ? 'none' : 'inline-source-map',
    devServer:
        {
            contentBase: './dist',
            host: '127.0.0.1'
        }
    ,
    plugins: [
        new ExtractTextPlugin("style.css"),
        //new VueLoaderPlugin(),
        //new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: "webpack test",
            template: './src/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["manifest", "vendor"],
            chunks: ["vendor"]
        })
        // new CopyWebpackPlugin([{
        //     from: __dirname + '/library/majiang/asset',
        //     to: __dirname + '/dist/asset/',
        //     toType: 'dir'
        // }])
    ],
    resolve: {
        alias: {
            'vue-router$': 'vue-router/dist/vue-router.common.js',
            'vue$': 'vue/dist/vue.esm.js',
            //'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.js', '.vue']
    },
    module:
        {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            'scss': [
                                'vue-style-loader',
                                'css-loader',
                                'sass-loader'
                            ],
                            'sass': [
                                'vue-style-loader',
                                'css-loader',
                                'sass-loader?indentedSyntax'
                            ],
                            // scss: ExtractTextPlugin.extract({
                            //     use: 'sass-loader',
                            //     fallback: 'vue-style-loader'
                            // }),
                            css: ExtractTextPlugin.extract({
                                use: 'css-loader',
                                fallback: 'vue-style-loader'
                            })

                        }
                    }
                },
                // {
                //     test: /\.css$/,
                //     use: [
                //         'style-loader',
                //         'css-loader'
                //     ]
                // },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({use: 'css-loader'})
                },
                {
                    test: /\.scss$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'sass-loader'
                    ],
                },
                {
                    test: /\.sass$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'sass-loader?indentedSyntax'
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jig)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'dist'
                            }
                        },
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    test: /\.(csv|tsv)$/,
                    use: [
                        'csv-loader'
                    ]
                },
                {
                    test: /\.xml$/,
                    use: [
                        'xml-loader'
                    ]
                }
            ]
        }
};


if (process.env.NODE_ENV === 'production') {
    //压缩文件体积  webpack 3.* 版本使用
    // webpack 4.0 移除
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     compress: {
        //         warnings: false
        // }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
