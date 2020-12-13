# [Node.js核心模块]

## [1 Buffer 缓冲器]

### [1.1 Buffer是什么]

Buffer是一个和数组类似的对象，不同是Buffer是专门用来保存二进制数据的(数据储存为二进制数据，性能是最好的)。

Buffer 类在全局作用域中，在Global上，可以直接使用，因此无需使用 require('buffer').Buffer

### [1.2 Buffer特点]

1. 大小固定：在创建时就确定了，且无法调整
2. 性能较好：直接对计算机的内存进行操作
3. 每个元素大小为1字节

### [1.3 Buffer的创建]

- **Buffer.alloc(size[, fill[, encoding]])：** 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
- **Buffer.allocUnsafe(size)：** 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
- **Buffer.from(string[, encoding])：** 返回一个被 string 的值初始化的新的 Buffer 实例

```js
console.log(Buffer);
//1
// 创建一个长度为 10、且用零填充的 Buffer。
// 找到一个区域，清空并创建
const buf1 = Buffer.alloc(10);
console.log(buf1);//<Buffer 00 00 00 00 00 00 00 00 00 00>

//2
// 创建一个长度为 10、且用"atguigu"填充的 Buffer。
// 找到一个区域，清空并创建
const buf1 = Buffer.alloc(10,"atguigu");
console.log(buf1);

//3
// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，计算机删除的时候，等空闲才开始删除，所以可能会有遗留数据
// 因此需要使用 buf2.fill() 或 buf2.write() 重写。
const buf2 = Buffer.allocUnsafe(10);
console.log(buf2);//<Buffer d4 d8 04 04 01 00 00 00 30 35>

//4
//将字符串用二进制在buffer中存起来
//buffer每个为1字节 - 1byte(b)
//buffer中的每一个值是16进制  00--ff   二进制就是00000000--11111111
//1个数据(1b)==》8bit（8位二进制数据）
//1个英文代表一个字节  中文位3个字节
/*
    1 byte / b = 8 bit
    1 kb = 1024 byte
    1 mb = 1024 kb 
    1 gb = 1024 mb
    1 tb = 1024 gb
*/
const buf3 = Buffer.from('hello atguigu');
console.log(buf3); // <Buffer 68 65 6c 6c 6f 20 61 74 67 75 69 67 75>
```

#### [1.4 Buffer的使用]

```js
const buf3 = Buffer.from('hello atguigu');
console.log(buf3); // <Buffer 68 65 6c 6c 6f 20 61 74 67 75 69 67 75>
//可以便遍历buffer中的每一个值
buf3.forEach((item, index) => {
  //104、101、108、108、111、32、97、116、103、117、105、103、117
  console.log(item); // 打印时会自动转换成10进制显示
})
//可以将buffer转换成字符串
console.log(buf3.toString()); // hello atguigu
```

## [第2章：process]

### [2.1 process是什么]

`process` 对象是一个全局变量，它提供有关当前 Node.js 进程的信息并对其进行控制。 作为一个全局变量，它始终可供 Node.js 应用程序使用，无需使用 `require()`。 它也可以使用 `require()` 显式地访问：

```js
const process = require('process');
```

### [2.2 process的常见的属性和方法]

- argv 属性返回一个数组，其中包含当启动 Node.js 进程时传入的命令行参数

```js
console.log(process.argv);
//启动命令：node 02.process.js
/*
    [ 
      '/usr/local/bin/node',
      '/Users/lipeihua/Desktop/nodeJS/class191108/03.nodejs/day02/02.process.js' 
    ]
*/

//启动命令：node 02.process.js hello
/*
    [ 
      '/usr/local/bin/node',
      '/Users/lipeihua/Desktop/nodeJS/class191108/03.nodejs/day02/02.process.js'
      'hello'
    ]
*/
```

- argv0 属性保存当 Node.js 启动时传入的 `argv[0]` 的原始值的只读副本,也就是获取nodejs程序目录

  ```js
  console.log(process.argv0);
  /*
      '/usr/local/bin/node'
  */
  ```

- env 属性返回或设置包含用户环境的对象，环境变量：Path --> 遍历每个路径，找到程序运行

  ```js
  console.log(process.env);
  console.log(process.env.NODE_ENV);//将来设置或者获取node环境变量
  /*
      { TMPDIR: '/var/folders/bs/lh47p81d4pjdltt360g5lwbc0000gn/T/',
        __CF_USER_TEXT_ENCODING: '0x1F5:0x19:0x34',
        SHELL: '/bin/bash',
        HOME: '/Users/lipeihua',
        Apple_PubSub_Socket_Render: '/private/tmp/com.apple.launchd.NMFZsNDeb3/Render',
        SSH_AUTH_SOCK: '/private/tmp/com.apple.launchd.f8ZN8A6MSm/Listeners',
        PATH:
         '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/lipeihua/Desktop/mongodb/bin',
        LOGNAME: 'lipeihua',
        XPC_SERVICE_NAME: '0',
        USER: 'lipeihua',
        XPC_FLAGS: '0x0',
        PWD: '/Users/lipeihua/Desktop/nodeJS/class191108/03.nodejs/day02',
        SHLVL: '2',
        TERM_PROGRAM: 'vscode',
        TERM_PROGRAM_VERSION: '1.43.0',
        LANG: 'zh_CN.UTF-8',
        COLORTERM: 'truecolor',
        TERM: 'xterm-256color',
        OLDPWD: '/Users/lipeihua/Desktop/nodeJS/class191108/03.nodejs/day02',
        _: '/usr/local/bin/node' 
      }
    */
  ```

- cwd() 方法返回 Node.js 进程的当前工作目录。绝对路径

  ```js
  process.cwd()
  // /Users/lipeihua/Desktop/nodeJS/class191108/03.nodejs/day02
  ```

- exit([code]) 退出进程

  ```js
  setInterval(() => {
    console.log('定时器执行了:', ++i);
    if (i > 5) {
      process.exit("");
    }
  }, 1000)
  /*
      定时器执行了: 1
      定时器执行了: 2
      定时器执行了: 3
      定时器执行了: 4
      定时器执行了: 5
      定时器执行了: 6
  */
  ```

## [第3章：path 路径]

### [3.1 path是什么]

`path` 模块提供用于处理文件路径和目录路径的实用工具。 它可以使用以下方式访问：

```js
const path = require('path');
```

### [3.2 path的使用]

- path.resolve([...paths]) 方法将路径或路径片段的序列解析为绝对路径

  ```js
  console.log(path.resolve('./index.html'));
  ///Users/lipeihua/Desktop/nodeJS/class/03.nodejs/day02/index.html
  
  console.log(path.resolve('../index', "hello.html"));
  ///Users/lipeihua/Desktop/nodeJS/class/03.nodejs/index/hello.html
  ```

### [3.3 path练习]

```js
//需求1：在path.js(当前)文件，获取process.js（path的兄弟）文件的绝对路径
const dirname = __dirname;
console.log(path.resolve(__dirname, '02.process.js'));


//需求：在path.js（当前）文件，获取git.md文件（其他目录）的绝对路径
console.log(path.resolve(__dirname, '../../', '02.作业&笔记/', '笔记/git.md'));
```

## [第4章：fs文件系统]

### [4.1 fs是什么]

全称为file system，所谓的文件系统，就是对计算机中的文件进行增删改查等操作。它是一个服务器的基础，在Node中通过fs模块来操作文件系统。

### [4.2 fs的使用]

- fs模块是Node的核心模块，不需要下载，直接引入即可使用

  ```js
  const fs = require('fs');
  ```

- fs中的大部分方法都为我们提供了两个版本：

  - 同步方法：带sync的方法
    - 同步方法会阻塞程序的执行
    - 同步方法通过返回值返回结果
  - 异步方法：不带sync的方法
    - 异步方法不会阻塞程序的执行
    - 异步方法都是通过回调函数来返回结果的

### [4.3文件的写入]

#### [4.3.1 同步写入]

- 打开文件 `fs.openSync(path[, flags, mode])`

  - filePath:是当前的文件路径
  - flags:文件系统标志
    - `'a'` - 打开文件用于追加。如果文件不存在，则创建该文件
    - `'w'` - 打开文件用于写入。如果文件不存在则创建文件，如果文件已存在则截断文件
    - `'r'` - 打开文件用于读取。如果文件不存在，则出现异常。
  - mode:默认值：0o666(文件可读可写)、0o111(文件可执行)、0o222(文件可写入)、0o333(文件读取)(为下一次服务)
  - 返回表示文件描述符的整数

- 写入内容`fs.writeSync(fd, string[, position[, encoding]])`

  - fd 要写入的文件的描述符

- string 要写入的内容

  - position 写入的起始位置

- encoding 写入文件的编码，默认utf-8

- 关闭文件 fs.closeSync(fd)

  fd:文件描述符

```js
const fs = require('fs');
const path = require('path');
const filepath = path.resolve(__dirname, 'a.txt');
const fd = fs.openSync(filepath, 'a');
console.log(fd);//32
const result = fs.writeSync(fd, '汗滴禾下土~');
console.log(result);//16
fs.closeSync(fd);
```

#### [4.3.2异步写入]

异步写入：一般都有回调函数

- 打开文件`fs.open(path, flags[, mode], callback)`

  - path 要打开的文件的路径

  - flags 对文件做操作的类型

  - mode 设置文件的权限，默认0666，一般我们不传（尤其在windows中）

  - callback 回调函数，异步方法通过回调函数返回文件的描述符（fd）,同步方法通过返回值返回 。

    - 回调函数的参数：(err , fd)

    - err 表示错误对象，如果执行时出现错误则该对象存在，在nodejs程序设计中，往往异步回调函数的第一个参数都是error，这种机制我们叫做 错误优先机制（提倡优先解决错误~）
    - fd 文件的描述符，通过fd来对文件进行操作

  - 返回值： 当打开文件以后，方法会返回一个文件的描述符作为返回值

- 写入内容并保存 `fs.write(fd, string[, position[, encoding]], callback)`

  - fd 要写入的文件的描述符

  - string 要写入的内容

  - position 写入的起始位置

  - encoding 写入文件的编码，默认utf-8

  - callback 回调函数，写入完成以后会调用该回调函数

    参数：err 错误的对象 written 写入内容的大小 string 写入的内容

- 关闭文件`fs.close(fd, callback)`

  - fd 要关闭的文件的文件描述符
  - callback 回调函数，关闭文件以后会调用该回调函数

  ```js
  const fs = require("fs");
  const path = require("path");
  const filepath = path.resolve(__dirname, "a.txt");
  fs.open(filepath, "a", (error, fd) => {
  if (error) {
    // 优先处理错误
    console.log(error);
    return;
  }
  // 业务功能逻辑
  // 写入内容
  fs.write(fd, "今天天气不晴朗~", error => {
    // 优先处理错误
    if (error) {
      console.log(error);
    }
    // 不管做成功还是失败，都要关闭文件
    fs.close(fd, error => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("文件关闭");
    });
  });
  });
  ```

```js
//解决以上问题的异步回调地狱
const fs = require("fs");
const path = require("path");
// 打开文件
// 封装方法
function open(filename) {
  // 创建promise对象并返回
  return new Promise((resolve, reject) => {
    // 执行异步方法
    const filepath = path.resolve(__dirname, filename);
    fs.open(filepath, "w", (err, fd) => {
      if (err) {
        // 当异步方法做失败了，将promise对象的状态改为失败状态
        reject(err);
        return;
      }
      // 当异步方法做成功了，将promise对象的状态改为成功状态
      resolve(fd);
    });
  });
}

function write(fd, string) {
  // 创建promise对象并返回
  return new Promise((resolve, reject) => {
    // 执行异步方法
    fs.write(fd, string, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

function close(fd) {
  // 创建promise对象并返回
  return new Promise((resolve, reject) => {
    // 执行异步方法
    fs.close(fd, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

// 定义async函数
(async () => {
  // 执行异步操作
  /*
    async函数返回值一定是promise对象

    await 会等后面的promise对象的状态发生变化（只会等promise对象，别的都不会等）
    一旦状态变成了成功状态，就不等了，会将resolve(value)中value返回
    一旦状态变成了失败状态，直接退出async函数（剩下代码就不会执行了），
      并将async函数返回promise对象的状态改为失败状态
  */
  const fd = await open("a.txt");

  await write(fd, "async函数+promise解决回调地狱");

  await close(fd);
})()
  .then(() => {
    // async函数里面没有promise对象状态是失败状态
    // 所有异步代码都成功
    // 此时async函数返回的promise就是成功的状态
    console.log("所有代码执行成功~");
  })
  .catch(err => {
    // 只要async函数中有一个promise对象变成失败，
    // 就会终止运行，返回一个失败状态的promise
    // err就是失败的原因（里面promise  reject(err)中的err）
    console.log("方法执行失败了", err);
  });
```

#### [4.3.3简单写入]

```
同步方法：fs.writeFileSync(file, data[, options])
异步方法：fs.writeFile(file, data[, options], callback)
```

> 参数：
>
> - file 要写入的文件的路径
> - data 要写入的内容，可以是一个String也可以是一个Buffer
> - options 配置对象，需要一个对象作为参数，默认如下： {encoding:"utf8",flag:"w",mode:0666}
> - callback 回调函数

```js
const fs = require("fs");
const path = require("path");

const filepath = path.resolve(__dirname, "b.txt");

fs.writeFile(filepath, "唱歌真好听~~~", { flag: "a" }, err => {
 // 优先处理错误~
 if (err) {
   console.log(err);
   return;
 }
 console.log("文件写入成功~");
});
```

#### [4.3.4流式写入]

- fs模块处理文件的缺点：将文件的数据全读到内存中，在把数据写到文件内，会大量占用内存
- 流（stream）是 Node.js 中处理流式数据的抽象接口，是一组有序的，有起点和终点的字节数据传输手段。可以实现将数据从一个地方流动到另一个地方，其边读取边写入的特点有别于fs模块的文件处理，并且可以做到控制读取文件和写入文件的速度，从而减少内存的占用
- 流是基于事件的，所有的流对象都用 on(once)绑定事件，并触发
- 流式文件写入适用于一些比较大的文件，可以分多次向文件中写入内容，有效避免内存溢出的问题

```
fs.createWriteStream(path[, options])
const fs = require('fs');
const path = require('path');

const filepath = path.resolve(__dirname, 'c.txt');
// 创建可写流
const ws = fs.createWriteStream(filepath);
// 绑定事件：监听流式文件写入是否结束
// on 绑定的是持久性事件
// once 绑定的是一次性事件（执行完事件后会自动解绑）
ws.once('open', () => {
  console.log('可写流打开了~');
})

ws.once('close', () => {
  console.log('可写流关闭了~');
})cw

// 往可写流中塞数据
ws.write('锄禾日当午~~~');
ws.write('汗滴禾下土~~~');
ws.write('谁知盘中餐~~~');
ws.write('粒粒皆辛苦~~~');

//关闭末尾
//ws.close();
// 关闭开头
ws.end();
```

### [4.4文件的读取]

#### [4.4.1 简单读取文件]

```
fs.readFileSync(path[, options])  
fs.readFile(path[, options], callback)
```

> 参数：
>
> - path 读取文件的路径
>
> - options 配置对象 默认如下： {encoding:"utf8",flag:"w",mode:0666}
>
> - callback 回调函数，通过回调函数返回读取到的数据
>
>   err 错误对象
>
>   data 返回的数据（Buffer）

```js
const fs = require("fs");
const path = require("path");

const filepath = path.resolve(__dirname, '03.path.js');

fs.readFile(filepath, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('读取文件成功~');
  // 读取的数据是Buffer数据（里面保存二进制数据）
  // 将Buffer数据转换成字符串
  console.log(data.toString());
})
```

#### [4.4.2 使用promisify解决回调地狱]

```js
//案例1
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
readFile('./conf.js').then(data=>console.log(data))

//案例2
(async () => {
    const fs = require('fs')
    const { promisify } = require('util')
    const readFile = promisify(fs.readFile)
    const data = await readFile('./index.html')
    console.log('data',data)
})()
```

#### [4.4.3 流式读取文件]

适合较大的文件

创建可读流 fs.createReadStream()

```js
const fs = require("fs");
const path = require("path");

// 可以是自己书写的路径必须写双斜杠：第一斜杠是转义符
// const filepath = '//Users//lipeihua//Desktop//nodeJS//08.简单文件写入.mp4';
const filepath = path.resolve(__dirname, 'a.txt');

// 创建可读流
const rs = fs.createReadStream(filepath);


let string = '';

// nodejs的设计一般都可以链式调用 
// 可读流默认情况下，只会读取一次数据（64kb）
// 消费读取的这个数据，可读流就会自动读取下一次数据
rs
  .on('data', (chunk) => {
    /*
      chunk就是可读流读取的数据, 大小为64kb
      data事件就是消费可读取读取的数据
      持续性事件会一直消费可读流~ 直到所有内容全部读取完毕，可读流会自动关闭~
    */
    // console.log(chunk.toString());
    string += chunk.toString();
  })
  .once('end', () => {
    // 可读流关闭事件 --> 说明数据全部读取完了
    console.log(string);
  })
```

### [4.5 流式读写操作]

pipe()

```js
const fs = require('fs')
const path = require('path')

const inputFilePath = '//Users//lipeihua//Desktop//nodeJS//08.简单文件写入.mp4';
const outputFilePath = path.resolve(__dirname, 'd.mp4');
// 创建可读流 会自动关闭
const rs = fs.createReadStream(inputFilePath);
// 创建可写流 不会自动关闭，需要手动关闭
const ws = fs.createWriteStream(outputFilePath);

/* rs.on('data', (chunk) => {
  // 当数据读取出来，要写入成另外一个文件
  ws.write(chunk);
})
.once('end', () => {
  // 可读流全部读取完毕了，关闭可写流
  ws.end();
}) */

// pipe会持续性消费可读流数据
// 将可读流数据写入到可写流中
// 会自动关闭可写流
rs.pipe(ws);
```

## [第5章 events 事件触发器]

### [5.1 什么是events]

- 所有能触发事件的对象都是 `EventEmitter` 类的实例。这些对象有一个 `eventEmitter.on()` 函数，用于将一个或多个函数绑定到命名事件上。还有一个.emit()函数用于触发监听器。

```js
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('触发事件');
});
myEmitter.emit('event');
```

- 当绑定多个函数时，本质是同步执行的，当里面含有异步函数时，就会切换到异步模式。
- once()函数可注册最多只监听一次的函数。

### [5.2 常见方法]

- on()添加一个监听器
- addListener().和上面一样，别名而已。
- once(),某个事件只执行一次。
- emit() 事件触发器。

### [5.3 练习]

```js
/*
  练习题：请你实现EmiterEvents。--> 自定义事件
*/
const EmiterEvents = require('events');
class MyEmiter extends EmiterEvents {};
const myEvent = new MyEmiter();

// 自定义事件
// 绑定持久性事件
myEvent.on('aaa', (a, b) => {
  console.log('回调函数111 - aaa事件触发了~', a, b);
})

const callback = () => {
  console.log('回调函数222 - aaa事件触发了~');
};
myEvent.on('aaa', callback)

// 绑定一次性事件
myEvent.once('bbb', () => {
  console.log('bbb事件触发了~');
})

// 触发自定义事件
myEvent.emit('aaa', 123, 456);
// 解绑事件
myEvent.off('aaa', callback);

myEvent.emit('aaa');
// myEvent.emit('bbb');
// myEvent.emit('bbb');
```

## [第6章 crypto 加密]

### [6.1 什么是crypto]

`crypto` 模块提供了加密功能，包括对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。

使用 `require('crypto')` 来访问该模块。

### [6.2 加密算法]

消息摘要加密算法 （md5 sha1 sha256 sha512）

- 生成的密文长度固定
- 同样的明文加密后一定得到同样的密文
- 不可逆 （不能通过密文逆向破解明文）

### [6.3 使用]

```js
const crypto = require('crypto');

// const md5 = crypto.createHash('md5');
const md5 = crypto.createHash('sha256');

// 定义明文  必须是字符串
let password = '123456';

// 定义盐
const salt = '6TE#6gbXQO';

password = password + salt;

// md5.update(password, 'utf8') 加密处理，生成密文
// digest('hex') 装换成16进制显示
const secret = md5.update(password, 'utf8').digest('hex');
// 密文
console.log(secret); // 54269bc65b5d1be10a75645a296b78c3
```