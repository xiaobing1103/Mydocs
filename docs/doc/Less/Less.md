# LESS课件

## 一、什么是LESS

### 1.1 LESS简介

![img](https://tva1.sinaimg.cn/large/00831rSTgy1gdnerxegkhj30j008d3yj.jpg)

less是一种动态样式语言，属于css预处理器的范，它扩展了 CSS 语言， 增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展 LESS 既可以在 客户端 上运行 ，也可以借助Node.js在服务端运行。

- 动态样式：CSS是一门非程序式语言，需要书写大量没有逻辑的代码，不方便维护及扩展，不利于复用，所以出现了处理css的工具和框架
- 预处理器：对生成CSS前的某一语法的处理程序

> CSS 自诞生以来，基本语法和核心机制一直没有本质上的变化，它的发展几乎全是表现力层面上的提升。最开始 CSS 在网页中的作用只是辅助性的装饰，轻便易学是最大的需求；然而如今网站的复杂度已经不可同日而语，原生 CSS 已经让开发者力不从心。
>
> 当一门语言的能力不足而用户的运行环境又不支持其它选择的时候，这门语言就会沦为 “编译目标” 语言。开发者将选择另一门更高级的语言来进行开发，然后编译到底层语言以便实际运行。
>
> 于是，在前端领域，CSS 预处理器应运而生。而 CSS 这门古老的语言以另一种方式 “重新适应” 了网页开发的需求

### 1.2 LESS地址

中文网站：http://lesscss.cn/

**英文官网：**[http://lesscss.org](http://lesscss.org/)

**less**源码： **[https://github.com/cloudhead/less.js](http://www.lesscss.net/)**

### 1.3 LESS的使用

#### 1.3.1 LESS的基础使用

- `<style type="text/less">` style标签的类型需要改成less
- 根据官网我们需要一个less编译的 less.js 文件，并在最下方引入，因为需要读取页面中所有less相关的文件，才可以进行编译

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet/less" type="text/css" href="styles.less" />
    <style type="text/less">
        @num:200px;
        .box{
            border: 1px solid #000;
            .con{
                width: @num;
                height: @num;
                background:red;
            }
        }
    </style>
</head>
<!-- //安装vscode 安装插件 安装nodeJS 练习第一个案例 -->

<body>
    <div class="box">
        <div class="con"></div>
    </div>
    <script src="./less.min.js"></script>
</body>

</html>
```

#### 1.3.2 LESS全局安装

- 安装nodeJS
- 打开命令行窗口，使用`node -v`和`npm -v`检查node和npm是否安装成功
- 使用`npm i -g less`进行全局安装less，并输入`less -V`检查版本
- 打开VSCode编辑器，安装`Easy LESS`插件
- 在文件夹中新建less文件，然后保存，即可在当前文件夹中编译出相应的css文件。

```less
*{
    margin:0;
    padding:0;
}
.box{
    width: 100px;
    height: 100px;
    background-color: red;
    .con{
        width: 40px;
        height: 40px;
        background-color: pink;
    }
}
```

### 1.4 其他CSS预处理器语言

CSS 预处理器技术已经非常的成熟了，而且也涌现出了越来越多的 CSS 的预处理器框架。其中最常用的是 Sass、Less、Stylus。

> less --- 支持原生js,node， 让CSS有了基本的逻辑运算能力 , 基于js写的
>
> sass --- ruby环境，让CSS有了更完整的逻辑和判断能力,比如支持if这些 ,基于ruby
>
> stylus --- node -- VUE阶段开发项目中我们使用stylus， 这个让CSS变成跟一门编程语言类似了

## 二、LESS的基础语法

### 2.1 LESS 注释

- 以`//`开头的注释，不会被编译到css文件中
- 以`/**/`包裹的注释会被编译到css文件中

```less
//注释有两种，第一种注释只能在less中查看
//第二种 会把注释编译到css中
.con{
    width: 100px;
    height: 100px;
    /*以下是设置背景颜色*/
    background-color: red;
}
```

### 2.2 LESS 变量

#### 2.2.1 什么是变量

Less允许我们定义一些变量来管理css（变量必须以@开头），注意 LESS中的变量为完全的 ‘常量’ ，所以只能定义一次,作用域由本地在父对象查找。

#### 2.2.2 变量作为普通属性值

作为普通属性值只来使用：直接使用@pink

#### 2.2.3 作为选择器和属性名

作为选择器和属性名：

- \#@{selector的值}的选择器形式
- @{selector的值}属性名

#### 2.2.4 作为URL

作为URL：@url

#### 2.2.5 4.变量的延迟加载

它会在当前作用域样式未加载之前先加载变量，而且是由内而外，先寻找作用域内的变量，如果没有在寻找作用域外的变量

```less
//声明一个代表全局颜色的变量
@mainColor:red;

//声明一个代表数值的变量
@zero:10px;

//声明一个变量 代表选择器的名字
@a:outer;

//声明一个变量 代表属性名
@p:position;

//声明一个变量，保存图片
@url1:"http://www.atguigu.com/images/pic_new/logo.png";

//声明一个变量，保存图片
@url2:url("http://www.atguigu.com/images/pic_new/logo.png");

//变量可以保存变量，但是需要加上完整的@符号
@z:@zero;
*{
    margin:@z;
    padding: @z;
}
//2.变量作为选择器来使用 需要加上花括号
.@{a}{
    //1.变量作为普通的属性值使用  记得要加@富豪
    border: 1px solid @mainColor;
    width: 400px;
    height: 400px;
    //3.变量作为属性名使用 需要加上花括号
    @{p}: relative;
    .box{
        width: 100px;
        height: 100px;
        @{p}: absolute;
        left: @zero;
        top: @zero;
        right: @zero;
        bottom: @zero;
        margin: auto;
        background-color: @mainColor;
    }
    .logo{
        width: 200px;
        height: 100px;
        //4.变量作为url地址使用
        // background: url(@url1) 0 0 no-repeat;
        background: @url2 0 0 no-repeat;
    }
}

@var: 0;
.class {
@var: 1;
    .brass {
      @var: 2;
      three: @var;
      @var: 3;
    }
  one: @var;
}
```

### 2.3 嵌套规则

#### 2.3.1 基础嵌套

在使用标准CSS时，要为多层嵌套的元素定义样式，要么使用后代选择器从外到内的嵌套定义，要么给这个元素加上类名或 id 来定义。这样的写法虽然很好理解，但维护起来很不方便，因为无法清晰了解到样式之间的关系。

在Less中，嵌套规则使这个问题迎刃而解。嵌套规则允许在一个选择器中嵌套另一个选择器，这更容易设计出精简的代码，并且样式之间的关系一目了然。

#### 2.3.2 父级引用

使用&：代表前边的所有父级元素，常用在伪元素 伪类 css结构类等需求上

内层选择器前面的 & 符号就表示对父选择器的引用。在一个内层选择器的前面，如果没有 & 符号，则它被解析为父选择器的后代；如果有 & 符号，它就被解析为父元素

```less
#outer{
    border: 1px solid #000;
    .con{
        background-color: #ccc;
        padding: 30px;
        .nav{
            background-color: pink;
            border: 1px solid #000;
            list-style: none;
            li{
                height: 40px;
                line-height: 40px;
                font-size: 28px;
                color: royalblue;
                // 选择器前面的 & 符号就表示对父选择器的引用。
                &:nth-child(3){
                    color:yellow;
                }
                &:hover{
                    color: green;
                }
            }
            .active{
                color:red;
            }
        }
    }
    .box{
        margin: 40px;
        background-color: yellowgreen;
        h2{
            font-size: 30px;
            text-align: center;
        }
        p{
            color: #ccc;
            font-size: 12px;
            border: 1px solid red;
        }
    }
    .clearFix{
        // css Hack
        *zoom:1;//在IE低版本开启haslayout
        div{
            width: 100px;
            height: 100px;
            background-color: red;
            float: left;
            margin: 10px;
        }
        &:after{
            content:"\200B";
            height: 0;
            display: block;
            clear:both;
        }
    }
}
```

### 2.4 LESS运算

- 任何数值，颜色，变量都可以运算
- less会给你自动推算单位，所以不需要每一个都加单位，但保证至少有一个加了单位
- 运算符与数值之间要以空格分开，涉及优先级时以（）进行优先级计算

```less
@num1 : 30;
.box{
    width: 30px * @num1;
    height: 1000px / 3;
    .con{
        // 普通数值的加减法
        width: 100px - 30%;
        height: (100px + 10) * 20;
    }
    .inner{
        // 颜色的运算是先转换成10进制的rgba  然后再计算  再转换成16进制
        background-color: #fff-55;
    }
}
```

### 2.5 LESS的混合（Mixin）

在 LESS 中我们可以定义一些通用的属性集为一个class，然后在另一个class中去调用这些属性.

混合就是将一系列属性从一个规则引入到另一个规则中

#### 2.5.1 普通混合

混合的定义：使用`.+混合名+()+{属性的合集}`

混合的使用：.+混合名+();

```less
//在 LESS 中我们可以定义一些通用的属性集为一个class，然后在另一个class中去调用这些属性.
//混合就是将一系列属性从一个规则引入到另一个规则中

//如果说作为mixin的类 不加小括号，则可以被编译出来，如果加上括号，则不能被编译出来，只能被调用
.mine(){
    border: 1px solid #000;
    border-radius: 10px;
    background-color: red;
}

.box{
    width: 100px;
    height: 100px;
    //调用Mixin的时候，可以加上小括号调用，也可以不加
    .mine();
}
.con{
    width: 100px;
    height: 100px;
    .mine;
}
```

#### 2.5.2 带参数的混合

在声明混合的时候，可以在小括号中声明形参。形参由@+变量名定义。

调用的时候可以传入实参

```less
//定义的时候声明形参  和变量一个样子 
.center(@w,@h,@bg){
    width: @w;
    height: @h;
    background-color: @bg;
    position: absolute;
    left: 0;
    top: 0;
    bottom:0;
    right: 0;
    margin: auto;
}
.outer{
    //传参数
    .center(500px,500px,red);
    .inner{
       .center(300px,300px,green);
        .con{
            .center(100px,100px,pink);
        }
    }
}
```

#### 2.5.3 参数有默认值的混合

可以直接在混合中定义形参的时候，给形参设置默认值，比如（@color:red）。

当使用混合的时候，如果有实参传递，则使用实参的值，否则使用形参的默认值

```less
//定义的时候声明形参  和变量一个样子
//如果用户不传宽高的时候，默认宽高就是500px ，那么可以给形参定义默认值,只要传递参数就会覆盖默认值
.center(@w:500px,@h:500px,@bg){
    width: @w;
    height: @h;
    background-color: @bg;
    position: absolute;
    left: 0;
    top: 0;
    bottom:0;
    right: 0;
    margin: auto;
}
.border(@w,@s,@c){
    // border:@w @s @c;
    //在mixin中，可以使用@arguments代表传入的实参
    border:@arguments;
}
.outer{
    //传参数
    //命名参数：传递参数的时候，可以给对应的形参传递
    .center(@bg:yellow,@h:600px);
    .inner{
       .center(300px,300px,green);
        .con{
            .center(100px,100px,pink);
            .border(10px,dotted,yellow)
        }
    }
}
```

#### 2.5.4 命名参数

在使用混合的时候，如果想要指定传递的实参对应哪一个形参，则可以对实参命名

#### 2.5.5 arguments变量

@arguments 变量代表所有参数集合，不想单独处理每一个参数的话，可以利用@arguments 代替

### 2.6 模式匹配和守卫

#### 2.6.1 模式匹配

在Less中尝试利用模式匹配替if/else，其执行原理类似switch/case。

因为一个混合可能有多种形式，所以Less提供了一种机制，允许根据参数的值来改变 mixin的行为。

其中当参数是@_开头的，是调用此混合必选的。

```less
//当进行模式匹配的时候，参数是@_的混合  是必选的
.mine(@_){
    width: 300px;
    height: 100px;
}
//允许根据参数的值来改变 mixin的行为
//这个参数不是用来向混合内部传递的  而是用来识别匹配的
.mine(color1){
    background-color: red;
}
.mine(color2){
    background-color: pink;
}

.box{
    //模式匹配到相应的混合
    //匹配的关系类似于 switch语句
    .mine(color1);
}
```

#### 2.6.2 重载

相同的混合，不同的行为，可以根据调用的时候传入的实参个数选择匹配的混合内容

```less
.mixin(@a,@b){
  background-color:@a;
  width: 1000px;
}
.mixin(@a){
  background-color: @a;
  width: 100px;
}

.box{
  border:1px solid #000;
  height: 100px;
  .mixin(pink,red);
}
```

#### 2.6.3 守卫

根据判断条件选中Mixin的行为

类似于JavaScript的if/else，使用when语法

Guards 允许我们使用>,>=,<,<=,=,关键字true（只匹配关键字true，非true不会匹配），支持逻辑and ,not ()

同时我们可以使用“，”分割多个Guards，其表示只要其中任意一个满足就为true

```less
.mixin(@q){//无守卫
  height: 100px;
}
.mixin(@q) when(@q>10){
  background-color: red;
}
.mixin(@q) when(@q<=10),(@q>100){
  background-color: black;
}
.box{
  border:1px solid #000;
  .mixin(99);
}
```

### 2.7 字符串插值

变量可以用类似ruby和php的方式嵌入到字符串中，通过**@{name}**这样的结构:

```less
@url:"http://www.atguigu.com/images/pic_new/";
.con{
  height: 300px;
  background: url("@{url}logo.png") 0 0 no-repeat;
}
```

### 2.8 LESS函数

- 逻辑函数 如if()、Boolean()
- 数学函数 如 ceil()、floor()、sqrt()等等
- ...

参考：[https://less.bootcss.com/functions/#less-%E5%87%BD%E6%95%B0](https://less.bootcss.com/functions/#less-函数)

```less
.box{
    width: ceil(200.1px);
    height: floor(30.4%);
    line-height: percentage(8/10);
}
```

### 2.9 文件导入

- 导入Less文件：@import “lib.less”; //等价于@import “lib”（可以不带后缀）
- 导入css文件：@import "lib.css"; 

### 2.10 转义

有时候，当需要引入无效的CSS语法或Less不能识别的字符，就需要使用转义字符。此时，就可以在字符串前面加一个 ~，并将需要转义的字符串放在 "" 中。

```less
@cc:3;
.a{
  width:~"@{cc}px";
}
```