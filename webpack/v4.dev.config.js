
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
		index: './hub.1.0.4/dist/DevCode4/ignore1.js',
	},
	output: {
		path: path.join(__dirname, '../hub.1.0.5/dist/DevCode4/css'),
		filename: 'ignore2.js',
	},
	module: {
		loaders: [
			{
				include: path.join(__dirname, '../hub.1.0.5/dist/DevCode4/sass'),
				test: /\.sass$/,
				loader: 'postcss-loader!sass-loader',
			},
		],
	},
	devtool: 'eval-source-map',
});
