# vue2 简介

### 组件化好处
组件化的核心组成：模板、属性、事件、插槽、生命周期
组件化的好处：高内聚、可重用、可组合
- 组件化开发能大幅提高应用开发效率、测试性、复用性等
- 降低更新范围，只重新渲染变化的组件

## vue面试题
### vue组建中data为啥是一个函数，new Vue()既可以是对象也可以是函数  
根实例对象data可以是对象也可以是函数（根实例是单例），不会产生数据污染情况  
组件实例对象data必须为函数，目的是为了防止多个组件实例对象之间共用一个data，产生数据污染。采用函数的形式，initData时会将其作为工厂函数都会返回全新data对象
### vue组件的name的作用和路由name的作用  
**组建name的作用**  
    * 指定name选项的另外一个好处是便于调试
    * 有名字的组件有更友好的警告信息
    * 另外当在有vue-devtools,未命名组件将显示AnonymousComponent,这种很没有语义, 通过提供name 选项,可以获得更有语义信息的组件树

**路由name的作用**  
    * vue路由的name的作用(他就是给你当前的路由取了一个名字):

### Vue的响应式原理（双向数据绑定的原理）  
1. Vue2.x 使用了Object.defineProperty，对 数据的所有属性添加getter和setter方法  
2. Vue3.x 使用了Proxy  
    * 简单来说就是使用Object.defineProperty这个API为数据设置get和set。当读取到某个属性时，触发get将读取它的组件对应的render watcher收集起来；当重置赋值时，触发set通知组件重新渲染页面。如果数据的类型是数组的话，还做了单独的处理，对可以改变数组自身的方法进行重写，因为这些方法不是通过重新赋值改变的数组，不会触发set，所以要单独处理。响应系统也有自身的不足，所以官方给出了$set和$delete来弥补

    * 当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的 属性，并使用 Object.defineProperty 重新定义属性的setter方法和getter方法。
    * 这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 能够追踪依赖，在属性被访问和修改时通知变更。
    * 每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把“接触”过的数据属性记录为依赖（getter触发，进行依赖收集）。
    * 之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染re-render（即重新渲染 修改属性所关联的组件）,生成虚拟DOM树。

    **源码解析**
        * Vue在初始化时调用方法initData，该方法会拿到用户传入的data数据；
        *　通过new Observer对数据进行观测，如果是数组，则改写数组的原型方法，解决不能直接利用数组索引 设置或修改 一个数组项的问题；如果数据是对象类型，在Observer中调用this.walk(value)进行对象的处理；
        * 循环遍历data的所有属性，在walk中调用defineReactive对属性重新定义；
        * 采用Object.defineProperty为属性添加getter和setter方法
        * 对依赖中的属性执行setter方法时，通过notify方法，通知watcher，重新渲染watcher关联的组件。

### Vue-为什么不建议用数组的下标index作为key
1. key 是给每一个 vnode 的唯一id,可以依靠 key,更准确,更快的拿到 oldVnode 中对应的 vnode 节点，高效的更新虚拟DOM  
2. 数组的特性，数组是以堆栈的形式来存在输入元素的。在直接splice()删除一个元素的时候。在删除一个index=3元素的时候，下一个元素会“补上”来，使用这个index，删除后index=3的对象就变成了原来的下一个对象。

* Vue2.x的响应式

    1. 实现原理
        * 对象类型：通过Object.defineProperty()对属性的读取、修改进行拦截（数据劫持）
        * 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

    ```javascript
    Object.defineProperty(data, 'count', {
        get () {}, 
        set () {}
    })
    ```

    2. 存在问题
        * 新增属性、删除属性, 界面不会更新。
        * 直接通过下标修改数组, 界面不会自动更新。
    
    3. 解决方案
        * 使用Vue.set、Vue.delete或者vm.$set、vm.$delete这些API

### Vue渲染过程
1. 模板编译原理
    * 解析**template**模板，生成**ast语法树**，再使用**ast语法树**生成**render**函数字符串，编译流程如下
        * 解析阶段：使用大量的**正则表达式**对**template**字符串进行解析，转化为**抽象语法树AST**。
        * 优化阶段：遍历**AST**，找到其中的一些**静态节点**并进行标记，方便在进行**diff**比较时，直接跳过这一些静态节点，**优化性能**
        * 生成阶段： 将最终的**AST**转化为**render**函数
2. 视图 渲染更新流程
    * 监听数据的变化，当数据发生变化时，**Render** 函数执行生成 **vnode**对象
    * 对比新旧 **VNode** 对象，通过**Diff算法（双端比较）**生成真实**DOM**；
3. Vue runtime-compiler 与 runtime-only
    * runtime-compiler的步骤：template--> ast--> render函数 --> VDom--> 真实DOM
    * runtime-only的步骤：render函数 --> VDom--> 真实DOM
    runtime-only 版本的体积较小。但是无法使用 template 选项
### VirtualDOM & Diff算法
1. 虚拟DOM 的产生和本质
    * 由于在浏览器中操作DOM是很昂贵的。频繁的操作DOM，会产生一定的性能问题。使用虚拟DOM可以减少直接操作DOM的次数，减少浏览器的重绘及回流
    * Virtual DOM 本质就是用一个原生的JS对象去描述一个DOM节点。是对真实DOM的一层抽象
    * Virtual DOM 映射到真实DOM要经历VNode的create、diff、patch等阶段
2. 虚拟DOM的作用
    * 将真实元素节点抽象成 VNode，有效减少直接操作 dom 次数，从而提高程序性能
    * 方便实现跨平台：可以使用虚拟DOM去针对不同平台进行渲染；

3. Diff算法 实现原理
    * 首先，对比新旧节点（VNode）本身，判断是否为同一节点，如果不为相同节点，则删除该节点重新创建节点进行替换；
    * 如果为相同节点，就要判断如何对该节点的子节点进行处理，这里有四种情况：
        * 旧节点有子节点，新节点没有子节点，就直接删除旧节点的子节点；
        * 旧节点没有子节点，新节点有子节点，就将新节点的子节点添加到旧节点上；
        * 新旧节点都没有子节点，就判断是否有文本节点进行对比；
        * 新旧节点都有子节点，就进行双端比较
4. Diff算法 的执行时机
    * Vue 中 Diff算法 执行的时刻是组件更新的时候，更新函数会再次执行 render 函数获得最新的虚拟DOM，然后执行patch函数，并传入新旧两次虚拟DOM，通过比对两者找到变化的地方，最后将其转化为对应的DOM操作。
5. DIFF算法为什么是 O(n) 复杂度而不是 O(n^3)
    * 正常Diff两个树的时间复杂度是O(n^3)，但实际情况下我们很少会进行跨层级的移动DOM，所以Vue将Diff进行了优化，只对同层的子节点进行比较，放弃跨级的节点比较，使得时间复杂从O(n^3)降低至O(n)。
6. Vue2 Diff算法 双端比较原理
    * 使用了双端比较策略，用过四指针（旧头、旧尾、新头、新尾）逐步向中间收缩，对比新旧子节点数组。
    * 它的局限性是全量对比，即使某些节点是静态的，仍需遍历所有节点
7.  Vue3 Diff算法 最长递增子序列
    * vue3 为了尽可能的减少移动，采用 贪心 + 二分查找 去找最长递增子序列；
### 父子组件 生命周期 顺序
1. 创建过程自上而下，挂载过程自下而上
    * 加载渲染过程：父 beforeCreate->父 created->父 beforeMount->子 beforeCreate->子 created->子 beforeMount->子 mounted->父 mounted
    * 子组件更新过程：父 beforeUpdate-> 子 beforeUpdate-> 子updated -> 父 updated
    * 父组件更新过程：父 beforeUpdate-> 父 updated
    * 销毁过程：父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed
2. 生命周期钩子是如何实现的
    * Vue 的生命周期钩子核心实现是利用发布订阅模式先把用户传入的的生命周期钩子订阅好（内部采用数组的方式存储）然后在创建组件实例的过程中会依次执行对应的钩子方法（发布）
### Computed 和 Watch
1. 两者的区别
    * computed 是计算一个新的属性，并将该属性挂载到 Vue 实例上，而 watch 是监听已经存在且已挂载到 Vue 实例上的数据，调用对应的方法。
    * computed 计算属性的本质是一个惰性求值的观察者computed watcher，具有缓存性，只有当依赖变化后，第一次访问 computed 属性，才会计算新的值
    * 从使用场景上说，computed 适用一个数据被多个数据影响，而 watch 适用一个数据影响多个数据；
2. 数据放在 computed 和 methods 的区别
    * computed 内定义的视为一个变量；而 methods 内定义的是函数，必须加括号()；
    * 在依赖数据不变的情况下，computed 内的值只在初始化的时候计算一次，之后就直接返回结果；而 methods 内调用的每次都会重写计算。
3. Computed 的实现原理
    * computed 本质是一个惰性求值的观察者computed watcher，当 computed 的依赖状态发生改变时,会通知这个惰性的 watcher,computed watcher 通过 this.dep.subs.length 判断有没有订阅者
    * 有订阅者就是重新计算结果判断是否有变化，变化则重新渲染。
    * 没有的话,仅仅把 this.dirty = true (当计算属性依赖于其他数据时，属性并不会立即重新计算，只有之后其他地方需要读取属性的时候，它才会真正计算，即具备 lazy（懒计算）特性。)
4. Watch的 实现原理
    * Watch 的本质也是一个观察者 watcher，监听到值的变化就执行回调，watch 的初始化在 data 初始化之后，此时的data已经通过 Object.defineProperty 设置成了响应式；
    * watch 的 key 会在 Watcher 里进行值的读取，也就是立即执行 get 获取 value，此时如果有 immediate属性就立马执行 watch 对应的回调函数；
    * 当 data 对应的 key 发生变化时，触发回调函数的执行；
    