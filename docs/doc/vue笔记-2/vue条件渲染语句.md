# vue条件渲染语句

## 1.条件渲染指令

- 语法:`v-if`
  
  - 作用:隐藏的时候会删除整个DOM元素(会移除DOM树)
- 语法:`v-else`
  
- 作用:与`v-if`一起使用的时候,如果`v-if`为false就会执行`v-else`里面的命令
  
- 语法:v-show

  - 作用:通过display样式来控制隐藏(元素还在DOM树上)

    

## 2.比较`v-if`与`v-show`

- `v-if`因为要插入和移除DOM,所以性能较差
- 如果需要频繁的切换的话使用`v-show`比较好
- 如果不频繁,只用一次,则可以使用`v-if`

```html
<div id="app">
   <p v-if="isHShow">李培华真帅</p>
   <p v-else-if="isJShow">静哥真帅</p>
   <p v-else>雷哥真帅</p>
   <button @click="handleShow">按钮</button>
</div>
   <script type="text/javascript">
      new Vue({
        el: "#app",
        data: {
          isHShow: false,
          isJShow: false,
        },
        methods: {
          handleShow() {
            // this.isShow = !this.isShow;
            this.isHShow = false;
            this.isJShow = true;
          },
        },
      });
    </script>
```



## 3.列表渲染语句`v-for`

- 列表的显示

  - 1.遍历对象

  - 语法:`v-for` (item,index)
  - 作用:用于循环data里面的数据,渲染到页面上面

```html
<div id="app">
	<ul>
        <!-- <li v-for="(item, index) in users" :key="item.id"> -->
		<li v-for="item in uses" :key="item.id">
		id:{{item.id}} - 姓名:{{item.name}} - 年龄:{{item.age}} - 
		</li>
	</ul>
</div>
<script>
    Vue({
        el:"#app",
        data:[
            {
             { id: 1, name: "peihua", age: 38 },
             { id: 2, name: "jingge", age: 38 },
             { id: 3, name: "leige", age: 68 }, 
            }
        ]
    })
</script>
```

- 2.遍历数组

```html
<div id="demo">
<ul>
   <li v-for="(value, key) in person" :key="key">{{key}} - {{value}}</li>
</ul>
</div>
<script>
    Vue({
        el:"demo",
        data:{
            person:{
                name: "lily",
                age: 16,
                sex: "girl",
            }
        }
    })
</script>
```

- 列表的删除显示
  - 删除item
  - 在函数里面会自动传入一个event时间对象函数，可以使用argument查看
  - 使用`filter`方法过滤数据,达到删除数据的目的

```html
<div id="app">
	<ul>
		<li v-for="item in uses" :key="item.id">
		id:{{item.id}} - 姓名:{{item.name}} - 年龄:{{item.age}} - 
		</li>
        <!-- del(item.id)并不是代表函数一上来调用了，而是给del函数传参 -->
        <button @click="del(item.id)">删除</button>
	</ul>
</div>
<script>
    Vue({
        el:"#app",
        data:{
            users:[{
             { id: 1, name: "sherry", age: 38 },
             { id: 2, name: "jack", age: 38 },
             { id: 3, name: "wistoy", age: 68 }, 
            }],
        }
        methods:{
        del(id){
        	this.users = this.users.filter((user) => user.id !== id);
    	}
    }
    })
</script>
```

- 列表的更新显示

- 使用`map`,` filter`,`reduce`方法更新元素

  - `map`返回新数组特点：长度不变，值变

  - `filter`返回新数组特点：长度变，值不变

  - `reduce`返回特点：长度变，值也变

```html
<div id="app">
	<ul>
		<li v-for="item in uses" :key="item.id">
		id:{{item.id}} - 姓名:{{item.name}} - 年龄:{{item.age}} - 
		</li>
        <!-- del(item.id)并不是代表函数一上来调用了，而是给del函数传参 -->
        <button @click="del(item.id)">删除</button>
        <button @click="updata(item.id)">更新</button>
	</ul>
</div>
<script>
    Vue({
        el:"#app",
        data:{
            users:[{
             { id: 1, name: "sherry", age: 38 },
             { id: 2, name: "jack", age: 38 },
             { id: 3, name: "wistoy", age: 68 }, 
            }],
        }
        methods:{
        del(id){
        	this.users = this.users.filter((user) => user.id !== id);
    	},
        updata(item.id){
            //const users = this.users.find((users)=>users.id===id)
        	// users.age++
        	// return users
            //let num = this.arr.find((item, index) => index === 0)
        	// num++
            this.users = this.users.map((user) => {
              if (user.id === id) {
                return {
                  ...user,
                  age: ++user.age,
                }
              }
              return user
            })
        }
            
    }
    })
</script>
```



## 综合练习:列表的渲染与过滤

[![DFQyXd.gif](https://s3.ax1x.com/2020/11/15/DFQyXd.gif)](https://imgchr.com/i/DFQyXd)

- - 根据已存在属性，来计算生成一个新的值

- 监视属性watch
  - 监视已存在属性的变化，一旦变化，会保存数据，发送请求等操作

```html
    <div id="root">
        <input type="text" placeholder="请输入搜索的内容" v-model="search">
        <ul><li v-for="item in filterusers">id：{{item.id}} - 姓名：{{item.name}} - 年龄：{{item.age}}</li><br>
            <button @click="sort(1)">年龄升序</button>
            <button @click="sort(-1)">年龄降序</button>
            <button @click="sort(0)">原本顺序</button>
        </ul>
    </div>
    <script src="../vue-day01/js/vue.min.js"></script>
    <script>
        new Vue({
            el:"#root",
            data:{
                users:[
                    {id:1,name:'📕📕',age:11},
                    {id:2,name:'🐂🐂',age:22},
                    {id:3,name:'🤮🤮',age:33},
                    {id:5,name:'😓😓',age:44},
                    {id:6,name:'👎👎',age:55},
                    {id:7,name:'🦅🦅',age:66},
                    {id:8,name:'🐕🐕',age:77},
                    {id:9,name:'🐱🐱',age:88},
                    {id:10,name:'⭐⭐',age:99},
                ],
                search:"",
                //升序为1 降序为 -1 原本升序为 0
                ordertype:0,
            },
            computed:{
                filterusers(){
                    const searchdata =  this.users.filter((user)=>{
                        return user.name.indexOf(this.search) !==-1
                        // return user.name.includes(this.search);  
                    })
                    if(this.ordertype===0) return searchdata
                    const sortdata = searchdata.sort((a,b)=>{
                        return this.ordertype===1?b.age-a.age:a.age-b.age
                    })
                    return sortdata
                }
            },
            methods: {
                sort(ordertype){
                    this.ordertype = ordertype;
                }
            },
        })
    </script>
```



