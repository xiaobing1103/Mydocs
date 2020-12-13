## 脚手架初始化项目

- 命令：`npx create-react-app my-app`

  - npx 是 npm v5.2 版本中新增的命令
  - create-react-app react脚手架名称（固定）
  - my-app 项目名称，可以自定义

  

  npm i create-react-app -g

  create-react-app myProject

  

- npx 目的：为了简化命令行工具的使用体验

  - 原来：1 先全局安装脚手架的工具包 2 再使用工具包中提供的命令来初始化项目
  - 现在：合二为一，直接通过 npx 不需要在全局安装脚手架的包，就可以直接初始化项目
  - npx 内部会临时安装工具包，然后，使用工具包中提供的命令来初始化项目，并且，在初始化项目完成后，移除临时安装的工具包

  

- 项目的整体技术架构为:  react + webpack4 + es6 + eslint + babel

## 使用脚手架初始化项目的步骤

- 1 `npx create-react-app my-app` 初始化项目
- 2 `cd my-app` 进入项目根目录
- 3 `yarn start` 启动项目

[![BBweTx.png](https://s1.ax1x.com/2020/11/02/BBweTx.png)](https://imgchr.com/i/BBweTx)

```javascript
public/ 公共资源
 index.html 首页（必须有）
 manifest.json PWA应用的元数据
 
src/ 项目源码，写项目功能代码
 index.js 项目入口文件（必须有）
 App.js 项目的根组件
 App.test.js App组件的测试文件
 serviceWorker.js 用来实现PWA（可选）打包之后通过serve可以实现(在cmd中.window10的power shell会报错)

 
yarn 是 Facebook 发布的包管理器，可以看做是 npm 的替代品，功能与 npm 相同 

 yarn 具有快速、可靠和安全的特点 

 初始化新项目：yarn init 

 安装包： yarn add 包名称 

 安装项目依赖项： yarn 或 yarn install
 
 //注意: 在react脚手架中也可以使用npm.但是会删包.所以在使用之前,使用npm i 再下载一遍.
 
// 默认添加到dependencies（生产依赖）
yarn add [package]
yarn add [package]@[version]

// 指定依赖类别
yarn add [package] --dev

// 同时添加多个依赖
yarn add [package] [package] [package] --dev

// 升级依赖
// 指定包名称升级指定依赖 不指定包名称升级所有依赖
yarn upgrade [package]

// 移除依赖
yarn remove [package]

// 全局安装
yarn global add [package]

```

