const path = require('path');

module.exports = {
    entry: './src/indexAbuelo.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'],  
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, // Imágenes menores a 8 KB se convierten en base64
                            fallback: 'file-loader', // Usa file-loader para imágenes mayores a 8 KB
                            name: '[name].[hash].[ext]', // Nombre de archivo con hash para cacheo
                            outputPath: 'images', // Carpeta de salida para las imágenes
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css'],  
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};


// module.exports = {
//     entry: './src/indexAbuelo.ts',
//     module: {
//         rules: [
//             {
//                 test: /\.tsx?$/,
//                 use: 'ts-loader',
//                 exclude: /node_modules/,
//             },
//             {
//                 test: /\.css$/, 
//                 use: ['style-loader', 'css-loader'],  
//             },
//         ],
//     },
//     resolve: {
//         extensions: ['.tsx', '.ts', '.js', '.css'],  
//     },
//     output: {
//         filename: 'bundle.js',
//         path: path.resolve(__dirname, 'dist'),
//     },
// };