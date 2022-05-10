# vue2 简介

## vue面试题
### vue组建中data为啥是一个函数，new Vue()既可以是对象也可以是函数  
根实例对象data可以是对象也可以是函数（根实例是单例），不会产生数据污染情况  
组件实例对象data必须为函数，目的是为了防止多个组件实例对象之间共用一个data，产生数据污染。采用函数的形式，initData时会将其作为工厂函数都会返回全新data对象
### vue组件的name的作用和路由name的作用  
**组建name的作用**  
    * 指定name选项的另外一个好处是便于调试
    * 有名字的组件有更友好的警告信息
    * 另外当在有vue-devtools,未命名组件将显示<AnonymousComponent>,这种很没有语义, 通过提供name 选项,可以获得更有语义信息的组件树

**路由name的作用**  
    * vue路由的name的作用(他就是给你当前的路由取了一个名字):

### Vue的响应式原理（双向数据绑定的原理）  
    Vue2.x 使用了Object.defineProperty，对 数据的所有属性添加getter和setter方法  
    Vue3.x 使用了Proxy  

    简单来说就是使用Object.defineProperty这个API为数据设置get和set。当读取到某个属性时，触发get将读取它的组件对应的render watcher收集起来；当重置赋值时，触发set通知组件重新渲染页面。如果数据的类型是数组的话，还做了单独的处理，对可以改变数组自身的方法进行重写，因为这些方法不是通过重新赋值改变的数组，不会触发set，所以要单独处理。响应系统也有自身的不足，所以官方给出了$set和$delete来弥补

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
    * key 是给每一个 vnode 的唯一id,可以依靠 key,更准确,更快的拿到 oldVnode 中对应的 vnode 节点，高效的更新虚拟DOM  
    * 数组的特性，数组是以堆栈的形式来存在输入元素的。在直接splice()删除一个元素的时候。在删除一个index=3元素的时候，下一个元素会“补上”来，使用这个index，删除后index=3的对象就变成了原来的下一个对象。
    * 
