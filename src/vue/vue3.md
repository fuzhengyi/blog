
# vue3 简介

###  1.性能的提升

* 打包大小减少41%

* 初次渲染快55%, 更新渲染快133%

* 内存减少54%

### 2.源码的升级

* 使用Proxy代替defineProperty实现响应式

  * 可直接监听数组类型的数据变化

  * 监听的目标为对象本身，不需要像Object.defineProperty一样遍历每个属性，有一定的性能提升

* 重写虚拟DOM的实现

  * Vue2中的虚拟DOM是进行全量对比；

  * Vue3新增了静态标记（PatchFlag），在创建虚拟DOM的时候，根据DOM中的内容会不会发生变化，添加静态标记。在和上次虚拟节点进行对比的时候，只对比带有patch flag的节点，并且可以通过flag的信息得知当前节点要对比的具体内容。
```
  ![avatar](./DOM.png)
```

* Tree-Shaking

  vue3中的核心api都支持了tree-shaking，这些api都是通过包引入的方式而不是直接在实例化时就注入，只会对使用到的功能或特性进行打包（按需打包），这意味着更多的功能和更小的体积。
  
  在vue3中，可以如下面这样引用vue的功能函数，如果你的项目没有用到watch，那编译时就会把tree shaking掉。
  ```javascript
  import { computed, watch, nextTick } from "vue";
  ```

### 3.更好的TS支持

* Vue3可以更好的支持TypeScript

### 4.新的特性

1. Composition API（组合API）

    * setup配置
    * ref与reactive
    * watch与watchEffect
    * provide与 inject


2. 新的内置组件

    * Fragment 
    * Teleport
    * Suspense



3. 其他改变

    * 新的生命周期钩子
    * data 选项应始终被声明为一个函数
    * 移除keyCode支持作为 v-on 的修饰符



## 二、创建一个Vue项目

### 1. 使用 vue-cli 创建

    ## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
    vue --version
    ## 安装或者升级你的@vue/cli
    npm install -g @vue/cli
    ## 创建Vue项目，选择Vue3
    vue create vue_test
    ## 启动
    cd vue_test
    npm run serve


![alt 属性文本](https://cn.vitejs.dev/assets/bundler.37740380.png)

传统构建模式，是将所有资源都打包好，随着项目越来越大，启动速度就越慢

### 2. 使用 vite 创建

* 什么是vite？—— 是Web开发构建工具。现代浏览器大多数已经原生支持 ESM 规范，利用浏览器去解析 imports，在服务器端按需编译返回，完全跳过了打包这个概念，服务器随起随用。

* 使用Vite来创建一个Vue3的项目

    ```javascript
    ## 创建工程
    npm init vite-app yk_vue3
    ## 进入工程目录
    cd yk_vue3
    ## 安装依赖
    npm install
    ## 运行
    npm run dev
    ```

* vite为什么快?

  Vite 运行 Dev 命令后只做了两件事情，一是启动了一个用于承载资源服务的 service；二是使用 esbuild 预构建 npm 依赖包。直到浏览器以 http 方式发来 ESM 规范的模块请求时，Vite 才开始“按需编译”被请求的模块。

  ![alt 属性文本](https://cn.vitejs.dev/assets/esm.3070012d.png)

* 优势如下：

  1. 开发环境中，无需打包操作，可快速的冷启动。
      
  2. 轻量快速的热重载（HMR）。

  3. 真正的按需编译，不再等待整个应用编译完成。



## 三、分析文件目录

### 1. main.js

Vue2 是使用 new Vue() 来实例化的，然后使用 Vue.use() 来注入组件框架的。

``` javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.use(router);

new Vue({
  render: h => h(App),
}).$mount('#app')
```

Vue3 通过createApp函数创建Vue应用实例，它可以通过链条的方式继续调用其他的方法来实现全局使用。

```javascript
import { createApp } from 'vue'
import App from './App.vue'

// 直接在createApp后面使用use注入框架，就可以在全局使用
createApp(App).use(router).use(vant).mount('#app')
```

### 2. App.vue

在template标签里可以没有根标签了

```javascript
<template>
	<!-- Vue3组件中的模板结构可以没有根标签 -->
	<img alt="Vue logo" src="./assets/logo.png">
	<HelloWorld msg="Welcome to Your Vue.js App"/>
</template>
```

## 四、Composition API

### 1. Options API 存在的问题

使用传统Options API（配置式API）中，新增或者修改一个需求，就需要分别在data，methods，computed里修改，当我们的组件变得更大时，逻辑关注点的列表也会增长，在处理单个逻辑关注点时，我们必须不断地“跳转”相关代码的选项块。这种碎片化使得理解和维护复杂组件变得困难。

![alt 属性文本](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d48b8aecd4834019bd4e4fb02d52f333~tplv-k3u1fbpfcp-watermark.awebp)

![alt 属性文本](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82d55db075ff4119a7a5e55f0f0da69a~tplv-k3u1fbpfcp-watermark.awebp)

### 2.Composition API 的优势

正因为有了以上问题，Vue3引入组合API,能够将与同一个逻辑关注点相关的代码配置在一起，可以更加优雅的组织我们的代码，让相关功能的代码更加有序的组织在一起。

![alt 属性文本](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f9d33731796417c9b8035990e4e52cd~tplv-k3u1fbpfcp-watermark.awebp)

![alt 属性文本](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbee55cc74ba45e2b7883c78cf7aa691~tplv-k3u1fbpfcp-watermark.awebp)

### 3. 常用的Composition API

1. setup

    * 概念：一个组件选项，在组件被创建之前，props 被解析之后执行。它是组合式 API 的入口。

    * 组件中所用到的数据、方法等等，均要配置在setup中。

    * setup接受两个参数props和context

    * 该函数返回的所有内容都暴露给组件的其余部分（计算属性、生命周期钩子等）以及组件的模板
    
          注意点：
            
          尽量不要与Vue2.x配置混用

          Vue2.x配置（data、methos、computed...）中可以访问到setup中的属性、方法。

          但在setup中不能访问到Vue2.x配置（data、methos、computed...）。

          如果有重名, setup优先。



2. ref 函数

    * 作用: 定义一个响应式的数据

    * 包装之后参数的值其实是在包装对象的value属性中

    ```javascript

    import { ref } from 'vue'

    const counter = ref(0)

    console.log(counter) // { value: 0 }
    console.log(counter.value) // 0

    ```
    * 接收的数据可以是：基本类型、也可以是对象类型。
    
    * ref为我们的值创建了一个响应式的引用，这样我们就可以整个应用中安全的传递。
    

3. reactive函数

    * 作用: 定义一个对象类型的响应式数据（基本类型不要用它，要用ref函数）

    * 接收一个对象（或数组），返回一个代理对象（Proxy的实例对象）

    ```javascript
    const obj = reactive({ count: 0 })
    ```

    * reactive定义的响应式数据是“深层次的”，所有的数据都是响应式的。 

    * 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。


4. reactive对比ref

  * 从定义数据角度对比

    * ref用来定义：基本类型数据。也可以用来定义对象（或数组）类型数据, 它内部会自动通过reactive转为代理对象。

    * reactive用来定义：对象（或数组）类型数据。


  * 从原理角度对比

    * ref通过类中的的getter与setter来实现响应式（数据劫持）。

    * reactive通过使用Proxy来实现响应式, 并通过Reflect操作源对象内部的数据。
    

  * 从使用角度对比

    * ref定义的数据：操作数据需要.value，读取数据时模板中直接读取不需要.value。

    * reactive定义的数据：操作数据与读取数据：均不需要.value

5. Vue3 中的响应式原理

* Vue2.x的响应式

    1. 实现原理

        对象类型：通过Object.defineProperty()对属性的读取、修改进行拦截（数据劫持）

        数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

    ```javascript
    Object.defineProperty(data, 'count', {
        get () {}, 
        set () {}
    })
    ```

    2. 存在问题

        新增属性、删除属性, 界面不会更新。

        直接通过下标修改数组, 界面不会自动更新。
    
    3. 解决方案

        使用Vue.set、Vue.delete或者vm.$set、vm.$delete这些API

* Vue3 的响应式

    1. 实现原理

        Proxy（代理）:  Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

        ```javascript
        const p = new Proxy(target, handler)
        ```
 
        target：要使用 Proxy 包装的目标对象
        
        handler：一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。
        
        
        通过Reflect（反射）:  对源对象的属性进行操作。


* 对比 vue2.x 与 vue3.x 响应式

  * 由于Object.defineProperty只能劫持对象属性，需要遍历对象的每一个属性，如果属性值也是对象，就需要递归进行深度遍历。但是 Proxy 直接代理对象， 不需要遍历操作。

  * Object.defineProperty劫持的是对象的属性，新增属性时，需要重新遍历对象， 对其新增属性再次使用Object.defineProperty进行劫持。 Vue2.x 中给数组和对象新增属性时，需要使用$set才能保证新增的属性也是响应式的, $set内部也是通过调用Object.defineProperty去处理的。

6. computed和watch

    #computed

    * 接受一个 getter 函数，并根据 getter 的返回值返回一个不可变的响应式 ref 对象。

    * 或者，接受一个具有 get 和 set 函数的对象，用来创建可写的 ref 对象。

    #watchEffect
    
    * 立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。

    #watch

    * watch 需要侦听特定的数据源，并在单独的回调函数中执行副作用。默认情况下，它也是惰性的——即回调仅在侦听源发生变化时被调用。

    * 与 watchEffect 相比，watch 允许我们：

        1. 惰性地执行副作用；

        2. 更具体地说明应触发侦听器重新运行的状态；

        3. 访问被侦听状态的先前值和当前值。

7. toRef 与 toRefs

* 作用： 可以用来为源响应式对象上的某个 property 新创建一个 ref。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。

```javascript
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

fooRef.value++
console.log(state.foo) // 2

state.foo++
console.log(fooRef.value) // 3
```

* 应用: 要将响应式对象中的某个属性单独提供给外部使用时。

* toRefs与toRef功能一致，但可以批量创建多个 ref 对象，语法：toRefs(state)


8. 生命周期

![alt 属性文本](https://v3.cn.vuejs.org/images/lifecycle.svg)
        
Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有有两个被更名：

* beforeDestroy改名为 beforeUnmount

* destroyed改名为 unmounted

可以直接已配置项的形式使用生命周期钩子，也可以使用组合式API的形式使用。

通过直接导入 onX 函数来注册生命周期钩子，这些函数接受一个回调，当钩子被组件调用时，该回调将被执行：

```javascript
import { onMounted, onUpdated, onUnmounted } from 'vue'

setup() {
  onMounted(() => {
    console.log('mounted!')
  })
  onUpdated(() => {
    console.log('updated!')
  })
  onUnmounted(() => {
    console.log('unmounted!')
  })
}
```

选项式 API 的生命周期选项和组合式 API 之间的映射

* beforeCreate -> 使用 setup()

* created -> 使用 setup()

* beforeMount -> onBeforeMount

* mounted -> onMounted

* beforeUpdate -> onBeforeUpdate

* updated -> onUpdated

* beforeUnmount -> onBeforeUnmount

* unmounted -> onUnmounted

* errorCaptured -> onErrorCaptured

* renderTracked -> onRenderTracked

* renderTriggered -> onRenderTriggered

* activated -> onActivated

* deactivated -> onDeactivated

  一般来说，组合式API里的钩子会比配置项的钩子先执行


9. Provide / Inject
    
    provide 和 inject 启用依赖注入。无论组件层次结构有多深，父组件都可以作为其所有子组件的依赖提供者。
    这个特性有两个部分：父组件有一个provide 选项来提供数据，子组件有一个 inject 选项来开始使用这些数据。

    使用组合式API，这两者只能在使用当前活动实例的 setup() 期间被调用。

    #Provide

    * 从vue显式导入provide方法

    * provide函数允许你通过两个参数定义 property：

      1. name (String类型)

      2. Value

      ```javascript
      import { provide } from 'vue'

      provide('location', 'North Pole')
      ```
    #Inject

    * 从vue显式导入Inject方法

    * inject 函数有两个参数：

      1. inject 的 property 的 name

      2. 默认值 (可选)

      ```javascript
      import { inject } from 'vue'

      const userLocation = inject('location', 'The Universe')
      
      ```

## 五、其它 Composition API

1. readonly和shallowReadonly

  
    * readonly：接受一个对象 (响应式或纯对象) 或 ref 并返回原始对象的只读代理。只读代理是深层的：任何被访问的嵌套 property 也是只读的。

    ```javascript
    const original = reactive({ count: 0 })
    const copy = readonly(original)

    watchEffect(() => {
      // 用于响应性追踪
      console.log(copy.count)
    })

    original.count++
    copy.count++ // 警告!
    ```

    * shallowReadonly：也是用于创建一个只读数据，但是这个只读只是第一层只读，非深度只读


2. shallowReactive 与 shallowRef

    * shallowRef：创建一个跟踪自身 .value 变化的 ref，但不会使其值也变成响应式的。

    ```javascript
    const foo = shallowRef({})

    // 改变 ref 的值是响应式的
    foo.value = {}
    // 但是这个值不会被转换。
    isReactive(foo.value) // false
    ```
    * shallowReactive：创建一个响应式代理，它跟踪其自身 property 的响应性，但不执行嵌套对象的深层响应式转换 (暴露原始值)。

    ```javascript

    const state = shallowReactive({
      foo: 1,
      nested: {
        bar: 2
      }
    })

    // 改变 state 本身的性质是响应式的
    state.foo++
    // ...但是不转换嵌套对象
    isReactive(state.nested) // false
    state.nested.bar++ // 非响应式
    ```


3. 响应式数据的判断

    * isRef: 检查一个值是否为一个 ref 对象

    * isReactive: 检查一个对象是否是由 reactive 创建的响应式代理

    * isReadonly: 检查一个对象是否是由 readonly 创建的只读代理

    * isProxy: 检查一个对象是否是由 reactive 或者 readonly 方法创建的代理



## 六、新的组件

### 1. Fragment

* 在Vue2中: 组件必须有一个根标签

* 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中

* 好处: 减少标签层级, 减小内存占用

### 2. Teleport

* Teleport 提供了一种干净的方法，允许我们控制在 DOM 中哪个父节点下渲染了 HTML

* 使用 teleport 标签包裹内容，且给 to 属性绑定瞬移位置的选择器。

```javascript
<teleport to="body">
    <div v-if="modalOpen" class="modal">
        <div>
          I'm a teleported modal! 
          (My parent is "body")
          <button @click="modalOpen = false">
            Close
          </button>
        </div>
    </div>
</teleport>
```
### 3. Suspense

* 在正确渲染组件之前进行一些异步请求是很常见的事。组件通常会在本地处理这种逻辑。

* suspense 组件提供了另一个方案，允许将等待过程提升到组件树中处理。等待异步组件时渲染一些额外内容，让应用有更好的用户体验

* suspense 组件有两个插槽。它们都只接收一个直接子节点。default 插槽里的节点会尽可能展示出来。如果不能，则展示 fallback 插槽里的节点。

```javascript
  <template>
    <suspense>
      <template #default>
          <todo-list />
      </template>
      <template #fallback>
          <div>
            Loading...
          </div>
      </template> 
    </suspense>
  </template>

  <script>
  export default {
    components: {
      TodoList: defineAsyncComponent(() => import('./TodoList.vue'))
    }
  }
</script>
```
