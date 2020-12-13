# iterator

## 1 什么是iterator

- JavaScript 原有的表示“集合”的数据结构，主要是数组（`Array`）和对象（`Object`），ES6 又添加了`Map`和`Set`。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是`Map`，`Map`的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。
- 遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
- Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供`for...of`消费。

```js
let arr = [1, 2, 3];
function Iterator() {
    //用一个计数器，保存现在处理到哪里了
    let index = 0;
    return {
        next: () => {
            if (index < arr.length) {
                return {
                    value: arr[index++],
                    done: false
                }
            } else {
                return {
                    done: true
                }
            }
        }
    }
}

//只要调用这个Iterator接口，就可以依次处理成员了
let it = Iterator(arr);
console.log(it);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
```

## 2 iterator的使用

- 一种数据结构只要部署了Iterator接口，我们就称这种数据结构是可以迭代的
- 在ES6中，只要一种数据结构具有了Symbol.iterator属性，那么就认为是可以迭代的
- 在ES6中，很多数据结构都部署了iterator接口(Array,set,Map,string)
- 应用场景：
  - 解构赋值的时候默认调用iterator接口
  - 扩展运算符使用的时候页默认调用iterator接口
  - for of 使用的是iterator接口
  - 对象是没有部署Iterator接口

```js
let arr = [1, 2, 3, 4, 5];
//arr[Symbol.iterator] 就是一个函数块
console.log(arr[Symbol.iterator])
console.dir(arr[Symbol.iterator])

let it = arr[Symbol.iterator]();
//可以看出arr拥有Iterator接口  那我们手动调用它
console.log(it)
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());


let str = "abc";
let it2 = str[Symbol.iterator]();
console.log(it2.next());
console.log(it2.next());
console.log(it2.next());
console.log(it2.next());
```

## 3 for...of

- ES6 借鉴 C++、Java、C# 和 Python 语言，引入了`for...of`循环，作为遍历所有数据结构的统一的方法。
- 一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有 iterator 接口，就可以用`for...of`循环遍历它的成员。也就是说，`for...of`循环内部调用的是数据结构的`Symbol.iterator`方法。
- `for...of`循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如`arguments`对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。

```js
let arr = ["a", "b", "c", "d"];
for (let i of arr) {//for of 得到的是值
    console.log(i)//a b c d
}
for (let i in arr) {//for in得到的是键名
    console.log(i);//0 1 2 3 
}

let str = "abcde";
for (let i of str) {
    console.log(i);
}

//obj is not iterable  对象没有部署iterator  没办法迭代 
let obj = {
    name: "lily"
}
for (let i of obj) {
    console.log(i)
}
```

### 3.1 for..of 和 for..in

- JavaScript 原有的`for...in`循环，只能获得对象的键名，不能直接获取键值。ES6 提供`for...of`循环，允许遍历获得键值,如果要通过`for...of`循环，获取数组的索引，可以借助数组实例的`entries`方法和`keys`方法
- `for...of`循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟`for...in`循环也不一样