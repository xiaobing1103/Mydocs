# Vue生命周期函数

## 1. 初始化

- 语法:`beforeCreate`创建之前

  作用: 在数据代理（将data中的数据代理到this上）之前触发,此时不能访问data、methods、computed...数据
  
- 语法:`created` 在创建之后
  作用: 在数据代理之后触发 发送ajax请求, 启动定时器等异步任务
  
- 语法:`beforeMount`
  作用:在挂载之前（页面渲染之前），所以此时不能操作DOM
  
- 语法:`mounted`
  作用:可以直接操作DOM 发送请求、设置定时器、绑定事件等一次性的任务

## 2.更新 

- 语法:`beforeUpdate`
  作用:在更新之前更新数据,此时可以更新数据

- 语法:`updated`
  作用:在更新之后更新数据,此时可以更新数据

## 3. 卸载

- 语法:`beforeDestroy`
  作用:做收尾工作：清除定时器、解绑事件等任务
  
- 语法:`destroyed`
  作用:同上一般不常用

  [![DFXE8g.png](https://s3.ax1x.com/2020/11/15/DFXE8g.png)](https://imgchr.com/i/DFXE8g)

```html
<div id="app">
      <p>{{num}}</p>
      <button @click="num++">按钮</button>
    <!--相当于直接在vue中定义了一个事件销毁的函数-->
      <button @click="$destroy()">go die</button>
</div>
<script>
    new Vue({
        el: "#app",
        data: {
          test: 123,
          num: 0,
        },
     methods: {
          // goDie() {
          //   // this.$destroy()
          // }
        },
     	beforeDestroy() {
          console.log('beforeDestroy', this);
        },
        destroyed() {
          console.log('destroyed', this);
        },
        beforeUpdate() {
          console.log("beforeUpdate", this.num);
        },
        updated() {
          console.log("updated", this.num);
        },
        beforeCreate() {
          // 在数据代理（将data中的数据代理到this上）之前触发
          // 此时不能访问data、methods、computed...数据
          console.log("beforeCreate", this, this.test);
        },
        created() {
          // 在数据代理之后触发
          console.log("created", this, this.test);
        },
        beforeMount() {
          // 在挂载之前（页面渲染之前）
          // 不能可以操作DOM
          console.log("beforeMount", this, this.test);
        },
        mounted() {
          // 在挂载之后（页面渲染之后）
          // 可以直接操作DOM
          console.log("mounted", this, this.test);
        },
    })
</script>
```
## vue生命周期案例

```html
 <div id="app">
      <button @click="$destroy()">destroy</button>
      <p v-show="isShow">show</p>
</div>
    <script>
      new Vue({
        el: "#app",
        data: {
          isShow: true,
        },
        mounted() {
          this.timer = setInterval(() => {
            console.log(111);
            this.isShow = !this.isShow;
          }, 1000);
        },
        beforeDestroy() {
          clearInterval(this.timer);
        }
      });
    </script>
```

