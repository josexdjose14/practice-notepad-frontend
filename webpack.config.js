const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app/scripts/index.js', // script principal
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js', // Nombre del archivo de salida
    },
    mode: 'development', // Modo de desarrollo (puedes usar 'production' para optimizar)
    module: {
        rules: [
            {
                test: /\.js$/, // Aplica a archivos .js
                exclude: /node_modules/, // Ignora la carpeta node_modules
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/, // Aplica a archivos .css
                use: ['style-loader', 'css-loader'], // Carga estilos
            },
        ],
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 8080, // Puerto para el servidor de desarrollo
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/app/index.html', // Archivo base
        }),
    ],
};