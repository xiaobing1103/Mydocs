# Math的扩展

## 指数运算符

- 在Math中提供了 pow的方法 用来计算一个值的n次方
- ES11 提出了新的方法求一个值的n次方 那就是 ** 操作符

```js
//求 一个数字的 n次方  是一个很大的需求
console.log(Math.pow(3, 3));
console.log(Math.pow(30, 7));


//ES11 提出了新的方法求一个值的n次方  那就是 ** 操作符
console.log(3 ** 3);
console.log(30 ** 10);

//计算顺序 先计算右边  在依次计算
console.log(3 ** 3 ** 3);
```

## 进制写法

- 书写二进制数字
- ES6表示八进制方法

```js
//书写二进制数字
let n1 = 0b10101010101;
console.log(n1);//1365

//书写八进制
// let n2 = 017;//严格模式下报错
// console.log(n2)

// ES6表示八进制方法
let n3 = 0o17;
console.log(n3)
```

## Math的新增方法

- Math.trunc()方法会将数字的小数部分去掉，只保留整数部分
- Math.sign() 判断一个数字的正数还是负数 还是0 或者是NaN
- Math.sqrt()平方根
- Math.cbrt()立方根
- Math.hypot() 求所有参数平方和的平方根

```js
const { log } = console;
/*
   Math.trunc()去除小数部分
*/
log(Math.floor(1.33));//1
log(Math.ceil(1.33));//2
log(Math.trunc(1.33));//1

log(Math.floor(-1.33));//-2
log(Math.ceil(-1.33));//-1
log(Math.trunc(-1.33));//-1

/*
   Math.sign() 判断一个数字的正数还是负数 还是0  或者是NaN
   如果说是正数 则返回1  负数返回-1  0 返回0   NaN返回NaN
*/
log(Math.sign(2.3));//1
log(Math.sign(-1.3));//-1
log(Math.sign(0));//0
log(Math.sign(NaN));//NaN
log(Math.sign(Infinity));//1

/*
    Math.sqrt()平方根
    Math.cbrt()立方根
*/
log(Math.cbrt(27));

/*
   Math.hypot() 求所有参数平方和的平方根
*/
log(Math.hypot(4, 9, 16))//Math.sqrt(4*4 + 9*9 + 16*16)
//勾股定理  a的2次方  + b的2次方  = c的2次方
// 已知直角三角形两个直角边的长度是 3 和 4  求斜边的长度
log(Math.hypot(3, 4))//5
```

- Number扩展
  - Number.isFinite(i) : 判断是否是有限大的数
  - Number.isNaN(i) : 判断是否是NaN
  - Number.isInteger(i) : 判断是否是整数
  - Number.parseInt(str) : 将字符串转换为对应的数值