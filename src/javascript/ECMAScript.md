# JavaScript语法  

## JavaScript运行机制  

**事件循环**

一个浏览器通常有以下几个常驻的线程：  
* 渲染引擎线程：该线程负责页面的渲染
* JS引擎线程：负责JS的解析和执行
* 定时触发器线程：处理定时事件，比如setTimeout, setInterval
* 事件触发线程：处理DOM事件
* 异步http请求线程：处理http请求

渲染线程和JS引擎线程是不能同时进行的。也就是说在执行代码时，渲染会挂起；渲染DOM时，代码也不会执行。 虽然JS是单线程，但是浏览器是多线程的，在遇到像setTimeout、DOM事件、ajax等这种任务时，会转交给浏览器的其他工作线程(上面提到的几个线程)执行，执行完之后将回调函数放入到任务队列。

**microtask(微任务)、macrotask(宏任务)**

任务队列又分微任务队列和宏任务队列

**微任务**
* Promise
* MutationObserver（Mutation Observer API 用来监视 DOM 变动）
* Object.observe()（已废弃）  

**宏任务**  
* setTimeout
* setInterval
* setImmediate
* I\O
* UI rendering(DOM event)

**执行过程**  
1. 在JS执行完同步任务之后，会开始执行微任务队列
2. 在将所有的微任务执行完之后，会开始执行宏任务队列
3. 在执行完一个宏任务之后，跳出来，重新开始下一个循环(从1开始执行)  

