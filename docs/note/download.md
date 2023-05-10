---
sidebar: false
---

<template>
  <div id="app">
    <h4>APP下载</h4>
    <el-row >
      <el-col :span="11" v-for="(item, index) in appList" :key="item.id" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <img :src= "item.imgUrl" class="image" />
          <!-- <img :src="$withBase('/显示模式.png')" class="image" /> -->
          <div style="padding: 14px;">
            <span>{{item.title}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.creatDate }}</time>
              <el-button type="text" class="button" @click="downFile(item)">下载</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  // 图片或文件线上部署时需要注意是不是根路径
  data() {
    return {
      currentDate: "2023-5-5",
      appList: [{id: 1, title: "前端笔记", imgUrl: "/vue-note/hero.png", creatDate: "2023-5-10", fileUrl: "https://gitee.com/gfh_he/vue-press/blob/master/docs/.vuepress/dist/app/vueNote.apk"}, {id: 2, title: "chatBot", imgUrl: "/vue-note/bot_mini.png", creatDate: "2023-5-10", fileUrl: "https://gitee.com/gfh_he/vue-press/blob/master/docs/.vuepress/dist/app/chatBot.apk"}]
    }
  },
  methods: {
    downFile(item) {
      window.location = item.fileUrl;
    }
  }
};
</script>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 100%;
    display: block;
    border: 1px solid #eee;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>