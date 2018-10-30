var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require("webpack")
var projectRoot = path.resolve(__dirname, '../')

var env = process.env.NODE_ENV

var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const webpackConfig = {
    entry: utils.getEntries(),
    output: {
        path: config.build.assetsRoot,
        publicPath: env === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js' //输出文件的文件名
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        },
        modules: [
            resolve('src'), // 这里配置了，alias就不用配置了，原来需要配置N个别名
            resolve('src/apps'),
            resolve('node_modules')
        ],
    },
    externals: {
        'wx': 'jWeixin',
        'rrule': 'RRule'
    },
    module: {
        rules: [{
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: [resolve('src'), resolve('test')],
                options: {
                    fix: true,
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.art$/,
                loader: "art-template-loader",
                options: {
                    // @see https://github.com/aui/art-template
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 1000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 1000,
                    name: utils.assetsPath('font/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}

const vuxLoader = require('vux-loader')
module.exports = vuxLoader.merge(webpackConfig, {
    plugins: ['vux-ui']
})