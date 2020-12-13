## React-router 

**前言:**

>现代的前端应用大多都是 SPA（单页应用程序），也就是只有一个 HTML 页面的应用程序。因为它的用户体 验更好、对服务器的压力更小，所以更受欢迎。为了有效的使用单个页面来管理原来多页面的功能，前端路由 应运而生

- 前端路由的功能：让用户从一个视图（页面）导航到另一个视图（页面） 

- 前端路由是一套映射规则，在React中，是 URL路径 与 组件 的对应关系 
- 使用React路由简单来说，就是配置 路径和组件（配对）

### 相关api

**组件**

```javascript
<BrowserRouter>
<HashRouter>
<Route>
<Redirect>
<Link>
<NavLink>
<Switch>
```

**其他**

```javascript
history对象
match对象
location 对象
withRouter函数
```

### 组件的基本使用

1. 安装：npm i react-router-dom 

2. 导入路由的三个核心组件：Router / Route / Link 

   ```javascript
   import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
   ```

3. 使用 Router 组件包裹整个应用（重要）

   ```javascript
   <Router> 
     <div className="App"> 
      // … 省略页面内容 
     </div> 
   </Router> 
   ```

4.  使用 Link 组件作为导航菜单（路由入口）

   ```javascript
   <Link to="/first">页面一</Link> 
   ```

    

5. 使用 Route 组件配置路由规则和要展示的组件（路由出口） 

   ```javascript
   const First = () => <p>页面一的页面内容</p> 
   <Router> 
     <div className="App"> 
       <Link to="/first">页面一</Link> 
       <Route path="/first" component={First}></Route> 
     </div> 
   </Router>
   ```

   

 **组件说明:**

- Router 组件：包裹整个应用，一个 React 应用只需要使用一次 
- 两种常用 Router：HashRouter 和 BrowserRouter 
  - HashRouter：使用 URL 的哈希值实现（localhost:3000/#/first） 
  - （推荐）BrowserRouter：使用 H5 的 history API 实现（localhost:3000/first）

-  Link 组件：用于指定导航链接（a 标签）

  ```java
  // to属性：浏览器地址栏中的pathname（location.pathname） 
  <Link to="/first">页面一</Link> 
  ```

-  Route 组件：指定路由展示组件相关信息 

  ```javascript
  // path属性：路由规则 
  // component属性：展示的组件  
  // Route组件写在哪，渲染出来的组件就展示在哪 
  <Route path="/first" component={First}></Route> 
  ```

### 路由的执行过程

1. 点击 Link 组件（a标签），修改了浏览器地址栏中的 url 。 
2. React 路由监听到地址栏 url 的变化。 
3. React 路由内部遍历所有 Route 组件，使用路由规则（ path ）与 pathname 进行匹配。
4. 当路由规则（path）能够匹配地址栏中的 pathname 时，就展示该 Route 组件的内容。 

### 默认路由

问题：现在的路由都是点击导航菜单后展示的，如何在进入页面的时候就展示呢？ 

默认路由：表示进入页面时就会匹配的路由 

默认路由path为：/ 

```javascript
<Route path="/" component={Home} /> 
<Route path='/home' component={Home}></Route>
<Route path='/about' component={About}></Route>
```

### 路由匹配模式

- 模式匹配

  - 问题：当 Link组件的 to 属性值为 “/home”时，为什么 默认路由 也被匹配成功？ 

  - 默认情况下，React 路由是模糊匹配模式 
    -  模糊匹配规则：**只要 pathname 以 path 开头就会匹配成功** 
      - path 代表Route组件的path属性 
      - pathname 代表Link组件的to属性（也就是 location.pathname） 

  - path 能够匹配的 pathname 
    - /  可以匹配  所有pathname 
    - /first  可以匹配  /first 或 /first/a 或 /first/a/b/… 

- 精确匹配

  - 问题：默认路由任何情况下都会展示，如何避免这种问题？ 

  -  给 Route 组件添加 exact 属性，让其变为精确匹配模式 

  - 精确匹配：**只有当 path 和 pathname 完全匹配时才会展示该路由** 

    - 此时，该组件只能匹配 pathname=“/” 这一种情况 

      - <Route exact path="/" component=... /> 

      推荐：给默认路由添加 exact 属性



### 路由中其他组件介绍

- Switch 组件

  - Switch组件用于包裹Route组件,类似于js中的switch,有一个Route符合就不往下匹配了

    ```javascript
     //pathname是 /home
     //匹配第一个path /home 符合. 就不再匹配下面的Route了
    <Switch>
        <Route path='/home' component={Home}></Route>
        <Route path='/about' component={About}></Route>
        <Route path='/' component={Home}></Route>
    </Switch>
    ```

    

- Redirect 组件

  - 重定向组件(渲染Redirect将使导航到一个新的地址,这个新的地址会覆盖 history 栈中的当前地址)

    ```javascript
    <Route path='/home' component={Home}></Route>
    <Route path='/about' component={About}></Route>
    <Redirect to='/home'></Redirect>
    或
    <Redirect
      to={{
        pathname: "/home",
      }}
    />
    ```

- NavLink

  - 和Link组件的功能是一样的.只是会给对应的a标签添加类名

    ```javascript
     <NavLink to='/about'>about</NavLink>  
    // 渲染后的a标签上面会有一个active类名(默认)
     <a href-="..." class="active"></a>
    ```

  - NavLink 配合 activeClassName属性 指定类名

    ```javascript
     <NavLink to='/about' activeClassName="selected">about</NavLink>  
    // 渲染后的a标签上面会有一个selected类名
     <a href-="..." class="selected"></a>
    ```

    

### 编程式导航

>前提: 被Route渲染的组件,通过props可以获取到三个属性分别是 history, location和match

- 场景：点击登录按钮，登录成功后，通过代码跳转到后台首页，如何实现？ 
-  编程式导航：通过 JS 代码来实现页面跳转 
-  history 是 React 路由提供的，用于获取浏览器历史记录的相关信息  

```javascript
class Login extends Component { 
  handleLogin = () => { 
    // ... 
    this.props.history.push('/login') 
  } 
  render() {...省略其他代码} 
} 
```

### history对象 

>操作历史记录的方法

- `push(path, [state])` - (function 类型) 在 history 堆栈添加一个新条目
- `replace(path, [state])` - (function 类型) 替换在 history 堆栈中的当前条目
- `go(n)` - (function 类型) 将 history 堆栈中的指针调整 `n`
- `goBack()` - (function 类型) 等同于 `go(-1)`
- `goForward()` - (function 类型) 等同于 `go(1)`

### location对象

>表示当前程序在哪

```javascript
location.pathname 可以获取当前的pathname
location.search 可以获取到路径后面的查询字符串 "?a=1&b=2"
location.state 可以获取到push和replace方法传递过来的第二个参数
```

### Match对象

>包含匹配url信息

```javascript
match.path 可以获取匹配的path
math.params 可以获取路由参数
```

### withRouter高阶组件

>之前说过被Route渲染的组件,通过props可以获取到三个属性分别是 history, location和match,
>
>否则无法获取到history,location和match
>
>withRouter可以帮助我们实现,在非Route渲染的组件中获取到history,location和match

### 路由组件传参

- 拼接在pathname后面 

  ```javascript
  <Link to='/home?a=1&b=2'>home</Link>   // 通过location.search获取  (不推荐)
  ```

- 通过history的push或replace方法的第二个参数传递

  ```javascript
  props.history.push('/about', { name: 'zs'})  // 通过 location.state获取 用于编程式导航
  ```

- 通过路由参数传递

  ```javascript
  // 实现:
  // 1. 注册路由参数   :id为注册的路由参数 ?表示参数可有可没有
  <Route path='/about/:id?' component={About}></Route>
  // 2. 如何传递 /about后面就是要传递的参数
  <Link to='/about/1'>about</Link>
  // 3. 如何获取
  通过match.params可以获取
  ```

### 嵌套路由

[![BBwTBR.png](https://s1.ax1x.com/2020/11/02/BBwTBR.png)](https://imgchr.com/i/BBwTBR)

**实现: **

```javascript	
function Home(props) {
  return (
    <div>
      <h1>home组件</h1>
      <Link to='/home/item1'>item1</Link>
      <Link to='/home/item2'>item2</Link>
      <Link to='/home/item3'>item2</Link>
      
      // 只需要在一级路由后面继续拼接二级路由即可
      <Route path='/home/item1' component={Item1}></Route>
      <Route path='/home/item2' component={Item2}></Route>
      <Route path='/home/item3' component={Item3}></Route>
    </div>
  )
}
// 注意: 如果一级路由不能显示,二级路由也不会显示
```





