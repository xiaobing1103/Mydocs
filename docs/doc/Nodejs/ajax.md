# [AJAX课程]

## [第1章：原生AJAX]

### [1.1 AJAX 简介]

- AJAX 全称为Asynchronous Javascript And XML，就是异步的 JS 和 XML。
- 通过AJAX可以在浏览器中向服务器发送异步请求。
- AJAX 不是新的编程语言，而是一种使用现有标准的新方法。

### [1.2 XML简介]

- XML 可扩展标记语言。
- XML 被设计用来传输和存储数据。
- XML和HTML类似，不同的是HTML中都是预定义标签，而XML中没有预定义标签，全都是自定义标签，用来表示一些数据。
- 比如说我有一个学生数据： `name = "孙悟空" ; age = 18 ; gender = "男" ; ` 用XML表示： `<student>        <name>孙悟空</name>        <age>18</age>        <gender>男</gender>    </student>`,现在已经被JSON取代了:用JSON表示：`{"name":"孙悟空","age":18,"gender":"男"}`

### [1.3 AJAX的工作原理]

Ajax的工作原理相当于在用户和服务器之间加了一个中间层(Ajax引擎)，使用户操作与服务器响应异步化。

### [1.4 AJAX的特点]

#### [1.4.1 AJAX的优点]

1. 可以无需刷新页面而与服务器端进行通信。
2. 允许你根据用户事件来更新部分页面内容。

#### [1.4.2 AJAX的缺点]

1. 没有浏览历史，不能回退
2. 存在跨域问题
3. SEO不友好

### [1.5 AJAX的使用]

#### [1.5.1 核心对象]

XMLHttpRequest，AJAX的所有操作都是通过该对象进行的。

#### [1.5.2 使用步骤]

- 创建XMLHttpRequest对象

  `var xhr = new XMLHttpRequest();`

- 设置请求信息

  `xhr.open(method, url);`

- 发送请求

  - get请求：

    xhr.send():因为请求体在查询字符串中，所以不需要书写参数

  - post请求：

    - `xhr.send(body)` //get请求不传body参数，只有post请求使用
    - body如果是查询字符串格式，则书写请求头`xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');`,服务器需要使用中间件`app.use(express.urlencoded(extended: true}))`
    - body如果是json字符串格式，则书写请求头`xhr.setRequestHeader("content-type", "application/json")`,服务器需要使用中间件`app.use(express.json());

- 接收响应

  `onreadystatechange `事件中，当`xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300)`时表示成功

  `xhr.responseXML` 接收xml格式的响应数据

  `xhr.responseText` 接收文本格式的响应数据

  > xhr.readyState:
  >
  >  0 :初始化状态
  >
  >  1 :代表open调用，但send方法还未调用（没有发送请求）
  >
  >  2 :代表send方法调用，并且接受到了部分响应信息（响应首行和响应头：状态码就在其中）
  >
  >  3 :代表接受了部分响应体数据，（如果响应体数据较小就全部接受。但是数据如果比较大，就只接受一部分）
  >
  >  4 :代表全部接受完成

#### [1.5.3 解决IE缓存问题]

问题：在一些浏览器中(IE),由于缓存机制的存在，ajax的get请求只会发送的第一次请求，剩余多次请求不会在发送给浏览器而是直接加载缓存中的数据。chrome/firfox执行协商缓存，IE走强制缓存

解决方式：浏览器的缓存是根据url地址来记录的，所以我们只需要修改url地址即可避免缓存问题

```
xhr.open("get","/testAJAX?t="+Date.now());
```

## [第2章：jQuery中的AJAX]

### [2.1 get请求]

```
$.get(url, [data], [callback], [type])
```

- url:请求的URL地址。
- data:请求携带的参数。
- callback:载入成功时回调函数。
- type:设置返回内容格式，xml, html, script, json, text, _default。

### [2.2 post请求]
```
$.post(url, [data], [callback], [type])
```

- url:请求的URL地址。
- data:请求携带的参数。
- callback:载入成功时回调函数。
- type:设置返回内容格式，xml, html, script, json, text, _default。

## [第3章：跨域]

### [3.1同源策略]

- 同源策略(Same-Origin Policy)最早由 Netscape 公司提出，是浏览器的一种安全策略。
- 同源： 协议、域名、端口号 必须完全相同。
- 违背同源策略就是跨域。

### [3.2如何解决跨域]

#### [3.2.1 JSONP]

- JSONP是什么

  JSONP(JSON with Padding)，是一个非官方的跨域解决方案，纯粹凭借程序员的聪明才智开发出来，只支持get请求。

- JSONP怎么工作的？

  在网页有一些标签天生具有跨域能力，比如：img link iframe script。

  JSONP就是利用script标签的跨域能力来发送请求的。

- JSONP的使用

  - 动态的创建一个script标签

    `var script = document.createElement("script");`

  - 设置script的src，设置回调函数

    `script.src = "http://localhost:3000/testAJAX?callback=abc";`

    `function abc(data) {alert(data.name);};`

  - 将script添加到body中

    document.body.appendChild(script);

  - 服务器中路由的处理

    ```js
    router.get("/testAJAX" , function (req , res) {
        console.log("收到请求");
        var callback = req.query.callback;
        var obj = {
            name:"孙悟空",
            age:18
        }
        res.send(callback+"("+JSON.stringify(obj)+")");
    });
    ```

- jQuery中的JSONP

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body> 
        <button id="btn">按钮</button>
        <ul id="list"></ul>
        <script type="text/javascript" src="./jquery-1.12.3.js"></script>
        <script type="text/javascript">
            window.onload = function () {
                var btn = document.getElementById('btn') btn.onclick = function () {
                    $.getJSON("http://api.douban.com/v2/movie/in_theaters?callback=?", function (data) {
                        console.log(data);
                        * //获取所有的电影的条目*          var subjects = data.subjects;           *//遍历电影条目*          for(var i=0 ; i<subjects.length ; i++){             $("#list").append("<li>"+               subjects[i].title+"<br />"+               "<img src=\""+subjects[i].images.large+"\" >"+               "</li>");           }         });       }     }   
        </script>
    </body>

  </html>
```

#### [3.2.2 CORS]

- CORS是什么？

  CORS（Cross-Origin Resource Sharing），跨域资源共享。CORS是官方的跨域解决方案，它的特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，支持get和post请求。

- CORS怎么工作的？

  CORS是通过设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应以后就会对响应放行。

- CORS的使用

  主要是服务器端的设置：

  ```js
  router.get("/testAJAX" , function (req , res) {
  //通过res来设置响应头，来允许跨域请求
  //res.set("Access-Control-Allow-Origin","http://127.0.0.1:3000");  
  res.set("Access-Control-Allow-Origin","*");
  res.send("testAJAX返回的响应");
  });
  ```