# class

## 1 类的由来

- JavaScript 语言中，生成实例对象的传统方法是通过构造函数

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype = {
    course: "html5",
    do() {
        console.log("study");
    }
}
let p1 = new Person("lily", 18);
console.log(p1.name)
console.log(p1.course)
p1.do();
```

- 上面这种写法跟传统的面向对象语言（比如 C++ 和 Java）差异很大，很容易让新学习这门语言的程序员感到困惑。
- ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过`class`关键字，可以定义类。
- 基本上，ES6 的`class`可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的`class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
- `constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor`方法，如果没有显式定义，一个空的`constructor`方法会被默认添加。
- 构造函数的静态的方法或属性 直接用构造函数调用 使用static定义 ,如果不加static 则声明的属性和方法是构造器的

```js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    score = 100;//最终还是实例构造了
    do() {
        console.log("study");
    }
}
Person.prototype.course = "html5";
//当Person被new的时候，constructor就会被执行
let p1 = new Person("lily", 18);
console.log(p1.__proto__)
console.log(p1.name)
console.log(p1.course)
p1.do(); 
```

## 2 类的继承

- 在ES5中，我们通常这么写

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype = {
    do() {
        console.log("study");
    }
}
function Child(name, age, gender) {
    Person.call(this, name, age, gender)
}

let cat1 = new Child("小王", 19, "male");
console.log(cat1.name);


//对象的继承
function extend(obj1, obj2) {
    for (let attr in obj2) {
        obj1[attr] = obj2[attr];
    }
}
```

- Class 可以通过`extends`关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多
- ES6中继承的子类中，如果使用构造函数constructor()那么就必须使用super()方法初始化，这样下面才可以调用this关键字。super()只能用在子类的构造函数之中，用在其他地方就会报错,这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。
- 如果不调用super方法，子类就得不到this对象。

```js
 //class 是一个定义类的关键字(是书写面向对象的语法糖，一种新语法 )
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    do() {
        console.log("study");
    }
}
class Child extends Person {
    constructor(name, age, gender) {
        //ES6中继承的子类中，如果使用构造函数constructor()那么就必须使用super()方法初始化，这样下面才可以调用this关键字。
        //super()只能用在子类的构造函数之中，用在其他地方就会报错
        // 这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
        super(name, age);
        this.gender = gender;
    }
}
```