# 第2章：XHR的理解和使用

## 2.1. MDN文档

https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest

## 2.2. 理解

1. 使用XMLHttpRequest (XHR)对象可以与服务器交互, 也就是发送ajax请求

2. 前端可以获取到数据，而无需让整个的页面刷新。

3. 这使得Web页面可以只更新页面的局部，而不影响用户的操作。

## 2.3. 区别一般http请求与ajax请求

1. ajax请求是一种特别的http请求

2. 对服务器端来说, 没有任何区别, 区别在浏览器端

3. 浏览器端发请求: 只有XHR或fetch发出的才是ajax请求, 其它所有的都是非ajax请求

4. 浏览器端接收到响应

   (1)   一般请求: 浏览器一般会直接显示响应体数据, 也就是我们常说的刷新/跳转页面

   (2)   ajax请求: 浏览器不会对界面进行任何更新操作, 只是调用监视的回调函数并传入响应相关数据

## 2.4. API

1. XMLHttpRequest(): 创建XHR对象的构造函数

2. status: 响应状态码值, 比如200, 404

3. statusText: 响应状态文本

4. readyState: 标识请求状态的只读属性

   0:  初始

   1:  open()之后

   2:  send()之后

   3:  请求中

   4:  请求完成

5. onreadystatechange: 绑定readyState改变的监听

6. responseType: 指定响应数据类型, 如果是'json', 得到响应后自动解析响应体数据

7. response: 响应体数据, 类型取决于responseType的指定

8. timeout: 指定请求超时时间, 默认为0代表没有限制

9. ontimeout: 绑定超时的监听

10. onerror: 绑定请求网络错误的监听

11. open(): 初始化一个请求, 参数为: (method, url[, async])

12. send(data): 发送请求

13. abort(): 中断请求

14. getResponseHeader(name): 获取指定名称的响应头值

15. getAllResponseHeaders(): 获取所有响应头组成的字符串

16. setRequestHeader(name, value): 设置请求头

## 2.5. XHR的ajax封装(简单版axios)

### 2.5.1. 特点

1. 函数的返回值为promise, 成功的结果为response, 异常的结果为error

2. 能处理多种类型的请求: GET/POST/PUT/DELETE

3. 函数的参数为一个配置对象

   {

   url: '',  // 请求地址

   method: '',  // 请求方式GET/POST/PUT/DELETE

   params: {}, // GET/DELETE请求的query参数

   data: {}, // POST或DELETE请求的请求体参数 

   }

4. 响应json数据自动解析为js

### 2.5.2. 编码实现

```js
/*
    使用XHR封装发送ajax请求的通用函数
      返回值: promise
      参数为配置对象
        url: 请求地址
        params: 包含所有query请求参数的对象 {name: tom, age: 12} ==> name=tom&age=12
        data: 包含所有请求体参数数据的对象
        method: 为请求方式
    */
    function axios({url, method='GET', params={}, data={}}) {

      method = method || 'GET'
      method = method.toUpperCase()
      // 将params中的参数属性拼接到url上   
      // {name: tom: pwd: 123}  ===> queryStr=name=tom&pwd=123
      // url + ? + queryStr
      let queryStr = ''
      Object.keys(params).forEach(key => {
        // &pwd=123
          queryStr += '&' + key + '=' + params[key]
      })
      // '&name=tom&pwd=123' 或者 ''
      if (queryStr) {
        queryStr = queryStr.substring(1) // 'name=tom&pwd=123'
        url += '?' + queryStr  // /user?name=tom&pwd=123
      }
      
      return new Promise((resolve, reject) => {
        // 创建XHR对象
        const request = new XMLHttpRequest()
	 	// 打开连接(初始化请求对象)
        request.open(method, url, true)
        // 设置响应数据类型 ==> 自动解析json文本为js对象/数组, 保存给response属性上
        request.responseType = 'json'
        // 绑定监视request的状态改变的监听
        request.onreadystatechange = function () {
          // 如果请求还没有完成, 直接结束
          if (request.readyState!==4) {
            return
          }
          const {status, statusText} = request
          // 如果成功了, 取出数据封装成成功的响应数据对象response, 调用resolve(response)
          if (status>=200 && status<300) { // 在[200, 300)
            const response = {
              // data: JSON.parse(request.response),
              data: request.response,
              status,
              statusText
            }
            resolve(response)
          } else {
             // 如果失败了, 封装失败相关信息成error对象, 调用reject(error)
             reject(new Error('request error status is ' + status))
          }
        }
        if (method==='GET' || method==='DELETE') {
          // 发送请求
          request.send()
        } else { // POST/PUT
          // 设置请求头
		  request.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
          // 发送请求
          request.send(JSON.stringify(data))
        }
      })
    }

```

### 2.5.3. 使用测试

```js
	function testGet() {
      axios({
        url: 'http://localhost:3000/comments',
        // url: 'http://localhost:3000/comments2',
        params: {id: 3},
      }).then(response => {
        console.log('get success', response.data, response)
      }).catch(error => {
        alert(error.message)
      })
    }

    function testPost() {
      axios({
        url: 'http://localhost:3000/comments',
        // url: 'http://localhost:3000/comments2',
        method: 'POST',
        data: { body: 'aaaa', postId: 2 }
      }).then(response => {
        console.log('post success', response.data, response)
      }).catch(error => {
        alert(error.message)
      })
        
        
      function testPut() {
      axios({
        url: 'http://localhost:3000/comments/3',
        // url: 'http://localhost:3000/comments/39',
        method: 'put',
        data: {body: 'abcdefg', "postId": 2}
      }).then(response => {
        console.log('put success', response.data, response)
      }).catch(error => {
        alert(error.message)
      })
    }
    
    function testDelete() {
      axios({
        url: 'http://localhost:3000/comments/1',
        method: 'delete',
        params: {
          body: 'some comment'
        }
      }).then(response => {
        console.log('delete success', response.data, response)
      }).catch(error => {
        alert(error.message)
      })
    }

```





