var path = require('path')
// 如果项目有ContextPath，需要同时修改publicPath和Router的Base

var CLIENT = process.argv[2] ? process.argv[2] : 'lechat'
var envFile = './prod.env' + (CLIENT ? '.' + CLIENT : '') + '.js'
var buildDir = CLIENT + '.' + process.env.PROD_ENV
module.exports = {
    build: {
        env: require(envFile),
        assetsRoot: path.resolve(__dirname, '../dist/' + buildDir),
        assetsSubDirectory: 'static',
        assetsPublicPath: process.env.PROD_ENV === 'app' ? '' : '',
        productionSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: require('./dev.env'),
        port: 8085,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        cssSourceMap: false,
        pageEntry: './src/apps/*/*.js' // 多页应用入口
        // pageEntry: './src/apps/demo/main.js' // 单页应用入口
    }
}