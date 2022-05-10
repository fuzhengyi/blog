## webpack构建流程
本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

## 依赖图
  任何时候，一个文件依赖于另一个文件，webpack 就把此视为文件之间有 依赖关系 。这使得 webpack 可以接收非代码资源(non-code asset)（例如图像或 web 字体），并且可以把它们作为 _依赖_ 提供给你的应用程序。

  webpack 从命令行或配置文件中定义的一个模块列表开始，处理你的应用程序。 从这些 入口起点 开始，webpack 递归地构建一个 依赖图 ，这个依赖图包含着应用程序所需的每个模块，然后将所有这些模块打包为少量的 bundle - 通常只有一个 - 可由浏览器加载。

  对于 HTTP/1.1 客户端，由 webpack 打包你的应用程序会尤其强大，因为在浏览器发起一个新请求时，它能够减少应用程序必须等待的时间。对于 HTTP/2，你还可以使用代码拆分(Code Splitting)以及通过 webpack 打包来实现最佳优化。
 
## loader
  因为webpack只认识JavaScript/json，它本质上是一个函数，loader的作用是将它接收到的其他类型的资源进行转义的预处理工作（如 TypeScript）转换为 JavaScript，  
  **loader特性**
  1. loader 支持链式传递。能够对资源使用流水线(pipeline)。一组链式的 loader 将按照相反的顺序执行。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。
  2. loader 可以是同步的，也可以是异步的。
  3. loader 运行在 Node.js 中，并且能够执行任何可能的操作。
  4. loader 接收查询参数。用于对 loader 传递配置。
  5. loader 接收查询参数。用于对 loader 传递配置。
  6. 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。
  7. 插件(plugin)可以为 loader 带来更多特性。
  8. loader 能够产生额外的任意文件。  
  **loader配置**
  ```JS
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
  postcssLoader:
  styleLoader: 将模块的导出作为样式添加到 DOM 中 
  cssLoader: 解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码
  lessLoader 
  sassLoader 

  urlLoader: url-loader 像 file loader 一样工作，但如果文件小于限制，可以返回 data URL)
  fileLoader: 将文件发送到输出文件夹，并返回（相对）URL
  babel-loader: 加载 ES2015+ 代码，然后使用 Babel 转译为 ES5
  ts-loader: 或 awesome-typescript-loader 像 JavaScript 一样加载 TypeScript 2.0+

  eslint-loader PreLoader，使用 ESLint 清理代码
  ```

## plugin  
  plugin是插件，用于扩展webpack的功能，插件的范围包括从打包优化和压缩，一直到从新定义环境中的变量，比如对js文件进行压缩优化的UglifyJsPlugin   
  **plugin配置**
  ```js
  plugins: [
    new webpack.optimize.UglifyJsPlugin(), //
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]

  UglifyJS Webpack Plugin插件用来缩小（压缩优化）js文件，至少需要Node v6.9.0和Webpack v4.0.0版本
  ```


## loader和plugin的区别  
  loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

## webpack性能优化
1. 开发环境性能优化
  * 优化打包构建速度
    * HMR
  * 优化代码调试
    * source-map

2. 生产环境性能优化
  * 优化打包构建速度
    * oneof
    * bable缓存
    * 多进程打包
    * externals
    * dll
  * 优化代码运行的性能
    * 缓存（hash-chunkhash-contenthash）
    * tree shaking
    * code split：webpack4 引入了SplitChunksPlugin，并淘汰掉之前的CommomsChunksPlugin
    * 懒加载/预加载
    * pwa

## 资源优化
* 压缩文件，使用tree-shaking删除无用代码，按需加载组建
* 服务端配置gzip进一步压缩文件体积
* 通过DevTools分析首屏不需要使用的css文件，以此来精简css
* 内联关键的css代码
* 使用cdn加载资源及dns-prefetch预解析DNS的IP地址
* 对资源使用preconnect,以便预先进行IP解析，tcp握手、tls握手
* 缓存文件，对首屏数据做离线缓存 响应头设置etag字段，浏览器会将本次缓存写入硬盘中
```python
  etag on; #开启etag验证
  expires 7d; #设置缓存过期时间
  # 拉取缓存会出现200和304两种不同的状态码，取决于浏览器是否有向服务器发起验证请求。只有向服务器发起验证请求并确认缓存未被更新，才会返回304状态码
  # 如果是强缓存，浏览器会直接拉取本地缓存，不会与服务器发生任何通信，也就是说如果在服务端更新了文件，并不会被浏览器得知，就无法替代失效的缓存，所有在构建阶段，需要为我们的静态资源添加hash
```
* 图片优化，包括使用css代替图片，小图使用base64，使用png格式图片，懒加载图片



## 网络优化
使用http2.0

## 优化耗时任务
使用web worker将耗时任务丢到子线程中，这样能让主线程在不卡顿的情况下处理js任务

网络性能传输检测工具 page speed / devtools


## 几万条数据的一个dom渲染问题