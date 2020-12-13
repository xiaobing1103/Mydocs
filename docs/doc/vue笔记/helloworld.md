# vue基础语法笔记

### vue

1.引入Vue.js 
 - 渐进式 JS 框架

 - 可以使用cdn引入或者下载好vue.js的文档在script上面进行引入 ` <script src="../js/vue.min.js"></script>`

​	2.创建Vue对象

- `引入vue.min.js，全局就会有一个函数：Vue`

 - new Vue（配置对象）
 - https://cn.vuejs.org/v2/api/ 选项



2.模板页面：html + css +js

- 双大括号表达式（插值语法）
  - 语法：`{{js表达式}}`
  - 作用：可以用来显示js动态的数据
  - js表达式中设计到`变量`，会去Vue的配置中找（vue实例对象上找）
  - 注意: 只能用于标签内,不能作为标签属性

- 指令语法
  - 语法：`v-xxx="JS表达式`
  - `v-model`用作双向数据绑定(数据既能从js流向页面,也能从页面流向js)
  - `v-bind`用来单向数据绑定(强制绑定数据) 简写`:value="msg"`
  - `v-on:click="handClick"`用来绑定事件 简写`@click="handleClick"`

3. 表达式 与 语句

​     表达式

   -   有返回值（返回值可以是undefined）
   -    没有分号

​     语句

      -  没有返回值
      -  末尾有分号（编译会自动加上）

```js
 function fn() {} 		// 语句
          fn 			// 表达式
          fn() 			// 表达式
var fn = function () {} // 函数表达式语句
          if (a) {} 	// 语句
          for () {} 	// 语句
```

4. MVVM

   - MVC
     - M - Model 数据层 (数据库)
     - V - View 视图层  (页面,ejs)
     - C - Controller 控制层 (路由)

​      数据由控制层去操作，读取数据层的数据，渲染到视图层的页面上，返回



   - MVVM

     - M - Model 数据层 (data,computed..)

     - V - View 视图层  (模板页面)

     - VM - ViewModel 视图模型层（vm实例对象）

       

   - 数据能由 ViewModel 操作渲染到视图层上（当数据将来发生修改，自动重新渲染到视图层上-响应式）

   - 页面数据发生变化，能由 ViewModel 操作来修改数据层的数据

   - 数据 M --> V 也能 V --> M, 叫做双向数据绑定

     

```js
	<div id="root">
    <input type="text" v-model="msg" />
    <h1>{{msg}}</h1>
    <h1>hello</h1>
	//vm就是Vue实例对象
    const vm = new Vue({
    // 配置对象：属性名固定的对象
    //el : 指定根element(选择器)
    // el: '#root', // element元素，获取DOM元素
    // data : 初始化数据(页面可以访问)
        data: {
          msg: "hello world",
        },
      });
```



- 另外一种渲染方法

- 可以直接使用vm上面的mount属性挂在到页面上渲染

```js
vm.$mount("#root");
```

