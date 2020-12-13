# [Express]

## [基本格式]

```js
const express = require("express");
//创建application对象
const app = express();
/* 
    路由：
        定义访问的url和处理请求返回响应的方法
*/
app.get("/", (req, res) => {
    console.log(req.query);
    res.send("这个是根目录1")
    // res.end("这个是根目录")
})
app.get("/:id", (req, res) => {
    console.log(req.query);
    console.log(req.params);
    console.log(req.headers);

    /* res.send("这个是根目录2") //返回相应，会自动添加响应头
    res.end("这个是根目录2") //快速响应
    res.json("这个是根目录2") //将响应内容转为json返回
    res.download("这个是根目录2") //返回响应，浏览器自动下载
    res.sendFile("这个是根目录2") //返回相应，浏览器自动打开文件 */
    /* res.json({
        name: "lily"
    }) */
    // res.download("./package.json")
    // res.sendFile("./package.json")
    // res.redirect():返回重定向
    // res.redirect('http://www.atguigu.com')

    // res.set(key,value):设置响应头
    // res.status():设置相应状态码
})
app.get("/hello/:id", (req, res) => {
    console.log(req.query);
    console.log(req.params);
    res.send("这个是根目录3")
})
app.get("/user", (req, res) => {
    res.send("这个是user")
    // res.end("这个是根目录")
})

app.listen(3002, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`服务器启动成功:请访问 http://localhost:3002`)
})
```

## [登录注册功能]

```js
//入口文件 app.js
const express = require("express");
require("./db")
const User = require("./models")
const {
    resolve
} = require("path")
//创建application对象
const app = express();
/* 
    路由：
        定义访问的url和处理请求返回响应的方法


*/
app.get("/login", async (req, res) => {
    //获取用户数据
    //验证
    const {
        user,
        pass,
    } = req.query;

    const re = await User.findOne({
        user,
        pass
    });

    if (re) {
        res.send("登录成功")
    } else {
        res.send("用户或密码错误")
    }

})
app.get("/register", async (req, res) => {
    /* 
        获取用户数据
        验证是否注册
        保存数据库
        注册成功
    */
    const {
        user,
        pass,
        email
    } = req.query;

    const result = await User.findOne({
        user
    });
    if (result) {
        res.send("用户名已经存在");
        return;
    }
    await User.create({
        user,
        pass,
        email
    });
    // res.send("注册成功")
    res.redirect("http://localhost:3000/login.html")


})
app.get("/register.html", (req, res) => {
    res.sendFile(resolve(__dirname, "./public/register.html"))
})
app.get("/login.html", (req, res) => {
    res.sendFile(resolve(__dirname, "./public/login.html"))
})
app.listen(3000, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`服务器启动成功:请访问 http://localhost:3002`)
})
```

## [中间件]

```js
const express = require("express");
//创建application对象
const app = express();

/* 
    中间件：
    - 本质是一个函数
    - 组成
        req
        res
        next
    - 作用
        执行任意代码
        修改req和res对象
        接受请求 处理请求  返回响应
        调用下一个中间件或路由
    - 应用：
        应用级中间件（权限管理、防盗链等等，完成公共逻辑,正则校验）
        第三方中间件（cookie-parser、session）
        内置中间件（官方提供的中间件 express.static 和express.urlencoded）
        路由器中间件
        错误处理中间件
*/

//可以直接访问lll文件夹中的所有静态资源
app.use(express.static("./lll"))

//获取请求体，解析为一个对象，放到req的body上
app.use(express.urlencoded({
    extended: true
}))
app.use((req, res, next) => {
    console.log("bbb")
    // res.end("bbb");
    next();
})


app.get("/", (req, res) => {
    // console.log(req.body)
    console.log("aaa")
    res.end("aaa")
})
app.post("/", (req, res) => {
    console.log(req.body)
    console.log(ren)
    console.log("ccc")
    res.end("ccc")
})
app.use((err, req, res, next) => {
    console.log(err + "11111");
})
app.listen(3000, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`服务器启动成功:请访问 http://localhost:3000`)
})
//中间件 正则验证
app.use((req, res, next) => {
    const {
        user,
        pass
    } = req.query;

    const userReg = /^[A-Z][a-zA-Z0-9]{4,6}$/;
    const passReg = /^[a-zA-Z0-9]{4,6}$/;
    if (!userReg.test(user)) {
        res.send("用户名需要大写字母开头，数字字母下划线总共4-6位");
        return;
    }
    if (!passReg.test(pass)) {
        res.send("密码需要数字字母下划线总共4-6位");
        return;
    }
    next()
})
```

## [路由管理]

### [路由管理基础写法]

```js
const express = require("express");
const app = express();

const router = new express.Router();
router.use((req, res, next) => {
    console.log("中间件")
    next();
})

router.get("/login", async (req, res) => {
    res.send("login")
})

router.get("/register", (req, res) => {
    res.send("register");
})

//应用路由器中间件
app.use(router);

app.listen(3002, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`服务器启动成功:请访问 http://localhost:3002`)
})
```

### [登录注册修改]

```js
//将登录注册的路由 交给router管理const express = require("express");
const {
    resolve
} = require("path");

//引入mongoose模块
const mongoose = require("mongoose")



//userInfo集合约束模块
const UserInfoSchema = require("../userInfo");

//创建一个对userInfo集合的引用
const userInfo = mongoose.model("userInfo", UserInfoSchema);
const router = new express.Router();

router.use((req, res, next) => {
    ...
})

//注册的接口
router.get("/register", async (req, res) => {
    ...
})

//登录的接口
router.get("/login", async (req, res) => {
   ...
})
module.exports = router;
```

## [ejs]

### [基础使用]

```js
const express = require("express");
const ejs = require("ejs");
/* 
    ejs：模板引擎
        1.服务器渲染技术
        2.使用
            1.下载ejs
            2.配置ejs
                //配置使用哪一个模板引擎
                app.set("view engine",'ejs');
                //配置模板引擎资源目录
                app.set("views","xxx");

*/
const app = express();

app.set("view engine", "ejs");
app.set("views", "views")

app.get("/", (req, res) => {
    /* const person = {
        name: "<strong>lily</strong>",
        age: "<strong>18</strong>"
    };

    // render的第二个参数是一个对象
    res.render("index.ejs", person) */


    const person = [{
            name: "lily",
            age: 18
        },
        {
            name: "laowang",
            age: 19
        },
    ]
    res.render("index.ejs", {
        person
    })
})

app.listen(3003, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`服务器启动成功:请访问 http://localhost:3003`)
})
<body>
    <!-- 
        语法
         <%  %>:可以执行js代码
         <%=  %>:有输出 转义后的内容，不解析元素--推荐
         <%-  %>:有输出 未转内容，解析标签


     -->
    <!-- <p>姓名-- <%= name %> </p>
    <p>年龄-- <%- age %> </p> -->


    <% person.forEach((item)=>{%>
    姓名<%= item.name %>
    年龄<%= item.age %>
    <% }) %>
</body>
```

### [登录注册的使用]

```js
//server.js
app.set("view engine", "ejs");
app.set("views", "views")
//user-router


router.use((req, res, next) => {
    const {
        user,
        pass
    } = req.query;

    const isRegister = req.url.includes("/register");
    const assetName = isRegister ? "register.ejs" : "login.ejs";
    console.log(assetName)
    const userReg = /^[A-Z][a-zA-Z0-9]{4,6}$/;
    const passReg = /^[a-zA-Z0-9]{4,6}$/;
    if (!userReg.test(user)) {
        res.render(assetName, {
            errMes: {
                userErr: "1用户名需要大写字母开头，数字字母下划线总共4-6位"
            }
        });
        return;
    }
    if (!passReg.test(pass)) {
        res.render(assetName, {
            errMes: {
                passErr: "1密码需要数字字母下划线总共4-6位"
            }
        });
        return;
    }
    next()
})

module.exports = router;
<form action="http://127.0.0.1:3001/login" method="GET">
        <div>
            <label>
                请输入用户名:
                <input type="text" name="user">
                <%= errMes.userErr %>
            </label>
        </div>
        <div>
            <label>
                请输入密码:
                <input type="text" name="pass">
                <%= errMes.passErr %>
            </label>
        </div>
        <button>登录</button>

    </form>
```

## [cookie]

### [cookie基础]

```js
const express = require("express");
const cookieParser = require("cookie-parser");
//注册一个服务
const app = express();

//解析cookie数据挂载在req上
app.use(cookieParser());

/* 
    cookie:
        1.是什么？
            一个解决http无状态协议（无法分清楚谁发送的请求）的技术
            本质上：是一个存储在浏览器上的文本 key-value

        2.作用是
            解决http无状态
            储存少量文本

        3.使用
            - 设置
                服务端设置cookie，cookie会随着响应发送给客户端，客户端把cookie保存起来
                cookie是一个 key-value键值对的值
                如果不设置时间，则代表临时存储，当浏览器关闭后，就会消失
                设置时间可以通过expires或max-age（推荐） max-age的时间单位是毫秒
                httpOnly是设置仅仅对服务端可见，仅仅服务端可以操作
                在客户端可以使用读写二合一的方法 document.cookie

            - 获取
                使用req.headers.cookie可以获取cookie 获取的cookie是`username=lily; password=xiaowang`;
                但是我们最终需要的是一个对象，里边的cookie是key-value形式 {username:lily,password:xiaowang}

                使用第三方库cookie-parser，可以将cookie对象挂载在req上

            - 删除cookie 
                req.clearCookie("");
                给cookie设置一个过期的时间 或是设置max-age = 0;
                res.setHeader("Set-Cookie","username=;max-age=0")
                res.cookie("id","xxx",{maxAge:0})

        工作原理：
            1.客户端发送请求到服务器去，请求登录，当登录成功，服务器返回一个cookie给客户端
            2.客户端收到cookie会自动保存，下次发送会自动携带 服务器就要获取cookie并解析，并判断cookie是否合法
            3.如果合法 就返回正确的响应  否则就清除cookie 返回错误响应
*/

app.get("/", (req, res) => {
    console.log(2)
    res.cookie("id", "123456", {
        maxAge: 1000 * 3600 * 24 * 7,
        httpOnly: true
    })

    console.log(req.cookies); //需要依赖cookie-parser库
    console.log(req.headers.cookie);
    res.send("cookie设置成功")
})

//启动服务
app.listen(3001, (err) => {
    if (err) {
        console.log("服务器启动错误" + err);
        return;
    }
    console.log("服务器启动成功 http://127.0.0.1:3001")
})
```

### [登录注册cookie的使用]

```js
//登录成功设置cookie
if (isHasUser.pass === pass) {
    // res.send("登录成功")
    res.cookie("userID", isHasUser._id, {
        maxAge: 1000 * 3600 * 24 * 7,
        httpOnly: true
    })

    res.redirect("http://127.0.0.1:3001/user.html")
}
//访问user.html权限设置
const express = require("express");
const cookieParser = require("cookie-parser");
const {
    resolve
} = require("path");

//引入mongoose模块
const mongoose = require("mongoose")

//userInfo集合约束模块
const UserInfoSchema = require("../userInfo");

//创建一个对userInfo集合的引用
const userInfo = mongoose.model("userInfo", UserInfoSchema);


const router = new express.Router();
router.use(cookieParser());
router.get("/user.html", async (req, res) => {
    //有cookie 并且合法才能访问
    if (req.cookies.userID) {
        const re = await userInfo.find({
            _id: req.cookies.userID
        })
        if (re) {
            res.sendFile(resolve(__dirname, "../private/user.html"))
            return;
        } else {
            res.clearCookie("userID");
        }
    }

    res.clearCookie("userID");
    res.status(401).send("你没有权限访问")


})


module.exports = router;
```

## [session]

```js
//server.js
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//设置session中间件
app.use(session({
    secret: 'keyboardcat', //参与加密的串
    saveUninitialized: false, // 没有存之前 不创建session
    resave: false, //没有修改session就不会重新保存
    store: new MongoStore({
        url: 'mongodb://localhost:27017/atguigu',
        ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    }),
    cookie: {
        maxAge: 14 * 24 * 60 * 60,
        httpOnly: true
    }
}));
// 登录成功 创建session 保存在数据库中 生成一个cookie 存储session_id返回给客户端
req.session.userID = isHasUser._id;
//权限文件中
console.log(req.session)
if (req.session) {
    const re = await userInfo.findOne({
        _id: req.session.userID
    })
    console.log(re);
    if (re) {
        res.sendFile(resolve(__dirname, "../center/center.html"))
        return;
    } else {
        res.clearCookie("userID");
    }
}

res.clearCookie("userID");
res.status(401).send("你没有权限访问")
```

## [缓存]

```js
const express = require("express");
const {
    resolve
} = require("path");
const fs = require("fs");
//eTag包 是对文件生成唯一标识
const eTag = require("etag")
const {
    promisify
} = require("util")
const app = express();

//访问根目录
app.get("/", (req, res) => {
    //sendFile会自动设置缓存
    // res.sendFile(resolve(__dirname, "public/index.html"))
    //直接使用可读流返回响应
    const file = fs.createReadStream(resolve(__dirname, "public/index.html"));
    res.set("Content-Type", "text/html;charset=utf-8")
    file.pipe(res);
})

//访问js
app.get("/js/index.js", (req, res) => {
    const file = fs.createReadStream(resolve(__dirname, "public/js/index.js"));
    res.set("Content-Type", "application/javascript;charset=utf-8")

    //设置强制缓存
    //在缓存时间内不会发送请求，而是会读取缓存
    res.set("cache-control", "max-age=3600")//http1.1
    // res.set("expires", new Date(Date.now() + 5000).toGMTString());//http1

    file.pipe(res);
})

app.get("/css/index.css", async (req, res) => {
    const filePath = resolve(__dirname, "public/css/index.css")
    const file = fs.createReadStream(filePath);
    res.set("Content-Type", "text/css;charset=utf-8")

    //协商缓存
    //每次进入先读取请求的ifNoneMatch和ifModifiedSince
    const ifNoneMatch = req.headers["if-none-match"];
    const ifModifiedSince = req.headers["if-modified-since"];

    //stat是fs中读取文件信息方法
    const stat = promisify(fs.stat);
    const fileStats = await stat(filePath);
    //使用eTag包获取文件的唯一标识
    const fileETag = eTag(fileStats);
    //获取文件的最后一次修改时间
    const lastModified = new Date(fileStats.mtime).toGMTString();

    //进行判断
    if (ifNoneMatch === fileETag && ifModifiedSince === lastModified) {
        //如果等 则说明读取缓存 不响应任何值
        res.status(304).end();
        return;
    }
    //不读取缓存  重新设置eTag和last-modified
    res.set("eTag", fileETag)
    res.set("last-modified", lastModified)

    file.pipe(res);
})

//启动服务
app.listen(3000, (err) => {
    if (err) {
        console.log("服务器启动错误" + err);
        return;
    }
    console.log("服务器启动成功 http://127.0.0.1:3000")
})
```

## [压缩]

```js
const zlib = require("zlib")


app.get("/js/index.js", (req, res) => {


    // res.sendFile(resolve(__dirname, "public/index.html"))
    const file = fs.createReadStream(resolve(__dirname, "public/js/index.js"));
    res.set("Content-Type", "application/javascript;charset=utf-8")

    //强制缓存
    res.set("cache-control", "max-age=3600")

    //获取请求中携带的可以接受的压缩类型
    const acceptEncoding = req.headers['accept-encoding'];
    console.log(acceptEncoding)

    //includes 检测某个字符串中 有没有出现某个字符串，返回的是布尔值
    const isgZip = acceptEncoding.includes("gzip");
    if (isgZip) {
        const gZipFile = file.pipe(zlib.createGzip());
        res.set("Content-Encoding", "gzip");
        //功能最终返回压缩后的值
        gZipFile.pipe(res);
        return;
    }

    const isDeflate = acceptEncoding.includes("deflate");
    if (isDeflate) {
        const gZipFile = file.pipe(zlib.createDeflate());
        res.set("Content-Encoding", "deflate");
        //功能最终返回压缩后的值
        gZipFile.pipe(res);
        return;
    }

    const isBr = acceptEncoding.includes("br");
    if (isBr) {
        const gZipFile = file.pipe(zlib.createBrotliCompress());
        res.set("Content-Encoding", "br");
        //功能最终返回压缩后的值
        gZipFile.pipe(res);
        return;
    }

    file.pipe(res);
    return;
})
```

## [自动打开浏览器]

```js
const {exec} = require("child_process");

function open(url){
    //platForm获取系统标识
    const platForm = process.platform;
    console.log(platForm)

    let cmd = "";
    //switch判断
    switch(platForm){
        case 'win32'://window
            cmd = "start";
            break;
        case 'darwin'://macOS
            cmd = "open";
            break;
        case 'linux'://Linux
            cmd="xdg-open"
            break;
    }

    // exec可以执行commad命令
    exec(`${cmd} ${url}`);
}

module.exports = open;
//启动服务的时候调用
open("http://127.0.0.1:3000")
```

## [koa]

```js
const koa = require("koa");
const bodyParser = require('koa-bodyparser');
const _ = require('koa-route');

const app = new koa();
app.use(bodyParser());

/* app.use((ctx, next) => {
    console.log(ctx.query);
    ctx.body = "响应";
}) */
/* app.use((ctx, next) => {
    console.log(ctx.query);
    console.log(ctx.request.body);
    ctx.body = "响应";
}) */

app.use(_.get('/user', (ctx, next) => {
    console.log("user");
    ctx.body = "user的"
}));
app.listen(3000, (err) => {
    console.log("http://127.0.0.1:3000")
})
```