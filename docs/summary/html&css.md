# HTML&CSS总结

## 一、HTML

### 1、什么是HTML

​	指的是超文本标记语言(Hyper Text Markup Language) ,它是用来描述网页的一种语言.

### 2、HTML的语义化

​	语义化是指用合理的HTML标记以及其特有的属性去格式化文档内容。（例如标题用 h1-h6、段落用 p

标签，合理得给图片添加alt属性等）

### 3、常用的浏览器及内核

<img :src="$withBase('/kernel.png')">

## 二、CSS

### 1、css的显示模式

> 元素显示模式就是元素（标签）以什么方式进行显示，比如`<div>`自己占一行，比如一行可以放多个`<span>`。

- 常见的块级元素

  ```css
  <h1>~<h6>、<p>、<div>、<ul>、<ol>、<li>
  ```

- 常见的行内元素

  ```css
  <a>、<span>、<strong>、<b>、<em>、<i>、<del>、<s>、<ins>、<u>
  ```

- 常见的行内块元素

  ```css
  <img />、<input />、<td>
  ```

<img :src="$withBase('/display-mode.png')">

### 2、边框圆角

在 CSS3 中，新增了圆角边框样式，这样我们的盒子就可以变圆角了。

border-radius 属性用于设置元素的外边框圆角。

```css
 border-radius:length;    
```

- 参数值可以为数值或百分比的形式
- 如果是正方形，想要设置为一个圆，把数值修改为高度或者宽度的一半即可，或者直接写为 50%
- 该属性是一个简写属性，可以跟四个值，分别代表左上角、右上角、右下角、左下角

### 3、盒子阴影

CSS3 中新增了盒子阴影，我们可以使用 box-shadow 属性为盒子添加阴影。
语法：

```css
 box-shadow: h-shadow v-shadow blur spread color inset; 
```

<img :src="$withBase('/shadow.png')">

### 4、浮动

- 什么是浮动

  float 属性用于创建浮动框，将其移动到一边，直到左边缘或右边缘触及包含块或另一个浮动框的边缘。

语法：

```css
 选择器 { float: 属性值; }
```

<img :src="$withBase('/float1.png')">

- 清除浮动

  语法：

  ```css
   选择器{clear:属性值;} 
  ```

 <img :src="$withBase('/float2.png')">

  我们实际工作中， 几乎只用 clear: both;

  清除浮动的策略是:  闭合浮动. 

- 清除浮动的多种方法

  - 给父级添加 overflow 属性，将其属性值设置为 hidden、 auto 或 scroll 。

    例如：

    ```css
    overflow:hidden | auto | scroll;
    ```

    优点：代码简洁

    缺点：无法显示溢出的部分

  - :after 方式是额外标签法的升级版。给父元素添加：

    ```css
     .clearfix:after {  
       content: ""; 
       display: block; 
       height: 0; 
       clear: both; 
       visibility: hidden;  
     } 
     .clearfix {  /* IE6、7 专有 */ 
       *zoom: 1;
     }   
    ```

    优点：没有增加标签，结构更简单

    缺点：需要兼容低版本浏览器

### 5、BFC

- 什么是BFC

  ​	**BFC** - Block Formatting Context 块级格式化上下文 BFC的定义，BFC是一块独立的渲染区域，可以将BFC看成是元素的一种属性，拥有了这种属性的元素就会使他的子元素与世隔绝，不会影响到外部其他元素。

- 如何生成BFC

  - 根元素
  - float的属性不为none
  - position为absolute或fixed
  - display为inline-block等
  - overflow不为visible(常用的清除浮动方法)

- BFC解决的问题

  - 清除浮动

  - 防止magin重叠

  - 避免文字环绕

    ...

### 6、元素的显示和隐藏

| 属性                           | 区别                   | 用途                                                         |
| ------------------------------ | ---------------------- | ------------------------------------------------------------ |
| **display 显示     （重点）**  | 隐藏对象，不保留位置   | 配合后面js做特效，比如下拉菜单，原先没有，鼠标经过，显示下拉菜单， 应用极为广泛 |
| **visibility 可见性 （了解）** | 隐藏对象，保留位置     | 使用较少                                                     |
| **overflow 溢出（重点）**      | 只是隐藏超出大小的部分 | 1. 可以清除浮动  2. 保证盒子里面的内容不会超出该盒子范围     |

### 7、css三角

```css
div {
 	width: 0; 
    height: 0;
    border: 50px solid transparent;
	border-color: red green blue black;
    // 为了兼容低版本的浏览器
	line-height:0;
    font-size: 0;
 }
```

### 8、vertical-align属性的应用

- 图片、表单和文字对齐

  > 图片、表单都属于行内块元素，默认的 vertical-align 是基线对齐。

  <img :src="$withBase('/Baseline.png')">

  此时可以给图片、表单这些行内块元素的 **vertical-align 属性设置为 middle** 就可以让文字和图片垂直居中对齐了。

- 图片底部空白缝隙问题

  > 图片底侧会有一个空白缝隙，原因是行内块元素会和文字的基线对齐。

  主要解决方法有两种：

  1.给图片添加 **vertical-align:middle | top| bottom** 等。 （提倡使用的）

  2.把图片转换为块级元素  **display: block**; 

### 9、文本省略

- 单行文本省略

  ```css
  /*1. 先强制一行内显示文本*/
  white-space: nowrap;  （ 默认 normal 自动换行）
  
  /*2. 超出的部分隐藏*/
  overflow: hidden;
  
  /*3. 文字用省略号替代超出的部分*/
  text-overflow: ellipsis;
  ```

- 多行文本省略

  ```css
  /*1. 超出的部分隐藏 */
  overflow: hidden;
  
  /*2. 文字用省略号替代超出的部分 */
  text-overflow: ellipsis;
  
  /* 3. 弹性伸缩盒子模型显示 */
  display: -webkit-box;
  
  /* 4. 限制在一个块元素显示的文本的行数 */
  -webkit-line-clamp: 2;
  
  /* 5. 设置或检索伸缩盒对象的子元素的排列方式 */
  -webkit-box-orient: vertical;
  ```

## 三、HTML5&CSS3

### 1、H5新特性

- 语义化标签

  > HTML5新增了一些语义化标签，这样的话更加有利于浏览器的搜索引擎搜索，也方便了网站的seo

  <img :src="$withBase('/semantic.png')">

- 新增多媒体标签

  - video

    - 常用属性

      <img :src="$withBase('/video.png')">

    ```html
    <video src="media/mi.mp4" autoplay="autoplay" muted="muted"  loop="loop" poster="media/mi9.jpg"></video>
    ```

  - audio

    ```html
    <audio src="media/music.mp3" autoplay="autoplay" controls="controls"></audio>
    ```

- 新增表单元素

  ```html
  <!-- 我们验证的时候必须添加form表单域 -->
  <form action="">
      <ul>
          <li>邮箱: <input type="email" /></li>
          <li>网址: <input type="url" /></li>
          <li>日期: <input type="date" /></li>
          <li>时间: <input type="time" /></li>
          <li>数量: <input type="number" /></li>
          <li>手机号码: <input type="tel" /></li>
          <li>搜索: <input type="search" /></li>
          <li>颜色: <input type="color" /></li>
          <!-- 当我们点击提交按钮就可以验证表单了 -->
          <li> <input type="submit" value="提交"></li>
      </ul>
  </form>
  ```

### 2、CSS3新特性

- 新增选择器

  - 属性选择器

    > 属性选择器，按照字面意思，都是根据标签中的属性来选择元素

    <img :src="$withBase('/attribute-selector.png')">

    ```css
     /* 只选择 type =text 文本框的input 选取出来 */
    input[type=text] {
        color: pink;
    }
    /* 选择首先是div 然后 具有class属性 并且属性值 必须是 icon开头的这些元素 */
    div[class^=icon] {
        color: red;
    }
    /* 选择首先是section 然后 具有class属性 并且属性值 必须是 data结尾的这些元素 */
    section[class$=data] {
        color: blue;
    }
    ```

  - 结构伪类选择器

    > 结构伪类选择器主要根据文档结构来选择元素，常用于根据父级选择里面的子元素

    <img :src="$withBase('/structural-selector.png')">

    - E:nth-child 与 E:nth-of-type 的区别
      - `E:nth-child(n)`     匹配父元素的第n个子元素E，也就是说，nth-child 对父元素里面所有孩子排序选择（序号是固定的）  先找到第n个孩子，然后看看是否和E匹配
      - `E:nth-of-type(n)` 匹配同类型中的第n个同级兄弟元素E，也就是说，对父元素里面指定子元素进行排序选择。 先去匹配E ，然后再根据E 找第n个孩子

  - 伪元素选择器

    > 伪元素选择器可以帮助我们利用css创建新标签元素，而不需要HTML标签，从而简化HTML结构

    <img :src="$withBase('/Pseudo-elements.png')">

    注意：

    - before 和 after 创建一个元素，但是属于行内元素
    - 新创建的这个元素在文档树中是找不到的，所以我们称为伪元素
    - before 和 after 必须有 content 属性 
    - before 在父元素内容的前面创建元素，after 在父元素内容的后面插入元素
      伪元素选择器和标签选择器一样，权重为 1

- 新增盒子模型border-box

  ​	CSS3 中可以通过 box-sizing 来指定盒模型，有2个值：即可指定为 content-box、border-box，这样我们计算盒子大小的方式就发生了改变

  可以分成两种情况：

  - box-sizing: content-box  盒子大小为 width + padding + border  （以前默认的）
  - **box-sizing: border-box**  盒子大小为 width

  如果盒子模型我们改为了box-sizing: border-box  ， 那padding和border就不会撑大盒子了（前提padding和border不会超过width宽度）

- CSS3过渡

  > 过渡动画： 是从一个状态 渐渐的过渡到另外一个状态

  语法:

  ```css
  transition: 要过渡的属性  时间  运动曲线  何时开始;
  ```

- transform转换

  ```css
  //沿着自身原来位置移动自身宽度、高度的一半 
  transform:translate(-50%,-50%);
  //沿x,y轴缩放元素大小
  transform:scale(x,y):沿x,y轴缩放元素大小 默认值为1 不放大也不缩小  [skeɪl]
  //定义2d旋转
  transform:rotate(angle) 角度单位:deg  [rəʊˈteɪt]
  ```

- 弹性盒子

  ```css
  display:flex //块级弹性盒
  flex-direction:主轴方向 row：横向 column：纵向排列（默认从上向下）
  justify-content:项目沿主轴方向的对齐方式
  align-items:项目沿侧轴方向的对齐方式
  flex-wrap:：指定弹性盒子的子元素换行方式 值为wrap换行（起始点在上）  [ræp]
  ```

## 四、移动Web开发

### 1、移动端的适配方案一

​	less+rem+媒体查询

### 2、移动端的适配方案二

一、使用 [lib-flexible](https://github.com/amfe/lib-flexible) 动态设置 rem基准值（html 标签的字体大小）

1、安装

```shell
# yarn add amfe-flexible
npm i amfe-flexible
```

2、然后在 `main.js` 中加载执行该模块

```javascript
import 'amfe-flexible'
```

最后测试：在浏览器中切换不同的手机设备尺寸，观察 html 标签 `font-size` 的变化。

二、使用 [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 将 `px` 转为 `rem`

1、安装

```shell
# yarn add -D postcss-pxtorem
# -D 是 --save-dev 的简写
npm install postcss-pxtorem -D
 npm i postcss-pxtorem@5.1.1 -D(指定版本安装)
```

2、然后在**项目根目录**中创建 `.postcssrc.js` 文件

```javascript
module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      rootValue: 37.5, // 假设设计稿宽度为375px
      propList: ['*']
    }
  }
}
```

3、配置完毕，重新启动服务

### 3、Less

> Less（LeanerStyle Sheets 的缩写）是一门 CSS扩展语言，也成为CSS预处理器。

​	它在CSS 的语法基础之上，引入了变量，Mixin（混入），运算以及函数等功能，大大简化了 CSS 的编写，并且降低了 CSS的维护成本，就像它的名称所说的那样，Less可以让我们用更少的代码做更多的事情。

- Less变量

  变量是指没有固定的值，可以改变的。因为我们CSS中的一些颜色和数值等经常使用。

```
@变量名:值;
```

- Less 嵌套

  如果遇见 （交集|伪类|伪元素选择器） ，利用&进行连接

  ```less
  a:hover{
      color:red;
  }
  a{
    &:hover{
        color:red;
    }
  }
  ```

- Less 运算

  任何数字、颜色或者变量都可以参与运算。就是Less提供了加（+）、减（-）、乘（*）、除（/）算术运算。

  ```less
  /*Less 里面写*/
  @width: 10px + 5;
  div {
      border: @width solid red;
  }
  /*生成的css*/
  div {
    border: 15px solid red;
  }
  /*Less 甚至还可以这样 */
  width: (@width + 5) * 2;
  ```

