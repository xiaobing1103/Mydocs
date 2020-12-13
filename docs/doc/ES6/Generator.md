# Generator

## 1 什么是Generator

- Generator 函数是 ES6 提供的一种异步编程解决方案，内部封装了很多的状态，被称作状态机 生成器
- 执行Generator会返回一个迭代器对象（iterator），使用iterator来遍历出Generator内部的状态
- 形式上，Generator 函数是一个普通函数，但是有两个特征。一是，`function`关键字与函数名之间有一个星号；二是，函数体内部使用`yield`表达式，定义不同的内部状态（`yield`在英语里的意思就是“产出”）

```js
//定义的时候和普通函数定义不一样，使用yeild关键字在内部定义各种状态
function* gen() {
    yield "状态1";
    yield "状态1";
    yield "状态1";
    yield "状态1";
}

// 调用了generator后返回的是迭代器对象
// 在generator函数中，遇到yield就会停止
let it = gen();
console.log(it);
console.log(it.next());
```

## 2 Generator的注意事项

- generator代码内部不会马上执行，需要调用next方法的时候才会执行
- yield语句返回结果通常为undefined， 当调用next方法时传参内容会作为启动时yield语句的返回值。
- 调用了generator后返回的是迭代器对象，在generator函数中，遇到yield就会停止，直到运行next
- 可以使用for of执行gen
- 对象没有Iterator接口，可以手动部署一个

## 3 Generator的练习

```html
<button id="btn">点击抽奖</button>
<script>
    let oBtn = document.getElementById("btn");
    let start = gen();
    oBtn.onclick = function () {
        start.next();
    }
    function draw(count) {
        alert("还剩" + (count - 1) + "次机会")
    }
    function* gen(count) {
        //..
        yield draw(5);
        //..
        yield draw(4);
        //..
        yield draw(3);
        //..
        yield draw(2);
        //..
        yield draw(1);

        return "";

    }
</script>
/*
  需求：请求a数据，再请求b数据，请求c数据
*/

function* fn() {
    yield setTimeout(() => {
        console.log("a数据成功了");
        iteratorObj.next(); // 执行下一段代码
    }, 1000);

    yield setTimeout(() => {
        console.log("b数据成功了");
        iteratorObj.next(); // 执行下一段代码
    }, 2000);

    yield setTimeout(() => {
        console.log("c数据成功了");
        iteratorObj.next(); // 执行下一段代码
    }, 3000);

    console.log('全部数据请求回来~');
}

const iteratorObj = fn();
iteratorObj.next();
```

## 4 async和await

async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成

### async

- async函数(源自ES2017 - ES8),真正意义上去解决异步回调的问题，同步流程表达异步操作,是 Generator的语法糖

- 语法：

  async function foo(){

   await 异步操作;

   await 异步操作；

  }

- async 函数会返回一个 Promise 对象，如果在函数中 `return` 一个直接量，async 会把这个直接量通过`Promise.resolve()` 封装成 Promise 对象。

```js
async function fn() {
    console.log("fn函数执行了");
    return 333;
}
```

### await

- async取代Generator函数的星号*，await取代Generator的yield

- 不需要像Generator去调用next方法，遇到await等待，当前的异步操作完成就往下执行

- `await` 是个运算符，用于组成表达式，await 表达式的运算结果取决于它等的东西

  - 如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西
  - 如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。
  - 如果promise执行结果为reject，则await无返回值,退出当前的async函数

- await会等promise对象状态发生变化，如果是pending状态，就一直等，如果是resolved状态，就会自动执行下面代码，如果是rejected状态，就会退出当前async函数

- 执行async函数，返回值是一个promise对象：

  promise对象状态：

  如果async函数内部出错了（1. 正常报错 2. 内部promise对象是失败状态），promise对象就会变成失败状态

  如果async函数所有代码全部执行完了，才会变成成功状态

```js
async function fn() {
    console.log("fn函数执行了");
    await 123//不等
    await setTimeout(() => {//不等
        console.log(222);
    }, 1000)
}
async function fn(){
    console.log("333");
    const re2 = await new Promise((resolve,reject) => {
        setTimeout(function(){
            console.log(222);
            reject("heng")
        },2000)
    })
    console.log(111);
    console.log(re2);
    return "hello";//返回成功结果值
}
const re = fn();
re.catch((error)=>{console.log(error)})//解决await的reject状态报错
re.then((data)=>{console.log(data)})//data是成功结果 函数返回值
console.log(re);
```

- 练习：请求a数据，请求成功在请求b数据，请求成功在请求c数据

  ```js
  async function fn(){
      await new Promise((resolve) => {
          setTimeout(() => {
              console.log("aok");
              resolve();
          },1000)
      })
      await new Promise((resolve) => {
          setTimeout(() => {
              console.log("bok");
              resolve();
          },3000)
      })
      await new Promise((resolve) => {
          setTimeout(() => {
              console.log("cok");
              resolve();
          },2000)
      })
  }
  fn();
  ```