const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin=require("mini-css-extract-plugin");

const clientside = {
    
    target:'web',
    
    entry: './src/index.js',

    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'client-bundle.js'
    },
        
    module: {
        rules: [{
            test: /\.(js|jsx|ts|tsx)?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',

            }
        },
        {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192
                }
              }
            ]
        },
        {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            use:[
                {
                    loader:'gl-loader',
                    options:{
                        url:'Graphql server URL'
                    }
                }
            ]
        },
        {
            test: /\.less$/,
            use: ['style-loader', {
                  loader: 'css-loader',
                  options: {
                  modules: true
              }
            }, 'postcss-loader', 'less-loader']
        },
        {
            test:/\.css$/,
            use:[MiniCssExtractPlugin.loader,"css-loader"]  //代替style-loader
        },
        {
            test: /\.(sa|sc|)$/,
            use: [
                { loader: "style-loader" },
                { loader: "sass-loader"}
            ]
        }
        ]
    },
    
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        inline: true,
        host: '0.0.0.0',
        port: 4006,
        overlay: {
            errors: true
          },
          historyApiFallback: {
            index: '/public/index.html'
          }
    },
    watch:true,

    plugins: [
        new HtmlWebPackPlugin({
            title:'development',
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'css/index.css'
        })
    ]
};

const serverside = {

    target:'node',
    entry: './server/app.js',
    externals: [nodeExternals()],

    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'server-bundle.js',
        libraryTarget: "commonjs2"

    },
    module: {
        rules: [{
            test: /\.(js|jsx|ts|tsx)?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',

            }
        },
        {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192
                }
              }
            ]
        },
        {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            use:[
                {
                    loader:'gl-loader',
                    options:{
                        url:'Graphql server URL'
                    }
                }
            ]
        },
        {
            test: /\.less$/,
            use: ['style-loader', {
                  loader: 'css-loader',
                  options: {
                  modules: true
              }
            }, 'postcss-loader', 'less-loader']
        },
        {
            test:/\.css$/,
            use:[MiniCssExtractPlugin.loader,"css-loader"]  //代替style-loader
        },
        {
            test: /\.(sa|sc|)$/,
            use: [
                { loader: "style-loader" },
                { loader: "sass-loader"}
            ]
        }
        ]
    },
}

module.exports = [clientside, serverside]