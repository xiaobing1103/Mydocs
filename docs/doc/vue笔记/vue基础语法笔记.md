# vue模板语法



### 1.模板的理解:

- 类似于react中jsx模板字符串vue也有相同的模板
  
- 不同于react中的是vue的模板是直接写在html中的，而jsx是写在js文档中，所以这里避免了class的关键词写法
  
- 动态的html页面

- 包含了一些JS语法代码

- 双大括号表达式

- 指令(以v-开头的自定义标签属性)

  

### 2.双大括号表达式：

- 语法：{{JS表达式}}

- 作用：用来渲染 JS 动态数据

- 注意：只能用于标签内，不能作为标签属性

  
### 3. 指令语法: 

  #### 强制数据绑定

  `v-bind`

- 作用: 用来单向数据绑定（强制绑定数据)

- 完整写法: `v-bind:value="msg"`

- 简洁写法： `:value="msg"`

  #### 双向数据绑定

- `v-model`

- 作用: 用来双向数据绑定

- 完整写法: `v-model="msg"`

  #### 事件绑定
  
- `v-on`

- 作用:用来绑定事件

- 完整写法: `v-on:click="handleClick"`

- 简写 `@click="handleClick"`

### 4.指令二: 绑定事件监听
- 功能: 绑定指定事件名的回调函数
  - 完整写法:
      `v-on:click='xxx'`
  - 简洁写法:
      `@click='xxx'`

```html
<div id="app">
      <h2>1. 双大括号表达式</h2>
      <p>{{aaa}}</p>
      <p>{{flag ? '111' : '222'}}</p>
      <!-- <p>{{if (flag) {return 111}}}</p>-->
   <h2>2. 指令一: 强制数据绑定</h2>
      <!-- v-bind强制绑定数据 v-bind:attr="xxx"给value属性强制绑定num值-->
      <input type="text" v-bind:value="num" />
      <input type="text" :value="num" :flag="flag" />
      <input type="text" value="num" />
   <h2>3. 指令二: 绑定事件监听</h2>
      <button v-on:click="handleClick">按钮</button>
      <button v-on:mousemove="handleClick">按钮</button>
      <button @click="handleClick">按钮</button> 
   <script>
      new Vue({
        el: "#app",
        data: {
          aaa: "aaaaaa",
          flag: false,
          num: 123,
        },
        methods: {
          // DOM事件的回调函数
          handleClick() {
            console.log(this); // vm
            console.log('点击了~');
          }
        }
      });
	</script>
```














































  ### 

  

  

  