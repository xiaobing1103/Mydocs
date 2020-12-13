# ES5

## 严格模式

### 理解

- 除了正常运行模式(混杂模式)，ES5添加了第二种运行模式："严格模式"（strict mode）。
- 顾名思义，这种模式使得Javascript在更严格的语法条件下运行

### 目的/作用

- 严格模式修复了一些导致 JavaScript引擎难以执行优化的缺陷：有时候，相同的代码，严格模式可以比非严格模式下运行得更快
- 消除代码运行的一些不安全之处，为代码的安全运行保驾护航
- 为未来新版本的JavaScript做好铺垫

### 使用

- 在全局或函数的第一条语句定义为: 'use strict',将"use strict"放在函数体的第一行，则整个函数以"严格模式运行"。
- 如果浏览器不支持, 只解析为一条简单的语句, 没有任何副作用

### 语法和行为改变

- 变量必须声明才能使用（在正常模式中，如果一个变量没有声明就赋值，默认是全局变量。严格模式禁止这种写法）

- 禁止自定义的函数中的this指向window（严格模式下全局作用域中定义的函数中的this为undefined）

- 创建eval作用域

- 禁止在函数内部遍历调用栈( caller:调用当前函数的函数的引用，即外层函数的引用； )

- 参考地址：https://segmentfault.com/a/1190000015798019

  ```js
  function f1(){
      "use strict";
      f1.arguments; //报错
  }
  f1();
  ```

## JSON对象

### 什么是JSON对象

- JSON全称是JavaScript Object Notation,是一种轻量级的数据交换格式。JSON 与XML具有相同的特性，是一种数据存储格式，但是JSON相比XML 更易于人编写和阅读，更易于生成和解析。

### JSON对象的方法

- JSON.stringify(obj/arr)
  - js对象(数组) --> 转换为json对象(数组)(字符串类型)
- JSON.parse(json)
  - json对象(数组)(字符串类型) --> 转换为js对象(数组)

## Object扩展

### 使用 Object create方法

- Object.create是 ECMAScript5新增的一个静态方法,用来定义一个实例对象。

- 该方法可以指定对象的原型和对象特性，使用现有的对象来提供新创建的对象的__proto__。具体用法如下

  ```
  object.create (prototype, descriptors)
  ```

  - prototype:必须参数,指定原型对象,可以为null
  - descriptors可选参数,包含一个或多个属性描述符的 JavaScript对象。属性描述符包含数据特性和访问器特性,其中数据特性说明如下
    - value:指定属性值
    - writable:默认为 false,设置属性值是否可写
    - enumerable:默认为 false,设置属性是否可枚举( for/in)
    - configurable:默认为false,设置是否可修改属性特性和删除属性

```js
//Object.create方法
var obj = {};
console.log(obj);

var obj2 = Object.create(obj1);
console.log(obj2);//空对象  但是继承了obj1
console.log(obj2.name);//自己没有没关系  他爹有

o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);

//创建一个干净的对象
var obj3 = Object.create(null);
console.log(obj3);

//创建一个对象
var obj4 = Object.create(null,{
    name:{
        value:"xiaowang",
        writable:true,
        enumerable:true,
    },
    sex:{
        value:"nv"
    }
})
console.log(obj4);
console.log(obj4.name);
obj4.name = "laowang";
console.log(obj4);

for(i in obj4){
    console.log(i);
}
```

### Object.defineProperty

使用 Object.defineProperty函数可以为对象添加属性,或者修改现有属性。如果指定的属性名在对象中不存在,则执行添加操作:如果在对象中存在同名属性,则执行修改操作

```js
// Object.defineProperty（obj,pro,{}）
var obj8 = {
    name:"xiaoli"
}
Object.defineProperty(obj8,"sex",{
    value:"nv",
});
Object.defineProperty(obj8,"name",{
    //如果修改原有的name属性值，它可以被修改和枚举
    value:"dali",
});
console.log(obj8);
for(var i in obj8){
    console.log(i);
}
```

### 使用Object.defineProperties

- 可以一次定义多个属性
- Object.defineProperties(object,description)
  - object:对其添加或修改属性的对象,可以是本地对象或DOM对象
  - description:包含一个或多个描述符对象,每个描述符对象描述一个数据属性或访问器属性

```js
var obj9 = {
    like:"miantiao"
}
Object.defineProperties(obj9,{
    color:{
        value:"yellow",
        enumerable:true
    },
    length:{
        value:"10m",
    }
})
console.log(obj9);
```

### 存取器属性 getter和setter的实现

- get propertyName(){} 用来得到当前属性值的回调函数
- set propertyName(){} 用来监视当前属性值变化的回调函数
- getter负责查询值，它不带任何参数，setter则负责设置键值，值是以参数的形式传递，在他的函数体中，一切的return都是无效的。

```js
var person = {
    // name: 'jack'
    firstName: 'li',
    lastName: 'lichao',
    // 访问描述符 / 元属性
    get fullName() { // 定义fullName属性的读取的方法
        return this.firstName + ' ' + this.lastName
    },
    set fullName(val) { // 定义fullName属性的修改/设置/写的方法
        var arr = val.split(' ');
        var firstName = arr[0];
        var lastName = arr[1];
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

console.log(person.fullName); // 读取
person.fullName = 'jack ma'; // 修改/写
console.log(person);
```

- 和普通属性不同的是，存储器属性在只声明了get或set时，对于读和写是两者不可兼得的，当它只拥有了getter方法，那么它仅仅只读，同样的，当它只有setter方法，那么读到的永远都是undefined

```js
var oo = {
    name : 'lily',
    get sex(){
        return 'man';
    },
    set age(a){

    }
};
oo.sex = 'woman';
console.log(oo.sex); //结果依然是man
console.log(oo.age); //undefined
```

## 数组的扩展

- Array.prototype.indexOf(value) : 得到值在数组中的第一个下标

- Array.prototype.lastIndexOf(value) : 得到值在数组中的最后一个下标

- Array.prototype.forEach(function(item, index){}) : 遍历数组

- Array.prototype.map(function(item, index){}) : 遍历数组返回一个新的数组，返回加工之后的值

- Array.prototype.filter(function(item, index){}) : 遍历过滤出一个新的子数组， 返回条件为true的值

- Array.prototype.reduce(function(previousValue, currentValue){}) : 遍历累加返回一个最终结果

  ```js
  arr.reduce(function fn(previousValue, currentValue, index, array) {
      // previousValue 代表上一次调用fn当前函数的返回值, 初始化值为 initValue
      // currentValue 就是当前遍历数组的值，就是item
      // index 就是当前遍历数组的下标
      // array 就是遍历的整个数组
  }, initValue)
  ```

- 练习

  ```js
  /*
  1. 输出第一个6的下标
  2. 输出最后一个6的下标
  3. 输出所有元素的值和下标
  4. 根据arr产生一个新数组,要求每个元素都比原来大10
  5. 根据arr产生一个新数组, 返回的每个元素要大于4
  6. 输出arr所有元素累加的结果
  */
  ```

## 函数的扩展

- call（参考JS高级）
- apply
- bind