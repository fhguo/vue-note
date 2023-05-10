module.exports = {
  title: '前端笔记',
  description: 'Front-end Development',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  plugins: ['@vuepress/back-to-top'], // 使用返回顶部插件
  // base: './', // 使用相对路径，本地服务器需要
  base: '/vue-note/', // 使用相对路径，线上部署非根路径时需要修改
  // markdown: { // 是否显示行号
  //   lineNumbers: true
  // },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '总结', link: '/summary/' },
      {
        text: '更多',
        items: [
          { text: 'APP下载', link: '/note/download.md' }
        ]
      },
      { link: '/guide/I18n.md' },
      { text: 'chatBot', link: 'https://gfh_he.gitee.io/chat-robot' },
    ],
    // 侧边栏
    // sidebar: 'auto',
    sidebar: {
      '/summary/': [
        '',     /* /summary/ */
        'html&css',   /* /summary/html-css.html */
        'js-base',
        'js-high',
        'webAPI',
        'link',
        'vue',
        'React&miniAPP&echarts',
      ],
      '/guide/': ['']
    },
    displayAllHeaders: true, // 默认值：false 显示所有页面的标题链接
    // 层级
    sidebarDepth: 2,
    // 最后更新时间
    lastUpdated: 'Last Updated', // string | boolean
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'https://gitee.com/gfh_he/vue-press.git',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: '查看源码',
    docsDir: 'docs',
     // 默认是 false, 设置为 true 来启用
    editLinks: true,
  },
}