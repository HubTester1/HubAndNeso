
// eslint-disable-next-line
const webpack = require('webpack');
// eslint-disable-next-line
const merge = require('webpack-merge');
// eslint-disable-next-line
const HtmlWebpack = require('html-webpack-plugin');
// eslint-disable-next-line
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./base.config.js');
const path = require('path');

module.exports = merge(baseConfig, {
	mode: 'production',
	entry: {
		index: './hub.1.0.4/sass/mos.sass',
	},
	output: {
		path: path.join(__dirname, '../hub.1.0.4/css'),
		filename: 'mos.css.js',
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: 'mos.css',
			// chunkFilename: '[id].css',
		}),
	],
	module: {
		rules: [
			{
				include: path.join(__dirname, '../hub.1.0.4/sass'),
				test: /\.sass$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'css-loader' },
					{ loader: 'postcss-loader' },
					{ loader: 'sass-loader' },
				],
			},
		],
	},
	devtool: 'eval-source-map',
});
