# 数据库

## 第1章：数据库

### 1.1数据库是什么

数据库（DataBase）是按照数据结构来组织、存储和管理数据的仓库。

### 1.2为什么要使用数据库

我们的程序都是在内存中运行的，一旦程序运行结束或者计算机断电，程序运行中的数据都会丢失。所以我们就需要将一些程序运行的数据持久化到硬盘之中，以确保数据的安全性。而数据库就是数据持久化的最佳选择。说白了，数据库就是存储数据的仓库。

### 1.3数据库的分类

#### 1.3.1 关系型数据库（RDBS）

代表有：MySQL、Oracle、DB2、SQL Server...

特点：关系紧密，都是表

#### 1.3.2 非关系型数据库（NoSQL）

代表有：MongoDB、Redis...

特点：关系不紧密，有文档，有键值对

## 第2章：MongoDB

### 2.1 MongoDB简介

MongoDB 是由C++语言编写的，是一个基于分布式文件存储的开源数据库系统。

在高负载的情况下，添加更多的节点，可以保证服务器性能。

MongoDB 旨在为WEB应用提供可扩展的高性能数据存储解决方案。

MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。

### 2.2安装MongoDB

#### 2.2.1安装步骤

[![0gEhIU.png](https://s1.ax1x.com/2020/10/11/0gEhIU.png)](https://imgchr.com/i/0gEhIU)
[![0gEfaT.png](https://s1.ax1x.com/2020/10/11/0gEfaT.png)](https://imgchr.com/i/0gEfaT)
[![0gEWZV.png](https://s1.ax1x.com/2020/10/11/0gEWZV.png)](https://imgchr.com/i/0gEWZV)
[![0gEgrq.png](https://s1.ax1x.com/2020/10/11/0gEgrq.png)](https://imgchr.com/i/0gEgrq)
[![0gE2q0.png](https://s1.ax1x.com/2020/10/11/0gE2q0.png)](https://imgchr.com/i/0gE2q0)
[![0gE5iF.png](https://s1.ax1x.com/2020/10/11/0gE5iF.png)](https://imgchr.com/i/0gE5iF)
[![0gETz9.png](https://s1.ax1x.com/2020/10/11/0gETz9.png)](https://imgchr.com/i/0gETz9)




#### 2.2.2启动MongoDB服务

1) 添加环境变量，将MongoDB的bin目录添加到path下

[![0gEIG4.md.png](https://s1.ax1x.com/2020/10/11/0gEIG4.md.png)](https://imgchr.com/i/0gEIG4)
[![0gEoRJ.md.png](https://s1.ax1x.com/2020/10/11/0gEoRJ.md.png)](https://imgchr.com/i/0gEoRJ)
[![0gEHMR.png](https://s1.ax1x.com/2020/10/11/0gEHMR.png)](https://imgchr.com/i/0gEHMR) 

2) 打开一个命令行窗口输入mongo启动数据库的客户端



#### 2.2.3 MongoDB客户端

1) 我们通过客户端来管理数据库

2) 使用mongo来启动客户端

### 2.4安装图形化工具

[![0gZkc9.png](https://s1.ax1x.com/2020/10/11/0gZkc9.png)](https://imgchr.com/i/0gZkc9)

[![0gZF1J.png](https://s1.ax1x.com/2020/10/11/0gZF1J.png)](https://imgchr.com/i/0gZF1J)

[![0gZChF.png](https://s1.ax1x.com/2020/10/11/0gZChF.png)](https://imgchr.com/i/0gZChF)

[![0gZip4.png](https://s1.ax1x.com/2020/10/11/0gZip4.png)](https://imgchr.com/i/0gZip4)

[![0gZ9tU.png](https://s1.ax1x.com/2020/10/11/0gZ9tU.png)](https://imgchr.com/i/0gZ9tU)

## 第3章：MongoDB的使用

### 3.1简介

#### 3.1.1数据库（database）

数据库是一个仓库，在仓库中可以存放集合。

#### 3.1.2集合（collection）

集合类似于JS中的数组，在集合中可以存放文档。

说白了，集合就是一组文档。

#### 3.1.3文档（document）

文档数据库中的最小单位，我们存储和操作的内容都是文档。

类似于JS中的对象，在MongoDB中每一条数据都是一个文档。

![0gZl1H.png](https://s1.ax1x.com/2020/10/11/0gZl1H.png) 



### 3.2使用

#### 3.2.1 基本命令

- 显示所有的数据库

  show dbs

  show databases

- 切换到指定的数据库

  use 数据库名

- 显示当前所在的数据库

  db

- 给当前数据库添加一个集合，并插入数据

  db.students.insert({name:"lily",age:18})

- 查找

  db.students.find()

- 删除当前数据库

  db.dropDatabase()

- 显示当前数据库中的所有集合

  show collections

- 删除当前集合

  db.collection.drop()

#### 3.2.2 操作命令

在MongoDB，数据库和集合都不需要创建，当我们向集合或数据库中第一次插入文档时，集合和数据库会自动创建。

1) 向集合中插入文档

db.<collection>.insert(doc)

如：db.stus.insert({name:"sunwukong",age:18})

2) 查询集合中的文档

db.<collection>.find()

如：db.stus.find()

#### 3.2.3数据库的CRUD

查询网址:  https://docs.mongodb.com/manual/reference/method/js-collection/

- 向集合中插入文档（create）

  db.collection.insert()	向集合中插入一个或多个文档

- 查询集合中的文档（read）

  db.collection.find(查询条件)		查询集合中所有符合条件的文档，总是会返回一个数组个文档对象

  - 操作符： >, >=, <, <=, !=  “$gt", "$gte", "$lt", "$lte", "$ne"与前面一一对应

  - 操作符："$or", "$in"，"$nin" 
  - 正则表达式
  - "$where" 

- 修改集合中的文档（update）

  db.collection.update(查询条件,新的文档,配置对象)	修改或替换一个或多个文档

- 删除集合中的文档（delete）

  db.collection.remove(查询条件)	删除所有（或第一个）符合条件的文档



```js
//使用某一个数据库
use test
//向数据库中的集合插入 students 表，并插入数据
db.students.insert({name:"xiaoli",age:30})
//向students中插入多条数据
db.students.insert([{name:"xiaowang",age:18},{name:"xiaoli",age:20}])
//查看表内容
db.students.find()
//查找name是小王的数据
db.students.find({name:"xiaowang"})

//操作符 $gt $gte $lt $lte $ne $in
//查找年龄大于等于10岁的
db.students.find({age:{ $gte:10}})
//查找id
db.students.find({_id:ObjectId("5f843fece4bf9e0d1d3af77c")})
//查找年龄18 或者姓名是小王的数据
db.students.find({$or:[{age:18},{name:"xiaowang"}]})
//查找年龄是18或者年龄是20的
db.students.find({$or:[{age:18},{age:20}]})
//查找年龄是18或者20的
db.students.find({age:{$in:[18,20]}})
//查找姓名是以xiao为开头的数据
db.students.find({name:/^xiao/})
//使用$where查找数据
db.students.find({$where:function(){
	return this.age === 18 || this.age ===20;
}})

//过滤：查找全部，只显示id和name
db.students.find({},{name:1})
//过滤：查找全部，只显示name
db.students.find({},{name:1,_id:0})
//过滤：查找全部，不显示age
db.students.find({},{age:0})

//查找满足条件的第一个
db.students.findOne({age:18})

//updateOne更新某条数据，（查找条件,新的文档） $set是设置
db.students.updateOne({name:"xiaowang"},{$set:{age:1}})
db.students.find({name:"xiaowang"})

//更新所有 年龄都加1  $inc是增加
db.students.updateMany({},{$inc:{age:1}})
db.students.find()

db.students.deleteOne({age:2})
db.students.find({age:2})
```



## 第4章：Mongoose的使用

### 4.1简介

Mongoose是一个对象文档模型（ODM）库，它对Node原生的MongoDB模块进行了进一步的优化封装，并提供了更多的功能。

### 4.2优势

1) 可以为文档创建一个模式结构（Schema）

2) 可以对模型中的对象/文档进行验证

3) 数据可以通过类型转换转换为对象模型

4) 可以使用中间件来应用业务逻辑挂钩

5) 比Node原生的MongoDB驱动更容易

### **4.3核心对象**

#### **4.3.1 Schema**

模式对象，通过Schema可以对集合进行约束

#### **4.3.2 Model**

模型对象，相当于数据库中的集合，通过该对象可以对集合进行操作

#### **4.3.3 Document**

文档对象，它和数据库中的文档相对应，通过它可以读取文档的信息，也可以对文档进行各种操作

### **4.4使用**

#### **4.4.1连接数据库**

1) 下载安装Mongoose

npm i mongoose --save

2) 引入Mongoose

var mongoose = require("mongoose");

3) 连接MongoDB数据库

mongoose.connect("mongodb://ip地址:端口号/数据库名");

#### **4.4.2创建核心对象**

1) 创建Schema对象，内部传入约束对象

**var** Schema = mongoose.Schema; **var** xxxSchema = **new** Schema({   **字段**:类型,   **字段**:类型,   **字段**:类型,   **字段**:类型 });

 

2) 创建Model对象

**var** XxxModel = mongoose.model(**"****集合名****"**,xxxSchema); 注意： 生成的集合会自动添加s，并转为小写。  解决方式： 1. 严格规范名称 2. 在new Schema时候传入第二个参数{collection: ‘集合名称’}

 

3) 创建Document对象

**var** xxx = **new** XxxModel({   **属性**:值,   **属性**:值,   **属性**:值 }); 

 

#### **4.4.3使用方式**

1) Model的方法

​		create()

​			- 创建一个或多个文档对象并添加到数据库中

​		find()

​			- 查找所有符合条件的文档，返回的是数组

​		update()

​			- 修改（替换）一个或多个

​		remove()

​			- 删除一个或多个文档

2) Document的方法

​		save()

​			- 保存当前文档

isNew

\- 判断当前文档是否是新的

​		id

​			- 获取当前文档的id属性

​		toObject()

​			- 将document对象转换为一个普通的js对象

### 4.5 mongoose的模块化

1) tools/db.js

*//* *该模块专门用来连接**MongoDB**数据库***var** mongoose = require(**"mongoose"**); mongoose.connect(**"mongodb://127.0.0.1/mongoose_test"**); mongoose.connection.once(**"open"**,**function** () {   **console**.log(**"MongoDB****数据库已经成功连接****"**); });

 

2) models/student.js

*//**来定义**Student**的模型***var** mongoose = require(**"mongoose"**); **var** Schema = mongoose.Schema;  *//**创建约束对象***var** stuSchema = **new** Schema({   **name**:**String**,   **age**:**Number**,   **gender**:{     **type**:**String**,     **default**:**"****女****"**  },   **address**:**String**});  *//**创建模型***var** Student = mongoose.model(**"student"**,stuSchema);  *//**将**Student**暴露出去*module.**exports** = Student;

 

3) test.js

*//**引入**db.js*require(**"./tools/db"**);  *//**引入**student.js***var** Student = require(**"./models/student"**); Student.create({   **name**:**"****二郎神****"**,   **age**:**"48"**,   **gender**:**"****男****"**,   **address**:**"****小圣庙****"**},**function** (err) {   **if**(!err){     **console**.log(**"****插入成功****"**);   } });

 

 	