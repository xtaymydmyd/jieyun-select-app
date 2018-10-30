var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function(_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production' ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
    options = options || {}

    var cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap
        }
    }

    function generateLoaders(loader, loaderOptions) {
        var loaders = [cssLoader]
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

exports.styleLoaders = function(options) {
    var output = []
    var loaders = exports.cssLoaders(options)
        // console.log(loaders)
    for (var extension in loaders) {
        var loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
}

var glob = require('glob')

exports.getEntries = function() {
    //console.log(config.dev.pageEntry)
    var files = glob.sync(config.dev.pageEntry)
    var entries = {}
    files.forEach(function(filepath) {
        //console.log(filepath)
        //var name = /.*\/(apps\/.*?\/main)\.js/.exec(filepath)[1];
        // 取倒数第二层(view下面的文件夹)做包名     
        var split = filepath.split('/')
        var name = split[split.length - 2]
        entries[name] = filepath
    })

    //console.log(entries);
    return entries
}

exports.getRewrites = function() {
    var entries = exports.getEntries()
    var rewrites = []

    Object.keys(entries).forEach(function(name) {
        var reg = new RegExp('^\/' + name + '$')
        rewrites.push({ from: reg, to: '\/' + name + '.html' })
    })

    // console.log(rewrites)
    return rewrites
}