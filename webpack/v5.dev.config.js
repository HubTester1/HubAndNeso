
// eslint-disable-next-line
const webpack = require('webpack');
// eslint-disable-next-line
const merge = require('webpack-merge');
// eslint-disable-next-line
const HtmlWebpack = require('html-webpack-plugin');
const baseConfig = require('./base.config.js');
const path = require('path');

module.exports = merge(baseConfig, {
	entry: {
		index: './hub.1.0.5/src/HcContainer.js',
	},
	output: {
		path: path.join(__dirname, '../hub.1.0.5/dist'),
		filename: 'mos.1.0.5.dev.js',
	},
	module: {
		loaders: [
			{
				include: path.join(__dirname, '../hub.1.0.5/src'),
				test: /\.js$/,
				loader: 'babel-loader',
			}, {
				include: path.join(__dirname, '../hub.1.0.5/src'),
				test: /\.sass$/,
				loader: 'style-loader!css-loader!postcss-loader!sass-loader',
			},
		],
	},
	plugins: [
		new HtmlWebpack({
			template: path.join(__dirname, '../hub.1.0.5/src', 'index.html'),
			hash: true,
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	devtool: 'eval-source-map',
	devServer: {
		contentBase: path.join(__dirname, '../hub.1.0.5/dist'),
		hot: true,
		host: '192.168.0.6', // set to VirtualBox IP so it can be accessed outside VBox
		port: 3001,
	},
});
