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
