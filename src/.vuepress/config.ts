import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

let navbar = [
// 嵌套 Group - 最大深度为 2
{
    text: '前端',
    children: [
      {
        text: 'JavaScript',
        link: '/javascript/sub',
        children: ['es6+', 'javascript','DOM/BOM'],
      },
      {
        text: 'vue',
        children: ['vue2', 'vue3'],
      },
      {
        text: 'react',
        children: [],
      },
      {
        text: 'vue3',
        children: [],
      },
    ],
  },
  // 控制元素何时被激活
  {
    text: '工具',
    children: [
      {
        text: 'webpack',
        link: '/',
        // 该元素将一直处于激活状态
        activeMatch: '/',
      },
      {
        text: 'js正则',
        link: '/regexp/',
        // 该元素在当前路由路径是 /foo/ 开头时激活
        // 支持正则表达式
        activeMatch: '^/foo/',
      },
    ],
  },
  {
    text: 'typescript',
    children: [
      {
        text: 'webpack',
        link: '/',
        // 该元素将一直处于激活状态
        activeMatch: '/',
      },
      {
        text: 'js正则',
        link: '/regexp/',
        // 该元素在当前路由路径是 /foo/ 开头时激活
        // 支持正则表达式
        activeMatch: '^/foo/',
      },
    ],
  },
]
let sidebar = {
    '/guide/': [
      {
        text: 'Guide',
        children: ['/guide/README.md', '/guide/getting-started.md'],
      },
    ],
    '/reference/': [
      {
        text: 'Reference',
        children: ['/reference/cli.md', '/reference/config.md'],
      },
    ],
  }
export default defineUserConfig<DefaultThemeOptions>({
  // 站点配置
  base: "/blog/",
  lang: 'en-US',
  title: 'justfu',
  description: 'Just playing around',

  // 主题和它的配置
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    navbar,
    // 侧边栏对象
    // 不同子路径下的页面会使用不同的侧边栏
    sidebar,
    repo:'fuzhengyi/blog',
    repoLabel:'GitHub',
    docsBranch:"main",
    docsDir:'src',
    editLink:true,
    editLinkText:'在GitHub上编辑此页',
    lastUpdated:true,
    lastUpdatedText:'最后更新时间',
    contributors:true,
    contributorsText:'贡献者'
  },
  plugins:[
      [
          '@vuepress/plugin-search',
          {
              locales:{
                '/':{
                    placeholder:'搜索'
                }
              },
              hotKeys:['s','/']
          }
      ]
  ]
})