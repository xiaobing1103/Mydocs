# vue自定义指令

## 1. 注册全局指令

- 直接在全局中使用Vue.directive('注册的属性名',回调函数）
- 这个方法有两个参数一个是扩展vue上的属性名称使用字符串格式，另一个是一个回调函数
- 回调函数中的参数
- `el` 绑定指令的DOM元素
- `binding` 是一个对象，包含指令和表达式等数据

```js
 {
    expression: "msg" 表达式
    name: "upper-text" 指令名称
    rawName: "v-upper-text" 指令全称
    value: "Atguigu" 表达式的值
   }
```

例子：注册vue全局指令

网页输出结果：

<img src="https://s3.ax1x.com/2020/11/16/DATLCQ.png" alt="DATLCQ.png" border="0" />

控制台输出结果：

<img src="https://s3.ax1x.com/2020/11/16/DATjvn.png" alt="DATjvn.png" border="0" />

```html
<div id="app">
    <p v-text='msg'></p>
    <p v-lower-text='msg'></p>
</div>
<script>
Vue.directive('my-directive', function(el, binding){
    console.log(el,binding)
    el.textContent = binding.value.toLowerCase()
  })
new Vue({
    el:"#app",
    data:{
        msg:"SODLER",
    },
})
</script>
```

## 2. 注册局部指令

网页输出渲染内容:

<img src="https://s3.ax1x.com/2020/11/16/DAHVJg.png" alt="DAHVJg.png" border="0" />

控制台打印内容:

<img src="https://s3.ax1x.com/2020/11/16/DAHQe0.png" alt="DAHQe0.png" border="0" />

```html
<div id="app">
    <p v-text='msg'></p>
    <p v-upper-text='msg'></p>
</div>
<script>
new Vue({
            el:"#app",
            data:{
                msg:"sodled",
            },
directives : {
    'upper-text' :funciton(el,binding) {
        	console.log(el,binding)
    		el.textContent = binding.value.toUpperCase()
        }
    }
  })
</script>
```

## 3.使用指令

```js
  v-my-directive='xxx'
```

