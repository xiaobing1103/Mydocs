# **vue路由的使用**

### vue路由的作用

1. vue的一个插件库`Vue.use()`

2. 专门用来实现一个SPA应用
3. 基于vue的项目基本都会用到此库

4. 中文文档: http://router.vuejs.org/zh-cn/
   1. 下载: npm install vue-router -S

### SPA的理解

1. 单页Web应用（single page web application，SPA）

2. 整个应用只有一个完整的页面
3. 点击页面中的链接不会刷新页面, 本身也不会向服务器发请求
4. 当点击路由链接时, 只会做页面的局部更新
5. 数据都需要通过ajax请求获取, 并在前端异步展现

### 路由的理解

1. 什么是路由?

   -  一个路由就是一个映射(对应)关系(key:value)  
   - key为路由路径path, value可能是function/component

2. 路由分类

   - 后台路由: node服务器端路由, value是function, 用来处理客户端提交的请求并返回一个响应数据
   - 前台路由: 浏览器端路由, value是component, 当请求的是路由path时, 浏览器端没有发送http请求, 但界面会更新显示对应的组件 

3. 后台路由

   - 注册路由: 
     - app.get(path, function(req, res))
     - router.get(path, function(req, res))
   - 当node接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据

4. 前端路由

   - 注册路由

     {

     ​         path: '/about',

     ​         component: About

     ​     },

     {

     ​         path: '/home,

     ​         component: Home

     ​     },

   - 当浏览器的path变为/about时, 当前路由组件就会变为About组件

### 相关API说明

- VueRouter(): 用于创建路由器的构建函数

  new VueRouter({

  ​	// 多个配置项

   })

- 路由配置

  routers:[

  ​	{//一般路由

  ​	path:'/about',

  ​	component:About

  },

  {

  ​	//自动跳转路由

  ​	path:'/',

  ​	redirect:'/about'

  }]

- 注册路由器

  import router from './router'

  new Vue({

  ​	router

  })

### 使用路由组件标签

- `<router-link>`:用来生成路由链接

​		`<router-link to="/xxx">Go to xxx</router-link>`

- `<router-view>`:用来显示当前路由组件界面

  `<router-view></router-view>`

