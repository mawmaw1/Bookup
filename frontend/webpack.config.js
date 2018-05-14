/**
 * Created by Kristian Nielsen on 02-05-2018.
 */
const path = require('path');
const Dotenv = require('dotenv-webpack');
module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {

                test: /\.(js|jsx)$/,
                loader: "eslint-loader",
                exclude: /node_modules/,
                include: path.resolve(process.cwd(), 'src'),
                enforce: "pre",
                options: {
                    fix: true
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader"
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    node: {
        fs: "empty"
     },
     plugins: [
        new Dotenv()
      ]
};