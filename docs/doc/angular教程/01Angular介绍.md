## 一、 Angular 介绍

Angualr 是一款来自谷歌的开源的 web 前端框架，诞生于 2009 年，由 Misko Hevery 等 人创建，后为 Google 所收购。是一款优秀的前端 JS 框架，已经被用于 Google 的多款产品当 中。 



**根据项目数统计 angular（1.x 、2.x 、4.x、5.x、6.x、7.x）是现在网上使用量最大的框架。**



Angualr 基于 TypeScript 和 react、vue 相比 Angular 更适合中大型企业级项目。



目前 2018 年 11 月 25 日 angular 最新版本 angular7.x。根据官方介绍，Angular 每过几个月 就会更新一个版本。此教程同样适用于后期更新的 Angular8.x、Angular9.x ....。

<img src="https://s3.ax1x.com/2021/02/01/yVjKyD.png" alt="yVjKyD.png" border="0" />



##二、学习 Angular 必备基础

必备基础：html 、css 、js、es6

如果有 Typescript 基础更容易理解，没有 Typescript 基础也可以学此教程。此教程中用到的 Typescript 语法会详细讲解。



## 三、Angular 环境搭建

### 1、安装前准备工作：

#### 1.1、安装 nodejs

安装 angular 的计算机上面必须安装最新的 nodejs--注意安装 nodejs 稳定版本

#### 1.2、安装 cnpm

npm 可能安装失败建议先用 npm 安装一下 cnpm 用淘宝镜像安装 

https://npm.taobao.org/

`npm install -g cnpm --registry=https://registry.npm.taobao.org`

###2、使用 npm/cnpm 命令安装 angular/cli （只需要安装一次）

`npm install -g @angular/cli 或者 cnpm install -g @angular/cli`



## 四、Angular 创建项目

### 1. 打开命令行工具找到你要创建项目的目录

### 2. 创建项目

ng new 项目名称

直接安装：

`ng new angulardemo`

如果要跳过 npm i 安装：

`ng new angulardemo --skip-install`

<img src="https://s3.ax1x.com/2021/02/01/yVvZ7j.png" alt="yVvZ7j.png" border="0" />

### 3. 运行项目

`cd angulardemo`

`ng serve --open`



## 五、Angular 环境搭建以及创建项目的时候 可能遇到的错误

### 1、npm 安装 angular/cli 失败

解决方案：用 cnpm 安装

### 2、创建项目 npm i 的时候失败

解决方案 1：ctrl+c 结束项目，cd 到项目里面，用 cnpm i 安装依赖

解决方案 2：创建项目的时候 --skip-install

```sh
ng new my-app --skip-install
cd my-app
cnpm install / yarn
```

### 3、创建项目后用 npm i 或者 cnpm i 后项目没法运行

解决方案：用 yarn 替代 cnpm 和 npm

- 1 cnpm instal @angular/cli (我的 npm 会报错)；

- 2 ng new 的时候阻止自动安装 ng 包，只创建 ng 目录

```sh
ng new my-app --skip-install
```

- 3 安装 yarn npm install -g yarn / cnpm install -g yarn

- 4 进入目录 my-app 使用 yarn 安装 ng 所依赖的包 yarn

注意：yarn 命令 等同于 npm install / cnpm install 使用 yarn 前提是先安装 yarn , 安装使用 cnpm install -g yarn 就可以安装

