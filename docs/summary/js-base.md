# JS基础

### 1、计算机语言

- 计算机语言指用于人与计算机之间通讯的语言，它是人与计算机之间传递信息的媒介。
- 计算机语言的种类非常的多，总的来说可以分成机器语言，汇编语言和高级语言三大类。
- 实际上计算机最终所执行的都是 机器语言，它是由“0”和“1”组成的二进制数，二进制是计算机语言的基础。

### 2、JS的组成

  <img :src="$withBase('/js.png')">

- ECMAScript

​		ECMAScript 是由ECMA 国际（ 原欧洲计算机制造商协会）进行标准化的一门编程语言，这种语言在万维网上应用广泛，它往往被称为 JavaScript或 JScript，但实际上后两者是 ECMAScript 语言的实现和扩展。

​		ECMAScript：规定了JS的编程语法和基础核心知识，是所有浏览器厂商共同遵守的一套JS语法工业标准。

更多参看MDN: [MDN手册](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/JavaScript_technologies_overview)

- DOM文档对象模型

​		**文档对象模型**（DocumentObject Model，简称DOM），是W3C组织推荐的处理可扩展标记语言的标准编程接口。通过 DOM 提供的接口可以对页面上的各种元素进行操作（大小、位置、颜色等）

- BOM浏览器对象模型

​		**浏览器对象模型**(Browser Object Model，简称BOM) 是指浏览器对象模型，它提供了独立于内容的、可以与浏览器窗口进行互动的对象结构。通过BOM可以操作浏览器窗口，比如弹出框、控制浏览器跳转、获取分辨率等。

### 3、JS数据类型

​	JS 把数据类型分为两类：

- 简单数据类型 （Number,String,Boolean,Undefined,Null）

  <img :src="$withBase('/data-type.png')">

- 复杂数据类型 （object)	

### 4、获取变量数据类型

​		**typeof** 可用来获取检测变量的数据类型

```js
var num = 18;
console.log(typeof num) // 结果 number      
```

​		不同类型的返回值：

<img :src="$withBase('/detection-type.png')">

检测是否为数组:

- instanceof 运算符

  - instanceof 可以判断一个对象是否是某个构造函数的实例

    ```js
    var arr = [1, 23];
    var obj = {};
    console.log(arr instanceof Array); // true
    console.log(obj instanceof Array); // false
    ```

- Array.isArray()

  - Array.isArray()用于判断一个对象是否为数组，isArray() 是 HTML5 中提供的方法

    ```js
    var arr = [1, 23];
    var obj = {};
    console.log(Array.isArray(arr));   // true
    console.log(Array.isArray(obj));   // false
    ```

### 5、数据类型转化

- 转换为字符串

  <img :src="$withBase('/convert-string.png')">

  - toString() 和 String()  使用方式不一样。
  - 三种转换方式，更多第三种加号拼接字符串转换方式， 这一种方式也称之为隐式转换。

- 转换为数字型（重点）

  <img :src="$withBase('/convert-num.png')">

  - 注意 parseInt 和 parseFloat 单词的大小写，这2个是重点
  - 隐式转换是我们在进行算数运算的时候，JS 自动转换了数据类型

- 转换为布尔型

  <img :src="$withBase('/convert-bool.png')">

  - 代表空、否定的值会被转换为 false  ，如 ''、0、NaN、null、undefined  

  - 其余值都会被转换为 true

    ```js
    console.log(Boolean('')); // false
    console.log(Boolean(0)); // false
    console.log(Boolean(NaN)); // false
    console.log(Boolean(null)); // false
    console.log(Boolean(undefined)); // false
    console.log(Boolean('小白')); // true
    console.log(Boolean(12)); // true
    ```

### 6、运算符的分类

> 运算符（operator）也被称为操作符，是用于实现赋值、比较和执行算数运算等功能的符号。

JavaScript中常用的运算符有：

-  算数运算符
-  递增和递减运算符
-  比较运算符
-  逻辑运算符
-  赋值运算符

### 7、switch 语句和 if else if 语句的区别

- 一般情况下，它们两个语句可以相互替换
- switch...case 语句通常处理 case为比较确定值的情况， 而 if…else…语句更加灵活，常用于范围判断(大于、等于某个范围)
- switch 语句进行条件判断后直接执行到程序的条件语句，效率更高。而if…else 语句有几种条件，就得判断多少次。
- 当分支比较少时，if… else语句的执行效率比 switch语句高。
- 当分支比较多时，switch语句的执行效率比较高，而且结构更清晰。 

### 8、continue、break和return

- continue是跳出本次循环，继续下一次循环
- break是跳出整个循环，循环结束
- return不仅可以退出循环，还能够返回 return 语句中的值，同时还可以结束当前的函数体内的代码

### 9、构造函数的用法

- 构造函数：是一种特殊的函数，主要用来初始化对象，即为对象成员变量赋初始值，它总与 new 运算符一起使用。我们可以把对象中一些公共的属性和方法抽取出来，然后封装到这个函数里面。

- 构造函数的封装格式：

  ```js
  function 构造函数名(形参1,形参2,形参3) {
       this.属性名1 = 参数1;
       this.属性名2 = 参数2;
       this.属性名3 = 参数3;
       this.方法名 = 函数体;
  }
  ```

- 构造函数的调用格式

  ```
  var obj = new 构造函数名(实参1，实参2，实参3)
  ```

  以上代码中，obj即接收到构造函数创建出来的对象。

- 注意事项

  1.   构造函数约定**首字母大写**。
  2.   函数内的属性和方法前面需要添加 **this** ，表示当前对象的属性和方法。
  3.   构造函数中**不需要 return 返回结果**。
  4.   当我们创建对象的时候，**必须用 new 来调用构造函数**。

- 其他

  构造函数，如 Stars()，抽象了对象的公共部分，封装到了函数里面，它泛指某一大类（class）  
  创建对象，如 new Stars()，特指某一个，通过 new 关键字创建对象的过程我们也称为对象实例化

- new关键字的作用

  1. 在构造函数代码开始执行之前，创建一个空对象；
  2. 修改this的指向，把this指向创建出来的空对象；
  3. 执行函数的代码
  4. 在函数完成之后，返回this---即创建出来的对象

### 10、数组的常用方法

1. push,pop：在数组的末尾添加或删除数组元素
2. unshift，shift：在数组的头部添加或删除数组元素
3. splice(start,deleteCount,items)：删除数组中一串连续元素，返回被删除元素组成的数组
4. join()：将数组按特定的标识组合成字符串
5. slice()：截取
6. reverse()：倒序
7. concat()：将多个数组或元素组成一个新的数组返回
8. sort()：数组排序方法

### 11、字符串的常用方法

1. charAt(下标)：获取对应下标的字符
2. charCodeAt(下标)：获取对应下标字符的编码
3. indexOf(search,start)：查找一个字符串在另一个字符串中首次出现的位置
4. lastIndexOf(search,start)：查找一个字符串在另一个字符串中最后一次出现的位置
5. substring(start,end) : 截取字符串，包括开始不包括结束，自动调整下标位置，负数默认为0
6. slice(start,end) : 截取字符串，不自动调整下标位置，负数默认为倒数   [slaɪs]
7. substr(start,length)：从start开始，截取几个
8. toUpperCase()，toLowerCase():大小写转换，不区分大小写比较
9. split(分割标识)：按分割标识将字符串分割成数组，字符串转json
10. replace(被换掉的，替换的)：替换
11. trim()：去除字符串首尾空格

### 12、简单数据类型和复杂数据类型

- 简单类型（基本数据类型、值类型）：在存储时变量中存储的是值本身，包括string ，number，boolean，undefined，null
- 复杂数据类型（引用类型）：在存储时变量中存储的仅仅是地址（引用），通过 new 关键字创建的对象（系统对象、自定义对象），如 Object、Array、Date等；
