## vue事件处理

### 1. 绑定监听

- 语法:`v-on:xxx="fun"`
- 简写:` @xxx="fun"(参数)`
- 用法:

- 在vue中的事件函数又默认事件形参`event`
  - 如果存在又多个形参的时候就需要加上`$event`

```html
 <!-- 只传入一个参数，默认参数就是event -->
      <button @click="handleClick1">按钮1</button>
      <!-- 如果想传入其他参数，函数调用传入参数即可 -->
      <button @click="handleClick2(1, 2, 3)">按钮2</button>
      <!-- 如果想传入其他参数和event，写$event -->
      <button @click="handleClick3(1, 2, 3, $event)">按钮3</button>
<script>
 new Vue({
        el: "#example",
        methods: {
          handleClick1(event) {
            console.log(event);
            console.log(arguments);
          },
          handleClick2(a, b, c) {
            console.log(arguments);
          },
          handleClick3(a, b, c, event) {
            console.log(arguments);
            console.log(event);
          },
        }
 })
```

###  2. 事件修饰符:

- 语法:`.prevent`

​       用法:与DOM的阻止事件的默认行为 `event.preventDefault()`相同

- 语法:`.stop`

  用法:与DOM的停止事件冒泡 `event.stopPropagation()`相同

```html
<div id="example">
<a @click.prevent="handleClick4" href="http://www.atguigu.com">atguigu</a>	
<ul @click="handleClick5">
        <!-- .stop阻止事件冒泡 -->
        <li @click.stop="handleClick6">111</li>
        <li @click.stop.prevent>222</li>
        <li>333</li>
      </ul>
</div>
<script>
     new Vue({
        el: "#example",
        methods: {
    handleClick4(event) {
            // event.preventDefault();
          },
    handleClick5(event) {
            console.log(555);
            // event.stopPropagation();
          },
    handleClick6(){
            console.log(666)
            },
        }
     })
</script>
```

### 3. 按键修饰符

- 语法:`.keycode`

  用法:操作的是某个keycode值的健

- 语法:`.enter`

  用法:操作的是enter键

```html
<div id="example">
<input type="text" @keyup.13="handleClick7" />
<input type="text" @keyup.enter="handleClick7" />
<input type="text" @keyup.a="handleClick7" />
</div>
<script>
     new Vue({
        el: "#example",
        methods: {
   		 handleClick7(event) {
            console.log(event.keyCode);
          }
        }
     })   
</script>
```

#### 案例：使用v-model(双向数据绑定)自动收集数据

```HTML
 <div id="demo">
        <form action="/xxx" @submit.prevent="regist">
          <span>用户名: </span>
          <input type="text" v-model="user.username" /><br />
  
          <span>密码: </span>
          <input type="password" v-model="user.password" /><br />
  
          <span>性别: </span>
          <input type="radio" id="female" v-model="user.sex" value="女" />
          <label for="female">女</label>
          <input type="radio" id="male" v-model="user.sex" value="男" />
          <label for="male">男</label><br />
  
          <span>爱好: </span>
          <input
            type="checkbox"
            id="basket"
            v-model="user.hobby"
            value="basket"
          />
          <label for="basket">篮球</label>
          <input type="checkbox" id="foot" v-model="user.hobby" value="foot" />
          <label for="foot">足球</label>
          <input
            type="checkbox"
            id="pingpang"
            v-model="user.hobby"
            value="pingpang"
          />
          <label for="pingpang">乒乓</label><br />
          <span>城市: </span>
          <select v-model="user.city">
            <option value="">未选择</option>
            <option value="1">北京</option>
            <option value="2">上海</option>
            <option value="3">深圳</option>
          </select>
          <br />
          <span>介绍: </span>
          <textarea rows="10" v-model="user.info"></textarea><br /><br />
  
          <input type="submit" value="注册" />
        </form>
    </div>
```

```vue
    <script>
        new Vue({
          el: "#demo",
          data: {
            user: {
              username: "",
              password: "",
              sex: "男",
              hobby: [],
              city: "",
              info: "",
            },
          },
          methods: {
            regist() {
              console.log(this.user);
            },
          },
        });
      </script>
```

