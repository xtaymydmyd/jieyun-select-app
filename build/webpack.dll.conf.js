var path = require("path");
var webpack = require("webpack");

const vue = [
    'vue/dist/vue.esm.js', 'vuex', 'vue-router', 'vue-i18n', 'vue-resource', 'vue-lazyload'
];

const portal = [ 
    'vue-carousel-3d'
];

const others = [
    'axios', 'moment', 'fastclick', 'lodash', 'nprogress', 'lockr', 'js-cookie', 'iscroll', 
];

module.exports = {
    output: {
        path: path.join(__dirname, '../static/dll'),
        filename: '[name].dll.js',
        library: '[name]_lib',
    },
    entry: {
        "vue": vue,
        "portal": portal,
        "others": others
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../static/dll', '[name]-manifest.json'),
            name: '[name]_lib',
            context: __dirname
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
};