# vue class与style绑定



## 样式处理:

- 在应用界面中, 某个(些)元素的样式是变化的

- class/style绑定就是专门用来实现动态样式效果的技术

## 1.class绑定:  

语法：

- 普通dom写法 `<p class="red">xxx</p>`

- vue样式绑定 `<p :class="red">xxx</p>`

- 使用对象方式绑定 `<p :class="{red: isRed}">xxx</p>`

  - 这里的isRed是由data中定义变量来控制的数据

- 使用数组方式绑定 `<p :class="[red, 'green']">xxx</p>`

  - 这里的red是由data中定义变量来控制的数据,如果没有定义将会报错.green是style中的样式,

## 2.style绑定：

语法：

- `<p style="font-size: 16px;">xxx</p>`

- `<p :style="{fontSize: '16px'}">xxx</p>`
  
- 如果样式是动态（可变的）用 style，如果静态写死就用 class


```html
<style>
      .red {
        color: red;
      }
      .green {
        color: green;
      }
      .size {
        font-size: 30px;
      }
    </style>
<div id="app">
      <h2>1. class绑定: :class='xxx'</h2>
      <p :class="['red', 'size']">这是一段文字~</p>
      <button @click="changeColor">改变颜色</button>
 <h2>2. style绑定</h2>
     <p :style="{ 'fontSize': fontSize + 'px', color: 'red' }">这是一段文字~</p>
     <input type="text" placeholder="请输入字体大小" v-model="fontSize"/>
<script>
new Vue({
        el: "#app",
        data: {
          isRed: true,
          fontSize: 16
        },
        methods: {
          changeColor() {
            this.isRed = !this.isRed;
          },
        },
      });
</script>
```



