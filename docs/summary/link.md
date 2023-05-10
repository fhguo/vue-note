# 前后端交互总结

## 一、node.js

### 1.1 commonjs规范

> CommonJS规范最初是为了解决Node.js的模块化问题而提出的，现在已经被广泛应用于其他JavaScript运行环境

- 在CommonJS规范中，一个模块被定义为一个文件，每个文件都是一个独立的模块，在该模块中定义的变量、函数、对象都是私有的。如果需要在其他模块中使用这些私有的变量、函数、对象，就需要使用模块导出和模块引入。

- 模块导出使用**module.exports或exports**语句将模块内的变量、函数、对象暴露给外部模块：

  ```js
  // 模块定义
  const add = (a, b) => {
    return a + b;
  }
  module.exports = add;
  ```

- 模块引入使用require语句将模块中导出的变量、函数、对象引入到当前模块中：

  ```js
  // 模块引入
  const add = require('./add');
  console.log(add(1, 2)); // 3
  ```

### 1.2 npm包

> npm是Node.js的包管理器，用于管理Node.js应用程序的依赖项和版本控制

```js
npm install/i 包名  (默认下载最新版本)
npm install/i 包名@版本号  (下载对应的版本)
npm install/i 包名1 包名2 (一次下载多个包)

npm i -s 包名   记录自动保存到package.json中
// 配置npm源
npm config set registry https://registry.npm.taobao.org
// 使用命令创建package.json文件
npm init [-y] ： 默认配置直接生成package.json文件。
				注意事项：文件夹不要有中文
```

## 二、服务端和客户端

### 2.1 URL地址

> URL（全称是Uniform Resource Locator）中文叫统一资源定位符，用于标识互联网上每个资源的唯一存放位置。浏览器只有通过URL地址，才能正确定位资源的存放位置，从而成功访问到对应的资源。

- URL组成

  <img :src="$withBase('/url.png')" />

- IP和域名的关系

  一个域名对应一个IP地址，同一个IP地址可以解析到不同的域名上

### 2.2 互联网传输协议

- HTTP协议

  ​	Http（HyperText Transfer Protocol）：是超文本（文本、图片、视频、音频、css、js....）传输协议，它是基于请求/响应模式、应用层[TCP/IP协议]、无状态[没有记忆功能]的协议。


- http与https的区别
  - 端口：http使用80端口，https使用443端口
  - 协议：http是超文本传输协议，信息是明文传输，安全性较差；https是安全的超文本传输协议，信息是经过SSL/TLS加密的，安全性较好
  - 证书：https需要向CA（数字证书认证机构）申请证书，一般需要一定费用；http不需要证书
  - 速度：http的页面响应速度比https快，因为https除了TCP的三次握手，还要进行SSL/TLS的握手，所以需要更多的数据包交换

- get和post的区别
  1. GET请求：用于从服务器获取资源，请求参数以查询字符串的形式出现在URL的后面，可以在浏览器地址栏直接看到，长度有限制，数据安全性较差。适合于请求数据较少，安全性要求不高的场景。
  2. POST请求：用于向服务器提交数据，请求参数在请求体中出现，不会暴露在URL中，请求数据量较大，数据安全性较高。适合于请求数据较多，安全性要求较高的场景。

- 三种常见的**Content-Type**的格式

  > 请求头中的Content-Type是为告诉服务器我们发送的请求信息是哪种格式的。

  - Content-Type：**application/json**

    ```js
    // 现在大部分的请求都会以JSON方式进行传输 信息主体是序列化的JSON字符串
    let params = { c: 'b', a: 'd' };
    params = JSON.stringify(params)
    ```

  - Content-Type：**x-www-form-urlencoded**

    ```js
    // 请求头的默认值 不指定content-type 默认使用该格式
    let params = { c: 'b', a: 'd' };
    // 这里可以使用qs.js库 qs.stringify可以把一个参数对象格式化为一个字符串
    qs.stringify(params) 
    // 结果是
    'c=b&a=d'
    ```

  - Content-Type：**form-data**

    ```js
    // form-data既可以上传文件,也可以上传键值对
    // 请求体参数来自于new FormData()生成的实例或 enctype为multipart/form-data的表单数据。
    let data = new FormData()
    data.append('file1', file1)
    data.append('file2', file2)
    this.axios({
    	url: url,
    	headers: {'Content-Type': 'multipart/form-data'},
    	data: data
    }).then(()=>{
      ...
    })
    ```

### 2.3 Ajax

- 什么是Ajax

  > Ajax = 异步的 JavaScript 和 XML

  <img :src="$withBase('/ajax-yl.png')" />


- jQuery中的Ajax

  - $.get()函数的语法如下：

    ```js
    // url:要请求的资源地址
    // data:携带的参数
    // callback:请求成功的回调函数
    $.get(url, [data], [callback])
    ```

### 2.4 form表单

​	HTML中的`<form>`标签，就是用于采集用户输入的信息，并通过`<form>`标签的提交操作，把采集到的信息提交到服务器端进行处理。

- form标签的属性

  > `<form>`标签用来采集数据，`<form>`标签的属性则是用来规定如何把采集到的数据发送到服务器。

  <img :src="$withBase('/form.png')" />

- enctype属性

  > enctype 属性用来规定在**发送表单数据之前如何对数据进行编码**。

  （1） application/x-www-form-urlencoded： 标准的编码格式。窗体数据被编码为键值对。 

  ​			默认值，在发送前对所有字符进行编码（将空格转换为 "+" 符号，特殊字符转换为 ASCII HEX 值）

    (2)   multipart/form-data：不对字符编码。当使用有文件上传控件的表单时，该值是必需的。

    (3)   text/plain： 将空格转换为 "+" 符号，但不编码特殊字符。

## 三、网络请求

### 3.1 XMLHttpRequest的基本使用

- 什么是XMLHttpRequest

  XMLHttpRequest是浏览器提供的JavaScript对象，通过它，可以请求服务器上的资源

- 使用xhr发送请求

  ```js
  // 1. 创建 XHR 对象
  var xhr = new XMLHttpRequest()
      // 2. 调用 open 函数，指定 请求方式 与 URL地址
      xhr.open('GET', 'http://www.liulongbin.top:3006/api/getbooks')
      // 3. 调用 send 函数，发起 Ajax 请求
      xhr.send()
      // 4. 监听 onreadystatechange 事件
      xhr.onreadystatechange = function() {
      // 4.1 监听 xhr 对象的请求状态 readyState ；与服务器响应的状态 status
      if (xhr.readyState === 4 && xhr.status === 200) {	
          // 4.2 打印服务器响应回来的数据
          console.log(xhr.responseText)
      }
  }
  ```

### 3.2 URL编码和解码

> URL 地址中，只允许出现英文相关的字母、标点符号、数字，不允许出现中文字符。

**URL编码的原则**：使用安全的字符（没有特殊用途或者特殊意义的可打印字符）去表示那些不安全的字符。

```js
http://www.liulongbin.top:3006/api/getbooks?id=1&bookname=西游记
// 经过 URL 编码之后，URL地址变成了如下格式：
http://www.liulongbin.top:3006/api/getbooks?id=1&bookname=%E8%A5%BF%E6%B8%B8%E8%AE%B0
```

- 编码 encodeURI()

  ```js
  // 编码
  encodeURL('黑马程序员')
  // 输出字符串 %E9%BB%91%E9%A9%AC%E7%A8%8B%E5%BA%8F%E5%91%98
  ```

- 解码 decodeURI()

  ```js
  // 解码
  decodeURL('%E9%BB%91%E9%A9%AC')
  // 输出字符串 黑马
  ```

### 3.3 网络请求的区别

> 网络请求是指浏览器向服务器发送数据或者获取数据的行为，从原生的XMLRequest到Ajax再到axios，网络请求方式有所不同

- **原生的XMLReques**t是最早出现的网络请求技术，隶属于原生js技术，核心使用XMLHttpRequest对象。他可以实现异步通信，但是多个请求之间如果有先后顺序的话就会出现回调地狱。
- **Ajax**是一种无需重新加载整个网页的情况下，能够更新部分网页的技术，他可以使用XMLHttpRequest对象实现。它可以提高用户体验和网页性能，但是也有一些缺点，如不支持浏览器历史记录、不容易进行SEO优化等。
- **axios**是一个基于Promise的HTTP请求库，可以用在浏览器中和node.js中。它可以自动转换JSON数据、拦截请求和响应、取消请求、防止CSRF攻击。它比原生的XMLRequest和ajax更简洁和强大。

### 3.4 js如何处理异步

>  js 如何处理异步的问题有以下几种常见的方法:

- 回调函数：在异步操作完成后，执行一个预先定义好的函数，通常作为参数传递给异步操作。回调函数可以处理成功或失败的结果，但是可能导致回调地狱（callback hell）的问题，即嵌套过多的回调函数导致代码难以阅读和维护。
- Promise 对象：Promise 是一种表示异步操作结果的对象，它有三种状态：pending（进行中），fulfilled（已成功），rejected（已失败）。Promise 对象可以使用 then 或 catch 方法添加成功或失败的回调函数，并且可以链式调用。Promise 对象可以避免回调地狱的问题，让代码更清晰和可靠。
- async/await 语法：async/await 是一种基于 Promise 的语法糖，它可以让异步代码看起来像同步代码一样。async 关键字用于声明一个异步函数，await 关键字用于等待一个 Promise 对象的结果。async/await 语法可以让代码更简洁和易读，并且可以使用 try/catch 语句来捕获错误。

例如：
```javascript
// 使用回调函数处理异步
function doSomethingAsync(callback) {
  setTimeout(function() {
    // 模拟一个异步操作
    let result = Math.random(); // 生成一个随机数
    if (result > 0.5) {
      callback(null, result); // 调用成功的回调函数
    } else {
      callback(new Error("Something went wrong")); // 调用失败的回调函数
    }
  }, 1000);
}

doSomethingAsync(function(error, result) {
  if (error) {
    console.error(error); // 处理错误
  } else {
    console.log(result); // 处理结果
  }
});

// 使用Promise对象处理异步
function doSomethingAsync() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      // 模拟一个异步操作
      let result = Math.random(); // 生成一个随机数
      if (result > 0.5) {
        resolve(result); // 调用resolve函数并传递成功的结果
      } else {
        reject(new Error("Something went wrong")); // 调用reject函数并传递失败的原因
      }
    }, 1000);
  });
}

doSomethingAsync()
.then(function(result) {
   console.log(result); // 处理成功的结果 
})
.catch(function(error) { 
   console.error(error); // 处理失败的错误 
});

// 使用async/await语法处理异步
async function doSomethingAsync() {
   try { 
     let result = await new Promise(function(resolve, reject) { 
       setTimeout(function() { 
         // 模拟一个异步操作 
         let result = Math.random(); // 生成一个随机数 
         if (result > 0.5) { 
           resolve(result); // 调用resolve函数并传递成功的结果 
         } else { 
           reject(new Error("Something went wrong")); // 调用reject函数并传递失败的原因 
         } 
       },1000); });  
     console.log(result); // 处理成功的结果  
   } catch (error) {  
     console.error(error); // 处理失败的错误  
   }
}

doSomethingAsync();
```

### 3.5 什么是跨域?如何解决跨域

> 跨域是指一个域下的文档或脚本试图请求另一个域下的资源，这种情况下，浏览器为了安全会阻止这种请求。

​	跨域的解决方法有以下几种:

- JSONP：利用 script 标签不受同源策略的限制，通过动态创建 script 标签，将请求地址作为 src 属性，然后在服务器端返回一个回调函数的执行代码，实现跨域数据传输。缺点是只能发送 GET 请求，并且容易受到 XSS 攻击。
- CORS：跨域资源共享，是一种基于 HTTP 头的机制，它允许服务器端声明哪些源可以访问哪些资源，并且允许浏览器向服务器发送额外的信息。CORS 可以支持所有类型的请求，并且可以携带 cookie 等凭证信息。缺点是需要浏览器和服务器端都支持 CORS，并且可能存在预检请求（preflight request）的开销。
- 代理服务器：利用同源的中间服务器来转发请求和响应，实现跨域通信。代理服务器可以是后端服务器（如 nginx），也可以是前端服务器（如 node.js）。优点是可以完全控制请求和响应的内容和格式，缺点是需要额外维护代理服务器，并且可能影响性能和安全性。

例如：

Vue中配置代理服务器的方法。首先，你需要在项目根目录下创建或修改vue.config.js文件，然后在文件中添加proxy属性，如下所示：

```js
module.exports = {
  // ...
  devServer: {
    proxy: {
      // 配置跨域
      '/api': {
        target: 'http://localhost:5000/api/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '' // 请求的时候使用这个api就可以
        }
      }
    }
  }
}
```

这样，当你在前端应用中发送/api开头的请求时，就会被代理到target指定的地址上，从而解决跨域问题

## 四、其它

### 4.1 ES6模块化

es6模块化是一种在JavaScript中实现模块化的标准，它可以让你在编译时就能确定模块的依赖关系，以及输入和输出的变量。es6模块化主要有两个部分：导出（export）和导入（import）。导出是指将一个模块中定义的变量、函数、类等暴露给外部使用，导入是指从其他模块中引入需要的变量、函数、类等。你可以使用不同的方式来导出和导入各种类型的数据，例如：

```js
// 导出一个字符串
export const name = 'Alice';

// 导出一个函数
export function sayHello() {
  console.log('Hello');
}

// 导出一个类
export class Person {
  constructor(name) {
    this.name = name;
  }
}

// 导入上面定义的所有数据
import { name, sayHello, Person } from './module.js';

// 使用导入的数据
console.log(name); // Alice
sayHello(); // Hello
let p = new Person('Bob');
console.log(p.name); // Bob
```

### 4.2 webSocket

>  WebSocket是一种网络传输协议，可以在单个TCP连接上进行全双工通信。它可以让浏览器和服务器之间实现双向交互，而不需要轮询。

### 4.3 webpack

>  webpack是一个模块打包器。它的主要目的是将JavaScript文件打包在一起，以便在浏览器中使用，但它也能够转换、打包或包裹几乎任何资源或资产¹²。

webpack可以帮助你打包和优化你的JavaScript应用程序。要使用webpack，你需要先在本地安装webpack和webpack-cli¹²，然后创建一个配置文件，指定入口和出口文件²³，最后在控制台运行webpack命令，生成bundle.js⁴。

















