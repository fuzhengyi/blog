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

    export default navbar;