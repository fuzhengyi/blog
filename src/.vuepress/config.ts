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
        children: [{
          text:'es6+',
          link:'/javascript/es6',
        },
        {
          text:'DOM',
          link:'/javascript/DOM'
        },
        {
          text:'BOM',
          link:'/javascript/BOM'
        }],
      },
      {
        text: 'vue',
        children: [{
          text:'vue2',
          link:'/vue/vue2'
        },{
          text:'vue3',
          link:'/vue/vue3'
        }],
      },
      {
        text: 'react',
        children: [{
          text:'react',
          link:'/react/react'
        }],
      }
    ],
  },
  // 控制元素何时被激活
  {
    text: '工具',
    children: [
      {
        text: 'tool',
        link: '/',
        // 该元素将一直处于激活状态
        activeMatch: '/',
        children:[
          {
            text:'webpack',
            link:'/tool/webpack'
          },
          {
            text:'js正则',
            link:'/tool/regexp'
          }
        ]
      }
    ],
  },
  {
    text: 'typescript',
    children: [
      {
        text: 'typesctipt',
        link: '/typesctipt',
        // 该元素将一直处于激活状态
        activeMatch: '/',
      }
    ],
  },
]

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
    // sidebar,
    sidebar:'auto',
    sidebarDepth:2,
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