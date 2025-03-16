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

**浏览器和node环境下，微任务队列的执行时机不同**  
* Node端，微任务在事件循环的各个阶段之间执行
* 浏览器端，微任务在事件循环的宏任务执行完之后执行


## 闭包的应用
函数作为参数被传递
函数作为返回值被返回
应用实例：
1. 数据封装和私有变量，
2. 回调函数和事件处理程序
3. 记忆化（Memoization）记忆化是一种优化技术，用于缓存函数的结果，以避免重复计算
4. 模块模式 模块模式利用闭包来创建私有变量和方法，从而实现模块化编程。
5. 高阶函数 高阶函数接受函数作为参数或返回函数，闭包在这种情况下非常有用。
6. 维护状态 闭包可以用于维护和更新状态，特别是在没有类的情况下。
7. 实现迭代器 闭包可以用来实现自定义的迭代器。
```js
// 数据封装和私有变量
function createPerson(name) {
    let age = 25; // 私有变量

    return {
        getName: function() {
            return name;
        },
        getAge: function() {
            return age;
        },
        setAge: function(newAge) {
            if (newAge > 0) {
                age = newAge;
            }
        }
    };
}

const person = createPerson("Alice");

console.log(person.getName()); // 输出: Alice
console.log(person.getAge());  // 输出: 25
person.setAge(30);
console.log(person.getAge());  // 输出: 30
console.log(person.age);       // 输出: undefined （无法直接访问私有变量）

// 回调函数和事件处理程序
function setupButton(buttonId, message) {
    const button = document.getElementById(buttonId);

    button.addEventListener('click', function() {
        console.log(message);
    });
}

setupButton('myButton', 'Button clicked!');

// HTML:
// <button id="myButton">Click Me</button>

// 记忆化（Memoization）
function memoize(fn) {
    const cache = {};

    return function(...args) {
        const key = JSON.stringify(args);

        if (cache[key]) {
            return cache[key];
        }

        const result = fn.apply(this, args);
        cache[key] = result;
        return result;
    };
}

const fibonacci = memoize(function(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(10)); // 输出: 55
console.log(fibonacci(10)); // 输出: 55 （从缓存中获取）
```

## new实现
1. 首先创一个新的空对象
2. 根据原型链，设置空对象的__proto__为构造函数的prototype
3. 构造函数的this指向这个对象，执行构造函数的代码
4. 判断函数的返回值类型，如果是引用类型，就返回这个引用类型的对象
