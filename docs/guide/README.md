# 开始

::: tip 提示
本文档用来记录项目中遇到的问题及解决方法
:::
## 一、HTML问题
<demo-1 />
## 二、CSS问题

### 2.1 文本省略问题

- 单行文本

  ```scss
  // 文本省略
  .common_ellipsis1 {
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
  }
  ```

- 多行文本省略

  ```scss
  .common_ellipsis2 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; //作为弹性伸缩盒子模型显示。
      -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
      -webkit-line-clamp: 2; //显示的行
  }
  ```

### 2.2 移入动画

```scss
/*移入动画的过渡效果*/
.animation {
    transition: all 0.25s ease-in;
    &:hover {
        transform: translateY(-8px);
        box-shadow: 0px 1px 4px 1px rgba(213, 208, 208, 0.41);
    }
}
```

### 2.3 使用第三方组件库样式更改不生效问题

使用第三方组件库css样式更改不生效的问题可能有多种原因和解决方法。根据搜索结果¹²³⁴，我为你总结了以下几点：

- 你需要检查你的自定义样式是否在组件库的样式之后引入，以保证自定义样式有更高的优先级²。
- 你可以尝试使用/deep/或::deep或::v-deep选择器来修改子组件的非根元素的样式³。
- 你可以直接修改组件库的css源码，但这可能会影响组件库的更新和维护²。
- 你可以在components里找到对应的插件，并在插件里修改或覆盖原有样式¹。





















## 三、JS问题

### 3.1 常用的工具类

>常用的工具类.js

::: details 点击查看

```js
// 常用的工具类
 
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    // eslint-disable-next-line no-param-reassign
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = (name) => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeStore = (name) => {
  if (!name) return;
  window.localStorage.removeItem(name);
};
/**
 * 存储sessionStorage
 */
export const setStoreSession = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    // eslint-disable-next-line no-param-reassign
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
};

/**
 * 获取sessionStorage
 */
export const getStoreSession = (name) => {
  if (!name) return;
  // eslint-disable-next-line consistent-return
  return window.sessionStorage.getItem(name);
};

/**
 * 删除sessionStorage
 */
export const removeStoreSession = (name) => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
};

/**
 * @date Date类型对象
 * @fmt 格式化字符串  月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *                   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * dateformat(new Date(), "yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * dateformat(new Date(), "yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
export const dateformat = (date, fmt) => {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  // eslint-disable-next-line no-param-reassign
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  // eslint-disable-next-line no-param-reassign,no-restricted-syntax
  for (const k in o) if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
  return fmt;
};


/**获取当前URL里的查询参数
 *
 * @param url
 * @returns {{}|*}
 */
export const getUrlParams = url => {
  url = url || window.location.href;
  let queryArray = url.split(/[?&#]/).slice(1);
  let i;
  let args = {};
  for (i = 0; i < queryArray.length; i++) {
    var match = queryArray[i].match(/([^=]+)=([^=]+)/);
    if (match !== null) {
      args[match[1]] = decodeURIComponent(match[2]);
    }
  }
  return args;
}

/**
 *
 *判断是否为数组
 */
export const isArrayFun = value => {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  }else{
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
 *
 *时间戳转时间格式
 */
export const timestampToTime = timestamp => {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y+M+D+h+m+s;
}

/**
 *
 *查找数组是否有对应的item
 */
export const hasPurviewItem = (arr, purviewCode) => {
  if(arr.find(item=>item.menuUrl==purviewCode)){
    return true;
  } else{
    return false;
  }
}

```
:::

### 3.2 处理时间格式

```js
// e:要传入的时间毫秒值  type:格式类型
function timeFilter(e,type) {
    let date = new Date(e)
    // 获取年
    let y = date.getFullYear()
    // 获取月
    let m = (date.getMonth()+1+'').padStart(2,'0')
    // 获取日
    let d = (date.getDate()+'').padStart(2,'0')
    // 获取小时
    let h = (date.getHours()+'').padStart(2,'0')
    // 获取分钟
    let i = (date.getMinutes()+'').padStart(2,'0')
    // 获取秒
    let s = (date.getSeconds()+'').padStart(2,'0')
    // y-m-d h:i:s
    // y/m/d h:i:s
    // y-m-d
    if(type === 'y-m-d h:i:s'){
        return `${y}-${m}-${d} ${h}:${i}:${s}`
    }else if(type === 'y/m/d h:i:s'){
        return `${y}/${m}/${d} ${h}:${i}:${s}`
    }else{
        return `${y}-${m}-${d}`
    }
}
```



## 四、Vue问题

### 4.1 Vue组件封装和复用

- 子传父

  ```js
  总结:
  1.父组件:  通过自定义属性传递数据
  2.子组件:	通过props选项接受数据   props的接受结果是一个[]
  props接受值:
  		1.[]  #通过数组的形式接受数据
  		2.{}  #通过对象的形式接受数据   可以做校验
      
  常见的校验类型: String Number  Array  Object function  Symbol
  type[类型]
  default[默认值]
  required[必填项]
  validator[校验]
  ```

- 父传子

  ```js
  子传父:
  父组件: 通过自定义事件接收参数
  子组件: 通过$emit函数来触发自定义事件,并且传递参数
  // 如何触发自定义事件?
      /**
       * 通过$emit函数来触发自定义事件
       * 参数一:接受参数为:event(自定义事件名称)
       * 参数二: 传递的数据
      */
      this.$emit('message',10)
   <!-- 事件自定义:  @自定义事件名称="事件函数" -->
      <!-- 
        通过自定义事件接受参数的形式方式:
        1.显示接受: $event
        2.隐士接受: 不传
      -->
   <v-child @message="message($event)" :msg="msg"></v-child>
  ```

### 4.2 Vue-i18n实现国际化

详见  [文档链接](/guide/I18n.md)

### 4.3 Vue项目文件上传

- 普通上传(见[elementUI文档](https://element.eleme.io/#/zh-CN/component/upload))

- 自定义上传

  ```js
  <template>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="上传文件">
        <el-upload
          :action="uploadUrl"
          :http-request="uploadFile"
          :on-success="onSuccess"
          :on-error="onError"
          :file-list="fileList"
          multiple>
          <el-button slot="trigger">选择文件</el-button>
          <el-button slot="tip" type="primary">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">仅支持单个文件上传</div>
        </el-upload>
      </el-form-item>
    </el-form>
  </template>
  
  <script>
  import axios from 'axios'
  import { ElMessage } from 'element-ui'
  
  export default {
    data() {
      return {
        form: {
          file: null
        },
        fileList: []
      }
    },
    computed: {
      uploadUrl() {
        // 这里可以设置文件上传的URL
        return '/upload'
      }
    },
    methods: {
      uploadFile(file) {
        // 创建FormData对象，用于上传文件
        const formData = new FormData()
        formData.append('file', file)
  
        // 使用axios发送POST请求上传文件
        return axios.post(this.uploadUrl, formData).then(response => {
          return response.data
        }).catch(error => {
          throw error
        })
      },
      onSuccess(response, file, fileList) {
        ElMessage.success('上传成功')
        this.fileList = fileList
      },
      onError(error, file, fileList) {
        ElMessage.error('上传失败')
      }
    }
  }
  </script>
  ```

  ​    在上面的代码中，el-upload组件使用了http-request属性，这个属性可以覆盖默认的上传行为。我们在uploadFile方法中使用axios发送一个POST请求来上传文件。在成功和失败的回调函数中，使用ElementUI的Message组件显示上传结果，并更新fileList属性，以便显示上传成功的文件。

  ​    需要注意的是，我们使用FormData对象来创建一个包含文件的表单，以便将文件上传到服务器。此外，需要在服务器端进行文件上传处理，以便将上传的文件保存到服务器上的某个位置。

### 4.4 数据改变而视图没有更新的解决方法

在vue中，数据改变而视图没有更新的原因可能有以下几种：

- 在data中没有声明要使用的变量，导致vue无法检测到变量的变化¹⁵。
- 动态给对象新增或删除属性，导致vue无法识别到属性的变化²⁴⁵。
- 通过数组下标或修改数组长度来改变数组元素，导致vue无法识别到数组的变化²³⁴。

解决这些问题的方法有：

- 在data中提前声明好要使用的变量，并给一个初始值¹⁵。
- 使用Vue.set方法或Object.assign方法来给对象新增或删除属性²⁴⁵。
- 使用Vue.set方法或数组的splice、push、pop等方法来改变数组元素.

## 五、综合问题

### 5.1 展开收起效果的实现

```html
// 封装成一个组件 在:content中接收内容
<template>
  <div class="text-box">
    <div :class="['txt', { 'over-hidden': !unfold }]" ref="textBox">
      <span ref="spanBox">{{content}}</span>
    </div>
    <div class="btn" v-if="ifOver" @click="handleBtn">{{unfold ? $t('serve.retract') : $t('serve.spread')}}</div>
  </div>
</template>
<script>
export default {
  name: "text-box",
  data() {
    return {
      ifOver: false, // 文本是否超出三行，默认否
      unfold: false // 文本是否是展开状态 默认为收起
    };
  },
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleBtn() {
      this.unfold = !this.unfold
    }
  },
  mounted() {
    // 判断是否显示展开收起按钮
    this.ifOver = this.$refs.spanBox.offsetHeight > this.$refs.textBox.offsetHeight
  }
};
</script>
<style lang='scss' scoped>
.txt {
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
  // transition: all 2s;
}
.over-hidden {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.btn {
  font-size: 16px;
  color: #0459c3;
  cursor: pointer;
}
</style>
```

### 5.2 文件下载问题

你可以使用以下方法来下载PDF文件：

- 使用a标签的download属性：在谷歌(Chrome)浏览器中，使用a标签属性download下载pdf链接文件，如果是相同域时，可以直接下载；但是如果域不同，则不是下载，而是直接打开页面预览文件。

  ```js
  var link = document.createElement("a");
  link.href = "下载文件URL";
  link.download = "自定义下载文件名";
  link.click(); // 模拟点击操作
  ```

- 使用window.open()：仅支持普通文件下载，不支持文件流下载。Word、Excel会直接下载，图片、PDF则会跳转到预览页（需用户手动下载）。

### 5.3 文件上传问题

- 使用el-upload组件上传单个文件

  ```js
  <el-upload :action="fileUploads.actionUrl" :accept="fileUploads.acceptType"
      :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess"
      :before-upload="handleTypeBefore"
      :headers="fileUploads.authToken" :limit="1"
      :file-list="fileList">
  <el-button class="upload-btn"><i class="el-icon-upload"></i>
    上传</el-button>
  </el-upload>
  
  <script>
      // 上传成功
      handleSuccess(file, fileList) {
        this.isDisabled = false;
        this.fileList.push({
          name: file.data.fileName,
          url: file.data.previewUrl,
        });
      },
      // 移除文件
      handleRemove(file, fileList) {
        this.isDisabled = true;
        this.fileList = [];
        console.log(file, fileList);
      },
      // 上传之前文件类型和大小判断
      handleTypeBefore(file) {
        this.updatabtn = false;
        const isLt10M = file.size / 1024 / 1024 < 100;
        if (!isLt10M) {
          this.$message.error(this.$t('serve.fileLimit'));
          return isLt10M;
        }
  
        let typeArrays = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'];
        let testmsg =
          typeArrays.indexOf(
            file.name.substring(file.name.lastIndexOf('.') + 1)
          ) > -1;
        if (!testmsg) {
          this.$message({
            message: this.$t('serve.fileLimit'),
            type: 'error',
          });
          return false;
        }
      },
  </script>
  ```

- 使用el-upload组件自定义上传单个文件

  ```js
  <template>
    <el-upload
      action="/upload"
      :http-request="uploadFile"
      :on-success="onSuccess"
      :on-error="onError"
      :file-list="fileList"
      :auto-upload="false"
      list-type="picture">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button slot="tip" type="text">只能上传jpg/png文件，且不超过500kb</el-button>
    </el-upload>
  </template>
  
  <script>
    export default {
      data() {
        return {
          fileList: []
        }
      },
      methods: {
        uploadFile(file) {
          const formData = new FormData()
          formData.append('file', file)
          return this.$http.post('/upload', formData)
        },
        onSuccess(response, file, fileList) {
          this.fileList = fileList
          // 上传成功后的回调
        },
        onError(error, file, fileList) {
          this.fileList = fileList
          // 上传失败后的回调
        }
      }
    }
  </script>
  
  ```

  

## 六、其他问题

### 6.1 资源链接集合

- W3C教程 [链接](https://www.w3schools.com/html/default.asp)

- JavaScript教程 [链接](https://wangdoc.com/javascript/)
- Es6教程 [链接](https://wangdoc.com/es6/)
- Vue.js教程 [链接](https://v2.cn.vuejs.org/v2/guide/)
- 微信小程序官方文档 [链接](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- ElementUI文档 [链接](https://element.eleme.io/#/zh-CN/component/installation)
- Vant文档 [链接](https://vant-contrib.gitee.io/vant/v2/#/zh-CN/)

