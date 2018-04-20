
// eslint-disable-next-line
const merge = require('webpack-merge');
// eslint-disable-next-line
const HtmlWebpack = require('html-webpack-plugin');
const baseConfig = require('./base.config.js');
const path = require('path');
// eslint-disable-next-line
const ExtractText = require('extract-text-webpack-plugin');

module.exports = merge(baseConfig, {
	entry: './hub.1.0.5/src/index.js',
	output: {
		path: path.join(__dirname, '../hub.1.0.5/dist'),
		filename: 'bundle.1.0.5.dev.js',
	},
	module: {
		rules: [
			{
				include: path.join(__dirname, '../hub.1.0.5/src'),
				test: /\.js$/,
				loader: 'babel-loader',
			}, {
				include: path.join(__dirname, '../hub.1.0.5/src'),
				test: /\.(css|sass)$/,
				loader: ExtractText.extract({
					fallback: 'style-loader',
					use: [
						{ 
							loader: 'css-loader',
							options: {
								sourceMap: true,
							},
						}, {
							loader: 'postcss-loader',
							options: {
								sourceMap: true,
							},
						}, {
							loader: 'sass-loader',
							options: {
								sourceMap: true,
							},
						},
					],
				}),
			},
		],
	},
	plugins: [
		new ExtractText('mos.1.0.5.dev.css'),
		new HtmlWebpack({
			template: path.join(__dirname, '../hub.1.0.5/src', 'index.html'),
			hash: true,
		}),
	],
	devtool: 'eval-source-map',
	devServer: {
		contentBase: path.join(__dirname, '../hub.1.0.5/dist'),
		compress: true,
		host: '192.168.0.13', // set to VirtualBox IP so it can be accessed outside VBox
		port: 3001,
	},
});
