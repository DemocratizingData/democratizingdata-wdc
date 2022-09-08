const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const { webpack } = require('webpack');
const Dotenv = require('dotenv-webpack');
const { env } = require('process');

module.exports = {
	entry: './wdc/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new Dotenv({ systemvars: true }),
		new HtmlWebpackPlugin({
			template: 'wdc/index.html'
		}),
		new CopyPlugin({
			patterns: [
				"wdc/tableSchema.json"
			]
		}),
	],
};
