# JS高级

## 一、对象和类

### 1.1 创建对象

```js
//字面量创建对象
var ldh = {
    name: '刘德华',
    age: 18
}
console.log(ldh);

//构造函数创建对象
  function Star(name, age) {
    this.name = name;
    this.age = age;
 }
var ldh = new Star('刘德华', 18)//实例化对象
console.log(ldh);	
```

### 1.2  创建类

```js
 // 1. 创建类 class  创建一个 明星类
 class Star {
   // 类的共有属性放到 constructor 里面
   constructor(name, age) {
       this.name = name;
       this.age = age;
   }
   sing(song) {
      console.log(this.uname + '唱' + song);
   }
 }
   // 2. 利用类创建对象 new
   var ldh = new Star('刘德华', 18);
   console.log(ldh);
   console.log(ldh); // Star {uname: "刘德华", age: 18}
   ldh.sing('冰雨'); // 刘德华唱冰雨
```

### 1.3 类和对象的区别

​	类和对象是 JavaScript 中的两个不同概念。类定义了对象的蓝图，而对象是类的实例。类定义属性和方法，而对象可以随时添加或删除属性和方法。

## 二、构造函数和原型

### 2.1 构造函数原型prototype

> 构造函数通过原型分配的函数是所有对象所共享的。

​	JavaScript 规定，每一个构造函数都有一个prototype 属性，指向另一个对象。注意这个prototype就是一个对象，这个对象的所有属性和方法，都会被构造函数所拥有。

​	我们可以把那些不变的方法，直接定义在 prototype 对象上，这样所有对象的实例就可以共享这些方法。

```js
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
}
Star.prototype.sing = function() {
	console.log('我会唱歌');
}
var ldh = new Star('刘德华', 18);
var zxy = new Star('张学友', 19);
ldh.sing();//我会唱歌
zxy.sing();//我会唱歌
```

### 2.2 对象原型

```js
每个对象都会有一个属性 __proto__ 指向构造函数的 prototype 原型对象，之所以我们对象可以使用构造函数 prototype 原型对象的属性和方法，就是因为对象有 __proto__ 原型的存在。
__proto__对象原型和原型对象 prototype 是等价的
```

### 2.3 原型链

​	每一个实例对象都有一个**proto**属性，指向构造函数的原型对象，构造函数的原型对象也是一个对象，也有**proto**属性，这样一层一层往上找就形成了原型链。

<img :src="$withBase('/prototype-chain.png')">

### 2.4 原型链的查找机制

​	当访问一个对象的属性或者方法时，首先查找这个对象本身有没有该属性。如果没有就查找它的原型，以此类推直到找到Object为止（null）

## 三、ES5新增方法

- 数组方法foreach遍历数组

  ```js
   arr.forEach(function(value, index, array) {
         //参数一是:数组元素
         //参数二是:数组元素的索引
         //参数三是:当前的数组
   })
    //相当于数组遍历的 for循环 没有返回值
  ```

- 数组方法filter过滤数组

  ```js
    var arr = [12, 66, 4, 88, 3, 7];
    var newArr = arr.filter(function(value, index,array) {
       return value >= 20;
    });
    console.log(newArr);//[66,88] //返回值是一个新数组
  ```
  
- 数组方法some

  ```js
   // some 查找数组中是否有满足条件的元素 
   var arr = [10, 30, 4];
   var flag = arr.some(function(value,index,array) {
       return value < 3;
    });
  console.log(flag);//false返回值是布尔值,只要查找到满足条件的一个元素就立马终止循环
  ```
  
- trim()：去除字符串首尾空格

- Object.keys()：获取对象的属性名

- JSON.parse()和JSON.stringify()：js对象和JSON字符串的互相转化

- Object.defineProperty(对象,修改的属性名,{操作}) ：将一个属性添加到对象，或者修改现有属性的值。

## 四、函数的定义和使用

### 4.1 函数的定义

```js
/* 1. 普通函数 */
function fn() {
	console.log('人生的巅峰');
}
 fn(); 
/* 2. 对象的方法 */
var o = {
  sayHi: function() {
  	console.log('人生的巅峰');
  }
}
o.sayHi();
/* 3. 构造函数*/
function Star() {};
new Star();
/* 4. 绑定事件函数*/
 btn.onclick = function() {};   // 点击了按钮就可以调用这个函数
/* 5. 定时器函数*/
setInterval(function() {}, 1000);  // 这个函数是定时器自动1秒钟调用一次
/* 6. 立即执行函数(自调用函数)*/
(function() {
	console.log('人生的巅峰');
})();
```

### 4.2 this的指向

>  this 的指向，是当我们调用函数的时候确定的，一般指向调用者

<img :src="$withBase('/this.png')">

### 4.3 改变this指向

- call方法

- apply方法

- bind方法

  **共同点：**都可以改变this指向

  **不同点：**

  - call 和 apply  会调用函数， 并且改变函数内部this指向
  - call 和 apply传递的参数不一样，call传递参数使用逗号隔开，apply使用数组传递
  - bind  不会调用函数，可以改变函数内部this指向

### 4.4 闭包

> 闭包指有权访问另一个函数内部变量的函数

<img :src="$withBase('/closure.png')">

- 特点：闭包使用的变量会一直存储到内存中，类似全局变量
- 优点：延伸变量的使用范围
- 缺点：可能造成内存泄漏，不用的时候释放

### 4.5 递归

> 如果一个函数在内部可以调用自己，那么这个函数就是递归函数

- 利用递归求1~n的阶乘

  ```js
  //利用递归函数求1~n的阶乘 1 * 2 * 3 * 4 * ..n
   function fn(n) {
       if (n == 1) { //结束条件
         return 1;
       }
       return n * fn(n - 1);
   }
   console.log(fn(3));
  ```

## 五、正则表达式

> 正则表达式（ Regular Expression ）是用于匹配字符串中字符组合的模式

### 5.1 正则表达式的创建

- 使用字面量创建

  ```js
  var reg = /123/;
  ```

- 调用RegExp对象的构造函数创建

  ```js
  var reg = new RegExp(/123/)
  console.log(reg)
  ```

### 5.2 测试正则表达式

- test()方法：用于检测字符串是否符合规则，返回值为布尔值

  ```js
  var rg = /123/;
  console.log(rg.test(123));//匹配字符中是否出现123  出现结果为true
  console.log(rg.test('abc'));//匹配字符中是否出现123 未出现结果为false
  ```

### 5.3 常用的正则表达式

- 匹配手机号码

  ```js
  /^1[3456789]\d{9}$/
  ```

- 匹配邮箱

  ```js
  /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  ```

- 匹配中文

  ```js
  /[\u4e00-\u9fa5]+/
  ```

### 5.4  正则替换replace()

- replace()方法可以实现替换字符串的操作，用于替换的参数可以是一个字符串或者正则表达式

  ```js
  var str = 'andy和red';
  var newStr = str.replace('andy', 'baby');
  console.log(newStr)//baby和red
  //等同于 此处的andy可以写在正则表达式内
  var newStr2 = str.replace(/andy/, 'baby');
  console.log(newStr2)//baby和red
  ```

## 六、ES6

> ES6（也称为ES2015）是JavaScript语言的一个重要更新，相比于ES5（发布于2009年），引入了许多新的语法和功能。

### 6.1 声明变量let

 与var的区别：

- 不允许重名

- 块级作用域

- 不存在变量提升(预解析)
- 存在暂时性死区

### 6.2  声明常量const

特点：

- 常量名大写
- 在声明时必须有值
- 常量不能修改（内存地址不变）

### 6.3 解构赋值

> ES6中允许从数组、对象中提取值，按照对应位置，对变量赋值

- 数组解构

  ```js
   let [a, b, c] = [1, 2, 3];
   console.log(a)//1
  //如果解构不成功，变量的值为undefined
  ```

- 对象解构

  ```js
  let person = { name: 'zhangsan', age: 20 }; 
  let { name, age } = person;
  console.log(name); // 'zhangsan' 
  ```

### 6.4 箭头函数

>  ES6中新增的定义函数的方式

```js
() => {} //()：代表是函数； =>：必须要的符号，指向哪一个代码块；{}：函数体
const fn = () => {}//代表把一个函数赋值给fn
```

- 函数体中只有一句代码，可以省略大括号
- 如果形参只有一个，可以省略小括号
- 箭头函数中的this，指向的是函数定义位置的上下文this

### 6.5 剩余参数

> **...** 可以很方便的去声明不知道参数情况下的一个函数

```js
function sum (first, ...args) {
 console.log(first); // 10
 console.log(args); // [20, 30] 
}
sum(10, 20, 30)
```

## 七、Es6内置对象扩展

### 7.1 Array的扩展方法

- 扩展运算符

  > 扩展运算符可以将数组或者对象转为逗号分割的参数序列

  ```js
   let ary = [1, 2, 3];
   ...ary  // 1, 2, 3
   console.log(...ary);    // 1 2 3
  ```

- Array.from()

  > 将伪数组或者可遍历对象转换为真正的数组

  ```js
  //定义一个集合
  let arrayLike = {
      '0': 'a',
      '1': 'b',
      '2': 'c',
      length: 3
  }; 
  //转成数组
  let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
  ```

- find()方法

  ​	用于找出数组中第一个符合条件的元素，如果没有找到就返回undefined

- findIndex()方法

  ​	用于找出数组中第一个符合条件的元素的位置，如果没有找到就返回-1

- includes()方法

  ​	判断某个数组是否包含给定的值，返回布尔值

  ```js
  [1, 2, 3].includes(2) // true 
  [1, 2, 3].includes(4) // false
  ```

### 7.2 String的扩展方法

- 模板字符串

  > ES6新增的创建字符串的方式，使用反引号定义

  ```js
  let name = '张三'; 
  let sayHello = `hello,my name is ${name}`; // hello, my name is zhangsan
  ```

- startsWith()和endsWith()
  - arr.startsWith(参数字符串)：表示参数字符串是否在原字符串的头部，返回布尔值
  - arr.endsWith()：表示参数字符串是否在原字符串的尾部，返回布尔值

- repeat()方法

  ​	repeat方法表示将原字符串重复n次，返回一个新字符串

### 7.3 set数据结构

> ES6新增的数据结构，它类似数组，成员值唯一

Set本身是一个构造函数，用来生成  Set  数据结构

```javascript
const s = new Set();
```

Set函数可以接受一个数组作为参数，用来初始化。

```javascript
const set = new Set([1, 2, 3, 4, 4]);//{1, 2, 3, 4}
```



























