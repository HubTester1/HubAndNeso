
// eslint-disable-next-line
const webpack = require('webpack');
// eslint-disable-next-line
const merge = require('webpack-merge');
// eslint-disable-next-line
const HtmlWebpack = require('html-webpack-plugin');
// eslint-disable-next-line
const ETP = require('extract-text-webpack-plugin');
const baseConfig = require('./base.config.js');
const path = require('path');


/* 
	Note: For the moment, development files are written locally and pushed to a dev location 
	in SharePoint. That is, every file change has to be evaluated in SharePoint. (Observation 
	indicates that this is not slower than saving directly to SP through a Windows Explorer 
	mapped drive.)

	In future, it would be great to develop locally and avoid waiting on saving to SharePoint 
	each time. In that case, v4 configs should be updated to look more like v5 configs; e.g.,
	style-loader and no MiniCssExtractPlugin during development.

 */

module.exports = merge(baseConfig, {
	entry: {
		index: './hub.1.0.4/sass/mos.sass',
	},
	output: {
		path: path.join(__dirname, '../hub.1.0.4/css'),
		filename: 'mos.css.js',
	},
	module: {
		loaders: [
			{
				include: path.join(__dirname, '../hub.1.0.4/sass'),
				test: /\.sass$/,
				loader: ETP.extract({ fallback: 'style-loader', use: 'css-loader!postcss-loader!sass-loader' }),
			},
		],
	},
	plugins: [
		new ETP('mos.css'),
	],
});
