const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
    entry:[
        '@babel/polyfill',
        './src/js/index.js'
    ],
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename:'js/bundle.js'
    },
    devServer:{
        contentBase:'./dist',
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/indext.html'
        })
    ],
    optimization: {
        minimize: false
    },
    module:{
        rules:[
            {
                test:/\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                },
            },

            {
                test: /\.(png|jpg|gif|mp3)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {},
                  },
              ],
            },
            {
                test: /\.ttf$/,
                loader: 'url-loader',
                options: {
                  limit: 50000,
                },
            },
        ]
    }

}