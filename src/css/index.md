### Flex/Grid布局方案
Flexbox 布局
Flexbox 适用于一维布局（要么是行方向，要么是列方向），非常适合用于导航栏、侧边栏、卡片等场景。
基本概念
- 容器（flex container）: 应用 display: flex 或 display: inline-flex 的元素。
- 项目（flex items）: 容器内的直接子元素。
- 主轴（main axis）: 定义了项目的排列方向，默认为水平方向。
- 交叉轴（cross axis）: 与主轴垂直的方向。

CSS Grid 布局
CSS Grid 适用于二维布局（同时考虑行和列），非常适合用于整个页面的布局、复杂的网格系统等场景。
基本概念
- 容器（grid container）: 应用 display: grid 或 display: inline-grid 的元素。
- 项目（grid items）: 容器内的直接子元素。
- 网格线（grid lines）: 网格项之间的分隔线。
- 网格轨道（grid tracks）: 行或列之间的空间。
- 网格单元格（grid cells）: 由相邻的网格线形成的矩形区域。
- 网格区域（grid areas）: 一组网格单元格组成的矩形区域。