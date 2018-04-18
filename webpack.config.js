
const path = require('path');

module.exports = {
	entry: './src/reactStartWithSP.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}, {
				test: /\.sass$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		host: '192.168.0.13', // set to VirtualBox IP so it can be accessed outside VBox
		port: 3001
	}
};