# http/https
1. URL即统一资源标识符，作为互联网上资源的唯一身份
2. HTML：即超文本标记语言，描述超文本文档
3. HTTP：即超文本传输协议，用来传输超文本

上面这三项技术的发明就可以把超文本系统完美的运行在互联网上，这个系统称为万维网，也就是现在的web。

<div style="font-size:22px;font-weight:600">http1.0/http1.1/http2区别</div>
<div style="font-size:20px">1、http1.0特点</div>

* 增加了HEAD、POST等新方法；
* 增加了响应状态码，标记可能的错误原因；
* 引入了协议版本号概念；
* 引入了HTTP Header（头部） 的概念，让HTTP处理请求和响应更加灵活；
* 传输的数据不再仅限于文本。

<div style="font-size:20px">2、http1.1特点</div>

* 增加了PUT、DELETE等新的方法；
* 增加了缓存管理和控制；
* 明确了连接管理，允许持久链接；
* 允许响应数据分块（chunked），利于传输大文件；
* 强制要求Host头，让互联网主机托管成为可能。

Socket pool和connection limits: 浏览器可以限定每一个profile打开256个sockets，每个proxy打开32个sockets，而每一组{scheme，host，port}可以打开6个，注意同时针对一组{host,port}最多允许打开6个HTTP和HTTPS连接。

<div style="font-size:20px">3、http2特点</div>

* 二进制协议，不再是纯文本；
* 可发起多个请求，废弃了1.1里的管道；
* 使用专用算法压缩头部，减少数据传输；
* 允许服务器主动向客户端推送数据；
* 增强了安全性，“事实上”要求加密通信。

在http/2中，有了二进制分帧之后，http/2不再依赖TCP链接去实现多流并行了，在http/2中：

* 同域名下所有通信都在单个连接上完成。
* 单个连接可以承载任意数量的双向数据流。
* 数据流以消息的形式发送，而消息又由一个或多个帧组成，多个帧之间可以乱序发送，因为根据帧首部的流标识可以重新组装。

这一特性，使性能有了极大提升：

* 同个域名只需要占用一个TCP连接，消除了因多个TCP连接而带来的延时和内存消耗
* 单个连接上可以并行交错的请求和响应，之间互不干扰
* 在http/2中，每个请求都可以带一个31bit的优先值，0表示最高优先级，数值越大优先级越低。有了这个优先值，客户端和服务器就可以在处理不同的流时采取不同的策略，以最优的方式发送流、消息和帧

PRPL模式或HTTP/2

PRPL即推送、渲染、预缓存、延迟加载。PRPL详细介绍可参见：https://developers.google.com/web/fundamentals/performance/prpl-pattern/#http2_http2 。PRPL模式中可以使用Preload标签。Preload是提前加载资源，HTML 解析器在创建 DOM 时如果碰上同步脚本，解析器会停止创建 DOM，转而去执行脚本。而preload标签是告诉浏览器加载此资源但不执行。可以预加载js、css、字体。preload 的 onload 事件可以在资源加载完成后修改 rel 属性，从而实现非常酷的异步资源加载。例：
```
<link rel="preload" href="late_discovered_thing.js" as="script">
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" as="style" href="asyncstyle.css" onload="this.rel='stylesheet'">
```
上面说的处理过程需要三大步，主要是源于http1.x的通讯协决定，http1.x建立一个TCP连接需要三次握手，也就是三次往返于服务器和客户端之间。现在的网页一般都内容丰富，在 HTTP/1.x 下载完整个网页一般需要很多很多个 TCP 连接。如果用开发者工具查看网络加载流，可以看到阻塞时间，尤其是小资源的阻塞时间占比非常大。此外，每次 TCP 连接都需要传递 HTTP Header 信息，也是一笔带宽开销。HTTP/1.x 由于基本是无脑按顺序加载资源，需要浏览器和前端工程师对预加载、加载优先级等做很多额外的工作。HTTP/2 一方面复用同一IP且同一证书下的一个 TCP 连接，另一方面压缩了 HTTP Header，还提供了 Server Push 特性。Google 、Twitter 和 Facebook 这三个著名的网站已经启用了 HTTP/2 支持。这里有一篇文章介绍了Nginx如何开启HTTP/2（ https://www.nginx.com/blog/nginx-1-9-5/ ），另外让服务器支持 https 是必须的先决条件。目前除IE8/9/10外，其他浏览器均已支持HTTP/2。

requestIdleCallback：requestIdleCallback是2017年1月31日W3C定义的标准，使用requestIdleCallback函数实现延迟图片的加载。

一文读懂HTTP/2特性 https://zhuanlan.zhihu.com/p/26559480


https://blog.csdn.net/HorkyChen/article/details/53885456?spm=1001.2014.3001.5501

0.预热网络连接
使用Skeleton screens(先显示基本的框架)，并且对开销大的元素执行懒加载，如字体、JS、轮播元素、视频和iframe。也可以使用Resource Hints中定义的一套预处理策略。
* dns-prefetch DNS预解析
* preconnect 预连接
* prefetch 预加载且会运行(JS)
* preload 预加载，但不会运行
* prerender 预渲染，成本太高不建议使用
实践中并不是需要这些特性混合使用，比如通常preconnect会比dns-prefetch更有效。preload则会比prefetch和prerender有更高的收益（更易于使用）。

翻译就到这里了，剩余的部分主要和HTTP/2有关，里面还是有些关键内容的，简单概述如下:
* 有没有使用Brotli或者Zopfli压缩？
* 有没有使用OCSP简化TLS握手？
* 有没有使用HPACK精简响应头？
* 有没有使用Service Worker进行更精细的控制？

https://w3c.github.io/resource-hints/
总结

http这个如此简单的协议，有什么可学习的呢？

那么我提出几个问题，看你能解释清楚吗？

* 用Nginx

# OSI（开放系统互联）七层模型及其协议
|     层次       |         功能           |      协议      |
| -------------- | --------------------- | -------------- |
|     应用层     | 提供用户接口和网络服务   |    HTTP        |
|     表示层     |       数据格式转换      |  SSL/TLS       |
|     会话层     |  建立管理和终止绘画连接  |       SSH       |
|     传输层     |建立管理和维护端对端的连接|  TCP（可靠，面向连接）、UDP（不可靠，无连接）|
|     网络层     |实现路由选择，分组转发与拥塞控制  |       IP       |
|     数据链路层     |在相邻节点实现可靠传输  |        MAC      |
|     物理层     |利用传输介质为数据链路层提供物理连接 |        USB      |