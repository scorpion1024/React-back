import { resolve as _resolve } from 'path';
import { DefinePlugin, optimize } from 'webpack';
import HtmlwebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin, { extract } from 'extract-text-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
var ROOT_PATH = _resolve(__dirname);
var APP_PATH = _resolve(ROOT_PATH, 'src');
var BUILD_PATH = _resolve(ROOT_PATH, 'build');


export const entry = {
    app: [_resolve(APP_PATH, 'app.js')]
};
export const output = {
    path: BUILD_PATH,
    publicPath: './',
    filename: 'js/[name]-[hash:8].js'
};
export const resolve = {
    extensions: ['.js', '.jsx']
};
export const module = {
    loaders: [
        {
            test: /\.(js|jsx)?$/,
            loader: 'babel-loader',
            include: APP_PATH,
            query: {
                presets: ['es2015', 'react', 'stage-0']
            }
        },
        {
            test: /\.(css|scss)$/,
            include: APP_PATH,
            use: extract({
                fallbackLoader: 'style-loader?minimize',
                loader: ['css-loader?minimize', 'sass-loader?minimize']
            })
        },
        {
            test: /\.(jpg|jpeg|png|gif)$/,
            loader: 'url-loader',
            include: APP_PATH,
            query: {
                limit: 8192,
                name: '../imgs/[name]-[hash:8].[ext]'
            }
        },
        {
            test: /\.(ico|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
            loader: 'file-loader',
            include: APP_PATH,
            query: {
                name: '../fonts/[name]-[hash:8].[ext]',
            },
        }
    ]
};
export const plugins = [
    new DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }),
    //这个使用uglifyJs压缩你的js代码
    new optimize.UglifyJsPlugin({
        minimize: true,
        output: {
            comments: false, // remove all comments
        },
        compress: {
            warnings: false
        }
    }),
    new HtmlwebpackPlugin({
        title: 'react-ele-webapp',
        template: _resolve(ROOT_PATH, 'publish.html'),
        filename: 'index.html',
        minify: {
            caseSensitive: false,
            collapseBooleanAttributes: true,
            collapseWhitespace: true //是否去除空格
        },
        inject: 'body'
    }),
    new ExtractTextPlugin('css/[name]-[hash:8].css'),
    new CleanWebpackPlugin(),
];