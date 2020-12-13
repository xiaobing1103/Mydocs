# vuex

<img src="https://s3.ax1x.com/2020/11/25/DdFdbj.png" alt="DdFdbj.png" border="0" />

- 作用:用来集中式管理多个组件共享的状态数据
- 包含的内容
  - state
    - 所有的状态数据
    - 一般要对数据进行初始化
  - getters
    - 所有的只读计算属性
    - 一定会依赖于某个状态数据
  - actions
    - 包含n个间接更新的函数对象
    - 一般需要发送请求,负责修改状态数据的方法对象,通常发送ajax请求
  - mutations
    - 包含n个直接更新的函数对象
    - 一般直接对state数据进行修改(不应该再做其他的额外操作了,比如发送请求)
  - mutation-types
    - mutation函数的类型常量模块



- vuex的工作流程
  - 读取
    - 组件直接调用`this.$store.state.xxx`
      - mapState(['count'])
    - 组件直接调用this.$store.getters.xxx
      - mapGetters(['oddOrEven'])
    
  - 更新
    
    - 组件调用`this.$store.dispatch("action 函数名称",数据)`
      - `mapActions(['increment'])`
    - 触发某个`actions`函数,`actions`函数中发送请求,请求成功调用`commit(mutation 函数名称',数据)`
    - 触发某个`mutations`函数,`mutations`函数就会对`state`数据进行直接修改
    - 数据一旦更新,因为响应式的原因,所以用户界面也会发生变化
    
  - 组件调用` this.$store.commit('mutation 函数名称', 数据)`

    - `mapMutations(['INCREMENT'])`

    - 触发某个 mutations 函数，mutations 函数就会对 state 数据进行直接修改

    - 数据一旦更新，因为响应式的原因，所以用户界面也会发生变化

- 状态数据要不要定义在vuex中？
  - 看数据是否有多个组件要使用（显示，操作）
- 要对`vuex`的数据进行操作，要不要`actions`?
  - 要数据需不需要进一步处理(操作:发送请求...)
- mutation函数要定义多少个?
  - 看要对数据进行几种类型的操作

