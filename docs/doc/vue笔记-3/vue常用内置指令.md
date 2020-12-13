# vue常用内置指令

- v-if : 如果为true, 当前标签才会输出到页面

- v-else: 如果为false, 当前标签才会输出到页面

- v-show : 通过控制display样式来控制显示/隐藏

- v-for : 遍历数组/对象

- v-on : 绑定事件监听, 一般简写为@

- v-bind : 强制绑定解析表达式, 可以省略v-bind

- v-model : 双向数据绑定





- v-text : 更新元素的 textContent

- v-html : 更新元素的 innerHTML

- v-cloak : 使用它防止闪现表达式, 与css配合: [v-cloak] { display: none }

- v-pre: 会渲染最原始的内容（里面内容不会被vue解析）

- v-once：只渲染一次，只解析一次（后面值更新不会重新解析、渲染）

- ref : 为某个元素注册一个唯一标识, vue对象通过$refs属性访问这个元素对象

  ​	1.设置给DOM元素，获取到的就是DOM元素

  ​    2. 设置给组件，获取到的就是组件实例对象

使用实例:

`v-cloak`加上之后浏览器不会先解析成{{xxx}}这样的格式内容，会直接不渲染然后等待解析完毕后，才会渲染到页面上面

网页渲染内容:

[![DA5Dnf.png](https://s3.ax1x.com/2020/11/16/DA5Dnf.png)](https://imgchr.com/i/DA5Dnf)

控制台打印内容:

<a href="https://imgchr.com/i/DA5hj0"><img src="https://s3.ax1x.com/2020/11/16/DA5hj0.png" alt="DA5hj0.png" border="0" /></a>

```html
    <div id="example">
      <p v-cloak>{{msg}}</p>
      <!-- 相当于innerText，textContent -->
      <p v-text="msg" v-cloak></p>
      <!-- 相当于innerHTML -->
      <p v-html="msg" v-cloak></p>
       <!--绑定之后只能够执行一次但是在vue状态管理工具中会实时更新-->
      <p v-once v-cloak>{{num}}</p>
      <!--这个方法会与v-cloak冲突如果两个同时加上页面不会渲染-->
      <p v-pre v-cloak>{{msg}}</p>
      <button @click="num++" ref="btn">按钮</button>
    </div>
<script>
      new Vue({
        el: "#example",
        data: {
          msg: "<span>hello vue</span>",
          num: 0,
        },
        beforeMount() {
          console.log("beforeMount", this.$refs.btn);
        },
        mounted() {
          console.log("mounted", this.$refs.btn);
        },
      });
    </script>
```





