const path = require("path")
const {
    VueLoaderPlugin
} = require('vue-loader')
const HttpWebpackPluin = require("html-webpack-plugin")
const config = {
    mode: "development",
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/index.js",
        clean: true,
    },
    performance: {
        // 入口起点的最大体积
        maxEntrypointSize: 50000000,
        // 生成文件的最大体积
        maxAssetSize: 30000000,
    },
    module: {
        rules: [{
            test: /\.vue$/i,
            use: ["vue-loader"]
        }]
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    plugins: [
        new HttpWebpackPluin({
            //是否压缩
            minify: false,
            //指定模板源
            // template: './public/index.html',
            template: './public/index.html',
            //打包生成的html文件名
            filename: 'index.html'
        }),
        new VueLoaderPlugin()
    ],
    devServer: {
        port: 8000,
        static: {
            directory: "dist"
        }
    }
}
module.exports = config