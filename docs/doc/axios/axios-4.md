# 第4章：axios源码分析

## 4.1. 源码目录结构

```js
├── /dist/                     # 项目输出目录
├── /lib/                      # 项目源码目录
│ ├── /adapters/               # 定义请求的适配器 xhr、http
│ │ ├── http.js                # 实现http适配器(包装http包)
│ │ └── xhr.js                 # 实现xhr适配器(包装xhr对象)
│ ├── /cancel/                 # 定义取消功能
│ ├── /core/                   # 一些核心功能
│ │ ├── Axios.js               # axios的核心主类
│ │ ├── dispatchRequest.js     # 用来调用http请求适配器方法发送请求的函数
│ │ ├── InterceptorManager.js  # 拦截器的管理器
│ │ └── settle.js              # 根据http响应状态，改变Promise的状态
│ ├── /helpers/                # 一些辅助方法
│ ├── axios.js                 # 对外暴露接口
│ ├── defaults.js              # axios的默认配置 
│ └── utils.js                 # 公用工具
├── package.json               # 项目信息
├── index.d.ts                 # 配置TypeScript的声明文件
└── index.js                   # 入口文件
```

## 4.2. 源码分析

### 4.2.1. axios与Axios的关系?

1. 从语法上来说: axios不是Axios的实例

2. 从功能上来说: axios是Axios的实例

3. axios是Axios.prototype.request函数bind()返回的函数

4. axios作为对象有Axios原型对象上的所有方法, 有Axios对象上所有属性

### 4.2.2. instance与axios的区别?

1. 相同: 

   (1)   都是一个能发任意请求的函数: request(config)

   (2)   都有发特定请求的各种方法: get()/post()/put()/delete()

   (3)   都有默认配置和拦截器的属性: defaults/interceptors

1. 不同:

   (1)   默认匹配的值很可能不一样

   (2)   instance没有axios后面添加的一些方法: create()/CancelToken()/all()

### 4.2.3. axios运行的整体流程?

[![BLO7V0.png](https://s1.ax1x.com/2020/11/10/BLO7V0.png)](https://imgchr.com/i/BLO7V0)

1. 整体流程: 

   request(config) ==>  dispatchRequest(config)  ==>  xhrAdapter(config)

2. request(config): 

   将请求拦截器 / dispatchRequest() / 响应拦截器 通过promise链串连起来, 返回promise

3. dispatchRequest(config): 

   转换请求数据 ===> 调用xhrAdapter()发请求 ===> 请求返回后转换响应数据. 返回promise

4. xhrAdapter(config): 

   创建XHR对象, 根据config进行相应设置, 发送特定请求, 并接收响应数据, 返回promise 

### 4.2.4. axios的请求/响应拦截器是什么?

[![BLOzrR.png](https://s1.ax1x.com/2020/11/10/BLOzrR.png)](https://imgchr.com/i/BLOzrR)

1. 请求拦截器: 

   在真正发送请求前执行的回调函数

   可以对请求进行检查或配置进行特定处理

   成功的回调函数, 传递的默认是config(也必须是)

   失败的回调函数, 传递的默认是error

 

2. 响应拦截器

   在请求得到响应后执行的回调函数

   可以对响应数据进行特定处理

   成功的回调函数, 传递的默认是response

   失败的回调函数, 传递的默认是error

### 4.2.5. axios的请求/响应数据转换器是什么?

1. 请求转换器: 对请求头和请求体数据进行特定处理的函数

   if (utils.isObject(data)) {

     setContentTypeIfUnset(headers, 'application/json;charset=utf-8');

     return JSON.stringify(data);

   }

2. 响应转换器: 将响应体json字符串解析为js对象或数组的函数

   response.data = JSON.parse(response.data)

### 4.2.6. response的整体结构

```js
{
        data,
        status,
        statusText,
        headers,
        config,
        request
  }
```

### 4.2.7. error的整体结构

```json
{
       message,
       response,
	   request,
}
```

### 4.2.8. 如何取消未完成的请求?

1. 当配置了cancelToken对象时, 保存cancel函数

   (1)   创建一个用于将来中断请求的cancelPromise

   (2)   并定义了一个用于取消请求的cancel函数

   (3)   将cancel函数传递出来

2. 调用cancel()取消请求

   (1)   执行cacel函数, 传入错误信息message

   (2)   内部会让cancelPromise变为成功, 且成功的值为一个Cancel对象

   (3)   在cancelPromise的成功回调中中断请求, 并让发请求的proimse失败, 失败的reason为Cacel对象

