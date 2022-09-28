module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    globalObject: 'this',
    clean: true,
    library: {
      name: 'vrouterModulePlugin',
      type: 'umd'
    }
  },
  externals: ["path", "fs"],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ]
  }
}