# [模块化]

## [1 模块化历史]

2015年之前的Javascript，就缺乏一个功能：模块。

本身的ECMAscript规范比较薄弱，还有以下缺陷：

- 没有模块系统
- 标准库较少
- 没有标准接口
- 缺乏包管理系统

如果程序设计达到一定规模，就必须对其模块化。

## [2 模块化是什么]

- 模块化指的就是将一个大的功能拆分为一个一个小的模块，通过不同的模块的组合来实现一个大功能。
- Node中使用的是CommonJS规范来实现的模块化，前端使用的模块化规范是AMD、CMD和ES6

## [3 CommonJS]

- CommonJS 是一套规范，它包含：模块、二进制、Buffer、字符集编码、I/O流、进程环境、文件系统、套接字、单元测试、Web服务器网关接口、包管理等。
- Node借鉴了commonjs的规范实现了一套模块系统，我们也叫做commonJS模块化系统。
- CommonJS对模块的定义主要分为模块引用、模块定义和模块标识3个部分

### [3.1 模块定义]

- 在CommonJS模块规范中，一个文件就是一个模块，并通过`module.exports`和`exports`两种方式来导出模块中的变量或函数

  - 默认情况下模块内部代码对于外部来说都是不可见的，可以通过两种方式向外部暴露变量和函数

    - 可以通过将变量和函数设置为 exports 的属性来暴露变量和函数

      ```js
      function add(x, y) {
          return x + y;
      }
      // 暴露出去
      exports.add = add; // { add: [Function: add] }
      ```

```
- 也可以通过module.exports来向外部暴露变量和函数

  ```js
  function sum(...args) {
      const result = args.reduce((previous, current) => {
          return previous + current;
      }, 0);
      return result;
  }
  // 暴露出去~
  module.exports = sum;
  ```
```

### [3.2模块引用](http://188.131.139.62/#/./NodeJS/02.NodeJS模块化?id=_32模块引用)

#### [3.2.1 如何引用](http://188.131.139.62/#/./NodeJS/02.NodeJS模块化?id=_321-如何引用)

- Node模块类型分为两种：`核心模块`和`文件模块`，并通过`require`方法来引入模块。前者是Node中内置的模块，而后者一般是用户自己定义的模块。
- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- 通过require()函数来引入外部的模块
- 模块化都有一个入口文件
  1. 模块解析从入口文件开始解析
  2. 负责引入其他模块

```js
const add = require("./add")
const sum = require("./sum")
console.log(add,sum);

console.log(add.add(1,2,3,4));
console.log((1,2,3,4));
```

#### [3.2.2路径分析]

- 核心模块：在Node源码编译就完成了，直接被加进内存中，如（http fs path）。
- 路径形式的文件模块：以”./” “../”路径形式的文件模块，将其转化为真实路径，根据真实路径 索引去查找。
- 第三方模块：它会从文件的node_modules逐层往上找，直到根目录的node_modules。

#### [3.2.3 文件定位]

- require()中的文件，如果没有后缀名，会以.js .json .node次序补充扩展名，依次尝试。

#### [3.2.4 编译执行]

- .js fs模块同步读取文件编译执行
- .json fs模块同步读取文件，用JSON.parse()解析返回结果
- .node 这是c/c++编写的扩展文件，通过dlopen()方法编译
- 其他扩展名 会以.js文件载入

### [3.3模块标识]

- 模块标识就是传递给`require()`方法的参数，采用小驼峰命名，或者以`.`、`..`开头的相对路径或绝对路径。它可以不加文件后缀.js。对于下载的模块或系统模块模块的标识就是文件的名字。
- 模块定义的意义
  - 模块内所有的变量或方法都运行在模块作用域内，不会污染全局作用域
  - 模块可以多次加载，但每次加载只会运行一次，并将运行结果缓存，以待下次使用，如果想要模块再次运行，则需要清除缓存
  - 模块加载顺序和代码运行顺序一致

## [4 module对象]

### [4.1 module对象的值]

```js
exports.add = function () {
    var sum = 0,
        i = 0,
        args = arguments,
        l = args.length
    while (i < 1) {
        sum += args[i++]
    }
    return sum
}
console.log(module)

/*
运行结果如下：
Module {
  //模块的识别符，通常是带有绝对路径的模块文件名
  id: '/Users/lipeihua/Desktop/atguigu/node/server/math.js',
  //返回该模块对外的输出
  exports: { add: [Function] },
  //返回调用该模块的对象
  parent: 
   Module {
     id: '.',
     exports: {},
     parent: null,
     filename: '/Users/a123/Desktop/Study/wx/server/app.js',
     loaded: false,
     children: [ [Module], [Module], [Module], [Module], [Module], [Circular] ],
     paths: 
      [ '/Users/lipeihua/Desktop/atguigu/node/server/math.js',
        '/Users/lipeihua/Desktop/atguigu/node/node_modules',
        '/Users/lipeihua/Desktop/atguigu/node_modules',
        '/Users/lipeihua/Desktop/node_modules',
        '/Users/lipeihua/node_modules',
        '/Users/node_modules',
        '/node_modules' ] 
   },
  //模块文件名，带有绝对路径      
  filename: '/Users/lipeihua/Desktop/atguigu/node/server/math.js',
  //返回一个boolean值，标识模块是否已经加载完成
  loaded: false,
  //返回该模块调用的其他模块数组
  children: [],
  //模块的搜索路径
  paths: 
   [ '/Users/lipeihua/Desktop/atguigu/node/server/node_modules'
     '/Users/lipeihua/Desktop/atguigu/node/node_modules',
     '/Users/lipeihua/Desktop/atguigu/node_modules',
     '/Users/lipeihua/Desktop/node_modules',
     '/Users/lipeihua/node_modules',
     '/Users/node_modules',
     '/node_modules' ] }
*/
```

### [4.2 module.exports]

- module.exports 对象是由模块系统创建的，表示当前文件对外输出的接口。
- `module.exports`就是模块暴露的本质

### [4.3 exports]

- 为了方便，Node为每个模块提供一个exports变量，指向module.exports，例如： `module.exports.fun = …`，相当于`exports.fun = ...`
- 但注意，不能将一个值赋值给`exports`，而是使用`exports.XXX`来暴露。否则这样它将不再绑定到`module.exports`。如果exports导出的变量类型是引用类型如函数，则会断开与`module.exports`的地址指向，导致变量导出失败。因为最终还是要靠`module.exports`来导出变量的

```js
module.exports.hello = true; // 从对模块的引用中导出
exports.hello = true;//从对模块的引用中导出
exports = { hello: false };  // 不导出，只在模块内有效
```

### [4.4 module.exports和exports的使用]

- 如果模块内部只有一个功能需要暴露，通常使用module.exports = XXX
- 如果模块内部有多个功能需要暴露：这两种都可以书写

## [5 node中的函数]

- 在nodeJS中，每一个JS模块都包裹了一层函数。
- 在JS中，通过`arguments.callee.toString()`可以看到一个函数：
- `function (exports, require, module, __filename, __dirname) {}`
- 这个函数是所有模块都有的，node编译时往其中注入5个参数：
  - exports 暴露模块
  - require 引入模块
  - module exports属性暴露模块
  - __filename 文件的绝对路径
  - __dirname 文件夹的绝对路径

```js
console.log(arguments.callee.toString());
// console.log(exports)
// console.log(require)
// console.log(module)
console.log(__filename)
console.log(__dirname)
```

## [6 模块的使用练习]

### [6.1 内建模块]

```js
// 内建模块直接引⼊入
const os = require('os');
const mem = os.freemem() / os.totalmem() * 100;
console.log(`内存占⽤用率${mem.toFixed(2)}%`);
```

### [6.2 第三方模块]

```js
//先下载包：npm i download-git-repo -s
//download-git-repo：下载github内容
const download = require("download-git-repo");
download("github:Lipeihua920922/test", "./test", err => {
    console.log(err ? "error" : "success");
})
//如果需要等待图形展示 需要下载ora的包
//cnpm i ora -s
const download = require("download-git-repo");
const ora = require("ora");
const process = ora("下载。。。项目");
process.start();
download("github:Lipeihua920922/test", "./test", err => {
    if (err) {
        process.fail()
    } else {
        process.succeed();
    }
})c
```

### [6.3 核心模块]

```js
//直接使用
const fs = require("fs");
```