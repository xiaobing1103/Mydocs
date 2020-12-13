# vue插件

## 自定义vue插件

- 库的概念:

  jQuery（操作DOM） dayjs（格式化时间） lodash（节流、防抖...） --> 提供特定功能

- 框架:

  功能更加强大的库 React Vue

- 插件:

  - 扩展库、框架的功能

    ​    jVQuery插件 扩展jQuery功能

    ​    React插件 React-Router

    ​    Vue插件 Vue-Router Vuex...

### 方式一

- 当你使用插件时，会调用插件函数，传入Vue作为参数

```js
function MyPlugin(Vue) {
     // 扩展Vue功能
     // 扩展全局功能
    Vue.globalMethod = function () {
     console.log("globalMethod");
   };
    // 扩展实例对象功能
    Vue.prototype.$instanceMethod = function () {
     console.log("$instanceMethod");
   };
    // 扩展全局过滤器
    Vue.filter("formatDate", (value, str) => {
     return dayjs(value).format(str);
   });
    // 扩展全局指令
     Vue.directive("upper-text", (el, binding) => {
     el.textContent = binding.value.toUpperCase();
   });
}
window.MyPlugin = MyPlugin;
//以后的暴露方式
// export default MyPlugin
```

### 方式二

```js
const MyPlugin = {};
Myplugin.install = function(vue){
    //扩展Vue功能
    //扩展全局功能
    Vue.globalMethod = function(){
        console.log("globalMethod")
    };
    // 扩展实例对象功能
  	Vue.prototype.$instanceMethod = function () {
    console.log("$instanceMethod");
  	};
    // 扩展全局过滤器
  	Vue.filter("formatDate", (value, str) => {
    return dayjs(value).format(str);
  	});
    // 扩展全局指令
  	Vue.directive("upper-text", (el, binding) => {
    el.textContent = binding.value.toUpperCase();
  	});
}
window.MyPlugin = MyPlugin;
```

使用插件:

- 必须要在new Vue 之前使用插件

- 使用Vue插件 --> 调用插件函数，传入Vue

```html
<script src="./MyPlugin.js"></script>
<script>
  Vue.use(MyPlugin);
	new Vue({
        el: "#app",
        data: {
          time: Date.now(),
          msg: "Atguigu",
        },
        mounted() {
            //使用全局上定义的插件
          Vue.globalMethod();
            //使用在实例上定义好的插件
          this.$instanceMethod();
        },
      });
    </script>
```

