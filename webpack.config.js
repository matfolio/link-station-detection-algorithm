const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: true,
  mode:'development',
  devtool: 'inline-source-map',
  resolve: {
    extensions: [ '.jsx', '.js', '.json' ]
  },
  devServer:{
  	contentBase:'./dist'
  },
  module:{
  	rules:[
  		{
  			test:/\.css$/,
  			use:[ MiniCssExtractPlugin.loader, 'css-loader' ]
  			
  		},
  		{
	        test: /\.(png|jpg|gif)$/,
	        use: [
	          {
	            loader: 'file-loader',
	            options: {}  
	          }
	        ]
	    },
  		{
	        test: /\.jsx?$/,
	        exclude: /node_modules/,
	        use: {
		        	loader: "babel-loader",
		        	options:{
		        		presets: ['env','react'],
		        		plugins: ["transform-object-rest-spread","transform-class-properties","transform-es2015-arrow-functions"],
		        		sourceMap: true
		        	}
	        }
        	
        }
  	]
  },
  plugins: [
    new MiniCssExtractPlugin({
    	filename: "dist_style.css"
    })
  ]
};