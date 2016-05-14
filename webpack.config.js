var webpack = require('webpack');
var path = require('path');
var distPath = path.resolve(__dirname, 'dist');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

// webpack.config.js
module.exports = {
  entry: [
    path.join(__dirname, 'index.js')
  ],
  output: {
    path: distPath,
    filename: 'ng-promise.js'
  },
  resolve: {
    extensions: ['', '.coffee', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015'],
          plugins: [
            // 'transform-flow-strip-types',
            // 'transform-es2015-block-scoping',
            // 'transform-regenerator'
            // 'transform-runtime'
          ]
        }
      }
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),

    //js文件的压缩
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   mangle: {
    //     except: ['$super', '$', 'exports', 'require']
    //   }
    // }),

    // 添加banner
    // new webpack.BannerPlugin((function () {
    //   return `
    //   /*
    //   ${new Date().toISOString()}
    //   */
    //   `;
    // })(), {
    //   raw: true,
    //   entryOnly: false
    // }),

    // 删除重复的代码
    // new webpack.optimize.DedupePlugin(),
    // new webpack.DllPlugin({
    //   path: path.join(__dirname, "manifest.json"),
    //   name: "[name]_[hash]",
    //   context: __dirname
    // }),

    // 生成source map
    new webpack.SourceMapDevToolPlugin({
      // asset matching
      test: /\.(jsx|js)?$/,
      exclude: /(node_modules|bower_components)/,
      // include: string | RegExp | Array,

      // file and reference
      filename: 'ng-promise.map',
      append: false,

      // sources naming
      moduleFilenameTemplate: 'ng-promise.map',
      fallbackModuleFilenameTemplate: 'ng-promise.map',

      // quality/performance
      module: true,
      columns: true,
      lineToLine: true
    }),

    //允许错误不打断程序
    // new webpack.NoErrorsPlugin(),

    // //把指定文件夹下的文件复制到指定的目录
    // new TransferWebpackPlugin([
    //   {
    //     from: 'src',
    //     to: 'src'
    //   }
    // ], __dirname)
  ]
};