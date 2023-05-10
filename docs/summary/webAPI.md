# webAPI总结

## 一、DOM

### 1、DOM获取元素

- 根据ID获取

  ```js
  语法：document.getElementById(id)
  作用：根据ID获取元素对象
  参数：id值，区分大小写的字符串
  返回值：元素对象 或 null
  ```

- 根据标签名获取

  ```js
  语法：document.getElementsByTagName('标签名') 或者 element.getElementsByTagName('标签名') 
  作用：根据标签名获取元素对象
  参数：标签名
  返回值：元素对象集合（伪数组，数组元素是元素对象）
  ```

- 根据指定选择器获取

  <img :src="$withBase('/dom1.png')">

- 获取特殊元素

  <img :src="$withBase('/dom2.png')">

### 2、操作元素

<img :src="$withBase('/operating-element.png')">

### 3、节点

> ​	网页中的所有内容都是节点（标签、属性、文本、注释等），在DOM 中，节点使用 node 来表示。

- 获取父节点

  <img :src="$withBase('/parent-node.png')">

- 获取子节点

<img :src="$withBase('/child-node1.png')">

<img :src="$withBase('/child-node2.png')">

- 第一个子节点

  ```js
  parentNode.firstChild
  parentNode.firstElementChild // 第一个子元素节点
  ```

- 最后一个子节点

  ```js
  parentNode.lastChild
  parentNode.lastElementChild // 最后一个子元素节点
  ```

- 获取兄弟节点

  ```js
  // 上一个兄弟节点
  node.previousElementSibling || node.previousSibling
  // 下一个兄弟节点
  node.nextElementSibling || node.nextSibling
  ```

- 创建节点

  <img :src="$withBase('/create-note.png')">

- 添加节点

  <img :src="$withBase('/add-note.png')">

- 删除子节点

  ```js
  node.removeChild
  ```

### 4、DOM表单操作

- 快速获取表单元素

  ```js
  //快速获取表单元素  form.标签name.属性
  console.log(oForm.user);
  ```

### 5、表单事件

- oForm.onsubmit：提交表单的时候触发
- oForm.onrest：重置表单的时候触发
- 表单元素事件
  - input.onblur：失去焦点时触发
  - input.onfocus：获取焦点时触发

## 二、BOM

### 1、window提供的方法

- 系统对话框
  - alert(message) : 警告框
  - confirm("message") : 带确认的对话框
  - prompt(message,default) : 带输入的对话框
- open和close(写在行间，需要添加window)
  - open(url,target[_self,_blank]）：打开一个新窗口
  - close（）：关闭当前窗口
- location
  - location.href：获取或设置当前窗口显示的URL
  - location.search：获取URL中搜索内容
- history
  - history.forward()：前进
  - history.back()：后退
  - history.go()：跳转

### 2、BOM三大系列

> 获取元素的宽高

- **client：可视区**

  - clientWidth：获取元素的可视宽  content+padding
  - clientHeight：获取元素的可视高
  - clientTop/Left：获取元素的上/左边框

- **offset：占位**

  - 元素.offsetWidth : 获取元素的占位宽  content+padding+border

  - 元素.offsetHeight : 获取元素的占位高  content+padding+border

  - 元素.offsetTop:获取当前元素的顶部到定位父元素的距离，如果没有定位父元素到body的距离

  - 元素.offsetLeft:获取当前元素的左部到定位父元素的距离，如果没有定位父元素到body的距离

- **scroll：滚动**

  - 元素.scrollWidth：获取元素的整体宽度，包括由于溢出而无法展示在网页的不可见部分

  - 元素.scrollHeight：获取元素的整体高度，包括由于溢出而无法展示在网页的不可见部分

  - 元素.scrollTop：元素被卷去的高

  - 元素.scrollLeft：元素被卷去的宽

  - 页面被卷去的高

    ```js
    document.documentElement.scrollTop||document.body.scrollTop
    ```

### 3、事件

- window.onload()：页面加载事件，等文档和资源都加载完成后调用
- window.onscroll()：页面滚动事件 ，滚动条滚动的时候触发
- window.onresize()：窗口大小发生变化时触发

## 三、事件

### 1、事件对象

- 概念：

  ​	window.event，内置的对象，事件发生的时候会将所有和事件相关的信息都存储在事件对象中，鼠标位置，事件类型，事件目标。。。

- 属性

  - type：事件类型
  - target：事件目标
  - clientX，clientY：鼠标位置，相对于窗口可视区

### 2、事件绑定和取消

> 事件绑定：可以给同一个标签添加相同事件不会覆盖，会叠加执行

- 语法

  ```js
  标准：标签.addEventListener(事件类型，事件处理函数，是否捕获)  事件类型不加on，是否捕获默认是false
  IE：标签.attachEvent(事件类型，事件处理函数) 事件类型加on
  ```

- 兼容

  > 两个方法的兼容用判断

  ```js
  // 方法的兼容：判断，拿其中任意一个方法作为判断条件，有就用，没有就用另一个 xx.xx
  if(oDiv.attachEvent){
      oDiv.attachEvent("onclick",fun1);
  }else{
      oDiv.addEventListener("click",fun1);
  }
  ```

> 事件取消：不同的添加方式需要有不同的取消方式

| 事件添加                                      | 事件取消                                        |
| --------------------------------------------- | ----------------------------------------------- |
| 标签.事件                                     | 标签.事件 = null                                |
| 标签.addEventListener(事件类型,事件处理函数)  | 标签.removeEventListener(事件类型,事件处理函数) |
| 标签.attachEvent(事件类型(加on),事件处理函数) | 标签.detachEvent(事件类型(加on),事件处理函数)   |

### 3、DOM事件流

> DOM事件流：事件发生时的传递过程

- **事件捕获机制**：当事件发生的时候，事件会从window-document-body-子元素依次传递，一直到事件目标
- **事件冒泡机制**：当事件发生的时候，依次将事件传递给父元素，一直到window，如果父元素也有对应的事件，也会触发

### 4、阻止事件冒泡

> 有时候事件冒泡会影响到代码的正常效果，这个时候就需要阻止事件冒泡

- 标准浏览器：event.stopPropagation()

- IE浏览器：event.cancelBubble = true;

  ```js
  oDiv.onclick = function(ev){
      var ev = window.event || ev;
      //ev.stopPropagation();  标准浏览器
      //ev.cancelBubble = true;  iE浏览器
  
      // 兼容
      ev.stopPropagation ? ev.stopPropagation(): ev.cancelBubble = true;
      console.log("我是div的事件");
  }
  ```

### 5、阻止事件默认行为

> 默认行为：浏览器赋予某个标签，某个操作的默认的功能

| 添加事件的方式        | 阻止默认行为的方式        |
| --------------------- | ------------------------- |
| 标签.事件             | return false              |
| 标签.addEventListener | event.preventDefault()    |
| 标签.attachEvent      | event.returnValue = false |

### 6、事件代理（事件委托）

> 事件代理：把事件添加给父元素(通过事件冒泡)，然后找到具体子元素事件，由子元素去处理事件

- 优点：提高性能，事件可以发生在未来

  ~~~js
  var oUl = document.getElementsByTagName("ul")[0];
  //1.将事件添加给父元素
  oUl.onclick = function(ev){
      var ev = window.event || ev;
      
      //2.获取事件目标
      var target = ev.target || ev.srcElement;
      
      //3.找到具体的子元素
      if(target.nodeName == "LI"){
          //4.处理事件
          ...
      }
  }
  ~~~

### 7、键盘事件和滚轮事件

- 键盘事件
  - onkeydown：按键按下
  - onkeyup : 按键抬起
  - onkeypress：按键按下（不识别功能键Ctrl、shift等）
- 滚轮事件
  - onmousewheel()：滚动时触发

## 四、其它

### 1、定时器

- setTimeout()：延迟定时器

  ```js
  setTimeout(调用函数,[延迟的毫秒数])
  ```

- setInterval()：间隔定时器

  ```js
  setInterval(调用函数,[间隔的毫秒数])
  ```

### 2、this的指向

> 一般情况下this的最终指向的是那个调用它的对象。

- 在全局作用域或者普通函数中this指向window
- 在方法中，谁调用this指向谁
- 在构造函数中this指向构造函数的实例

### 3、JS执行机制

- JS是单线程

- 同步和异步

  ```js
  JS中所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。
  
  同步任务指的是：
  	在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；
  异步任务指的是：
  	不进入主线程、而进入”任务队列”的任务，当主线程中的任务运行完了，才会从”任务队列”取出异步任务放入主线程执行。
  ```

- JS执行机制(事件循环)

  <img :src="$withBase('/JS-mechanism.png')">
  
  

### 4、本地存储

- 特点

  1、数据存储在用户浏览器中

  2、设置、读取方便、甚至页面刷新不丢失数据

  3、容量较大，sessionStorage约5M、localStorage约20M

  4、只能存储字符串，可以将对象JSON.stringify() 编码后存储

- sessionStorage

  - 生命周期为关闭浏览器窗口 

    ```js
    sessionStorage.setItem(key, value)
    sessionStorage.getItem(key)
    ```

- localStorage

  - 声明周期永久生效，除非手动删除 否则关闭页面也会存在

    ```js
    localStorage.setItem(key, value)
    localStorage.getItem(key)
    ```

    





























