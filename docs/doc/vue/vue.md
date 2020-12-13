
Vue技术栈(全家桶)

尚硅谷前端研究院

1. 第1章：Vue核心
1.1. Vue的基本认识
1.1.1. 官网
1)	英文官网: https://vuejs.org/
2)	中文官网: https://cn.vuejs.org/
1.1.2. 介绍描述
1)	渐进式JavaScript 框架
2)	作者: 尤雨溪(一位华裔前Google工程师)
3)	作用: 动态构建(显示 )用户界面
1.1.3. Vue的特点
1)	遵循MVVM模式
2)	编码简洁, 体积小, 运行效率高, 适合移动/PC端开发
3)	它本身只关注UI, 可以轻松引入vue插件或其它第三库开发项目
1.1.4. 与其它前端JS框架的关联
1)	借鉴angular的模板和数据绑定技术
2)	借鉴react的组件化和虚拟DOM技术
1.1.5. Vue扩展插件
1)	vue-cli: vue脚手架
2)	vue-resource(axios): ajax请求
3)	vue-router: 路由
4)	vuex: 状态管理
5)	vue-lazyload: 图片懒加载
6)	vue-scroller: 页面滑动相关
7)	mint-ui: 基于vue的UI组件库(移动端)
8)	element-ui: 基于vue的UI组件库(PC端)
1.2. Vue的基本使用
1.2.1. 效果 (01_HelloWorld/test.html)

1.2.2. 编码

<div id="app">
  <input type="text" v-model="username">
  <p>Hello, {{username}}</p>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '#app',
    data: {
      username: 'atguigu'
    }
  })
</script>

1.2.3. 使用vue开发者工具调试
1)	通过chrome应用商店在线下载: Vue.js devtools
2)	通过本地安装文件安装: Vue.js devtools-5.3.3_0.crx
1.2.4. 理解Vue的MVVM

1.3. 模板语法
1.3.1. 效果 (02_模板语法/test.html)

1.3.2. 模板的理解
1)	动态的html页面
2)	包含了一些JS语法代码
a.	双大括号表达式
b.	指令(以v-开头的自定义标签属性)
1.3.3. 双大括号表达式(插值)
1)	语法:  {{exp}}
2)	功能: 向页面输出数据
3)	可以调用对象的方法
1.3.4. 指令一: 强制数据绑定
1)	功能: 指定变化的属性值
2)	完整写法:  v-bind:xxx='yyy'  //yyy会作为表达式解析执行
3)	简洁写法:  :xxx='yyy'
1.3.5. 指令二: 绑定事件监听
1)	功能: 绑定指定事件名的回调函数
2)	完整写法:
v-on:keyup='xxx'
v-on:keyup='xxx(参数)'
v-on:keyup.enter='xxx'
3)	简洁写法:
@keyup='xxx'
@keyup.enter='xxx'
1.3.6. 编码

<div id="app">
  <h2>1. 双大括号表达式</h2>
  <p>{{msg}}</p>
  <p>{{msg.toUpperCase()}}</p>

  <h2>2. 指令一: 强制数据绑定</h2>
  <a href="url">访问指定站点</a><br><!--不能使用-->
  <a v-bind:href="url">访问指定站点2</a><br>
  <a :href="url">访问指定站点3</a><br>

  <h2>3. 指令二: 绑定事件监听</h2>
  <button v-on:click="handleClick">点我</button>
  <button @click="handleClick">点我2</button>

</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '#app',
    data: {// data的所有属性都会成功vm对象的属性, 而模板页面中可以直接访问
      msg: 'NBA I Love This Game!',
      url: 'http://www.baidu.com'
    },
    methods: {
      handleClick () {
        alert('处理点击')
      }
    }
  })
</script>



1.4. 计算属性和监视
1.4.1. 效果 (03_计算属性和监视/test.html)


1.4.2. 计算属性
1)	在computed属性对象中定义计算属性的方法
2)	在页面中使用{{方法名}}来显示计算的结果
1.4.3. 监视属性
1)	通过通过vm对象的$watch()或watch配置来监视指定的属性
2)	当属性变化时, 回调函数自动调用, 在函数内部进行计算
1.4.4. 计算属性高级
1)	通过getter/setter实现对属性数据的显示和监视
2)	计算属性存在缓存, 多次读取只执行一次getter计算
1.4.5. 编码
<div id="demo">
  姓: <input type="text" placeholder="First Name" v-model="firstName"><br>
  名: <input type="text" placeholder="Last Name" v-model="lastName"><br>
  姓名1(单向): <input type="text" placeholder="Full Name" v-model="fullName1"><br>
  姓名2(单向): <input type="text" placeholder="Full Name" v-model="fullName2"><br>
  姓名3(双向): <input type="text" placeholder="Full Name2" v-model="fullName3"><br>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  var vm = new Vue({
    el: '#demo',
    data: {
      firstName: 'Kobe',
      lastName: 'bryant',
      fullName2: 'Kobe bryant'
    },

    computed: {
    
      fullName: function () {
        return this.firstName + " " + this.lastName
      },
    
      fullName3: {
        get: function () {
          return this.firstName + " " + this.lastName
        },
        set: function (value) {
          var names = value.split(' ')
          this.firstName = names[0]
          this.lastName = names[1]
        }
      }
    },
    
    watch: {
      lastName: function (newVal, oldVal) {
        this.fullName2 = this.firstName + ' ' + newVal
      }
    }
  })

  vm.$watch('firstName', function (val) {
    this.fullName2 = val + ' ' + this.lastName
  })



1.5. class与style绑定
1.5.1. 效果 (04_class与style绑定/test.html)

1.5.2. 理解
1)	在应用界面中, 某个(些)元素的样式是变化的
2)	class/style绑定就是专门用来实现动态样式效果的技术
1.5.3. class绑定
1)	:class='xxx'
2)	表达式是字符串: 'classA'
3)	表达式是对象: {classA:isA, classB: isB}
4)	表达式是数组: ['classA', 'classB']
1.5.4. style绑定
1)	:style="{ color: activeColor, fontSize: fontSize + 'px' }"
2)	其中activeColor/fontSize是data属性
1.5.5. 编码
<style>
  .classA {
    color: red;
  }
  .classB {
    background: blue;
  }
  .classC {
    font-size: 20px;
  }
</style>

<div id="demo">
  <h2>1. class绑定: :class='xxx'</h2>
  <p class="classB" :class="a">表达式是字符串: 'classA'</p>
  <p :class="{classA: isA, classB: isB}">表达式是对象: {classA:isA, classB: isB}</p>
  <p :class="['classA', 'classC']"> 表达式是数组: ['classA', 'classB']</p>

  <h2>2. style绑定</h2>
  <p :style="{color, fontSize}">style="{ color: activeColor, fontSize: fontSize + 'px' }"</p>


  <button @click="update">更新</button>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el : '#demo',
    data : {
      a: 'classA',
      isA: true,
      isB: false,
      color: 'red',
      fontSize: '20px'
    },
    methods : {
      update () {
        this.a = 'classC'
        this.isA = false
        this.isB = true
        this.color =  'blue'
        this.fontSize = '30px'
      }
    }
  })
</script>


1.6. 条件渲染
1.6.1. 效果 (05_条件渲染/test.html)

1.6.2. 条件渲染指令
1)	v-if与v-else
2)	v-show
1.6.3. 比较v-if与v-show
3)	如果需要频繁切换 v-show 较好
4)	当条件不成立时, v-if的所有子节点不会解析(项目中使用)
1.6.4. 编码
<div id="demo">
  <h2 v-if="ok">表白成功</h2>
  <h2 v-else>表白失败</h2>
  <h2 v-show="ok">求婚成功</h2>
  <h2 v-show="!ok">求婚失败</h2>

  <br>
  <button @click="ok=!ok">切换</button>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  var vm = new Vue({
    el: '#demo',
    data: {
      ok: false
    }
  })
</script>

1.7. 列表渲染
1.7.1. 效果 (06_列表渲染/test.html)
       
1)	列表显示指令
数组: v-for / index
对象: v-for / key
2)	列表的更新显示
删除item
替换item
3)	列表的高级处理
列表过滤
列表排序
1.7.2. 编码1
<div id="demo">
  <h2>测试: v-for 遍历数组</h2>
  <ul>
    <li v-for="(p, index) in persons" :key="index">
      {{index}}--{{p.name}}--{{p.age}}
      --
      <button @click="deleteItem(index)">删除</button>
      --
      <button @click="updateItem(index, {name:'Jok',age:15})">更新</button>
    </li>
  </ul>

  <h2>测试: v-for 遍历对象</h2>
  <ul>
    <li v-for="(value, key) in persons[0]">
      {{ key }} : {{ value }}
    </li>
  </ul>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '#demo',
    data: {
      persons: [
        {id: 1, name: 'Tom', age: 13},
        {id: 2, name: 'Jack', age: 12},
        {id: 3, name: 'Bob', age: 14}
      ]
    },

    methods: {
      deleteItem(index) {
        this.persons.splice(index, 1)
      },
      updateItem(index, p) {
        // this.persons[index] = p // 页面不会更新
        this.persons.splice(index, 1, p)
      }
    }
  })
</script>
1.7.3. 编码2
<div id="demo">
  <input type="text" name="searchName" placeholder="搜索指定用户名" v-model="searchName">
  <ul>
    <li v-for="(p, index) in filterPerson" :key="index">
      {{index}}--{{p.name}}--{{p.age}}
    </li>
  </ul>
  <button @click="setOrderType(1)">年龄升序</button>
  <button @click="setOrderType(2)">年龄降序</button>
  <button @click="setOrderType(0)">原本顺序</button>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '#demo',
    data: {
      orderType: 0, //0代表不排序, 1为升序, 2为降序
      searchName: '',
      persons: [
        {id: 1, name: 'Tom', age: 13},
        {id: 2, name: 'Jack', age: 12},
        {id: 3, name: 'Bob', age: 17},
        {id: 4, name: 'Cat', age: 14},
        {id: 4, name: 'Mike', age: 14},
        {id: 4, name: 'Monica', age: 16}
      ]
    },
    methods: {
      setOrderType (orderType) {
        this.orderType = orderType
      }
    },
    computed: {
      filterPerson() {
        let {orderType, searchName, persons} = this
        // 过滤
        persons = persons.filter(p => p.name.indexOf(searchName)!=-1)
        // 排序
        if(orderType!==0) {
          persons = persons.sort(function (p1, p2) {
            if(orderType===1) {
              return p1.age-p2.age
            } else {
              return p2.age-p1.age
            }
          })
        }
        return persons
      }
    }
  })
</script>


1.8. 事件处理
1.8.1. 效果 (07_事件处理/test.html)

1.8.2. 绑定监听:
1)	v-on:xxx="fun"
2)	@xxx="fun"
3)	@xxx="fun(参数)"
4)	默认事件形参: event
5)	隐含属性对象: $event
1.8.3. 事件修饰符
1)	.prevent : 阻止事件的默认行为 event.preventDefault()
2)	.stop : 停止事件冒泡 event.stopPropagation()
1.8.4. 按键修饰符
1)	.keycode : 操作的是某个keycode值的键
2)	.keyName : 操作的某个按键名的键(少部分)
1.8.5. 编码
<div id="example">

  <h2>1. 绑定监听</h2>
  <button v-on:click="test1">Greet</button>
  <button @click="test1">Greet2</button>
  <button @click="test2($event, 'hello')">Greet3</button>

  <h2>2. 事件修饰符</h2>
  <!-- 阻止事件默认行为 -->
  <a href="http://www.baidu.com" @click.prevent="test3">百度一下</a>
  <br/>
  <br/>
  <!-- 停止事件冒泡 -->
  <div style="width: 200px;height: 200px;background: red" @click="test4">
    <div style="width: 100px;height: 100px;background: green" @click.stop="test5"></div>
  </div>

  <h2>3. 按键修饰符</h2>
  <input @keyup.8="test6">
  <input @keyup.enter="test6">
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '#example',
    data: {
      name: 'Vue.js'
    },
    methods: {
      test1 (event) {
        // 方法内 `this` 指向 vm
        // alert('Hello ' + this.name + '!')
        // `event` 是原生 DOM 事件
        alert(event.target.innerHTML)
      },
      test2 (event, msg) {
        alert(event.target.innerHTML + '---' + msg)
      },

      test3() {
        alert('阻止事件的默认行为')
      },
    
      test4() {
        alert('out')
      },
      test5() {
        alert('inner')
      },
    
      test6(event) {
        alert(event.keyCode + '---' + event.target.value)
      }
    }
  })
</script>

1.9. 表单输入绑定
1.9.1. 效果 (08_表单输入绑定/test.html)

1.9.2. 使用v-model对表单数据自动收集
1)	text/textarea
2)	checkbox
3)	radio
4)	select
1.9.3. 编码
<div id="demo">

  <form @submit.prevent="handleSubmit">
    <span>用户名: </span>
    <input type="text" v-model="user.username"><br>

    <span>密码: </span>
    <input type="password" v-model="user.pwd"><br>
    
    <span>性别: </span>
    <input type="radio" id="female" value="female" v-model="user.sex">
    <label for="female">女</label>
    <input type="radio" id="male" value="male" v-model="user.sex">
    <label for="male">男</label><br>
    
    <span>爱好: </span>
    <input type="checkbox" id="basket" value="basketball" v-model="user.likes">
    <label for="basket">篮球</label>
    <input type="checkbox" id="foot" value="football" v-model="user.likes">
    <label for="foot">足球</label>
    <input type="checkbox" id="pingpang" value="pingpang" v-model="user.likes">
    <label for="pingpang">乒乓</label><br>
    
    <span>城市: </span>
    <select v-model="user.cityId">
      <option value="">未选择</option>
      <option v-for="city in allCitys" :value="city.id">
        {{ city.name }}
      </option>
    </select><br>
    <span>介绍: </span>
    <textarea v-model="user.desc" rows="10"></textarea><br><br>
    
    <input type="submit" value="注册">
  </form>

</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  var vm = new Vue({
    el: '#demo',
    data: {
      user: {
        username: '',
        pwd: '',
        sex: 'female',
        likes: [],
        cityId: '',
        desc: '',
      },
      allCitys: [{id: 1, name: 'BJ'}, {id: 2, name: 'SZ'},{id: 4, name: 'SH'}],
    },
    methods: {
      handleSubmit (event) {
        alert(JSON.stringify(this.user))
      }
    }
  })
</script>

1.10. Vue实例生命周期
1.10.1. 效果 (09_Vue实例_生命周期/test.html)

1.10.2. 生命周期流程图


1.10.3. vue生命周期分析
1)	初始化显示
    * beforeCreate()
    * created()
    * beforeMount()
    * mounted()
2)	更新状态: this.xxx = value
    * beforeUpdate()
    * updated()
3)	销毁vue实例: vm.$destory()
    * beforeDestory()
    * destoryed()
1.10.4. 常用的生命周期方法
1)	mounted(): 发送ajax请求, 启动定时器等异步任务
2)	beforeDestory(): 做收尾工作, 如: 清除定时器
1.10.5. 编码
<div>
  <button @click="destoryVue">destory vue</button>
  <p v-show="isShowing">{{msg}}</p>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  var vue = new Vue({
    el: 'div',
    data: {
      msg: '尚硅谷IT教育',
      isShowing: true,
      persons: []
    },
    beforeCreate () {
      console.log('beforeCreate() msg=' + this.msg)
    },
    created () {
      console.log('created() msg='+this.msg)

      this.intervalId = setInterval(() => {
        console.log('-----')
        this.isShowing = !this.isShowing
      }, 1000)
    },
    
    beforeMount () {
      console.log('beforeMount() msg='+this.msg)
    },
    mounted () {
      console.log('mounted() msg='+this.msg)
    },
    
    beforeUpdate() {
      console.log('beforeUpdate isShowing='+this.isShowing)
    },
    updated () {
      console.log('updated isShowing='+this.isShowing)
    },
    
    beforeDestroy () {
      console.log('beforeDestroy() msg='+this.msg)
      clearInterval(this.intervalId)
    },
    
    destroyed () {
      console.log('destroyed() msg='+this.msg)
    },
    
    methods: {
      destoryVue () {
        vue.$destroy()
      }
    }
  })
</script>

1.11. 过渡&动画
1.11.1. 效果 (10_过渡&动画/test.html)
    
1.11.2. vue动画的理解
1)	操作css的trasition或animation
2)	vue会给目标元素添加/移除特定的class
3)	过渡的相关类名
xxx-enter-active: 指定显示的transition
xxx-leave-active: 指定隐藏的transition
xxx-enter/xxx-leave-to: 指定隐藏时的样式


1.11.3. 基本过渡动画的编码
1)	在目标元素外包裹<transition name="xxx">
2)	定义class样式
指定过渡样式: transition
指定隐藏时的样式: opacity/其它
1.11.4. 编码1
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  /* 可以设置不同的进入和离开动画 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>

<div id="demo1">
  <button @click="show = !show">
    Toggle1
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>

<div id="demo2">
  <button @click="show = !show">
    Toggle2
  </button>
  <transition name="slide-fade">
    <p v-if="show">hello</p>
  </transition>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  new Vue({
    el: '#demo1',
    data: {
      show: true
    }
  })

  new Vue({
    el: '#demo2',
    data: {
      show: true
    }
  })
</script>
1.11.5. 编码2
<style>
  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>

<div id="test2">
  <button @click="show = !show">Toggle show</button>
  <br>
  <transition name="bounce">
    <p v-if="show" style="display: inline-block">Look at me!</p>
  </transition>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script>
  new Vue({
    el: '#test2',
    data: {
      show: true
    }
  })
</script>

1.12. 过滤器
1.12.1. 效果 (11_过滤器/test.html)


1.12.2. 理解过滤器
1)	功能: 对要显示的数据进行特定格式化后再显示
2)	注意: 并没有改变原本的数据, 是产生新的对应的数据
1.12.3. 定义和使用过滤器
1)	定义过滤器
    Vue.filter(filterName, function(value[,arg1,arg2,...]){
      // 进行一定的数据处理
      return newValue
    })
2)	使用过滤器
    <div>{{myData | filterName}}</div>
    <div>{{myData | filterName(arg)}}</div>
1.12.4. 编码
<div id="test">
  <p>当前时间为: {{currentTime}}</p>
  <p>当前时间1为: {{currentTime | dateStr}}</p>
  <p>当前时间2为: {{currentTime | dateStr('YYYY-MM-DD')}}</p>
  <p>当前时间3为: {{currentTime | dateStr('HH:mm:ss')}}</p>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript" src="https://cdn.bootcss.com/moment.js/2.19.0/moment.js"></script>
<script>
  // 注册过滤器
  Vue.filter('dateStr', function (value, format) {
    return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
  })

  new Vue({
    el: '#test',
    data: {
      currentTime: new Date()
    }
  })
</script>

1.13. 内置指令与自定义指令
1.13.1. 效果 (12_指令/test.html)

1.13.2. 常用内置指令
1)	v-text : 更新元素的 textContent
2)	v-html : 更新元素的 innerHTML
3)	v-if : 如果为true, 当前标签才会输出到页面
4)	v-else: 如果为false, 当前标签才会输出到页面
5)	v-show : 通过控制display样式来控制显示/隐藏
6)	v-for : 遍历数组/对象
7)	v-on : 绑定事件监听, 一般简写为@
8)	v-bind : 强制绑定解析表达式, 可以省略v-bind
9)	v-model : 双向数据绑定
10)	 ref : 指定唯一标识, vue对象通过$els属性访问这个元素对象
11)	 v-cloak : 防止闪现, 与css配合: [v-cloak] { display: none }
1.13.3. 自定义指令
1)	注册全局指令
  Vue.directive('my-directive', function(el, binding){
    el.innerHTML = binding.value.toupperCase()
  })
2)	注册局部指令
  directives : {
    'my-directive' : {
        bind (el, binding) {
          el.innerHTML = binding.value.toupperCase()
        }
    }
  }
3)	使用指令
  v-my-directive='xxx'
1.13.4. 编码1(内置指令)
<style>
  [v-cloak] {
    display: none
  }
</style>

<div id="example">
  <p v-text="url"></p>
  <p v-html="url"></p>
  <img :id="myid" :src="imageSrc">
  <p>
    <span ref="message">atguigu.com</span>
    <button @click="showMsg">显示左侧文本</button>
  </p>
  <p v-cloak>{{url}}</p>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  alert('模拟加载慢')
  new Vue({
    el: '#example',
    data: {
      url: '<a href="http://www.atguigu.com">尚硅谷</a>',
      myid: 'abc123',
      imageSrc: 'http://cn.vuejs.org/images/logo.png'
    },

    methods: {
      showMsg: function () {
        alert(this.$refs.message.textContent)
      }
    }
  })
</script>

1.13.5. 编码2(自定义指令)
需求: 自定义2个指令
  1. 功能类型于v-text, 但转换为全大写
  2. 功能类型于v-text, 但转换为全小写
<div id="demo1">
  <p v-upper-text="msg"></p>
  <p v-lower-text="msg"></p>
</div>

<div id="demo2">
  <p v-upper-text="msg2"></p>
  <p v-lower-text="msg2"></p> <!--局部指令, 此处不能使用-->
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript">
  //注册全局指令
  Vue.directive('upper-text', function (el, binding) {
    el.innerHTML = binding.value.toUpperCase()
  })

  new Vue({
    el: '#demo1',
    data: {
      msg: 'NBA love this game!'
    },
    directives: { // 注册局部指令
      'lower-text': {
        bind (el, binding) {
          el.innerHTML = binding.value.toLowerCase()
        }
      }
    }
  })

  new Vue({
    el: '#demo2',
    data: {
      msg2: 'I Like You'
    }
  })
</script>

1.14. 自定义插件
1.14.1. 效果 (13_插件/test.html)

1.14.2. 说明
1)	Vue插件是一个包含install方法的对象
2)	通过install方法给Vue或Vue实例添加方法, 定义全局指令等
1.14.3. 编码
1)	插件JS
/**
 * 自定义Vue插件
 */
(function () {
    const MyPlugin = {}
    MyPlugin.install = function (Vue, options) {
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function () {
      alert('Vue函数对象方法执行')
    }
    // 2. 添加全局资源
    Vue.directive('my-directive', function (el, binding) {
      el.innerHTML = "MyPlugin my-directive " + binding.value
    })
    // 3. 添加实例方法
    Vue.prototype.$myMethod = function () {
      alert('vue实例对象方法执行')
    }
    }
    window.MyPlugin = MyPlugin
})()
2)	页面使用插件
<div id="demo">
  <!--使用自定义指令-->
  <p v-my-directive="msg"></p>
</div>

<script type="text/javascript" src="../js/vue.js"></script>
<script type="text/javascript" src="vue-myPlugin.js"></script>
<script type="text/javascript">

  //使用自定义插件
  Vue.use(MyPlugin)

  var vm = new Vue({
    el: '#demo',
    data: {
      msg: 'atguigu'
    }
  })
  //调用自定义的静态方法
  Vue.myGlobalMethod()
  //调用自定义的对象方法
  vm.$myMethod()
</script>

2. 第2章：vue组件化编程
2.1. 模块与组件和模块化与组件化的理解
2.1.1. 模块
1)	理解: 向外提供特定功能的js程序, 一般就是一个js文件
2)	为什么:  js代码更多更复杂
3)	作用: 复用js, 简化js的编写, 提高js运行效率
2.1.2. 组件
1)	理解: 用来实现特定(局部)界面功能效果的代码集合(html/css/js/image)
2)	为什么: 一个界面的功能很复杂
3)	作用: 复用编码, 简化项目编码, 提高运行效率
2.1.3. 模块化
当应用的js都以模块来编写的, 这个应用就是一个模块化的应用
2.1.4. 组件化
当应用是以多组件的方式实现, 这个应用就是一个组件化的应用, 应用的开发方式就是组件化的


2.2. 组件定义与使用1(非单文件)
2.2.1. test.html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

  <div id="components-demo">
    <button-counter></button-counter>
    <button-counter></button-counter>
    <button-counter></button-counter>

    <hr>
    <blog-post
      v-for="post in posts"
      :key="post.id"
      :title="post.title"
    />
  </div>

  <script src="./js/vue.js"></script>
  <script>
    // 定义一个新的组件，名称为 button-counter
    Vue.component('button-counter', {
      data () { // 组件的data配置必须是返回对象的函数
        return {
          count: 0
        }
      },
      template: '<button @click="count++">你点击了 {{ count }} 次。</button>'
    })

    Vue.component('blog-post', {
      props: ['title'], // 声明接收属性
      template: '<h3>{{ title }} <button-counter/> </h3>'
    })
    
    new Vue({ 
      el: '#components-demo',
      data: {
        posts: [
          { id: 1, title: '我的 Vue 旅程222' },
          { id: 2, title: '用 Vue 写博客222' },
          { id: 3, title: 'Vue 如此有趣222' }
        ]
      }
     })
  </script>
</body>
</html>
2.2.2. 问题
1)	模板编写没有提示
2)	没有构建过程, 无法将ES6转换成ES5
3)	不支持组件的CSS

2.3. 组件定义与使用2(单文件组件)
2.3.1. xxx.vue文件的组成(3个部分)
1)	模板页面
  <template>
    页面模板
  </template>
2)	JS模块对象
  <script>
    export default {
      data() {return {}},
      methods: {},
      computed: {},
      components: {}
    }
  </script>
3)	样式
  <style>  
    样式定义
  </style>
2.3.2. 基本使用
1)	引入组件
2)	映射成标签
3)	使用组件标签
<template>
  <HelloWorld></HelloWorld>
  <hello-world></hello-world>
</template>
<script>
  import HelloWorld from './components/HelloWorld'
  export default {
    components: {
      HelloWorld
    }
  }
</script>

2.3.3. 关于标签名与标签属性名书写问题
1)		写法一: 一模一样
2)		写法二: 大写变小写, 并用-连接 
2.4. 组件间通信
2.4.1. 组件间通信基本原则
1)	不要在子组件中直接修改父组件的状态数据
2)	数据在哪, 更新数据的行为(函数)就应该定义在哪
2.5. 组件间通信1: props
2.5.1. 使用组件标签时
	<MyComponent name='tom' :age='3' :setName='setName'></MyComponent >
<my-component name='tom' :age='3' :set-name='setName'></my-component>
2.5.2. 定义MyComponent时
1)	在组件内声明所有的props
2)	方式一: 只指定名称
props: ['name', 'age', 'setName']
3)	方式二: 指定名称和类型
	props: {
	  name: String,
	  age: Number,
	  setNmae: Function
	}
4)	方式三: 指定名称/类型/必要性/默认值
	props: {
	   name: {type: String, required: true, default:xxx, validator: function() {}},
	}
2.5.3. 总结
1)		此方式用于父组件与子组件之间传递数据
2)		所有标签属性都会成为组件对象的属性, 模板页面可以直接引用
3)	问题: 
a.	如果需要向非子后代传递数据必须多层逐层传递
b.	兄弟组件间也不能直接props通信, 必须借助父组件才可以
2.5.4. 组件之间的关系
1)	父子
2)	祖孙
3)	兄弟
4)	其它
2.5.5. vue组件间通信方式
1)	props
2)		vue的自定义事件  
3)		全局事件总线
4)	消息订阅与发布
5)		slot
6)		vuex(后面单独讲)
2.6. 组件间通信2: vue自定义事件
2.6.1. vm与组件对象的关系


2.6.2. 绑定事件监听
<Header @addTodo="addTodo"/>
或者
<Header ref="header"/>
this.$refs.header.$on('addTodo', this.addTodo)

2.6.3. 触发事件
this.$emit('addTodo', todo)

2.6.4. 总结
1. 用来实现子组件向父组件通信的方式, 功能类似于函数类型的props
2. 隔代组件或兄弟组件间通信此种方式不合适
3. 实现流程
(1)	父组件: 
①	组件标签属性或mounted(): 给子组件对象绑定事件监听, 用于接收数据
②	在beforeDestroy(): 通过子组件对象解绑对应的事件监听
(2)	子组件: 通过当前组件对象分发事件, 传递数据值
2.7. 组件间通信3: 全局事件总线
2.7.1. 理解
1)	Vue原型对象上包含事件处理的方法
a.	$on(eventName, listener): 绑定自定义事件监听
b.	$emit(eventName, data): 分发自定义事件
c.	$off(eventName): 解绑自定义事件监听
d.	$once(eventName, listener): 绑定事件监听, 但只能处理一次
2)	所有组件对象的原型对象的原型对象就是Vue的原型对象
a.	所有组件对象都能看到Vue原型对象上的属性和方法
b.	Vue.prototype.$bus = new Vue(), 所有的组件对象都能看到$bus这个属性对象
3)	全局事件总线
a.	包含事件处理相关方法的对象(只有一个)
b.	所有的组件都可以得到
2.7.2. Vue中全局事件总线_语法分析

2.7.3. Vue中全局事件总线_流程分析

2.7.4. 指定事件总线对象
new Vue({
  beforeCreate () { // 尽量早的执行挂载全局事件总线对象的操作
    Vue.prototype.$globalEventBus = this
  },
}).$mount('#root')

2.7.5. 绑定事件监听
this.$globalEventBus.$on('deleteTodo', this.deleteTodo)

2.7.6. 分发事件监听
this.$globalEventBus.$emit('deleteTodo', this.index)
2.7.7. 解绑事件监听
this.$globalEventBus.$off('deleteTodo')

2.7.8. 总结
1. 全局事件总线是任意关系的组件间通信(传值/数据)的解决方案
2. 全局事件总线是一个对象, 有事件处理的相关方法, 在vue中就是vm对象
3. 实现流程
(1)	将新创建的vm或最外层已有的vm作为总线对象保存到Vue的原型对象上
(2)	需要传值/数据的组件: 得到总线对象, 调用其$emit()分发事件, 携带数据
(3)	需要接收消息/数据的组件: 
①	在mounted()中: 得到总线对象, 调用其$on()绑定监听, 接收数据
②	在beforeDestroy()中: 得到总线对象, 调用其$off()解绑监听
2.8. 组件间通信4: 消息订阅(subscribe)与发布(publish)
2.8.1. 理解
1. 这种方式的思想与全局事件总线很相似
2. 它包含以下操作:
(1)	订阅消息      --对应绑定事件监听
(2)	发布消息      --分发事件
(3)	取消消息订阅  --解绑事件监听
3. 需要引入一个消息订阅与发布的第三方实现库: PubSubJS
2.8.2. 使用PubSubJS
1. 在线文档: https://github.com/mroderick/PubSubJS
2. 下载: npm install -S pubsub-js
3. 相关语法
(1)	import PubSub from 'pubsub-js'  // 引入
(2)	PubSub.subscribe(‘msgName’, functon(msgName, data){ })  // 订阅消息, 返回token
(3)	PubSub.publish(‘msgName’, data): 发布消息, 触发订阅的回调函数调用
(4)	PubSub.unsubscribe(token/msgName): 取消消息的订阅

2.8.3. 总结
1. 消息订阅与发布与全局事件总线一样都可以实现任意组件间通信
2. 但需要额外引入第三方实现库, 而全局事件总线不用, 一般在vue项目中不用
3. 实现流程
(1)	在接收数据的组件: 
①	mounted(): 订阅消息, 在回调函数中接收数据并处理
②	beforeDestroy(): 取消订阅
(2)	在发送数据的组件: 发布消息
2.9. 组件间通信5: slot
2.9.1. 理解
此方式用于父组件向子组件传递`带数据的标签`
2.9.2. 命名插槽与默认插槽
1. 子组件: Child.vue
<div class="container">
  <header>
    <slot name="header"></slot>  <!--命名插槽-->
  </header>
  <main>
    <slot></slot> <!--默认插槽-->
  </main>
  <footer>
    <slot name="footer"></slot> <!--命名插槽-->
  </footer>
</div>

2. 父组件: Parent.vue
<Child>
  <template slot="header">
    <h1>这里是一个页面标题</h1>
  </template>

  <p>main 内容的一个段落。</p>
  <p>main 内容的另一个段落。</p>

  <p slot="footer">这里是一些联系信息</p>
</Child>

2.9.3. 作用域插槽
1. 子组件: todo-list.vue
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    <!-- 将 `todo` 数据对象传递给父组件 -->
    <slot :todo="todo">
      <!-- 这里是备胎内容(fallback content) -->
      {{ todo.text }}
    </slot>
  </li>
</ul>


2. 父组件: Parent.vue
<todo-list :todos="todos">
    <!-- 用 `slotProps` 接收子组件的slot指定的数据对象 -->
<!-- 为 todo items 定义一个模板，通过 `slotProps` 访问每个 todo 对象 -->
  <template slot-scope="slotProps">
    <span v-if="slotProps.todo.isComplete">✓</span>
    {{ slotProps.todo.text }}
  </template>
</todo-list>

2.9.4. 总结
1. 当一个组件有不确定的结构时, 就需要使用slot技术了
2. 注意: 插槽内容是在父组件中编译后, 再传递给子组件
3. 如果决定结构的数据在父组件, 那用默认slot或命名命名slot
(1)	当只有一个不确定的结构时, 可以使用默认slot
(2)	当有多个不确定的结构时, 可以使用命名slot
4. 如果决定结构的数据在子组件, 那需要使用作用域slot
2.10. demo1: comment manage

2.11. demo2: todo list

3. 第3章：vue-ajax
3.1. vue项目中常用的2个ajax库
3.1.1. vue-resource
vue插件, 非官方库, vue1.x使用广泛
3.1.2. axios
通用的ajax请求库, 官方推荐, vue2.x使用广泛
3.2. vue-resource的使用
3.2.1. 在线文档
https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
3.2.2. 下载
npm install vue-resource --save
3.2.3. 编码
// 引入模块
import VueResource from 'vue-resource'
// 使用插件
Vue.use(VueResource)

// 通过vue/组件对象发送ajax请求
this.$http.get('/someUrl').then((response) => {
  // success callback
  console.log(response.data) //返回结果数据
}, (error) => {
  // error callback
  console.log(error.statusText) //错误信息
})

3.3. axios的使用
3.3.1. 效果

3.3.2. 在线文档
https://github.com/axios/axios
3.3.3. 下载: 
npm install axios --save
3.3.4. 编码
// 引入模块
import axios from 'axios'

// 发送ajax请求
axios.get(url)
  .then(response => {
    console.log(response.data) // 得到返回结果数据
  })
  .catch(error => {
	console.log(error.message)
  })

3.4. 测试接口
接口1: https://api.github.com/search/repositories?q=v&sort=stars
接口2: https://api.github.com/search/users?q=aa
3.5. demo3: github users


4. 第4章：vue UI组件库
4.1. 常用的vue UI组件库
4.1.1. 移动端UI组件库
1)	Vant  https://youzan.github.io/vant/#/zh-CN/
2)	Cube UI  https://didi.github.io/cube-ui/#/zh-CN
3)	Mint UI  http://mint-ui.github.io/ (经常不能访问)
4.1.2. PC端UI组件库
4)	Element UI  https://element.eleme.cn/#/zh-CN
5)	IView UI  https://www.iviewui.com/
4.2. 使用 Element UI
4.2.1. 下载
npm i element-ui -S

4.2.2. 完整引入Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

4.2.3. 使用UI组件

<template>
  <div class="app">
    <el-button type="primary">主要按钮</el-button>
    <el-button type="danger" @click="handleClick">警告按钮(删除)</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {

      handleClick () {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })     
        })
      }
    }
  }
</script>

<style scoped>
  .app {
    margin: 20px;
  }
</style>

4.2.4. 实现按需打包
1. 下载
npm install babel-plugin-component -D

2. 添加babel相关配置: webpack.config.js
plugins: [
    [
    "component",  // 为babel-plugin-components配置
    {
      "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk"
    }
    ]
] // 一旦我们需要一个另外babel插件, 需要在此配置
4.2.5. Element UI组件分类
1)	标签组件
2)	非标签组件(函数/对象)
5. 第5章：vue-router
5.1. 相关理解
5.1.1. vue-router的理解
1)	vue的一个插件库
2)		专门用来实现一个SPA应用
3)		基于vue的项目基本都会用到此库
4)	中文文档: http://router.vuejs.org/zh-cn/
5)	下载: npm install vue-router -S
5.1.2. SPA的理解
1)	单页Web应用（single page web application，SPA）
2)		整个应用只有一个完整的页面
3)		点击页面中的链接不会刷新页面, 本身也不会向服务器发请求
4)		当点击路由链接时, 只会做页面的局部更新
5)		数据都需要通过ajax请求获取, 并在前端异步展现
5.1.3. 路由的理解
1)	什么是路由?
a.	一个路由就是一个映射(对应)关系(key:value)
b.	key为路由路径path, value可能是function/component
2)	路由分类
a.	后台路由: node服务器端路由, value是function, 用来处理客户端提交的请求并返回一个响应数据
b.	前台路由: 浏览器端路由, value是component, 当请求的是路由path时, 浏览器端没有发送http请求, 但界面会更新显示对应的组件 
3)	后台路由
a.	注册路由: 
a)	app.get(path, function(req, res))
b)	router.get(path, function(req, res))
b.	当node接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据
4)		前端路由
a.	注册路由
{
        	path: '/about',
        	component: About
      	},
{
        	path: '/home,
        	component: Home
      	},

b.	当浏览器的path变为/about时, 当前路由组件就会变为About组件

5.1.4. 相关API说明
1)	VueRouter(): 用于创建路由器的构建函数
    new VueRouter({
      // 多个配置项
    })
2)	路由配置
    routes: [
      { // 一般路由
        path: '/about',
        component: About
      },
      { // 自动跳转路由
        path: '/', 
        redirect: '/about'
      }
    ]
3)	注册路由器
	import router from './router'
	new Vue({
		router
	})
4)	使用路由组件标签
	1. <router-link>: 用来生成路由链接
		<router-link to="/xxx">Go to XXX</router-link>
	2. <router-view>: 用来显示当前路由组件界面
		<router-view></router-view>
5.2. 基本路由
5.2.1. 效果

5.2.2. 路由组件
Home.vue
About.vue

5.2.3. 应用组件: App.vue
<div>
      <!--路由链接-->
      <router-link to="/about">About</router-link>
      <router-link to="/home">Home</router-link>
      <!--用于渲染当前路由组件-->
      <router-view></router-view>  
</div>


5.2.4. 路由器模块: src/router/index.js
export default new VueRouter({
      routes: [
        {
          path: '/',
          redirect: '/about'
        },
        {
          path: '/about',
          component: About
        },
        {
          path: '/home',
          component: Home
        }
      ]
})

5.2.5. 注册路由器: main.js
import Vue from 'vue'
import router from './router'
// 创建vue配置路由器
new Vue({
   el: '#app',
   router,
   render: h => h(app)
})

5.2.6. 优化路由器配置
    linkActiveClass: 'active', // 指定选中的路由链接的class

5.2.7. 总结: 编写使用路由的3步
1)	定义路由组件
2)	注册路由
3)		使用路由
	<router-link>
	<router-view>
5.3. 嵌套路由
5.3.1. 效果

5.3.2. 子路由组件
News.vue
Message.vue
5.3.3. 配置嵌套路由: router.js
    path: '/home',
    component: home,
    children: [
      {
        path: 'news',
        component: News
      },
      {
        path: 'message',
        component: Message
      }
    ]
5.3.4. 路由链接: Home.vue
    <router-link to="/home/news">News</router-link>
<router-link to="/home/message">Message</router-link>
<router-view></route-view>
5.4. 向路由组件传递数据
5.4.1. 效果

5.4.2. 方式1: 路由路径携带参数(param/query)
1)	配置路由
      children: [
        {
          path: 'detail/:id',
          component: MessageDetail
        }
      ]
2)	路由路径
      <router-link :to="'/home/message/detail/'+m.id">{{m.title}}</router-link>
3)	路由组件中读取请求参数
      this.$route.params.id

5.4.3. 方式2: <router-view>属性携带数据
    <router-view :msg="msg"></router-view>
5.5. 缓存路由组件对象
5.5.1. 理解
1)	默认情况下, 被切换的路由组件对象会死亡释放, 再次回来时是重新创建的
2)	如果可以缓存路由组件对象, 可以提高用户体验
5.5.2. 编码实现
<keep-alive>
<router-view></router-view>
</keep-alive>	
5.6. 编程式路由导航
5.6.1. 效果

5.6.2. 相关API
1)	this.$router.push(path): 相当于点击路由链接(可以返回到当前路由界面)
2)	this.$router.replace(path): 用新路由替换当前路由(不可以返回到当前路由界面)
3)	this.$router.back(): 请求(返回)上一个记录路由
4)	this.$router.go(-1): 请求(返回)上一个记录路由
5)	this.$router.go(1): 请求下一个记录路由
6. 第6章：vuex
6.1. vuex理解
6.1.1. vuex是什么
1)	github站点: https://github.com/vuejs/vuex
2)	在线文档: https://vuex.vuejs.org/zh-cn/
3)	简单来说: 对vue应用中多个组件的共享状态进行集中式的管理(读/写)
6.1.2. 状态自管理应用
1)	state: 驱动应用的数据源
2)	view: 以声明方式将state映射到视图
3)	actions: 响应在view上的用户输入导致的状态变化(包含n个更新状态的方法)

6.1.3. 多组件共享状态的问题
1)	多个视图依赖于同一状态
2)	来自不同视图的行为需要变更同一状态
3)	以前的解决办法
a.	将数据以及操作数据的行为都定义在父组件
b.	将数据以及操作数据的行为传递给需要的各个子组件(有可能需要多级传递)
4)	vuex就是用来解决这个问题的

6.2. vuex核心概念和API
6.2.1. state
1)	vuex管理的状态对象
2)	它应该是唯一的
const state = {
xxx: initValue
}
6.2.2. mutations
1)	包含多个直接更新state的方法(回调函数)的对象
2)	谁来触发: action中的commit('mutation名称')
3)	只能包含同步的代码, 不能写异步代码
const mutations = {
    yyy (state, {data1}) { 
        // 更新state的某个属性
    }
}
6.2.3. actions
1)	包含多个事件回调函数的对象
2)	通过执行: commit()来触发mutation的调用, 间接更新state
3)	谁来触发: 组件中: $store.dispatch('action名称', data1)  // 'zzz'
4)	可以包含异步代码(定时器, ajax)
const actions = {
zzz ({commit, state}, data1) {
commit('yyy', {data1})
}
}
6.2.4. getters
1)	包含多个计算属性(get)的对象
2)	谁来读取: 组件中: $store.getters.xxx
const getters = {
mmm (state, getters) {
  return ...
}
}
6.2.5. modules
1)	包含多个module
2)	一个module是一个store的配置对象
3)	与一个组件(包含有共享数据)对应
6.2.6. 向外暴露store对象
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
6.2.7. 组件中
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
    computed: {
        ...mapState(['xxx']),
        ...mapGetters(['mmm']),
    }
    methods: mapActions(['zzz'])
}

{{xxx}} {{mmm}} @click="zzz(data)"
6.2.8. 映射store
import store from './store'
new Vue({
    store 
})
6.2.9. store对象
1)	所有用vuex管理的组件中都多了一个属性$store, 它就是一个store对象
2)	属性:
state: 注册的state对象
getters: 注册的getters对象
3)	方法:
dispatch(actionName, data): 分发调用action 
6.3. demo1: 计数器

6.3.1. store.js
/**
 * vuex的store对象模块
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
state对象
  类似于data
 */
const state = {
  count: 0   // 初始化状态数据
}

/*
 mutations对象
  包含个方法: 能直接更新state
  一个方法就是一个mutation
  mutation只能包含更新state的同步代码, 也不会有逻辑
  mutation由action触发调用: commit('mutationName')
 */
const mutations = {
  INCREMENT(state) {
    state.count++
  },
  DECREMENT (state) { // ctrl + shift + x
    state.count--
  }
}

/*
actions对象
 包含个方法: 触发mutation调用, 间接更新state
 一个方法就是一个action
 action中可以有逻辑代码和异步代码
 action由组件来触发调用: this.$store.dispatch('actionName')
 */
const actions = {
  increment ({commit}) {
    commit('INCREMENT')
  },

  decrement ({commit}) {
    commit('DECREMENT')
  },

  incrementIfOdd ({commit, state}) {
    if(state.count%2===1) {
      commit('INCREMENT')
    }
  },

  incrementAsync ({commit}) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 1000)
  }
}

/*
getters对象
  包含多个get计算计算属性方法
 */
const getters = {
  oddOrEven (state) {
    return state.count%2===0 ? '偶数' : '奇数'
  },
  count (state) {
    return state.count
  }
}

// 向外暴露store实例对象
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

6.3.2. main.js
import Vue from 'vue'
import app from './app1.vue'
// import app from './app.vue'
import store from './store'

new Vue({
  el: '#app',
  render: h => h(app),
  store  // 所有组件都多个一个属性: $store
})

6.3.3. app.vue(未优化前)
<template>
  <div>
    <p>clicked: {{$store.state.count}} times, count is {{oddOrEven}}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script>
  export default {
    computed: {
      oddOrEven () {
        return this.$store.getters.oddOrEven
      }
    },

    methods: {
      increment () {
        this.$store.dispatch('increment')
      },
      decrement () {
        this.$store.dispatch('decrement')
      },
      incrementIfOdd () {
        this.$store.dispatch('incrementIfOdd')
      },
      incrementAsync () {
        this.$store.dispatch('incrementAsync')
      }
    }
  }
</script>

<style>

</style>

6.3.4. app2.vue(优化后)
<template>
  <div>
    <p>clicked: {{count}} times, count is {{oddOrEven2}}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    computed: mapGetters({  // 名称不一样
      oddOrEven2: 'oddOrEven',
      count: 'count'
    }),

    methods: mapActions(['increment', 'decrement', 'incrementIfOdd', 'incrementAsync']) // 名称一样
  }
</script>

<style>

</style>


6.4. demo2: github users search
6.4.1. store/types.js
/* 
包含n个mutation函数名常量模块
*/
export const REQUESTING = 'requesting'
export const REQ_SUCCESS = 'req_success'
export const REQ_ERROR = 'req_error'

6.4.2. store/mutations.js
/* 
一个包含n个用于直接更新状态数据的方法的对象模块
*/
import {
  REQUESTING,
  REQ_ERROR,
  REQ_SUCCESS
} from './mutation-types'

export default {
  // 请求中
  [REQUESTING] (state) {
    state.firstView = false
    state.loading = true
  },

  // 请求成功
  // [REQ_SUCCESS] (state, users) {
  [REQ_SUCCESS] (state, {users}) {
    state.loading = false
    state.users = users
  },

  // 请求失败
  // [REQ_ERROR] (state, errorMsg) {
  [REQ_ERROR] (state, {errorMsg}) {
    state.loading = false
    state.errorMsg = errorMsg
  }
}


6.4.3. store/actions.js
/* 
一个包含n个用于间接更新状态数据的方法的对象模块
可以包含异步和逻辑处理代码
*/
import axios from 'axios'
import {
  REQUESTING,
  REQ_ERROR,
  REQ_SUCCESS
} from './mutation-types'

export default {

  /* 
  搜索的异步action: 包含了异步代码的action
  */
  async search ({commit}, searchName) {
    // 在发请求前, 提交请求中的mutation
    commit(REQUESTING)

    // 发异步ajax请求获取数据
    try {
      const response = await axios('/gh/search/users', {params: {q: searchName}})
      // 如果成功了, 提交请求成功的mutation
      const result = response.data
      const users = result.items.map(item => ({
        username: item.login,
        url: item.html_url,
        avatar_url: item.avatar_url 
      }))
      // commit(REQ_SUCCESS, users) // 传递数据本身
      commit(REQ_SUCCESS, {users}) // 传递包含数据的对象
    } catch (error) { // 如果失败了, 提交请求失败的mutation
      // commit(REQ_ERROR, error.message)
      commit(REQ_ERROR, {errorMsg: error.message})
    }
  }
}
	

6.4.4. store/getters.js
/* 
一个包含n个基于state的getter计算属性方法的对象模块
*/
export default {

}

6.4.5. store/index.js
/* 
vuex最核心的管理对象store
*/
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})


6.4.6. components/App.vue
<template>
  <div class="container">
    <Search/>
    <Main/>
  </div>
</template>

<script type="text/ecmascript-6">
  import Search from './components/Search'
  import Main from './components/Main'
  export default {
    components: {
      Main,
      Search
    }
  }
</script>

<style scoped>


</style>


6.4.7. components/Search.vue
<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="searchName"/>
      <button @click="search">Search</button>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        searchName: ''
      }
    },

    methods: {
      search () {
        const searchName = this.searchName.trim()
        if (searchName) {
          // 触发异步action search调用
          this.$store.dispatch('search', searchName)
    
          this.searchName = ''
        }
      }
    }
  }
</script>

<style scoped>


</style>


6.4.8. components/Main.vue
<template>
  <div>
    <h2 v-if="firstView">请输入关键字进行搜索</h2>
    <h2 v-else-if="loading">正在请求中......</h2>
    <h2 v-else-if="errorMsg">{{errorMsg}}</h2>
    <div class="row" v-else>
      <div class="card" v-for="(user, index) in users" :key="user.username">
        <a :href="user.url" target="_blank">
          <img :src="user.avatar_url" style='width: 100px'/>
        </a>
        <p class="card-text">{{user.username}}</p>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  export default {
    name: 'Main', // 组件的标识名称 
    computed: {
      ...mapState(['firstView', 'loading', 'errorMsg', 'users'])
    }
  }
</script>

<style scoped>
  .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
  }

  .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
  }

  .card-text {
    font-size: 85%;
  }

</style>


6.4.9. main.js
import Vue from 'vue'
import App from './App' // 引入自定义组件
import store from './store'

new Vue({

  // 注册局部组件
  components: { // 注册组件(后面才能写组件标签)
    App: App
  },
  template: '<App/>',

  store, // 所有组件都能通过$store看到store对象
}).$mount('#root')


6.5. vuex结构分析

7. 第7章：vue源码分析
7.1. 说明
1)	分析vue作为一个MVVM框架的基本实现原理
	数据代理
	模板解析
数据绑定-->双向数据绑定
2)	不直接看vue.js的源码
3)	剖析github上某基友仿vue实现的mvvm库
4)	地址: https://github.com/DMQ/mvvm
7.2. 准备知识
1)	[].slice.call(lis): 将伪数组转换为真数组
2)	node.nodeType: 得到节点类型
3)	Object.defineProperty(obj, propName, {}): 给对象添加/修改属性(指定描述符)
	configurable: true/false  是否可以重新define
	enumerable: true/false 是否可以枚举(for..in / keys())
	value: 指定初始值
	writable: true/false value是否可以修改
	get: 回调函数, 用来得到当前属性值
	set: 回调函数, 用来监视当前属性值的变化
4)	Object.keys(obj): 得到对象自身可枚举的属性名的数组
5)	DocumentFragment: 文档碎片(高效批量更新多个节点)
6)	obj.hasOwnProperty(prop): 判断prop是否是obj自身的属性
7.3. 数据代理
1)	数据代理: 通过一个对象代理对另一个对象(在前一个对象内部)中属性的操作(读/写)
2)	vue数据代理: 通过vm对象来代理data对象中所有属性的操作
3)	好处: 更方便的操作data中的数据
4)	基本实现流程
a.	通过Object.defineProperty()给vm添加与data对象的属性对应的属性描述符
b.	所有添加的属性都包含getter/setter
c.	getter/setter内部去操作data中对应的属性数据
7.4. 模板解析
7.4.1. 模板解析的基本流程
1)	将el的所有子节点取出, 添加到一个新建的文档fragment对象中
2)	对fragment中的所有层次子节点递归进行编译解析处理
* 对大括号表达式文本节点进行解析
* 对元素节点的指令属性进行解析
* 事件指令解析
* 一般指令解析
3)	将解析后的fragment添加到el中显示
7.4.2. 模板解析(1): 大括号表达式解析
1)	根据正则对象得到匹配出的表达式字符串: 子匹配/RegExp.$1  name
2)	从data中取出表达式对应的属性值
3)	将属性值设置为文本节点的textContent
7.4.3. 模板解析(2): 事件指令解析
1)	从指令名中取出事件名
2)	根据指令的值(表达式)从methods中得到对应的事件处理函数对象
3)	给当前元素节点绑定指定事件名和回调函数的dom事件监听
4)	指令解析完后, 移除此指令属性
7.4.4. 模板解析(3): 一般指令解析
1)	得到指令名和指令值(表达式)   text/html/class  msg/myClass
2)	从data中根据表达式得到对应的值
3)	根据指令名确定需要操作元素节点的什么属性
* v-text---textContent属性
* v-html---innerHTML属性
* v-class--className属性
4)	将得到的表达式的值设置到对应的属性上
5)	移除元素的指令属性

7.5. 数据绑定
7.5.1. 数据绑定
一旦更新了data中的某个属性数据, 所有界面上直接使用或间接使用了此属性的节点都会更新

7.5.2. 数据劫持
1)	数据劫持是vue中用来实现数据绑定的一种技术
2)	基本思想: 通过defineProperty()来监视data中所有属性(任意层次)数据的变化, 一旦变化就去更新界面
7.5.3. 四个重要对象
1)	Observer
a.	用来对data所有属性数据进行劫持的构造函数
b.	给data中所有属性重新定义属性描述(get/set)
c.	为data中的每个属性创建对应的dep对象
2)	Dep(Depend)
a.	data中的每个属性(所有层次)都对应一个dep对象
b.	创建的时机:
		* 在初始化define data中各个属性时创建对应的dep对象
		* 在data中的某个属性值被设置为新的对象时
c.	对象的结构
		{
		  id, // 每个dep都有一个唯一的id
		  subs //包含n个对应watcher的数组(subscribes的简写)
		}
d.	subs属性说明
* 当watcher被创建时, 内部将当前watcher对象添加到对应的dep对象的subs中
		* 当此data属性的值发生改变时, subs中所有的watcher都会收到更新的通知, 
从而最终更新对应的界面
3)	Compile
a.	用来解析模板页面的对象的构造函数(一个实例)
b.	利用compile对象解析模板页面
c.	每解析一个表达式(非事件指令)都会创建一个对应的watcher对象, 并建立watcher与dep的关系
d.	complie与watcher关系: 一对多的关系
4)	Watcher
a.	模板中每个非事件指令或表达式都对应一个watcher对象
b.	监视当前表达式数据的变化
c.	创建的时机: 在初始化编译模板时
d.	对象的组成
		{
			vm,  //vm对象
		    exp, //对应指令的表达式
		    cb, //当表达式所对应的数据发生改变的回调函数
		    value, //表达式当前的值
		    depIds //表达式中各级属性所对应的dep对象的集合对象
		          //属性名为dep的id, 属性值为dep
		}
			

5)	总结: dep与watcher的关系: 多对多
a.	data中的一个属性对应一个dep, 一个dep中可能包含多个watcher(模板中有几个表达式使用到了同一个属性)
b.	模板中一个非事件表达式对应一个watcher, 一个watcher中可能包含多个dep(表达式是多层: a.b)
c.	数据绑定使用到2个核心技术
		* defineProperty()
		* 消息订阅与发布
7.6. MVVM原理图分析

7.7. 双向数据绑定
1)	双向数据绑定是建立在单向数据绑定(model==>View)的基础之上的
2)	双向数据绑定的实现流程:
a.	在解析v-model指令时, 给当前元素添加input监听
b.	当input的value发生改变时, 将最新的值赋值给当前表达式所对应的data属性
8. 第8章：自定义全局事件总线(mini-EventBus)
8.1. 相关语法
1)	EventBus: 包含所有功能的全局事件总线对象
2)	EventBus.on(eventName, listener): 绑定事件监听
3)	EventBus.emit(eventName, data): 分发事件
4)	EventBus.off(eventName): 解绑事件监听
8.2. 实现整体结构
/* 
自定义全局事件总线对象模块
*/

(function (window) {
  const eventBus = {}

  let listenerContainer = {}

  eventBus.on = function (eventName, listener) {

  }

  eventBus.emit = function (eventName, data) {

  }

  eventBus.off = function (eventName) {
  }

  window.eventBus = eventBus
})(window)

8.3. 实现所有语法
/* 
自定义全局事件总线对象模块
*/

(function (window) {
  const eventBus = {}

  let listenerContainer = {}

  eventBus.on = function (eventName, listener) {
    const listeners = listenerContainer[eventName]
    if (listeners) {
      listeners.push(listener)
    } else {
      listenerContainer[eventName] = [listener]
    }
  }

  eventBus.emit = function (eventName, data) {
    const listeners = listenerContainer[eventName]
    if (listeners && listeners.length>0) {
      listeners.forEach(listener => listener(data))
    }
  }

  eventBus.off = function (eventName) {
    if (eventName===undefined) {
      listenerContainer = {}
    } else {
      delete listenerContainer[eventName]
    }
  }

  window.eventBus = eventBus
})(window)

8.4. 测试
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

<!--   <script src="https://cdn.bootcss.com/pubsub-js/1.7.0/pubsub.js"></script> -->
  <script src="./pub-sub.js"></script>
  <script>
    /* 
    PubSub的语法:
    1. token subscribe(msgName, callback): 订阅消息, 并返回一个标识token
    2. publish(msgName, data): 异步发布消息
    3. publishSync(msgName, data): 同步发布消息
    4. unsubscribe(flag): 根据flag取消订阅
    */

    PubSub.subscribe('add', (msg, data) => {
      console.log('add1()', data)
    })
    const token = PubSub.subscribe('add', (msg, data) => {
      console.log('add2()', data)
    })
    console.log('token', token) // uid_1
    PubSub.subscribe('delete', (msg, data) => {
      console.log('delete()', data)
    })
    
    // PubSub.unsubscribe()
    // PubSub.unsubscribe(token)
    // PubSub.unsubscribe('add')
    
    // PubSub.publish('add', 'atguigu')
    PubSub.publishSync('add', 'atguigu')
    console.log('publish()之后')
    PubSub.publish('delete', 'baidu')

  </script>
</body>
</html>

9. 第9章：自定义消息机制(mini-PubSub)
9.1. 相关语法
1)	PubSub: 包含所有功能的订阅/发布消息的管理者
2)	PubSub.subscribe(msg, subscriber): 订阅消息: 指定消息名和订阅者回调函数
3)	PubSub.publish(msg, data): 异步发布消息: 指定消息名和数据
4)	PubSub.publishSync(msg, data): 同步发布消息: 指定消息名和数据
5)	PubSub.unsubscribe(flag): 取消订阅: 根据标识取消某个或某些消息的订阅
9.2. 实现整体结构
/* 
定义一个PubSub对象模块
*/
(function (window) {
    // 定义PubSub对象
    const PubSub = {}
    // 用来保存所有待处理的回调函数的容器
    /* 
    {
      "add": {
        uid_1: callback1,
        uid_2: callback2
      },
      "delete": {
        uid_3: callback3
      }
    }
    */
    let callbackContainer = {}
    let id = 0

  // 1. token subscribe(msgName, callback): 订阅消息, 并返回一个标识token
  PubSub.subscribe = function (msg, callback) {
    // 读取保存callback的对应小容器, 如果不存在, 创建一个新的
    let callbacks = callbackContainer[msg]
    if (!callbacks) {
      callbacks = {}
      callbackContainer[msg] = callbacks
    }

    // 将callback添加到小容器
    const token = `uid_${msg}_${++id}`
    callbacks[token] = callback
    
    // 返回token
    return token
  }

  // 2. publish(msgName, data): 异步发布消息
  PubSub.publish = function (msg, data) {
    // 得到指定消息对应的回调小容器
    const callbacks = callbackContainer[msg]
    // 如果存在, 遍历对象的所有属性值函数并异步执行它
    if (callbacks) {
      Object.values(callbacks).forEach(callback => {
        setTimeout(() => {
          callback(msg, data) 
        })
      })
    }

  }

  // 3. publishSync(msgName, data): 同步发布消息
  PubSub.publishSync = function (msg, data) {
    // 得到指定消息对应的回调小容器
    const callbacks = callbackContainer[msg]
    // 如果存在, 遍历对象的所有属性值函数并同步执行它
    if (callbacks) {
      Object.values(callbacks).forEach(callback => {
        callback(msg, data) 
      })
    }
  }

  /* 
  4. unsubscribe(flag): 根据flag取消订阅
        1. flag没有指定: 取消所有
            2. flag是一个token值: 取消对应的一个回调
                3. flag是msgName: 取消对应的所有
          */
          PubSub.unsubscribe = function (flag) {

    if (flag===undefined) {
      callbackContainer = {}
    } else if (typeof flag==='string' && flag.indexOf('uid_')===0) {
      
      Object.values(callbackContainer).forEach(callbacks => {
        delete callbacks[flag]
      })
    
      // const msg = flag.split('_')[1]
      // callbackContainer[msg] && delete callbackContainer[msg][flag]
    } else {
      delete callbackContainer[flag]
    }
  }

  // 向外暴露PubSub
  window.PubSub = PubSub
})(window)

9.3. 实现所有语法
/* 
定义一个PubSub对象模块
*/
(function (window) {
  // 定义PubSub对象
  const PubSub = {}
  // 用来保存所有待处理的回调函数的容器
  /* 
    {
      "add": {
        uid_1: callback1,
        uid_2: callback2
      },
      "delete": {
        uid_3: callback3
      }
    }
  */
  let callbackContainer = {}
  let id = 0

  // 1. token subscribe(msgName, callback): 订阅消息, 并返回一个标识token
  PubSub.subscribe = function (msg, callback) {
    // 读取保存callback的对应小容器, 如果不存在, 创建一个新的
    let callbacks = callbackContainer[msg]
    if (!callbacks) {
      callbacks = {}
      callbackContainer[msg] = callbacks
    }

    // 将callback添加到小容器
    const token = `uid_${msg}_${++id}`
    callbacks[token] = callback
    
    // 返回token
    return token
  }

  // 2. publish(msgName, data): 异步发布消息
  PubSub.publish = function (msg, data) {
    // 得到指定消息对应的回调小容器
    const callbacks = callbackContainer[msg]
    // 如果存在, 遍历对象的所有属性值函数并异步执行它
    if (callbacks) {
      Object.values(callbacks).forEach(callback => {
        setTimeout(() => {
          callback(msg, data) 
        })
      })
    }

  }

  // 3. publishSync(msgName, data): 同步发布消息
  PubSub.publishSync = function (msg, data) {
    // 得到指定消息对应的回调小容器
    const callbacks = callbackContainer[msg]
    // 如果存在, 遍历对象的所有属性值函数并同步执行它
    if (callbacks) {
      Object.values(callbacks).forEach(callback => {
        callback(msg, data) 
      })
    }
  }

  /* 
  4. unsubscribe(flag): 根据flag取消订阅
        1. flag没有指定: 取消所有
            2. flag是一个token值: 取消对应的一个回调
                3. flag是msgName: 取消对应的所有
          */
          PubSub.unsubscribe = function (flag) {

    if (flag===undefined) {
      callbackContainer = {}
    } else if (typeof flag==='string' && flag.indexOf('uid_')===0) {
      
      Object.values(callbackContainer).forEach(callbacks => {
        delete callbacks[flag]
      })
    
      // const msg = flag.split('_')[1]
      // callbackContainer[msg] && delete callbackContainer[msg][flag]
    } else {
      delete callbackContainer[flag]
    }
  }

  // 向外暴露PubSub
  window.PubSub = PubSub
})(window)

9.4. 测试
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>自定义全局事件总线</title>
</head>
<body>

  <script src="./event-bus.js"></script>
  <script>
    /* 
    eventBus:
      1). on(eventName, listener): 绑定事件监听
      2). emit(eventName, data): 分发事件
      3). off(eventName): 移除事件监听
    */

    eventBus.on('add', (data) => {
      console.log('add1()', data)
    })
    eventBus.on('add', (data) => {
      console.log('add2()', data)
    })
    eventBus.on('delete', (data) => {
      console.log('delete()', data)
    })
    
    // eventBus.off()
    // eventBus.off('add')
    
    eventBus.emit('add', 'atguigu')
    eventBus.emit('delete', 'baidu')

  </script>
</body>
</html>

10. 第10章: 搭建Vue项目的打包环境
10.1. 初始化项目
1)	生成package.json
    npm init -y

2)	创建入口js: src/index.js
    console.log('Hello Webpack!')
    document.getElementById('root').innerHTML = '<h1>Hello222</h1>'

3)	创建页面文件: public/index.html
<div id="root"></div>
10.2. webpack基本使用
1)	下载依赖包
    npm install -D webpack webpack-cli
    npm install -D html-webpack-plugin

2)	创建webpack配置: webpack.config.js
// __dirname: 代表当前文件所在目录的绝对路径
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path') // 用来解析路径相关信息的模块

/*根据文件夹名得到项目根目录下某个文件夹的绝对路径*/
function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = { // 配置对象
  // 入口
  entry: {
    xxx: resolve('src/index.js')
  },

  // 出口
  output: {
path: resolve('dist'),
    filename: 'js/[name].bundle.js', // 可以带路径
  },

  // 模块加载器
  module: {
    rules: [

    ]
  },

  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      // 将哪个页面作为模板页面处理(在根目录查找)
      template: 'public/index.html',
      // 生成页面(在output指定的path下)
      filename: 'index.html'
    }),
  ],
}

3)	生产环境打包并运行
    配置打包命令:  "build": "webpack --mode production"
打包项目: npm run build
全局下载静态服务包: npm install -g serve
    运行打包项目: serve dist

10.3. 开发环境运行 
1)	现在的问题:
    每次修改项目代码后, 必须重新打包, 重新运行

2)	下载依赖包
    npm install -D webpack-dev-server

3)	配置开发服务器
devServer: {
      open: true, // 自动打开浏览器
  port: 8080, // 指定启动服务器的端口号
      stats: 'errors-only', // 只输出错误日志
    },

4)	配置开启source-map调试
    devtool: 'cheap-module-eval-source-map',

5)	开发环境运行
    配置命令: "dev": "webpack-dev-server --mode development"
    执行命令: npm run dev

10.4. 打包处理 ES6/CSS/图片
10.4.1. 处理ES6
1)	下载依赖包
npm install -D babel-loader @babel/core @babel/preset-env

2)	配置
// 处理 ES6 ==> ES5
{
  test: /\.js$/, // 用于匹配文件(对哪些文件进行处理)
  // exclude: /node_modules/,
  include: [path.resolve(__dirname, 'src')], // 只针对哪些处理
  use: {
    loader: 'babel-loader',
    options: {
      // 预设包: 包含多个常用babel插件包的一个大包
      presets: ['@babel/preset-env'],
    }
  }
},

3)	理解babel的plugin与preset
a.	babel本身不编译ES6的语法
b.	babel需要基于它的plugin来做ES语法的编译
c.	每个语法都一个对应的babel plugin来编译对应的语法
d.	一个babel preset包是包含多个常用的babel plugin的集合包
e.	好处: 便于管理, 简化配置
10.4.2. 处理CSS
1)	下载依赖包
npm install -D css-loader style-loader

2)	配置
// 处理CSS
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
},

10.4.3. 处理图片
1)	下载依赖包
npm install -D url-loader@2.3.0 file-loader@4.3.0
2)	配置
// 处理图片
{
  test: /\.(png|jpg|gif)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 1024 * 8,
        name: 'img/[name].[hash:7].[ext]' // 相对于output.path
      }
    }
  ]
},

10.4.4. 测试
1)	添加图片: src/assets/imgs/logo.png
2)	添加css: src/assets/css/my.css
        img {
          width: 200px;
          height: 200px;
        }
3)	index.js
import logo from './assets/imgs/logo.png'
import  './assets/css/my.css'

const image = new Image()
image.src = logo
document.body.appendChild(image)
document.getElementById('root').innerHTML = '<h1>Hello222</h1>'


10.5. 打包vue组件 
10.5.1. 文档:
    https://vue-loader.vuejs.org/zh/
10.5.2. 下载依赖包:
    npm install -S vue
    npm install -D vue-loader vue-template-compiler
10.5.3. 配置
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 处理vue单文件组件模块
{
  test: /\.vue$/,
  loader: 'vue-loader'
}

// 处理CSS
{
  test: /\.css$/,
  use: ['vue-style-loader', 'css-loader'],
},

new VueLoaderPlugin()

// 引入模块的解析
resolve: {
  extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
  alias: { // 路径别名(简写方式)
    'vue$': 'vue/dist/vue.esm.js',  // 表示精准匹配   带vue编译器
    '@': resolve('src'),
    '@components': resolve('src/components'),
  }
}


10.5.4. 编码
src/App.vue
src/components/HelloWorld.vue
src/index.js

10.6. 解决开发环境ajax请求跨域问题
10.6.1. 利用代理服务器解决
1)	利用webpack-dev-server作为代理服务器对请求进行代理转发
2)	webpack-dev-server内部利用http-proxy-middle包对特定请求进行转发操作
10.6.2. 配置
proxy: {
  // 处理以/api开头路径的请求
  // '/api': 'http://localhost:4000'
// http://localhost:4000/api/search/users   
  '/api': {
    target: 'http://localhost:4000', // 转发的目标地址
    pathRewrite: {
      '^/api' : ''  // 转发请求时去除路径前面的/api
    },
changeOrigin: true, // 支持跨域, 如果协议/主机也不相同, 必须加上
  },
  // 可以配置多个
  '/gh': {
    target: 'https://api.github.com', // 转发的目标地址
    pathRewrite: {
      '^/gh' : ''  // 转发请求时去除路径前面的/api
    },
    changeOrigin: true, // 支持跨域, 如果协议/主机也不相同, 必须加上
  }
},

10.7. 配置async/await的编译环境
10.7.1. 下载包
npm install -S @babel/polyfill

10.7.2. 配置
entry: {
  xxx: ['@babel/polyfill', resolve('src/index.js')]
},

10.8. 解决引入Element-UI无法打包font文件的问题
10.8.1. 异常信息:  
     
10.8.2. 原因:
没有配置url-loader处理font类型文件
10.8.3. 在webpack.config.js中配置
{
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 字体
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 10240,
        name: 'fonts/[name].[hash:8].[ext]'
      }
    }
  ]
},

 

10.9. 解决history模式路由请求404的问题

devServer: historyApiFallback: true, // 任意的 404 响应都被替代为 index.html
output: publicPath: '/', // 引入打包的文件时路径以/开头
10.10. 拷贝public下的全局资源文件
10.10.1. 下载包
    npm install -D copy-webpack-plugin
10.10.2. 配置
    const CopyWebpackPlugin = require('copy-webpack-plugin')
    
    // 拷贝静态资源到打包文件夹
    new CopyWebpackPlugin([
      {
        from: resolve('public'),
        to: resolve('dist'),
        ignore: ['index.html']
      }
    ]),
11. 第11章：使用Vue脚手架
11.1. 使用脚手架创建模板项目
11.1.1. 说明
1)	vue-cli是vue官方提供的脚手架工具  command line interface  client
2)	最新的版本是4, 
3)	3.x版本与4.x版本变化不大, 但3.x相对于2.x的版本变化特别大
4)	在线文档: https://cli.vuejs.org/zh/
11.1.2. 创建vue项目
1)	创建脚手架4/3的vue项目, 并运行
npm install -g @vue/cli
vue create vue-demo
npm run serve
2)	创建脚手架2的vue项目
npm install -g @vue/cli-init
vue init webpack vue-demo
    npm run dev
3)	访问: http://localhost:8080/
11.1.3. 模板项目的结构
vue-cli2脚手架项目结构
gshop
	|-- build : webpack相关的配置文件夹(基本不需要修改)
	|-- config: webpack相关的配置文件夹(基本不需要修改)
		|-- index.js: 指定的后台服务的端口号和静态资源文件夹
	|-- node_modules
	|-- src : 源码文件夹
		|-- main.js: 应用入口js
	|-- static: 静态资源文件夹
	|-- .babelrc: babel的配置文件
	|-- .editorconfig: 通过编辑器的编码/格式进行一定的配置
	|-- .eslintignore: eslint检查忽略的配置
	|-- .eslintrc.js: eslint检查的配置
	|-- .gitignore: git版本管制忽略的配置
	|-- index.html: 主页面文件
	|-- package.json: 应用包配置文件 
	|-- README.md: 应用描述说明的readme文件

vue-cli3脚手架项目结构
gshop
	|-- node_modules
	|-- public
       |-- index.html: 主页面文件
	|-- src
	   |-- main.js: 应用入口js
	|-- babel.config.js: babel的配置文件
	|-- vue.config.js: vue的配置文件
	|-- .gitignore: git版本管制忽略的配置
	|-- package.json: 应用包配置文件 
	|-- README.md: 应用描述说明的readme文件
11.1.4. 脚手架3相对于脚手架2的变化
1. webpack配置
(1)	2: 配置是暴露的, 我们可以直接在里面修改配置
(2)	3: 配置是包装隐藏了, 需要通过脚手架扩展的vue.config.js来配置
2. 运行启动命令
(1)	2: npm run dev
(2)	3: npm run serve 


11.2. 项目的打包与发布
11.2.1. 打包:
npm run build
11.2.2. 本地测试运行打包项目
    npm install -g serve
    serve dist -p 5000
    访问: http://localhost:5000
11.3. eslint
11.3.1. 说明
1)		ESLint是一个代码规范检查工具
2)	它定义了很多特定的规则, 一旦你的代码违背了某一规则, eslint会作出非常有用的提示
3)		官网: http://eslint.org/
4)		基本已替代以前的JSLint
11.3.2. ESLint提供以下支持
1)		ES
2)		JSX
3)		自定义错误和提示
11.3.3. ESLint提供以下几种校验
1)		语法错误校验
2)		不重要或丢失的标点符号，如分号
3)		没法运行到的代码块
4)		未被使用的参数提醒
5)		检查变量的命名
11.3.4. 规则的错误等级有三种
1)		0：关闭规则。off
2)		1：打开规则，并且作为一个警告（信息打印黄色字体）warning
3)		2：打开规则，并且作为一个错误（信息打印红色字体）error
11.3.5. 相关配置文件
1)	package.json : 全局规则配置文件
    'rules': {
      'no-new': 'off'
    }

2)	在js/vue文件中修改局部规则
    /* eslint-disable no-new */
    new Vue({
      el: 'body',
      components: { App }
    })

3)	vue.config.js: 关闭规则检查
	// 关闭ESLint的规则
 	 lintOnSave: false,


