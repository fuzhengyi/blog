const navbar = [
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
            },
            {
              text:'js写法优化',
              link:'/javascript/js写法优化'
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
          },
          {
            text: '混合开发',
            link: '/hybrid',
            children: [{
              text:'h5、iOS、Android通信方式',
              link:'/hybrid'
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
            link: '/tool',
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
              },
              {
                text:'svn命令',
                link:'/tool/svn'
              },
              {
                text:'nginx',
                link:'/tool/nginx'
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
      {
        text: '计算机网络',
        children: [
          {
            text: '计算机网络',
            link: '/computerNetwork',
            // 该元素将一直处于激活状态
            activeMatch: '/',
          }
        ],
      },
      {
          text:'汽车行业',
          children:[
              {
                  text:'汽车标准目录',
                  link:'/car'
              }
          ]
      }
    ]

    export default navbar;
