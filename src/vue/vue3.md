
# vue3 简介
### 性能的提升

* 代码打包体积更小：许多Vue的API可以被Tree-Shaking，因为使用了es6module，tree-shaking 依赖于 es6模块的静态结构特性；
* 响应式的优化：用 Proxy 代替 Object.defineProperty，可以监听到数组下标变化，及对象新增属性，因为监听的不是对象属性，而是对象本身，还可拦截 apply、has 等方法；
* 虚拟DOM的优化：保存静态节点直接复用(静态提升)、以及添加更新类型标记（patchflag）（动态绑定的元素）
    * 静态提升：静态提升就是不参与更新的静态节点，只会创建一次，在之后每次渲染的时候会不停的被复用；
    * 更新类型标记：Vue2中的虚拟DOM是进行全量对比；vue3中在对比VNode的时候，只对比带有更新类型标记的节点，大大减少了对比Vnode时需要遍历的节点数量；还可以通过 flag 的信息得知当前节点需要对比的内容类型；
    * 优化的效果：Vue3的渲染效率不再和模板大小成正比，而是与模板中的动态节点数量成正比；
* Diff算法 的优化：Diff算法 使用 最长递增子序列 优化了对比流程，使得 虚拟DOM 生成速度提升 200%

### vue3响应式
* Vue2 响应式
    * 对象响应式是通过 Object.defineProperty() 对象的属性进行递归劫持（只会劫持已经存在的属性），将其转换为getter和setter，实现依赖收集和派发更新。
    * 数组响应式是通过重写数组的原生方法实现的
* vue3响应式
    * 使用 Proxy结合Reflect代替Object.defineProperty
    * 支持监听对象和数组的变化，
    * 对象嵌套属性只代理第一层，运行时递归，用到才代理，也不需要维护特别多的依赖关系，性能取得很大进步；
    * Vue3 用 TS 编写，使得对外暴露的 api 更容易结合 TypeScript。

* Vue3 的响应式
1. 实现原理
    Proxy（代理）:  Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。
    ```javascript
    const p = new Proxy(target, handler)
    ```
    target：要使用 Proxy 包装的目标对象
    handler：一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。
    通过Reflect（反射）:  对源对象的属性进行操作。

2. 对比 vue2.x 与 vue3.x 响应式
  * 由于Object.defineProperty只能劫持对象属性，需要遍历对象的每一个属性，如果属性值也是对象，就需要递归进行深度遍历。但是 Proxy 直接代理对象， 不需要遍历操作。
  * Object.defineProperty劫持的是对象的属性，新增属性时，需要重新遍历对象， 对其新增属性再次使用Object.defineProperty进行劫持。 Vue2.x 中给数组和对象新增属性时，需要使用$set才能保证新增的属性也是响应式的, $set内部也是通过调用Object.defineProperty去处理的。

3. vue3解构丢失响应式
  * 对Vue3响应式数据使用ES6解构出来的是一个引用对象类型时，它还是响应式的，但是结构出的是基本数据类型时，响应式会丢失。
  * 因为Proxy只能监听对象的第一层，深层对象的监听Vue是通过reactive方法再次代理，所以返回的引用仍然是一个Proxy对象；而基本数据类型就是值；

4. Vue3 响应式 对 Set、Map 做的处理
  * Vue3 对 Map、Set做了很多特殊处理，这是因为Proxy无法直接拦截 Set、Map，因为 Set、Map的方法必须得在它们自己身上调用；Proxy 返回的是代理对象；
  * 所以 Vue3 在这里的处理是，封装了 toRaw() 方法返回原对象，通过Proxy的拦截，在调用诸如 set、add方法时，在原对象身上调用方法；
5. 为啥要使用Reflect
  * Reflect 的方法（如 Reflect.get()）直接映射对象的默认操作（如属性读取），确保在拦截后仍能执行原本的逻辑。
  * 当代理对象的方法被调用时，Reflect 能传递正确的 receiver（代理对象本身），避免 this 指向原始对象。
### vue新内置方法
1. 新的内置组件
  * Fragment 支持多个根节点，Vue2 中，编写每个组件都需要一个父级标签进行包裹，而Vue3 不需要，内部会默认添加 Fragments；
  * Teleport Teleport是vue3推出的新功能，也就是传送的意思，可以更改dom渲染的位置。
  * Suspense 可以在组件渲染之前的等待时间显示指定内容，比如loading；
2. 新增指令
    * v-memo 新增指令可以缓存 html 模板，比如 v-for 列表不会变化的就缓存，简单说就是用内存换时间

### Composition API
#### Options API的问题
1. 难以维护：Vue2 中只能固定用 data、computed、methods 等选项来组织代码，在组件越来越复杂的时候，一个功能相关的属性和方法就会在文件上中下到处都有，很分散，变越来越难维护
2.  不清晰的数据来源、命名冲突： Vue2 中虽然可以用 minxins 来做逻辑的提取复用，但是 minxins里的属性和方法名会和组件内部的命名冲突，还有当引入多个 minxins 的时候，我们使用的属性或方法是来于哪个 minxins 也不清楚
#### Composition API和 Options API 区别和作用
1. 更灵活的代码组织：Composition API 是基于逻辑相关性组织代码的，将零散分布的逻辑组合在一起进行维护，也可以将单独的功能逻辑拆分成单独的文件；提高可读性和可维护性
2. 更好的逻辑复用：解决了过去 Options API 中 mixins 的各种缺点；
3. 同时兼容Options API；
4. 更好的类型推导：组合式 API主要利用基本的变量和函数，它们本身就是类型友好的。用组合式 API重写的代码可以享受到完整的类型推导

### SFC Composition API语法糖（script setup）
是在单文件组件中使用组合式 API 的编译时语法糖。
  * 有了它，我们可以编写更简洁的代码；
  * 在添加了setup的script标签中，定义的变量、函数，均会自动暴露给模板（template）使用，不需要通过return返回
  * 引入的组件可以自动注册，不需要通过components 进行注册
setup 生命周期
  * setup是vue3.x新增的，它是组件内使用Composition API的入口，在组件创建挂载之前就执行；
  * 由于在执行setup时尚未创建组件实例，所以在setup选型中没有this，要获取组件实例要用getCurrentInstance()
  * setup中接受的props是响应式的， 当传入新的props时，会及时被更新。

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

6. computed和watch
    * computed
      * 接受一个 getter 函数，并根据 getter 的返回值返回一个不可变的响应式 ref 对象。
      * 或者，接受一个具有 get 和 set 函数的对象，用来创建可写的 ref 对象。
    * watchEffect
      * 立即执行传入的一个函数，所以默认第一次也会执行一次，不需要传入监听内容，会自动收集函数内的数据源作为依赖，在依赖变化的时候又会重新执行该函数，如果没有依赖就不会执行；而且不会返回变化前后的新值和老值
    * watch
      * watch 作用是对传入的某个或多个值的变化进行监听；触发时会返回新值和老值；也就是说第一次不会执行，只有变化时才会重新执行
    * 与 watchEffect 相比，watch 允许我们：
        1. 惰性地执行副作用；
        2. 更具体地说明应触发侦听器重新运行的状态；
        3. 访问被侦听状态的先前值和当前值。

7. toRef 与 toRefs
    * 作用： 可以用来为源响应式对象上的某个 property 新创建一个 ref。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。
    * 应用: 要将响应式对象中的某个属性单独提供给外部使用时。
    * toRefs与toRef功能一致，但可以批量创建多个 ref 对象，语法：toRefs(state)

8. readonly和shallowReadonly
    * readonly：接受一个对象 (响应式或纯对象) 或 ref 并返回原始对象的只读代理。只读代理是深层的：任何被访问的嵌套 property 也是只读的。
    * shallowReadonly：也是用于创建一个只读数据，但是这个只读只是第一层只读，非深度只读

9. shallowReactive 与 shallowRef
    * shallowRef：创建一个跟踪自身 .value 变化的 ref，但不会使其值也变成响应式的。
    * shallowReactive：创建一个响应式代理，它跟踪其自身 property 的响应性，但不执行嵌套对象的深层响应式转换 (暴露原始值)。

10. 响应式数据的判断
    * isRef: 检查一个值是否为一个 ref 对象
    * isReactive: 检查一个对象是否是由 reactive 创建的响应式代理
    * isReadonly: 检查一个对象是否是由 readonly 创建的只读代理
    * isProxy: 检查一个对象是否是由 reactive 或者 readonly 方法创建的代理

11. toRaw() 的核心作用
    * 剥离响应式代理，将 Vue 创建的响应式对象（reactive、readonly、shallowReactive 等）还原为其原始对象。
    * 避免响应式追踪 直接操作原始对象时，不会触发 Vue 的依赖收集和更新机制。
  应用场景
    * 性能优化：操作大量数据
12. 与 markRaw() 的区别
    * toRaw()	从响应式对象中提取原始对象（“逆向操作”） 仅剥离最外层的代理。若对象内部存在嵌套的响应式对象，需递归处理：
    * markRaw() 标记一个对象，使其永远不会被转为响应式（“正向操作”）

## 六、新的组件

1. Fragment
* 在Vue2中: 组件必须有一个根标签
* 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
* 好处: 减少标签层级, 减小内存占用

2. Teleport
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
3. Suspense

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

## 路由守卫
Vue 路由守卫提供了多种方式来控制导航过程中的行为，包括全局前置守卫、全局解析守卫、全局后置钩子、路由独享守卫和组件内守卫。通过合理使用这些守卫，可以实现权限控制、数据加载、日志记录等功能，提升应用的安全性和用户体验。
1. 全局前置守卫 (beforeEach) 全局前置守卫会在每次导航触发前调用，可以用来进行权限验证、加载数据等操作。
示例：权限控制
假设我们有一个简单的应用，其中 /dashboard 是一个受保护的页面，只有登录用户才能访问。我们可以使用 beforeEach 守卫来检查用户的认证状态。
```js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Dashboard from './views/Dashboard.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/dashboard', component: Dashboard }
    ]
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token'); // 检查用户是否已登录

    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next('/login'); // 如果未登录且尝试访问受保护的页面，则重定向到登录页
    } else {
        next(); // 继续导航
    }
});

export default router;
```
2. 全局解析守卫 (beforeResolve) 全局解析守卫在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后调用。
示例：加载数据
假设我们在导航到某个页面之前需要加载一些数据，可以使用 beforeResolve 守卫来处理。
```js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Profile from './views/Profile.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/profile', component: Profile }
    ]
});

router.beforeResolve(async (to, from, next) => {
    try {
        // 模拟异步数据加载
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Data loaded successfully");
        next();
    } catch (error) {
        console.error("Failed to load data", error);
        next(false); // 阻止导航
    }
});

export default router;
```
3. 全局后置钩子 (afterEach) 全局后置钩子在导航完成后调用，不改变导航本身的状态。
示例：记录日志
假设我们需要在每次导航完成后记录日志，可以使用 afterEach 钩子。
```js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/about', component: About }
    ]
});

router.afterEach((to, from) => {
    console.log(`Navigated from ${from.path} to ${to.path}`);
    // 可以在这里记录日志、发送分析数据等
});

export default router;
```
4. 路由独享守卫 (beforeEnter) 路由独享守卫仅在进入特定路由时调用，适用于特定路由的权限控制。
示例：权限控制
假设我们希望在进入 /settings 页面时进行额外的权限检查。
```js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Settings from './views/Settings.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        {
            path: '/settings',
            component: Settings,
            beforeEnter: (to, from, next) => {
                const isAdmin = localStorage.getItem('isAdmin');
                if (!isAdmin) {
                    next('/');
                } else {
                    next();
                }
            }
        }
    ]
});

export default router;
```
5. 组件内守卫 组件内守卫允许你在组件内部定义导航守卫，适用于特定组件的逻辑。
示例：组件内守卫
假设我们在进入 UserProfile 组件时需要加载用户数据。
  - beforeRouteEnter 守卫在进入组件对应的路由前调用，并在回调中设置组件数据。
  - beforeRouteUpdate 守卫在当前路由改变但组件被复用时调用，重新加载用户数据。
  - beforeRouteLeave 守卫在离开组件对应的路由时调用，可以执行清理操作。
```js
<template>
  <div>
    <h1>User Profile</h1>
    <p v-if="user">{{ user.name }}</p>
    <p v-else>Loading...</p>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      user: null
    };
  },
  async beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不能获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    try {
      const response = await fetch(`/api/user/${to.params.id}`);
      const userData = await response.json();
      next(vm => {
        vm.user = userData; // 通过 `vm` 访问组件实例
      });
    } catch (error) {
      console.error("Failed to load user data", error);
      next(false); // 阻止导航
    }
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.fetchUserData(to.params.id);
    next();
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    console.log("Leaving UserProfile");
    next();
  },
  methods: {
    async fetchUserData(userId) {
      try {
        const response = await fetch(`/api/user/${userId}`);
        this.user = await response.json();
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    }
  }
};
</script>
```

## vue2和vue3区别

## nextTick原理
在调用this.$nextTick(cb)之前：
  1. 存在一个callbacks数组，用于存放所有的cb回调函数。
  2. 存在一个flushCallbacks函数，用于执行callbacks数组中的所有回调函数。
  3. 存在一个timerFunc函数，用于将flushCallbacks函数添加到任务队列中。

当调用this.nextTick(cb)时：
  1. nextTick会将cb回调函数添加到callbacks数组中。
  2. 判断在当前事件循环中是否是第一次调用nextTick：
    - 如果是第一次调用，将执行timerFunc函数，添加flushCallbacks到任务队列。
    - 如果不是第一次调用，直接下一步
  3. 如果没有传递cb回调函数，则返回一个Promise实例
```js
// 存储所有的cb回调函数
const callbacks = [];
/*类似于节流的标记位，标记是否处于节流状态。防止重复推送任务*/
let pending = false;

/*遍历执行数组 callbacks 中的所有存储的cb回调函数*/
function flushCallbacks() {
  // 重置标记，允许下一个 nextTick 调用
  pending = false;
  /*执行所有cb回调函数*/
  for (let i = 0; i < callbacks.length; i++) {
    callbacks[i]();
  }
  // 清空回调数组，为下一次调用做准备
  callbacks.length = 0;
}

function nextTick(cb) {
  // 将回调函数cb添加到 callbacks 数组中
  callbacks.push(() => {
    cb();
  });
  
  // 第一次使用 nextTick 时，pending 为 false，下面的代码才会执行
  if (!pending) {
    // 改变标记位的值，如果有flushCallbacks被推送到任务队列中去则不需要重复推送
    pending = true;
    // 使用 Promise 机制，将 flushCallbacks 推送到任务队列
    Promise.resolve().then(flushCallbacks);
  }
}
```
```js
let message = '初始消息';
  
nextTick(() => {
  message = '更新后的消息';
  console.log('回调：', message); // 输出2: 更新后的消息
});

console.log('测试开始：', message); // 输出1: 初始消息
```
为了防止浏览器不支持 Promise，Vue 选择了多种 API 来实现兼容 nextTick：
Promise --> MutationObserver --> setImmediate --> setTimeout

1. Promise (微任务)：
  如果当前环境支持 Promise，Vue 会使用 Promise.resolve().then(flushCallbacks)


2. MutationObserver (微任务)：
如果不支持 Promise，支持 MutationObserver。Vue 会创建一个 MutationObserver 实例，通过监听文本节点的变化来触发执行回调函数。


3. setImmediate (宏任务)：
如果前两者都不支持，支持 setImmediate。则：setImmediate(flushCallbacks)
注意：setImmediate 在绝大多数浏览器中不被支持，但在 Node.js 中是可用的。


4. setTimeout (宏任务)：
如果前面所有的都不支持，那你的浏览器一定支持 setTimeout！！！终极方案：setTimeout(flushCallbacks, 0)
