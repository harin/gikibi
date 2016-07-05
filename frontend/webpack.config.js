module.exports = {
  entry: "./app.js",
  output: {
      path: __dirname + "/build",
      publicPath: "/assets/",
      filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      { 
        test: /\.css$/, 
        loader: "style-loader!css-loader" 
      }
    ]
  }
}