# React基本

- [React 中文文档](https://zh-hans.reactjs.org/)

## React 概述

React 是一个用于构建用户界面的 JavaScript 库。 

> 如果从 MVC 的角度来看，React 仅仅是视图层（V），也就是只负责视图的渲染，而并非提供了 完整的 M 和 C 的功能。 
> React 起源于 Facebook ,并于 2013 年 5 月开源 

## React 三个特点

- 1 声明式
  - JSX 语法是声明式的，只需要描述页面长什么样子
  - React.createElement() 是命令式
- 2 组件化
  - 创建拥有各自状态的组件，再由这些组件构成更加复杂的 UI
  - 组件逻辑使用 JavaScript 编写而非模版
- 3 一次学习，随处编写
  - 不仅可以开发 web 应用（react-dom），还可以开发原生安卓或ios应用（react-native）

## React基本使用

1. 在html定义一个根标签 

   ```javascript
   <div id="root"></div>
   ```

2. 引入两个JS文件（ 注意引入顺序 ）

   ```html
   <!-- 提供react核心api-->
   <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
   
   <!-- 提供了react中操作dom的api-->
   <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
   ```

3. 创建react元素(类似html元素)

   ```javascript
   // 返回值：React元素 
   // 第一个参数：要创建的React元素名称 字符串
   // 第二个参数：该React元素的属性 null或者对象 {id: 'box'}
   // 第三个及其以后的参数：该React元素的子节点 文本或者其他react元素
   const title = React.createElement('h1', null, 'Hello React',...)
   ```

4. 渲染 react 元素

   ```javascript
   ReactDOM.render(title, document.getElementById('root'))
   ```

## 特殊属性

- 添加样式要使用 className

```js
const title = React.createElement('h1', {
  className: 'active'
}, 'Hello React')
```

- label的for属性,要改成htmlFor

```javascript
const title = React.createElement('label', {
  htmlFor: 'abc'
}, 'Hello React')
```

## JSX

>React.createElement()写起来太复杂了,所以推荐使用更加简洁的**jsx**
>
>**JSX**是JavaScript XML,是React提供的Syntax Sugar(语法糖), 能让我们可以在JS中写html标记语言

```jsx
const h1 = <h1 className="active"></h1>   
```

**注意: 浏览器并不认识jsx 所以需要引入babel将jsx编译成React.createElement的形式**

> 编译 JSX 语法的包为：@babel/preset-react 

```html	
<!-- babel的 CDN -->
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

<!-- 并且script要进行设置 -->
<script type="text/babel">
	const h1 = <h1 className="active"></h1> 
	ReactDOM.render(h1, document.getElementById('root'))
</script>


```

## JSX中使用 JS 表达式

- JSX中使用JS表达式的语法：`{}`
- 注意：{} 里面可以写表达式,但是不能写语句(比如 if , for 等), 
- 注意:   {} 如果要写对象,应该是一个react元素或者是行内样式对象

```js
const dv = <div className="abc">JSX中使用表达式： { 1 + 2 }</div>

const dv = <div title={'我是标题'}>JSX中使用表达式： { 1 + 2 }</div>

const dv = <div>JSX中使用表达式： { <span>JSX自身也是合法的JS表达式</span> }</div>
```

## 条件渲染

- 1 if / else

```js
 let box
 if (isloading) {
     box = <div>loading...</div>
 } else {
     box = <h1>数据加载完成~</h1>
 }
 ReactDOM.render(box, document.getElementById('root'))
```

- 2 三元

```js
let box = isLoading ? <div>loading...</div> : <h1>数据加载完成~</h1>
ReactDOM.render(box, document.getElementById('root'))
```

- 3 &&

```js
let box = isLoading && <div>loading...</div>
ReactDOM.render(box, document.getElementById('root'))
```

## 列表渲染

- react中可以将数组中的元素直接渲染到页面上
- 因为jsx的原因,可以直接往数组中存储react对象
- 所以推荐使用数组的 map 方法
- 注意：应该给列表项添加 key 属性

```js
 let songs = [{id: 1,name: '东风破'},{id: 2,name: '菊花残'}]

 let list = <ul>{songs.map(item => <li key={item.id}>歌名：{item.name}</li>)}</ul>

 ReactDOM.render(list, document.getElementById('root'))
```

## 样式处理

- 1 行内样式
  - 如果样式是数值，可以省略单位

```js
<div style={ { color: 'red', fontSize: 30 } }>web</div>
```

- 2 类名（推荐！！！）

```js
<div className="abc">web</div>
```

**注意:** 

1. React元素的属性名使用小驼峰命名法 
2. 没有子节点的React元素可以写成自闭和标签形式

## 事件处理

### 绑定事件

React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写.比如：onMouseEnter、onFocus 
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串

```javascript
const div = <div onClick={事件处理函数}></div>
```

### 事件对象 

React 中的事件对象叫做：合成事件  (兼容所有浏览器，无需担心跨浏览器兼容性问题)

**注意: **

1. react中事件处理函数不能使用return false 阻止默认行为.需要使用事件对象的preventDefault()实现
2. 如果在控制台打印事件对象,属性值都是null.一定要查看的话,调用事件对象.persist()方法

```javascript
 function handleClick(e) {
     e.preventDefault() //有效
     console.log('事件对象', e) 
     // return false  无效
  }
 const div = (
   <a href='https://www.baidu.com' onClick={handleClick}>
          测试
   </a>
 )
```

## 案例

- 需求：实现评论列表功能

-  如果有评论数据，就展示列表结构 li（ 列表渲染 ）要包含a标签
  
  - name 表示评论人，渲染 h3
  - content 表示评论内容，渲染 p
  
-  如果没有评论数据，就展示一个 h1 标签，内容为： 暂无评论！

-  根据自己的喜好添加样式

- 给a标签注册点击事件, 打印内容

  

```js
const list = [
  { id: 1, name: 'jack', content: 'rose, you jump i jump' },
  { id: 2, name: 'rose', content: 'jack, you see you, one day day' },
  { id: 3, name: 'tom', content: 'jack,。。。。。' }
]
```



## React的组件

组件允许你将 UI 拆分为独立可复用的代码片段，并对每个片段进行独立构思。

组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。

**一个React应用就是由一个个的组件组成的**

[![BB0l5V.png](https://s1.ax1x.com/2020/11/02/BB0l5V.png)](https://imgchr.com/i/BB0l5V)

## 创建组件的两种方式

### 函数组件

不能定义状态

```javascript
 
function Header(){
    return <div>我是标题组件</div>
}
// 函数名就是组件名
ReactDom.render(<Header></Header>, document.getElementById('root'))
                
// 注意:
1. 组件名首字母必须大写. 因为react以此来区分组件和react元素
2. 必须有返回值.返回的内容就是组件呈现的结构, 如果返回值为 null，表示不渲染任何内容
3. 组件内部如果有多个标签,必须使用一个根标签包裹.只能有一个根标签
        
```

### 类组件

可以定义状态(状态: 组件内部私有的数据)

```javascript
class Header extends React.Component{
    render(){
    	return <div>我是标题组件</div>
    }
}
// 如果组件没有子节点,也可以写成自闭和标签
ReactDom.render(<Header />, document.getElementById('root'))

//注意: 
1. 组件名首字母必须大写.
2. 类组件中必须要声明一个render函数
3. render函数中必须有返回值.
4. 类组件应该继承 React.Component 父类，从而可以使用父类中提供的方法或属性 
5. 组件内部如果有多个标签,必须使用一个根标签包裹.只能有一个根标签
```



## 组件的状态 state

函数组件又叫做无状态组件，类组件又叫做有状态组件 

状态（state）即数据 

函数组件没有state,一般只负责渲染静态结构

类组件有自己的状态，负责更新 UI，让页面“动” 起来 

### state的基本使用

- 状态（state）即数据，是组件内部的私有数据，只能在组件内部使用 

- state 的值是对象，表示一个组件中可以有多个数据 
- 获取状态：this.state  

```javascript
class Hello extends React.Component {   
    constructor() {     
        super()        
        this.state = { count: 0 }  // 初始化state   
    }   
     // 简化语法 
    // state= { count: 0 } 
    
    render() {     
        return ( 
      		<div>{this.state.count}</div>     
        )   
    } 
} 
```

### 操作state

语法：this.setState({ 要修改的数据 }) 

 注意：不要直接修改 state 中的值，应该使用组件实例的setState方法,修改state的值

 setState() 作用：

1. 修改 state 
2. 更新UI 

```javascript
class Hello extends React.Component {
    constructor() {
        super() 
        this.state = { count: 0, num: 100 }// 初始化state
    }

    render() {
        return (
            <div
            onClick={() => {
            this.setState({
                count: this.state.count + 1
            })
        }}
    >
        {this.state.count}
</div>
)
}
}
```

### setState的注意点

- 连续调用合并问题

  ```javascript
  handle = () => {
      this.setState({
          count: this.state.count + 1
      })
      this.setState({
          count: this.state.count + 2
      })
      this.setState({
          count: this.state.count + 3
      })
  }
  // 连续调用.react会将多次合并成一次. 最终执行的是最后一次
  ```

  

- setState第一个参数传入函数

  ```javascript
  
  state = {count:0}
  // 第一个参数除了可以像之前一样传入一个对象之外,还可以传入一个函数.如下
  // 这个函数,接收一个最新的state和最新的props
  // 函数要求返回一个对象
  this.setState((state, props) => {
      return {
          count: state.count + 1
      }
  })
  this.setState((state, props) => {
      return {
          count: state.count + 2
      }
  })
  this.setState((state, props) => {
      return {
          count: state.count + 3
      }
  })
  // 最终状态中count的结果是 6
  ```

- setState将对组件 state 的更改排入队列,所以调用之后,立刻获取this.state拿到的值很有可能是错误的

  ```javascript
  state = {count:0}
  
  this.setState((state, props) => {
      return {
          count: state.count + 1
      }
  })
  this.setState((state, props) => {
      return {
          count: state.count + 2
      }
  })
  this.setState((state, props) => {
      return {
          count: state.count + 3
      }
  })
  // 这里获取到的state中count的值就是错误的
  console.log(this.state.count) // 0 
  ```

- setState的第二个可选参数

  ```javascript
  // 如果想要在setState之后立刻得到最新的state. 可以使用第二个可以选参数
  this.setState( 
    (state, props) => {}, 
     //它将在 setState 完成合并并重新渲染组件后执行
    () => {console.log(this.state)} 
  )
  ```

  

## 事件绑定this的指向问题

为了提高代码的阅读性,最好把事件处理函数定义在结构的外面.

但是这样就带来了this指向的问题: 

**handle中的this 指向 undefined (原因: bable编译jsx. 采用的是严格模式, 普通函数this就指向undefined)**

```javascript
class Hello extends React.Component {
    constructor() {
        super() 
        this.state = { count: 0, num: 100 }// 初始化state
    }

    handle() {
        //这里this指向undefined
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        return <div onClick={this.handle}>{this.state.count}</div>
    }
}
```

### 1.解决this指向 - 箭头函数

```javascript
class Hello extends React.Component {
    constructor() {
        super() 
        this.state = { count: 0, num: 100 }// 初始化state
    }

    handle() {
        //这里this指向当前组件实例
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        // 解决方式1: 箭头函数
        return <div onClick={（）=> this.handle()}>{this.state.count}</div>
    }
}
```

### 2.解决this指向 - bind 

```javascript
 class Hello extends React.Component {
     constructor() {
         super()
         this.state = { count: 0, num: 100 } // 初始化state
         //解决方式2: bind
         this.handle = this.handle.bind(this)
     }

     handle() {
         //这里this指向当前组件实例
         this.setState({
             count: this.state.count + 1
         })
     }

     render() {
         return <div onClick={this.handle}>{this.state.count}/div>
     }
 }
```

### 3.解决this指向 - 类的实例方法

```javascript
class Hello extends React.Component {
     constructor() {
         super()
         this.state = { count: 0, num: 100 } // 初始化state
     }
	// 解决方式3: 类的实例 (注意:这种语法形式目前处于试验性阶段.但是由于使用了babel,可以放心使用)
     handle = () => {
         //这里this指向当前组件实例
         this.setState({
             count: this.state.count + 1
         })
     }

     render() {
         return <div onClick={this.handle}>{this.state.count}/div>
     }
 }
```



## 组件的props

组件是封闭的，要接收外部数据应该通过 props 来实现 

 props的作用：接收传递给组件的数据 

传递数据：给组件标签添加属性 

接收数据：函数组件通过参数props接收数据，类组件通过 this.props 接收数据 

```javascript
<Hello name="jack" age={19} /> 
 
function Hello(props) { 
  console.log(props) 
  return ( 
    <div>接收到数据：{props.name}</div> 
  ) 
} 

class Hello extends React.Component { 
  render() { 
    return ( 
      <div>接收到的数据：{this.props.age}</div> 
    ) 
  } 
} 
```

### props的特点:

1. 可以给组件传递任意类型的数据 
2. props 是只读的对象，只能读取属性的值，不要修改props 
3. 注意：使用类组件时，如果写了构造函数，应该将 props 传递给 super()，否则，无法在构造函数中获取到 props

```javascript
class Hello extends React.Component { 
  constructor(props) { 
    // 推荐将props传递给父类构造函数 
    super(props) 
  } 
  render() { 
    return <div>接收到的数据：{this.props.age}</div> 
  } 
} 
```

### props校验

对于组件来说，props 是外来的，无法保证组件使用者传入什么格式的数据 

如果传入的数据格式不对，可能会导致组件内部报错

关键问题：组件的使用者不知道明确的错误原因 

允许在创建组件的时候，就指定 props 的类型、格式等 

作用：捕获使用组件时因为props导致的错误，给出明确的错误提示，增加组件的健壮性 

**实现方式:**

1. 导入 prop-types 包 
2. 使用propTypes来给组件的props添加校验规则 

```javascript
//常见类型：array、bool、func、number、object、string还有element(react元素)
// 必填项：isRequired 
// 特定结构的对象：shape({  }) 
import PropTypes from 'prop-types'
class Hello extends React.Component(){
    static propTypes = {
         msg: PropTypes.string.isRequired 
         list: PropTypes.array
         obj: PropTypes.shape({ 
          color: PropTypes.string, 
          fontSize: PropTypes.number  
        }) 
    }
	render(){
        return <div msg="props校验" ></div>
    }
}
```

### props默认值

作用：给 props 设置默认值，在未传入 props 时生效 

**实现方式:**

```javascript
function App(props) { 
  return ( 
    <div> 
      此处展示props的默认值：{props.pageSize} 
    </div> 
  ) 
} 
// 设置默认值 
App.defaultProps = { 
  pageSize: 10 
} 
// 不传入pageSize属性 
<App /> 
```

## 表单处理

### 受控组件

 HTML 中的表单元素是可输入的，也就是有自己的可变状态.而React 中可变状态通常保存在 state 中，并且只能通过 setState() 方法来修改 .React将 state 与表单元素值value绑定到一起，由 state 的值来控制表单元素的值

**受控组件：其值受到 React 控制的表单元素** 

#### 实现方式: 

1. 在 state 中添加一个状态，作为表单元素的value值（控制表单元素值的来源） 
2. 给表单元素绑定 change 事件，将 表单元素的值 设置为 state 的值（控制表单元素值的变化） 

```javascript
class Hello extends React.Component {
    constructor() {
        super()
        this.state = { text: '' } // 初始化state
    }

    handle = e => {
        //这里this指向当前组件实例
        this.setState({
            text: e.target.value
        })
    }

    render() {
        return <input onChange={this.handle} value={this.state.text}></input>
    }
}

//补充: 文本框、文本域、下拉框 操作value属性 复选框 操作checked属性 
```

**多表单元素处理**

利用柯里化函数实现

> 柯里化（Currying），又称部分求值（Partial Evaluation），是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

```javascript
class Hello extends React.Component {
  state = {
    msg: '文本框',
    area: '文本域',
    selected: 'sj',
    checked: false
  }

  // 这是文本框, 文本域, 以及下拉选择共同使用的事件处理函数
  handle = name => {
      return e => {
          // 判断 当前事件目标是不是复选框,如果是,使用checked, 如果不是,使用value
            let value = name === 'checked' ? e.target.checked : e.target.value
            this.setState({
              [name]: value
            })
      }
  }

  render() {
    return (
      <div>
        {/* 文本框 */}
        <input
          type='text'
          value={this.state.msg}
          onChange={this.handle('msg')}
        />
        <br />
        {/* 文本域 */}
        <textarea
          id=''
          cols='30'
          rows='10'
          value={this.state.area}
          onChange={this.handle('area')}
        ></textarea>
        <br />
        {/* 下拉框 */}
        <select
          name='selected'
          value={this.state.selected}
          onChange={this.handle('selected')}
        >
          <option value='cf'>吃饭</option>
          <option value='sj'>睡觉</option>
          <option value='ddd'>打豆豆</option>
        </select>
        <br />
        {/* 复选框 */}
        <input
          type='checkbox'
          checked={this.state.checked}
          onChange={this.handle('checked')}
        />
      </div>
    )
  }
}
```

### 非受控组件

借助于 ref，使用原生 DOM 方式来获取表单元素值 

ref 的作用：获取 DOM 或组件 

#### 实现方式: 

1. 调用 React.createRef() 方法创建一个 ref 对象 

   ```javascript
   constructor() { 
     super() 
     this.txtRef = React.createRef() 
   }
   ```

2. 将创建好的 ref 对象添加到文本框中 

   ```javascript
   <input type="text" ref={this.txtRef} />
   ```

   

3. 通过 ref 对象获取到文本框的值 

   ```javascript
   Console.log(this.txtRef.current.value)
   ```

   

## 案例- todo案例



## 组件的生命周期

[生命周期图谱](<https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/>)

[![BB0Nr9.png](https://s1.ax1x.com/2020/11/02/BB0Nr9.png)](https://imgchr.com/i/BB0Nr9)

### 组件的生命周期三个大阶段

#### 挂载阶段

> constructor  ==> render ==> componentDidMount

**constructor**: 创建组件时，最先执行 . 一般用于: 1. 初始化state  2. 为事件处理程序绑定this 

 **render**: 每次组件渲染都会触发  注意: 不能在render中调用setState()

**componentDidMount:** 组件挂载(完成DOM)渲染后   一般用于: 1. 发送网络请求  2. DOM操作 



#### 更新阶段

>render  ==>  componentDidUpdate 
>
>setState() , forceUpdate(), 组件接收到新的props  都会导致更新

**componentDidUpdate:** 组件更新(完成DOM渲染)后  

1 发送网络请求 2 DOM操作   注意：如果要setState() 必须放在一个if条件中 



#### 卸载阶段

>componentWillUnmount

**componentWillUnmount:**组件卸载(从页面中消失） 执行清理操作

### 旧版react生命周期(了解)

>componentWillMount 
>
>componentWillUpdate,
>
>componentWillReceiveProps 
>
>以上生命周期钩子函数在React v16.3后废弃

[![BB0dV1.png](https://s1.ax1x.com/2020/11/02/BB0dV1.png)](https://imgchr.com/i/BB0dV1)





## 组件通讯

>react组件通讯有三种方式.分别是props, context, pubsub

### props  

>单向数据流 父传子

[![BB0DPK.png](https://s1.ax1x.com/2020/11/02/BB0DPK.png)](https://imgchr.com/i/BB0DPK)

### context  

>爷孙嵌套 传递

[![BB0cKH.png](https://s1.ax1x.com/2020/11/02/BB0cKH.png)](https://imgchr.com/i/BB0cKH)



**实现一: **

- 调用 React. createContext() 创建 Provider（提供数据） 和 Consumer（消费数据） 两个组件

  ```javascript
  const { Provider, Consumer } = React.createContext('默认值') 
  // 注意: 默认值是在没有提供provider的时候生效,而不是没有写value的时候生效
  ```

- 使用 Provider 组件作为父节点, 使用value属性定义要传递的值

  ```javascript
  <Provider value={要传递的值}> 
    <div className="App"> 
      <Child1 /> 
    </div> 
  </Provider>
  ```

- 使用Consumer组件接收数据 

  ```javascript
  <Consumer>{data => <span>data参数表示接收到的数据 -- {data}</span>} </Consumer> 
  ```

**实现二: **

```javascript
export default class Demo extends Component {
    // 给要使用的Context的Demo类,添加静态contextType属性, 并赋值为context对象
    // 那么在Demo的实例对象上context属性中就可以获取到需要的值
  static contextType = MyContext
  render() {
    // return <MyContext.Consumer>{data => <p>{data}</p>}</MyContext.Consumer>
    return <div>{this.context}</div>
  }
}
```

**注意:**不要使用context随意传递数据,一般用于传递"全局"数据, 比如当前认证的用户、主题或首选语言



### pubsub 

>发布订阅机制
>
>pubsubjs是一个用JavaScript编写的库。
>
>利用订阅发布模式, 当一个组件的状态发生了变化，可以让其他多个组件更新这些变化.

[![BB0oRS.png](https://s1.ax1x.com/2020/11/02/BB0oRS.png)](https://imgchr.com/i/BB0oRS)

**实现:**

- 安装

  ```javascript
  在项目根目录下: npm install pubsub-js / yarn add pubsub-js
  ```

- 导入

  ```javascript
  import PubSub from "pubsub-js" // 导入的PubSub是一个对象.提供了发布/订阅的功能
  ```

- pubsubjs提供的方法

  ```javascript
  //  一个用于接收订阅信息的函数(接收外部传入的数据的函数)
  // PubSub.subscribe() 用于订阅信息(相当于监听某个组件内部数据变化)
  // TOPIC ==> 订阅话题.推荐使用常量
  // 第二个参数: 用于接收数据的函数
  // token 这一次订阅的令牌(用于取消订阅)
  var token = PubSub.subscribe(TOPIC, function (msg, data) {
      console.log( msg, data );
  });
  
  // 以异步的形式的发布一个话题 
  // TOPIC 通过这个话题,找到订阅这个话题的订阅者
  // 'hello world!' 具体要传递的数据
  PubSub.publish(TOPIC, 'hello world!');
  // 发布的同步使用方法
  // 慎用!!!! 因为会阻塞发布者的代码执行
  PubSub.publishSync(TOPIC, 'hello world!');
  
  // 取消指定的订阅
  PubSub.unsubscribe(token);
  
  // 取消某个话题的所有订阅
  PubSub.unsubscribe(TOPIC);
  
  // 取消所有订阅
  PubSub.clearAllSubscriptions();
  
  ```

  



## Fragment

>react组件中只能有一个根组件.
>
>之前使用div包裹的方式会给html结构增加很多无用的层级
>
>为了解决这个问题,可以使用React.Fragment

```javascript	
function Hello(){
    return (
      // 渲染到页面之后,这个div就是一个多余的
      <div>
        <h1>fragment</h1>
        <p>hello react</p>
      </div>
    ) 
}
// 将上面的写法,修改为下面的写法
function Hello(){
    return (
      // 这样就只会渲染h1和p
      <React.Fragment>
        <h1>fragment</h1>
        <p>hello react</p>
      </React.Fragment>
    ) 
}

// 简写形式
function Hello(){
    return (
      // 这是React.Fragment的简写形式
      <>
        <h1>fragment</h1>
        <p>hello react</p>
      </>
    ) 
}
```



## React性能优化

- 减轻state 跟页面渲染无关的数据,不要放在state中(比如定时器的id.不要放在state中)

  - 可以有效减少页面重新渲染次数

- shouldComponentUpdate (减轻不必要的重新渲染)

  - **组件更新的机制: **父组件重新渲染时，也会重新渲染子组件

  - 如何避免不必要的重新渲染呢？ 

  - 解决方式：使用钩子函数 shouldComponentUpdate(nextProps, nextState) 

  - 作用：通过返回值决定该组件是否重新渲染，返回 true 表示重新渲染，false 表示不重新渲染 

  -  触发时机：更新阶段的钩子函数，组件重新渲染前执行 （shouldComponentUpdate => render） 

    ```javascript
    // 父组件
    class Far extends Component {
      state = {
        num: 0
      }
      // 返回min~max之间的随机整数(包含min和max)
      getRandomIntInclusive(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min //含最大值，含最小值
      }
      handle = () => {
        let num = this.getRandomIntInclusive(1, 3)
        this.setState({
          num
        })
      }
      //有效减少组件渲染次数
      shouldComponentUpdate(props, state) {
        // this.state 原来的state
        // state 最新的state
        return this.state.num !== state.num 
      }
      render() {
        console.log('父组件渲染了')
        return (
          <div>
            <h1 onClick={this.handle}>Far组件</h1>
            <p>{this.state.num}</p>
            <Son num={this.state.num}></Son>
          </div>
        )
      }
    }
    
    // 不管子组件有没有用到父组件的数据,只要父组件重新渲染了,子组件就会跟着渲染
    
    // 子组件
    class Son extends Component {
      //有效减少组件渲染次数
      shouldComponentUpdate(props, state) {
        // this.props 原来的props
        // props 最新的props
        return props.num !== this.props.num 
      }
      render() {
        console.log('Son组件渲染了')
        return (
          <div>
            <h1>Son组件</h1>
            <p>{this.props.num}</p>
          </div>
        )
      }
    }
    ```

    

- 纯组件 pureComponet

  - PureComponent  与 React.Component 功能相似,直接替换即可

  - 区别：PureComponent 内部自动实现了 shouldComponentUpdate 钩子，不需要手动比较 

  - 原理：纯组件内部通过分别 对比 前后两次 props 和 state 的值，来决定是否重新渲染组件 

  - **注意: **纯组件内部的对比是 shallow compare（浅层对比）

    -  对于引用类型来说：只比较对象的引用（地址）是否相同 
    - 所以,state 或 props 中属性值为引用类型时，应该创建新数据，不要直接修改原数据

    ```javascript
    class Far extends PureComponent {
      state = {
        obj: {
          num: 0
        }
      }
    
      getRandomIntInclusive(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min //含最大值，含最小值
      }
      handle = () => {
        // 错误的写法
        // 重新设置的obj和上一次的obj是同一个.
        // 组件不会重新渲染了
        // let num = this.getRandomIntInclusive(1, 3)
        // let obj = this.state.obj 或者 let {obj} = this.state
        // obj.num = num
         
        // 正确的写法:
        let num = this.getRandomIntInclusive(1, 3)
        // 创建一个新的对象
        let obj = { num }
        console.log(num)
        this.setState({
          obj
        })
      }
    
      render() {
        console.log('父组件渲染了')
        return (
          <div>
            <h1 onClick={this.handle}>Far组件</h1>
            <p>{this.state.obj.num}</p>
            <Son num={this.state.obj.num}></Son>
          </div>
        )
      }
    }
    ```

    

## React.forwardRef(不常用.可以通过props传递)

>函数组件不可以添加ref属性
>
>作用: 将函数组件内部的元素,交给父组件使用

```javascript
// 实现: 
// App组件
const ref = React.createRef()
class App extends React.Component {
  componentDidMount() {
    // 在app组件中,通过ref获取到了button的Dom对象
    console.log(ref.current)
  }
  render() {
    return (
      <div>
        // 使用React.forwardRef包装后的FancyButton就可以添加ref属性了
        <FancyButton ref={ref}>Click me!</FancyButton>
      </div>
    )
  }
}
// FancyButton
const FancyButton = React.forwardRef((props, ref) => {
  console.log(props, ref)
  return (
    <button ref={ref} className='FancyButton'>
      {props.children}
    </button>
  )
})

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;

```

## Portal

> Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案

```javascript

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>App组件</h1>
		// 在app组件中使用了portal组件
		// 但是渲染dom的时候,portal的内容不在这个div中
        <Portal></Portal>
      </div>
    )
  }
}

export default class Portal extends Component {
  constructor() {
    super()
    this.container = document.createElement('div')
  }
  componentDidMount() {
    document.body.appendChild(this.container)
  }
  render() {
    let node = (
      <div>
        <div className='modal'>模态框</div>
        <button>按钮</button>
      </div>
    )
    // 当前portal组件不直接返回元素,而是返回一个portal
    // react底层会将node的内容,渲染到this.container中
    return ReactDOM.createPortal(node, this.container)
  }

  componentWillUnmount() {
    document.body.removeChild(this.container)
  }
}
```



## 高阶组件(HOC higherOrderComponent)

- **高阶组件的作用: ** 提供复用的状态逻辑
- **高阶组件是什么:**  高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式
  - **简单理解的话:** 一个拥有复用逻辑的函数,这个函数需要传入一个组件,然后返回一个增强的组件

```javascript
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

- **高阶组件实现**

  1. 调用函数,得到增强组件,渲染增强组件

  ```javascript
  const EnhancedComponent = higherOrderComponent(WrappedComponent);
  // 注意: 
  1. 函数名一般以with开头,使用小驼峰命名法
  2. 函数中形参要采用大驼峰命名法(因为这个参数接收的是一个组件)
  3. 返回的也是一个组件,所以也要使用大驼峰命名法
  ```

  

  2. 使用es7的修饰符

  ```javascript	
  @higherOrderComponent
  class WrappedComponent extends React.Component
  ```

- **高阶组件要注意的问题:**

  1. 配合chrome调试工具显示组件名的问题

     [![BBBeJK.png](https://s1.ax1x.com/2020/11/02/BBBeJK.png)](https://imgchr.com/i/BBBeJK)

   **解决: **

  给高阶组件中返回的组件, 增加一个静态属性displayName 

  ```javascript
  static displayName = `XXX(${WrappedComponent.displayName ||WrappedComponent.name ||'Component'})`
  
  //原理: 调试工具,优先展示组件的displayName
  ```

  2. 传递props的问题

[![BBBKQe.png](https://s1.ax1x.com/2020/11/02/BBBKQe.png)](https://imgchr.com/i/BBBKQe)

 [![BBB1eA.png](https://s1.ax1x.com/2020/11/02/BBB1eA.png)](https://imgchr.com/i/BBB1eA)



## render props

**render props的作用: **提供共享的状态逻辑

**render props是什么: **指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术

​			**简单理解:** 实现多个组件状态和逻辑共享的技术(复用)

```javascript
export default class App extends Component {
  render() {
    return (
      <div>
        // 原来直接在这里渲染Cat和Mouse组件
        // 使用了render props技术之后, 在这里使用封装了共享状态逻辑的组件,
        // 真正要渲染的Cat和Mouse需要当做render这个prop的返回值传进去
        <Position render={pos => <Cat {...pos} />}></Position>
        <Position render={pos => <Mouse {...pos} />}></Position>
      </div>
    )
  }
}
```

**render props 思路分析: **

1. 将复用的状态和逻辑代码封装到一个组件中 (比如命名为Position),

```javascript
class Position extends React.Component{
    // 定义共享状态
    state = {...}
    
    // 根据具体需求逻辑定义共享逻辑代码,比如
    handle = e => {
    	this.setState({...})         
    }
    
}
```

2. 在这个组件上添加一个render属性. render属性的值是一个函数

      ```javascript
<Position  render={()=>{}}/>
      ```

3. 把要真正渲染到页面的组件,当做箭头函数的返回值

     ```javascript
 <Position  render={()=><Cat />}/>
     ```

4. 这个组件render的函数可以接收组件中的状态数据

    ```javascript
 <Position  render={ pos =><Cat {...pos}/>}/>
    ```

 	5. 在Position中通过this.props.render()得到真正要渲染的组件

```javascript
//Position组件
render() {
    return this.props.render()
}
```

6. 并在在调用this.props.render的时候,将Position组件中的数据,传递给render属性指向的函数

```javascript
//Position组件
render() {
    return this.props.render({...this.state})
}

//App组件
// pos接收Position中传递过来的数据,然后再传递给Cat组件
 <Position render={pos => <Cat {...pos} />}></Position>
```

## Hooks 

- *Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性

- Hook也叫钩子，本质就是函数，能让你使用 React 组件的状态和生命周期函数... 
- Hook 还没有完全替代class,但是未来会逐步替代

### 为什么有Hook?

- 组件复用状态逻辑比较难 (HOC和render props 写起来比较麻烦),Hook 使你在无需修改组件结构的情况下复用状态逻辑

-  解决了this难以理解的问题
- 希望可以逐渐取代class

### useState()基本使用

>可以在单个组件中,多次使用

```javascript
//导入 useState 
import React, {useState} from 'react'

function Example() {
  // 1. 声明一个叫 "count" 的 state 变量
  // 2. setCount 是用来操作count的方法
  // 3. useState的值表示count的初始化值
  // 4. 在后续的重新渲染中，useState 返回的第一个值将始终是更新后最新的 state
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
// 等价于
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```



### useEffect() 基本使用

>可以在单个组件中多次使用
>
>这个Hook,相当于componentDidMount, componentDidUpdate和componentWillUnmount的组合

```javascript
//先导入
import React, { useState, useEffect } from 'react';

function Example(props) {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    
    document.title = `You clicked ${count} times`;
    // 相当于componentWillUnmount
    return () => {
		// 完成一些清除工作...
    }
  // 如果在useEffect的第二个参数,传入一个空的数组,则useEffect只相当于componentDidMount
  // 数组中可以传入state或porps数据,传入到数组的数据,就是被监听的数据,只要这些数据中有一个的值发生变化,这个函数才会重新执行
  },[count, props.name]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```



### Hook规则: 

1. 只在最顶层使用 Hook(函数组件内顶级作用域),**不要在循环，条件或嵌套函数中调用 Hook**
   - 我们可以在单个组件中使用多个 State Hook 或 Effect Hook, React 靠的是 Hook 调用的顺序,来确定哪个state对应的哪个useState
2. 只在 React 函数中调用 Hook,**不要在普通的 JavaScript 函数中调用 Hook**(类组件也不支持Hook)
   - 在 React 的函数组件中调用 Hook
   - 在自定义 Hook 中调用其他 Hook

### 官方提供的Hooks介绍

- [基础 Hook](https://react.docschina.org/docs/hooks-reference.html#basic-hooks)
  - [`useState`](https://react.docschina.org/docs/hooks-reference.html#usestate)
  - [`useEffect`](https://react.docschina.org/docs/hooks-reference.html#useeffect)
  - [`useContext`](https://react.docschina.org/docs/hooks-reference.html#usecontext)
- [额外的 Hook](https://react.docschina.org/docs/hooks-reference.html#additional-hooks)
  - [`useReducer`](https://react.docschina.org/docs/hooks-reference.html#usereducer)
  - [`useCallback`](https://react.docschina.org/docs/hooks-reference.html#usecallback)
  - [`useMemo`](https://react.docschina.org/docs/hooks-reference.html#usememo)
  - [`useRef`](https://react.docschina.org/docs/hooks-reference.html#useref)
  - [`useImperativeHandle`](https://react.docschina.org/docs/hooks-reference.html#useimperativehandle)
  - [`useLayoutEffect`](https://react.docschina.org/docs/hooks-reference.html#uselayouteffect)
  - [`useDebugValue`](https://react.docschina.org/docs/hooks-reference.html#usedebugvalue)

