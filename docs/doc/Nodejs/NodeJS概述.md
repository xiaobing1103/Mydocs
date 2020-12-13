# [NodeJS概述]

## [1 学习Node的目标]

- 优秀的前端-可以和后端有效沟通
- 敏捷的全栈-快速开发全栈应用
- 架构师-践行工程化思想

## [2 课程目标]

- 了解nodejs特点和应⽤场景
- 掌握Node模块系统使⽤
- 掌握基础api使⽤
  - global
  - process
  - path
  - buffer
  - event
  - fs
  - http

## [3 相关概念]

### [3.1 同步和异步]

- 判断标准：调用者是否主动等待被调用者的返回结果
- 同步
  - 理论说明：任务A的执行过程中调用了任务B。任务A对任务B发起调用后，主动等待调用结果。
  - 生活举例：你去书店问老板，是否有《操作系统》这本书，老板说：稍等，我查一下。然后开始查啊查，等查好了，告诉你结果（主动等待被调用方返回结果）。
- 异步
  - 理论说明：任务A的执行过程中调用了任务B。任务A对任务B发起调用后，继续执行后续工作。任务B完成后通过状态、通知来通知调用者。
  - 生活举例：你去书店问老板，是否有《操作系统》这本书，查好了打电话给你，然后直接挂电话了（此时被调用方不返回结果）。过了几天，查好了，老板主动打电话给你（被调用方回调调用方，告知结果）。

### [3.2 阻塞和非阻塞]

- 判断标准：调用方在等待被调用方的返回结果时，是否可以做其他事（是否被挂起）
- 阻塞
  - 理论说明：任务A对任务B发起调用后，任务B需要执行一段时间才可返回结果，任务A选择等待任务B的返回结果（暂时挂起）。
  - 生活举例：你去书店问老板，是否有《操作系统》这本书，你会一直把自己挂起，什么都不干，一直在那等，直到得到返回结果。
- 非阻塞
  - 理论说明：任务A对任务B发起调用后，与此同时，任务A在任务B执行的过程中去完成别的工作，等待任务B结果返回后再继续（不挂起，而是继续执行自己的任务）。
  - 生活举例：你去书店问老板，是否有《操作系统》这本书，不管老板有没有告诉你，你自己都先去玩了（继续执行自己的任务而不是干等），但是也要偶尔也要check一下老板是否有了结果。

### [3.3 同步异步阻塞非阻塞练习]

```md
隔壁王大爷（不是隔壁老王，hhhhh~~）有个水壶，王大爷经常用它来烧开水。

1.王大爷把水壶放到火上烧，然后啥也不干在那等，直到水开了王大爷再去搞别的事情。???
2.王大爷觉得自己有点憨，不打算等了。把水壶放上去之后大爷就是去看电视，偶尔来瞅一眼有没有开。 ???
3.王大爷去买了个响水壶，他把响水壶放在火上，然后也是等着水开，水开的时候水壶会发出声响。???
4.王大爷又觉得自己有点憨，他把响水壶放在火上然后去看电视，这时他不用偶尔y来瞅一眼，因为水开的时候水壶会发出声音通知大爷。???
```

## [4 Node.js是什么]

- Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。node.js不是一种独立语言，是一个可以让js在服务器端运行的平台。

- 简单来讲，就是一个使用JS写服务器的代码环境。

  > https://nodejs.org/en/

- NodeJS的特性其实就是JS的特性

  - 异步非阻塞的I/O
  - 事件驱动

- NodeJS历史 — 为性能⽽生 并发处理

  >  Ryan Dahl,他的工作是用C/C++写高性能Web服务。对于高性能，异步IO、事件驱动是基本原则，但是用C/C++写就太痛苦了。于是这位仁兄开始设想用高级语言开发Web服务。他评估了很多种高级语言，发现很多语言虽然同时提供了同步IO和异步IO，但是开发人员一旦用了同步IO，他们就再也懒得写异步IO了，所以，最终，Ryan瞄向了JavaScript。
  >
  > 因为JavaScript是单线程执行，根本不能进行同步IO操作，所以，JavaScript的这一“缺陷”导致了它只能使用异步IO。
  >
  > 选定了开发语言，还要有运行时引擎。这位仁兄曾考虑过自己写一个，不过明智地放弃了，因为V8就是开源的JavaScript引擎。让Google投资去优化V8，咱只负责改造一下拿来用，还不用付钱，这个买卖很划算。
  >
  > 于是在2009年，Ryan正式推出了基于JavaScript语言和V8引擎的开源Web服务器项目，命名为Node.js。虽然名字很土，但是，Node第一次把JavaScript带入到后端服务器开发，加上世界上已经有无数的JavaScript开发人员，所以Node一下子就火了起来。
  >
  > 在Node上运行的JavaScript相比其他后端开发语言有何优势？
  >
  > 最大的优势是借助JavaScript天生的事件驱动机制加V8高性能引擎，使编写高性能Web服务轻而易举。
  >
  > 其次，JavaScript语言本身是完善的函数式语言，在前端开发时，开发人员往往写得比较随意，让人感觉JavaScript就是个“玩具语言”。但是，在Node环境下，通过模块化的JavaScript代码，加上函数式编程，并且无需考虑浏览器兼容性问题，直接使用最新的ECMAScript 6标准，可以完全满足工程上的需求。

- deno https://studygolang.com/articles/13101

## [5 Node.js有什么特点]

### [5.1 优点]

- 异步的非阻塞的I/O（I/O线程池）
- 事件循环机制
- 单线程
- 跨平台

![img](https://tva1.sinaimg.cn/large/007S8ZIlgy1ghiofsh7mdj319w0o274x.jpg)

### [5.2 缺点]

- 回调函数嵌套太多、太深（俗称回调地狱）
- 单线程，处理不好CPU 密集型任务，最好处理数据密集型

## [6 Node.js的应用场景]

主要应用场景：中间层BFF(backends for frontends)、RESTful API

I/O 密集型的领域：如 服务端渲染，前端项目构建。

低延迟的网络应用：如 即时聊天。

## [7 Node.js的安装]

一键傻瓜式安装

安装完成之后，打开命令行窗口，输入node -v查看当前node版本

![img](https://tva1.sinaimg.cn/large/00831rSTgy1gcovuvtm4bj30mg0d0mxr.jpg)

## [8 运行Node程序]

```js
// 01-run.js
console.log('hello,node.js!');
console.log('run me use: node 01-run');
```

- 在当前目录的命令行窗口运行: node 01-run.js

  > - 命令是`node 文件名`
  > - 一定要来到当前要运行的文件所在目录
  > - 文件按tab可以自动补全
  > - 注意：在cmd/终端中，所有退出指令：ctrl + c （一次不行就多按几次）
  > - ![img](https://tva1.sinaimg.cn/large/00831rSTly1gcowo1a5g9j30ha02i0sl.jpg)

- 每次修改js⽂件需重新执行才能⽣生效，安装nodemon可以监视文件改动，⾃动重启:
  - `npm i -g nodemon`
  - 使用 `nodemon 文件名`可以启动项目
  - 如果出现问题，这用管理员打开powershell，输入set-ExecutionPolicy RemoteSigned，然后输入y
- 如何在nodejs中调试代码？
  - 在chrome调试nodejs代码
    - node --inspect-brk 文件名`启动文件
    - --inspect 启动调试
    - -brk 在代码的第一行打一个断点
  - 在VSCODE调试nodejs代码

## [9 Global]

- Browser（全局对象是window）中js的组成：
  - DOM --> document 用来操作文档
  - BOM --> window 用来操作浏览器（控制浏览记录、读取浏览器的信息...）
  - ES --> 语法规范
- Nodejs（全局对象是Global）中js的组成：
  - DOM(完全没有)
  - BOM(干掉了绝大部分，只保留少部分)
    - console.log
    - setInterval
    - setTimeout
  - ES(基本实现)

```js
console.log(global);
console.log(global.process);
console.log(global.Buffer);
/*
    global的打印结果：
    {
      global: [Circular],
      clearInterval: [Function: clearInterval],
      clearTimeout: [Function: clearTimeout],
      setInterval: [Function: setInterval],
      setTimeout: [Function: setTimeout] { [Symbol(util.promisify.custom)]: [Function] },
      queueMicrotask: [Function: queueMicrotask],
      clearImmediate: [Function: clearImmediate],
      setImmediate: [Function: setImmediate] {
        [Symbol(util.promisify.custom)]: [Function]
      }
      process,
      Buffer,
      console
    }
    其中：
    setTimeout 延时计时器
    setInterval 循环计时器
    setImmediate 立即执行函数
*/

console.log(window);//打印window报错
```

- setImmediate
  - 该方法用来把一些需要长时间运行的操作放在一个回调函数里,在浏览器完成后面的其他语句后,就立刻执行这个回调函数
  - clearImmediate 方法可以用来取消通过setImmediate设置的将要执行的语句

```js
//setTimeout、setInterval、setImmediate的执行方式
//4-3-1-2
//先执行同步代码4 然后执行立即执行函数3 然后setTimeout和setInterval按照顺序执行
setTimeout(() => {
   console.log("1");
}, 1000);

setInterval(() => {
  console.log("2");
}, 1000);

setImmediate(() => {
  console.log("3");
});

console.log("4");
```

- process.nextTick()

  立即执行函数

  如果你希望异步任务尽可能快地执行，那就使用 process.nextTick

## [10 NodeJS的事件轮询机制]

- JavaScript是单线程的， 那么nodejs是如何做到非阻塞呢，在nodejs内部使用了第三方库libuv，nodejs会把IO，文件读取等异步操作交由他处理，而nodejs主线程可以继续去处理其他的事情。
- libuv会开启不同的线程去处理这些延时操作，处理完后，会把异步操作的回调函数放到nodejs的轮询队列中，nodejs会在适当的时候处理轮询队列中的回调函数，从而实现非阻塞。

 所以，实际上nodejs在处理这些阻塞操作时，并不是单线程的。

```js
//NodeJS轮询图 
/*从图中可以看出，事件轮询机制分为六个阶段，每个阶段都有一个 FIFO（先进先出） 队列来执行回调。
通常情况下，当事件循环进入给定的阶段时，它将执行特定于该阶段的任何操作，然后在该阶段的队列中执行回调，
直到队列用尽或最大回调数已执行。当该队列已用尽或达到回调限制，事件循环将移动到下一阶段。*/
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘

//1.timers阶段
/*
    概述： timers阶段用来处理setTimeout() 和 setInterval() 的回调函数。
    详解 ：我们都使用过setTimeout(callback, delay), setInterval(callback, delay), 
    第一个参数是回调函数， 第二个参数是延迟时间(ms)，即多久之后执行。但是在绝大多数情况下，
    它并不会绝对守时。因为操作系统调度或其它回调的运行可能会延迟它们。
    比如说， 当轮询进入到poll阶段的时候并且poll阶段的回调队列不为空， 
    如果timers此时已经有一个setTimeout达到了预设的延时时间， 
    系统也需要先处理完poll阶段的回调队列，才能去处理timers的回调队列。
*/

//2.pending callbacks阶段
/*
    概述： 这个阶段用来处理系统操作的回调函数（可以忽略）
    详解 ：此阶段对某些系统操作（如 TCP 错误类型）执行回调。
    例如，如果 TCP 套接字在尝试连接时接收到 ECONNREFUSED，这些错误的回调将被放到此阶段的回调函数。
*/

//3.idle prepare阶段
/*
    概述： 此阶段是仅供nodejs内部操作调用，忽略
*/

//poll阶段
/*
    概述： 这个阶段主要用来处理如IO操作，网络请求等异步操作
    详解 ：这各阶段会有不同的情况
    1.当poll阶段的回调函数队列不为空的时候，则处理队列中的回调函数，
    直到队列为空或者达到系统处理的上限的时候，就跳过此阶段，处理下一阶段。

    2.当进入poll阶段的时候，如果此阶段的回调队列为空，系统会在此阶段等待新的回调函数入队，再进行处理。
    如果一直等不到新的回调函数呢？咋办？阻塞在这里？一直等？
    不会的，在这个阶段会同时进行检测timers阶段是否已经有回调函数超时，
    如果有，则马上跳过poll阶段，进入下一个阶段。如果setImmediate设置了，也会进入下一个阶段。
*/

//check阶段
/*
  概述： 这个阶段用来处理setImmediate的回调函数
  详解 ：当poll阶段的回调队列为空的时候（或者达到系统执行的上限），就会进入到check阶段来处理setImmediate的回调函数。
*/

//close callbacks阶段
/*
  概述： 这个阶段用来处理如socket的close事件
  详解 ：顾名思义， 关闭回调函数， 如socket.on("close", () => {...})
*/

//process.nextTick及Promise
/*
    process.nextTick和Promise的执行，这两个函数比较特殊，它们不由libuv去管理，而且它们的优先级要高于事件轮询的每一个阶段。
    它们会在事件轮询的每一个阶段之间执行，在每次事件轮询进入到下一个阶段的时候，都会检查这两个队列是否为空，不为空则马上处理它们的回调。
    注意因为process.nextTick会在事件轮询每个阶段之间执行， 如果递归调用nextTick就会导致轮询阻塞，所以尽量避免使用process.nextTick， 可以使用setImmediate代替

    process.nextTick应当是要先于setImmediate执行的
*/
```

## [11 宏任务、微任务：]

- 异步代码有优先级关系。有的优先级高先执行，有的优先级低后执行。
- 微任务优先级高: process.nextTick 、 Promise.then/catch/fanally 、queueMicrotask
  - 优先级最高的是process.nextTick
  - 其他微任务，按代码顺序依次执行
- 宏任务优先级低：setTimeout、setImmediate，顺序看nodejs的事件轮询机制
- js引擎执行异步代码。会优先执行微任务，再执行宏任务
- 执行微任务时，添加的微任务放入下一个微任务队列

```js
//NodeJS事件轮询练习1
// 2 1 4 3 6
process.nextTick(() => {console.log(111);});

// 属于同步代码
const promise = new Promise(resolve => {
  console.log(222);
  resolve();
});

setTimeout(() => {console.log(333);}, 0);

promise.then(() => {console.log(444);});

setImmediate(() => {console.log(666);});
//NodeJS事件轮询练习2
//4 3 1 2
process.nextTick(() => {
  console.log('process.nextTick() 333');
})

setTimeout(() => {
  console.log('setTimeout()  111');
}, 0)

setImmediate(() => {
  console.log('setImmediate() 222');
})

console.log('全局代码执行完了 444');
//start  promise end  then1 then2 setTimeout

console.log('start') //同步

setTimeout(() => {
    console.log('setTimeout') //宏任务
}, 0)

new Promise((resolve) => {
        console.log('promise') //同步
        resolve()
    })
    .then(() => {
        console.log('then1') //微任务
    })
    .then(() => {
        console.log('then2') //微任务
    })

console.log('end') //同步 
//NodeJS事件轮询练习3
//1 4 8 5 2 6 3 9
process.nextTick(() => {console.log(111);});

setTimeout(() => {console.log(222);}, 0);
setImmediate(() => {console.log(333);});

const promise = Promise.resolve();

promise
  .then(() => {
    console.log(444);
    process.nextTick(() => {console.log(555);});
    setTimeout(() => {console.log(666);}, 0);
  })
  .catch(() => {console.log(777);})
  .then(() => {
    console.log(888);
    setImmediate(() => {console.log(999);});
  })
  .catch(() => {console.log(101010);})
//script start、async1 start、async2 、promise1  、script end、async1 end 、promise2 、setTimeout 
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start');
setTimeout(() => {
    console.log('setTimeout')
}, 0);
async1();
new Promise((resolve) => {
    console.log('promise1');
    resolve()
}).then(() => {
    console.log('promise2')
});
console.log('script end')
//1 2 3 5 4
setTimeout(() => {
    console.log(4);
}, 0);

new Promise(resolve => {
    console.log(1);
    for (let i = 0; i < 10000; i++) {
        i == 9999 && resolve();
    }
    console.log(2)
}).then(() => {
    console.log(5)
})

console.log(3)
//1 2 9 4 10 13 3 15 16 5 6 8 7
console.log(1); //
new Promise(function (resolve) {
    resolve();
    console.log(2); //
    setTimeout(function () {
        console.log(3); //
    }, 0);
    Promise.resolve().then(function () {
        console.log(4); //
        setTimeout(function () {
            console.log(5);
        }, 0);
        setTimeout(function () {
            (async function () {
                console.log(6);
                return function () {
                    console.log(7);
                };
            })().then(function (fn) {
                console.log(8);
                fn();
            });
        }, 0);
    });
    new Promise(function (resolve) {
        console.log(9); //
        resolve();
    }).then(function () {
        new Promise(function (resolve, reject) {
            console.log(10);
            reject();
        }).then(function () {
            setTimeout(function () {
                console.log(11);
            }, 0);
            console.log(12);
        }).catch(function () {
            console.log(13);
        });
    });
});
setTimeout(function () {
    console.log(15);
    Promise.resolve().then(function () {
        console.log(16);
    });
}, 0);
// 1 2 19 3 5 4 20 9 10 11 17 13 12 6 7 16  8  15 14
console.log(1); //
new Promise((res, rej) => {
    console.log(2); //
    res();
}).then(() => {
    console.log(3); //
    Promise.resolve().then(() => {
        console.log(5);
        setTimeout(function () {
            console.log(6); //
            Promise.resolve().then(function () {
                console.log(7);
            });
            setTimeout(function () {
                console.log(8);
            }, 0);
        }, 0);
    });
}).then(() => {
    console.log(4);
});

new Promise((res) => {
    console.log(19); //
    setTimeout(() => {
        console.log(20); //
    }, 0);
});
Promise.resolve().then(() => {
    setTimeout(() => {
        Promise.resolve().then(() => {
            console.log(12);
        });
        console.log(13); //
    }, 0);
});
setTimeout(() => {
    console.log(9); //
    new Promise((res) => {
        res();
        console.log(10);
    }).then(() => {
        console.log(11);
    });
});
setTimeout(() => {
    setTimeout(() => {
        setTimeout(() => {
            Promise.resolve().then(() => {
                console.log(14);
            });
            console.log(15);
        }, 0);
        console.log(16);
    }, 0);
    console.log(17); //
}, 0);
```