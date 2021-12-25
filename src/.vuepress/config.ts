import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import navbar  from '../util'


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
    repo:'fuzhengyi',
    repoLabel:'GitHub',
    docsBranch:"main",
    docsDir:'src',
    editLink:true,
    editLinkText:'在GitHub上编辑此页',
    lastUpdated:true,
    lastUpdatedText:'最后更新时间',
    contributors:true,
    contributorsText:'贡献者',
    externalLinkIcon:true
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