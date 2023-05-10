# vue总结

## 一、vue基础

### 1.1 v-for中key值的作用是什么

在Vue中，使用`v-for`指令来循环渲染数据列表时，需要使用`key`属性为每个列表项指定一个唯一标识，以便Vue能够跟踪每个列表项的状态变化。

具体来说，`key`属性的作用如下：

1. 帮助Vue区分每个列表项：当数据改变导致列表项重新渲染时，Vue会通过比较新旧节点的`key`属性值来确定哪些列表项需要更新，哪些需要删除，哪些需要新增。如果不指定`key`属性，Vue会默认使用每个列表项在数组中的索引作为标识，这样会导致当数组顺序变化时，列表项可能会出现不必要的更新和重新渲染。
2. 提高渲染性能：当列表项的`key`属性值是稳定不变的，Vue可以利用该属性来复用已有的节点，减少DOM操作和重新渲染的次数，从而提高应用的渲染性能。

例如，下面的代码中，`key`属性被设置为每个todo项的唯一标识`id`，这样当todo列表数据发生变化时，Vue可以根据每个todo项的`id`属性来精确地更新对应的DOM节点。

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>
</ul>
```

### 1.2 v-if和v-show的区别是什么

- v-if是条件渲染，只有当条件为真时才会渲染元素，否则会销毁和重建元素
- v-show是条件显示，无论条件是否为真，都会渲染元素，只是通过CSS改变其显示状态

一般来说，v-if的切换成本较高，而v-show的初始渲染成本较高。所以如果您需要频繁切换某个元素，建议使用v-show；如果条件不太可能改变，建议使用v-if。

### 1.3 在vue中使用`{{}}`进行模板解析时,为什么会出现闪屏问题?

这是一个常见的问题，原因是在 vue 初始化完成前，dom将 `{{}}` 代码解析为文本，在 vue 初始化后 才会把 `{{}}` 解析成 vue 的语法。这样就会导致页面短暂的闪烁。

有两种常用的解决方法：

- 使用 v-text 指令代替 `{{}}`，这样可以避免 dom 解析文本。
- 使用 v-cloak 指令，配合 css 样式，让 vue 加载完成前隐藏元素，加载完成后显示元素。

例如：

```html
<div id="app" class="container" v-cloak>
  .... {{}}
</div>
<style>
  [v-cloak]{
    display: none;
  }
</style>
```

### 1.4 常用的事件修饰符

```vue
.stop(阻止事件冒泡)  .prevent(组织默认事件)  .capture(捕获事件)  .self(是事件源本身才触发)   .once只触发一次)
```

### 1.5 $set的用法

Vue.set方法是用来向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新的。

Vue.set方法的用法是：

```vue
Vue.set(target, key, value)
```

或者

```vue
this.$set(target, key, value)
```

其中，target是要更改的数据源，可以是对象或者数组；key是要更改或者新增的属性名或者数组下标；value是要重新赋的值.

例如：

```js
// 给对象添加一个新属性
Vue.set(this.obj, 'name', 'Tom')

// 给数组修改一个元素
this.$set(this.arr, 0, 'Hello')
```

### 1.6 Vue有哪些生命周期钩子函数

Vue有8个常用的生命周期钩子函数，分别是：

不同的生命周期函数可以用来实现不同的功能，根据你的需求选择合适的钩子函数。下面是一些常见的使用场景：

- beforeCreate：可以用来做一些初始化工作，比如设置变量、常量等。
- created：可以用来进行异步数据请求，比如调用ajax获取数据。
- beforeMount：可以用来做一些与DOM无关的操作，比如设置定时器、事件监听 等。
- mounted：可以用来获取挂载元素内的DOM节点，比如使用ref属性或querySelector等。
- beforeUpdate：可以用来在数据更新之前执行一些操作，比如移除事件监听、清除定时器等。
- updated：可以用来在数据更新后执行一些操作，比如操作DOM、发送数据等。
- beforeDestroy：可以用来在实例销毁之前执行一些操作，比如移除事件监听、清除定时器、释放资源等。
- destroyed：可以用来在实例销毁后执行一些操作，比如发送统计数据、记录日志等。

### 1.7 计算属性和methods的区别是什么

Vue中，计算属性和methods的区别是：

- 计算属性是基于它们的响应式依赖进行缓存的，只有当依赖发生变化时才会重新计算。methods每次被调用时都会重新执行。
- 计算属性不接受参数，而methods可以接受参数¹。这使得methods更灵活，可以在其他方法中调用methods。
- 计算属性通常用于根据数据生成输出（例如过滤列表），而methods通常用于响应用户事件（例如点击按钮）。

### 1.8 组件中data为什么是个函数

* 组件一旦被声明好之后，就有可能被复用在各个地方，而不管组件给复用了多少次，他们之间的data都应该是相互独立，互不影响的.
  * 基于以上原理，组件中data声明为函数返回值的形式，当组件给复用N次时，此时他们之间的数据独立.
  * 这就相当于为每一份data开辟各自独立的空间，且各自维护者各自的数据.

### 1.9 什么是作用域插槽

作用域插槽是一种特殊类型的插槽，用作一个（能被传递数据的）可重用模板，来代替已经渲染好的元素¹。它可以让插槽内容访问子组件数据²，从而实现更灵活的组件设计³。

### 1.10 mixin是什么

mixin是一种在Vue组件中分发可复用功能的方式。mixin对象可以包含任意组件选项，如data、methods、computed等。当一个组件使用了mixin对象，那么mixin对象的选项就会被混入到组件本身的选项中⁶。

mixin的作用是可以将一些公共的逻辑或配置提取出来，避免代码冗余和重复。比如，如果有多个组件都需要实现一个相同的方法，那么可以将这个方法定义在一个mixin对象中，然后在需要用到的组件中引入这个mixin对象即可。

当组件中和mixin混入有相同选项时,mixin混入的选项优先级高。

### 1.11 什么是缓存组件

**Vue缓存组件是一种提高性能的方式，可以避免重复渲染不需要变化的组件**。Vue缓存组件的用法很简单，就是使用一个内置组件keep-alive来包裹动态组件component。当动态组件切换时，keep-alive会缓存被移除的组件实例，并在下次激活时恢复它们。

Vue缓存组件也有一些弊端，比如缓存下来的组件如果不做处理，激活的时候就会命中缓存，而不会获取新的数据或者执行生命周期钩子函数⁴。为了解决这个问题，Vue提供了两个特殊的生命周期钩子函数：activated和deactivated⁵。这两个钩子函数只有在被keep-alive包裹的组件中才有效⁵。activated钩子函数会在被缓存的组件重新激活时触发，deactivated钩子函数会在被缓存的组件失活时触发⁵。我们可以在这两个钩子函数中做一些逻辑处理，比如获取新的数据或者清除定时器等⁴。

### 1.12 什么是动态组件

动态组件是一种在Vue中实现在指定位置上，动态加载不同的组件的方式。动态组件的核心代码是使用component标签，并通过is属性来绑定一个变量，这个变量可以是一个组件名或者一个组件对象。当这个变量的值发生变化时，component标签就会根据新的值来渲染对应的组件。

```js
<!-- 动态组件 -->
<component :is="msg"></component>
```

## 二、vue-Router

### 2.1 路由传参

我可以帮你了解vue路由传参的方法。根据搜索结果¹²³，vue路由传参的三种方式是：

- params 传参：在路由配置中使用 name 属性和 params 属性，可以在 url 中显示或不显示参数。

  ```js
  this.$router.push ({
    name:'user',
    params: {
      id : 1,
      name : '张三',
      gender : 'male'
    }
  })
  获取参数:
  - this.$route.params.id
  - props: ['id', 'name', 'gender'],
  ```

- query 传参：在路由配置中使用 path 属性和 query 属性，可以在 url 中以 ?key=value 的形式显示参数。

  ```js
  this.$router.push ({
    path:'/user',
    query: {
      name : '张三',
      age : 18
    }
  })
  获取参数: 
  this.$route.query.name
  ```

- props 传参：在路由配置中使用 props 属性，可以将参数作为组件的属性传递。

  ```js
  const routes = [
    { path: '/user/:id', component: User, props: true }]
  获取参数:
  props: ['id']
  ```

### 2.2 命名视图

一个页面中可以有多个视图存在，在router-view标签上添加name属性，然后再路由上将component替换为components，然后形成对象格式，进行路由加载组件的映射。
必须要设置一个default命名视图，默认如果路由传递了一个组件，那么就让default执行的router-view进行加载

假设你想在一个页面上展示三个视图，分别是 default、a 和 b，那么你可以这样写：

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

然后在路由配置中，你可以指定每个视图对应的组件：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

这样，当你访问 / 路径时，就会看到三个视图分别渲染了 Foo、Bar 和 Baz 组件³⁵。

### 2.3 路由懒加载

Vue路由懒加载是一种优化单页应用的方法，它可以将不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样可以减少页面加载时间和资源消耗。

有两种常用的懒加载方式：使用Vue异步组件和ES中的import³。你可以参考以下示例：

- 使用Vue异步组件：

```js
const Foo = () => Promise.resolve({ /* 组件定义对象 */ })
```

- 使用ES中的import：

```js
const Foo = () => import('./Foo.vue')
```

### 2.4 hash模式和history模式的区别

hash模式和history模式的区别主要有以下几点：

- hash模式是利用URL中的#符号来实现前端路由，不会向服务器发送请求，不需要服务端的支持；history模式是利用HTML5的History API来实现前端路由，需要客户端和服务端共同的支持。
- hash模式在URL末尾带有#符号，对SEO不友好；history模式不带#符号，对SEO友好。
- hash模式只能修改#后面的部分，不能使用锚点功能；history模式可以修改任意同源的URL，可以传递复杂的数据。

### 2.5 路由守卫

根据搜索结果，vue的路由导航守卫是一种用来控制路由跳转或取消的机制。有三种类型的导航守卫：

根据搜索结果，vue的路由导航守卫有以下几种：

- 全局前置守卫：使用 router.beforeEach 注册一个函数，在路由跳转之前执行，可以进行登录检查、页面标题设置等操作。
- 全局解析守卫：使用 router.beforeResolve 注册一个函数，在路由被确认之前执行，可以用来修改或替换路由。
- 全局后置钩子：使用 router.afterEach 注册一个函数，在路由跳转之后执行，可以用来关闭加载动画、记录访问历史等操作。
- 路由独享的守卫：在定义路由时，使用 beforeEnter 属性指定一个函数，在进入该路由之前执行，可以用来对某些特定的路由进行控制。
- 组件内的守卫：在组件中，使用 beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave 三个属性指定三个函数，在组件创建、更新或销毁时执行，可以用来获取数据、保存状态或阻止离开等操作。

## 三、网络请求

### 3.1 axios简介

1.定义

```
基于Promise的http库,支持node.js和浏览器端
```

2.特点

- 从浏览器中创建 [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- 从 node.js 创建 [http](http://nodejs.org/api/http.html) 请求
- 支持 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON 数据
- 客户端支持防御 [XSRF]

### 3.2 请求层的封装

```js
/**
 * 封装axios请求模块
 */
// 1.导入axios及store
import axios from 'axios'
import { Toast } from 'vant';
import router from '../router';

// 2.做环境切换
let baseURL = '';
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://geek.itheima.net'; // 开发环境下
} else if (process.env.NODE_ENV === 'production') {
  baseURL = ''; // 生产环境
}

// 3.自定义axios
const request = axios.create({
  baseURL: baseURL, // 请求基础路径
  timeout: 6000 // 请求超时时间
})

// 4.添加请求拦截器(请求会经过这里)
request.interceptors.request.use((config) => {
  // console.log(config);
  const { user } = store.state
  // config: 本次请求的请求配置对象
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, (error) => {
  console.log(error);
  return Promise.reject(error);
})

// 5.添加响应拦截器
request.interceptors.response.use((res) => {
  console.log('本次响应为:', res)
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据处理
  return res.data.data
}, err => {
  // 超出 2xx 范围的状态码都会触发该函数
  console.log('响应失败,', err);
  // token过期 跳转到登录页面
  if (err.response && err.response.status == 401) {
    router.push('/login')
  }
  Toast(err.message || '数据请求失败')
  return Promise.reject(err)
})
export default request
```

## 四、Vuex

### 4.1 vuex的概念

Vuex是一个用于Vue.js应用的状态管理模式+库。它作为一个应用中所有组件的中心化存储，有规则地保证状态只能以可预测的方式被改变¹。

Vuex有五个核心概念，分别是**state**, **getters**, **mutations**, **actions**和**modules**。简单地说，state是存储在Vuex中的数据，getters是从state中派生出的计算属性，mutations是唯一能够改变state的同步函数，actions是可以包含异步操作的函数，modules是将store分割成不同的模块⁴。

### 4.2 vuex的使用

首先，state是Vuex中存储的数据，它是响应式的，也就是说当state改变时，Vue组件会自动更新。要访问state中的数据，可以使用`this.$store.state`或者`mapState`辅助函数。

其次，getters是从state中派生出的计算属性，它们可以用来对state中的数据进行过滤、排序、格式化等操作。要访问getters中的数据，可以使用`this.$store.getters`或者`mapGetters`辅助函数。

然后，mutations是唯一能够改变state的同步函数，它们接收一个参数（通常叫做payload），并且必须以字符串形式指定类型（通常叫做type）。要触发mutations中的函数，可以使用`this.$store.commit(type, payload)`或者`mapMutations`辅助函数。

接下来，actions是可以包含异步操作的函数，它们也接收一个参数（通常叫做context），并且必须以字符串形式指定类型（通常叫做type）。要触发actions中的函数，可以使用`this.$store.dispatch(type, payload)`或者`mapActions`辅助函数。

最后，modules是将store分割成不同的模块，每个模块可以有自己的state, getters, mutations, actions和嵌套模块。这样可以让store更容易管理和扩展。要定义和注册模块，可以使用`modules: {}`选项和 `registerModule()`方法¹²。