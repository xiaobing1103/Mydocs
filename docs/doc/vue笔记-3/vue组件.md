# vue组件

## 1.在局部中使用vue自定义组件

定义组件：

- 组件命名：

​    1. test-component 

​      使用：`<test-component />`

​    2. TestComponent

​      使用：`<test-component />`

​       ` <TestComponent />` 这种只能在脚手架中生效，页面中不行

```html
<div id="app">
    <a-A></a-A>
</div>
<script>
const aA = Vue.extend({
     		// 返回值就是data数据
            data(){
                return {
                    num:0,
                };
            },
            methods:{
                add(){
                    this.num++
                },
            },
            //组件将要渲染的页面 组件模板页面 这里必须要有一个根组件div给包住
            template:
            "<div><p>{{num}}</p> <button @click='add'>按钮</button></div>"
        })
        new Vue({
            el:"#app",
            components:{
                aA,
            }
        })
</script>
```

## 2.在全局中使用vue自定义组件

- 直接在Vue的component上扩展属性可以直接挂载到根元素上面

```html
<div id="app">
    <!--简写模式-->
	<a-A/>
</div>
<script>
       Vue.component("aA",{
          data(){
                return {
                    num :0,
                }
            },
            methods:{
                add(){
                    this.num++
                }
            },
            template:
            "<div><p>{{num}}</p> <button @click='add'>按钮</button></div>"
        })
        new Vue({
            el:"#app"
        })
</script>
```

