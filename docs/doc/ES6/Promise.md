# Promise基础

## Promise功能

- 回调函数嵌套回调函数被称作**回调地狱**，代码层层嵌套，环环相扣，很明显，逻辑稍微复杂一些，这样的程序就会变得难以维护。
- 对于这种情况，程序员们想了很多解决方案（比如将代码模块化），但流程控制上，还是大量嵌套。
- ES2015的标准里，Promise的标准化，一定程度上解决了JavaScript的流程操作问题。Promise对象时一个异步变成的解决方案，**可以将异步操作以同步的流程表达出来, 避免了层层嵌套的回调函数(俗称'回调地狱')**

```js
setTimeout(() => {
    console.log("a数据请求回来了~");
    setTimeout(() => {
        console.log("b数据请求回来了~");
        setTimeout(() => {
            console.log("c数据请求回来了~");
        }, 3000);
    }, 2000);
}, 1000);
```

## Promise入门

- `Promise`是一个构造函数，自己身上有`all`、`reject`、`resolve`这几个眼熟的方法，原型上有`then`、`catch`等同样很眼熟的方法
- `Promise`的构造函数接收一个参数，是函数，并且传入两个参数：`resolve`，`reject`，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。
- `Promise`对象有三种状态：代表异步执行的状态,对象的状态只能改变一次
  - pending 初始化状态（异步代码还在执行中）

```
​```js
const promise = new Promise((resolve, reject) => {
    // 同步调用
    //....code

    // 执行异步操作/异步代码
    setTimeout(() => {
        console.log("setTimeout()");
    }, 1000);
});
console.log(promise)
​```
```

- resolved / fulfilled 成功状态（异步代码执行成功了），调用resolve函数，可以将promise对象的状态由pending变成resolved

```
​```js
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("setTimeout()");
        resolve('a数据');
    }, 1000);
});
console.log(promise)
​```
```

- rejected 失败状态（异步代码执行失败了），调用reject函数，可以将promise对象的状态由pending变成rejected

  ```js
  const promise = new Promise((resolve, reject) => {
      // 执行异步操作/异步代码
      setTimeout(() => {
          console.log("setTimeout()");
          reject("失败了~");
      }, 1000);
  });
  console.log(promise)
  ```

- Promise的同步异步状态

  `new Promise()`函数是同步执行的

  ```js
  console.log(111)
  const promise = new Promise((resolve, reject) => {
      console.log(222)
      // 同步调用
      //...code
      // 执行异步操作/异步代码
      setTimeout(() => {
          console.log(333)
          console.log("setTimeout()");
          resolve('a数据');
      }, 1000);
      console.log(444)
  });
  console.log(555)
  console.log(promise)
  ```

## Promise的then和catch方法

- `Promise.prototype.then` 捕获promise成功的状态，执行成功的回调

  ```js
  const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
          console.log("setTimeout()");
          // console.log(333);
          // resolve('a数据');
          reject("失败了~");
      }, 1000);
  });
  promise.then(
      (result) => { // 成功的回调
          // 当promise对象的状态变成resolved，就会执行当前函数
          // console.log("resolved 111");
          console.log(result);
      },
      (error) => { // 失败的回调
          // 当promise对象的状态变成rejected，就会执行当前函数
          // console.log("rejected 111");
          console.log(error);
      }
  );
  ```

- `Promise.prototype.catch` 捕获promise失败的状态，执行失败的回调

  ```js
  const promise = new Promise((resolve, reject) => {
     setTimeout(() => {
         console.log("setTimeout()");
         // console.log(333);
         // resolve('a数据');
         reject("失败了~");
     }, 1000);
  });
  //链式调用
  promise.then(
     (result) => { // 成功的回调
         // 当promise对象的状态变成resolved，就会执行当前函数
         // console.log("resolved 111");
         console.log(result);
     },
  ).catch(
     (error) => { // 失败的回调
         // 当promise对象的状态变成rejected，就会执行当前函数
         // console.log("rejected 111");
         console.log(error);
     }
  )
  ```

- then / catch 方法返回值是一个新的promise对象

  - 新promise对象默认是成功状态
  - 如果 then / catch 接受的函数返回值是一个promise对象，那么 then / catch 方法返回值的promise就是这个promise对象
  - 如果没有返回 promise对象，就会新建一个默认成功状态promise
  - 内部如果报错了，返回一个失败状态的promise

  ```js
  const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
          console.log("setTimeout()");
          // console.log(333);
          resolve('a数据');
          // reject("失败了~");
      }, 1000);
  });
  promise.then(
      (result) => { // 成功的回调
          // 当promise对象的状态变成resolved，就会执行当前函数
          // console.log("resolved 111");
          console.log(result);
          return "then";
      },
  ).catch(
      (error) => { // 失败的回调
          // 当promise对象的状态变成rejected，就会执行当前函数
          // console.log("rejected 111");
          console.log(error);
      }
  ).
  then(
      (result) => {
          console.log(111);
          console.log(result)
      },
  ).catch(
      () => {
          console.log(222);
      }
  )
  ```

## Promise 练习

- 题目1

  ```js
  console.log(111);
  
  const promise = new Promise((resolve, reject) => {
      reject();
      console.log(222);
  });
  
  promise
      .then(() => {
      console.log(333);
      return new Promise((resolve) => {
          reject();
      });
  })
      .catch(() => {
      console.log(444);
  })
      .then(() => {
      console.log(555);
      return new Promise((reject, resolve) => {
          reject();
          // resolve();
      });
  })
      .catch(() => {
      console.log(666);
      throw new Error("报错了~");
  })
      .then(() => {
      console.log(777);
      throw new Error("报错了~");
  })
      .then(() => console.log(888))
      .then(() => console.log(999))
      .catch(() => console.log(101010));
  
  console.log(111111);
  ```

- 练习2

  ```js
  /*
    需求：setTimeout模拟发送请求
    请求a数据，请求成功在请求b数据，请求成功在请求c数据
  */
  
  const promise = new Promise((resolve, reject) => {
      // 执行异步代码，请求a数据
      setTimeout(() => {
          console.log("a数据ok");
          resolve();
      }, 1000);
  });
  
  promise.then(() => {
      // 请求b数据
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              console.log("b数据ok");
              resolve();
          }, 2000);
      });
  }).then(() => {
      // 请求c数据
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              console.log("c数据ok");
              resolve();
          }, 3000);
      });
  }).then(() => {
      console.log('所有数据都请求完毕了~');
  })
  ```

- 练习3

  ```js
  /*
    需求： 同时请求三个数据，全部请求成功了，才OK，只要有一个失败，就失败
  */
  
  /*
  const promise = new Promise((resolve, reject) => {
      let successNum = 0;
  
      setTimeout(() => {
          console.log("a数据ok");
          reject();
          successNum++;
          if (successNum === 3) {
              resolve();
          }
      }, 1000);
  
      setTimeout(() => {
          console.log("b数据ok");
          successNum++;
          if (successNum === 3) {
              resolve();
          }
      }, 2000);
  
      setTimeout(() => {
          console.log("c数据ok");
          successNum++;
          if (successNum === 3) {
              resolve();
          }
      }, 3000);
  });
  
  promise
      .then(() => console.log("全部成功了~"))
      .catch(() => console.log("失败了~")); 
  */
  
  const promise1 = new Promise((resolve, reject) => {
      setTimeout(() => {
          console.log("a数据ok");
          resolve();
      }, 1000);
  });
  
  const promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
          console.log("b数据ok");
          reject();
      }, 2000);
  });
  
  const promise3 = new Promise((resolve, reject) => {
      setTimeout(() => {
          console.log("c数据ok");
          resolve();
      }, 3000);
  });
  
  const promise = Promise.all([promise1, promise2, promise3]);
  
  promise
      .then(() => console.log("全部成功了~"))
      .catch(() => console.log("失败了~"));
  ```

## Promise的then和catch方法

promise变成成功/失败都触发，pending不触发

```js
const promise = new Promise((resolve, reject) => {
    // resolve(111);
    // reject(222);
});
// promise变成成功/失败都触发，pending不触发
promise.finally(() => {
    console.log("finally()");
});
```

## 其他Promise方法

- Promise.all([promise1, ...]) 传入n个promise对象，只有n个promise对象的状态都成功，才成功，只要有一个失败，就失败
- Promise.resolve() 返回一个成功状态promise对象
- Promise.reject() 返回一个失败状态promise对象
- Promise.allSettled([promise1, ...])传入n个promise对象，等n个promise对象状态全部发生变化，得到所有结果值