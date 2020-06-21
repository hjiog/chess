const path = require('path')
// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入clean-webpack-plugin插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
// css文件分类插件
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin")

const extractcss = new ExtractTextWebpackPlugin({
    //打包输出的路径
    filename: 'css/index.css'
})

module.exports = {
    mode: 'production', //development and production
    entry: ["./index"],
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: "[name]_[hash:4].js", //使用[name]打包出来的js文件会分别按照入口文件配置的属性来命名
        // publicPath: '/'
    },
    plugins: [
        //添加插件
        new HtmlWebpackPlugin(
            //在这个插件内部，可以指定模版和自定义生成的文件名
            {
                filename: 'index.html',
                template: 'index.html',
                // chunks: ["chessRelated", "ai", "search", "websocket", "play", "main"],//设置chunks按需引入JS文件
                // chunksSortMode: 'manual',//将chunks按引入的顺序排序,不用这个的话,引入到html的JS可能是错
                minify: false,
            }
        ),
        // 使用插件，设置需要清除的目录
        new CleanWebpackPlugin(),
        extractcss,
    ],
    devServer: {
        open: true,
        port: 8090,
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractcss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.html$/i,
                use: [{
                    loader: 'html-loader',
                    options: {
                        attributes: {
                            list: [
                                {
                                    tag: 'img',
                                    attribute: 'src',
                                    type: 'src',
                                }]
                        }
                    }
                }]
            },
            // 处理jpg图片的配置
            {
                test: /\.(jpg|png|gif|bmp|webp)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 102400, //小于该值会被编码成base64，注：1024=>1kb
                        name: 'assets/[name]_[hash:4].[ext]'
                    }
                }]
            },
            //暴露$和jQuery到全局
            {
                test: require.resolve('jquery'), //require.resolve 用来获取模块的绝对路径
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    }
}