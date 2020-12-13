# [包和包管理器]

## [1 package包]

- Node.js的包基本遵循CommonJS规范，包将一组相关的模块组合在一起，形成一组完整的工具，主要文件就是package.json。
- package.json 文件其实就是对项目或者模块包的描述，里面包含许多元信息。比如项目名称，项目版本，项目执行入口文件，项目贡献者等等。npm install 命令会根据这个文件下载所有依赖模块。
- package.json 文件创建有两种方式，手动创建或者自动创建。
  - 手动创建 直接在项目根目录新建一个 package.json 文件，然后输入相关的内容。
  - 自动创建 也是在项目根目录下执行 npm init，然后根据提示一步步输入相应的内容完成后即可自动创建。

### [1.1 package.json]

package.json也叫包描述文件，用于表达非代码相关的信息，它是一个JSON格式的文件。

包描述文件包含以下字段：

> **name** - 包名不能有中文、特殊字符等 作用；下载包时传入的名称
>
> **version** - 包的版本号。
>
> **description** - 包的描述。
>
> **homepage** - 包的官网URL。
>
> **author** - 包的作者
>
> **contributors** - 包的其他贡献者
>
> description：项目描述，是一个字符串
>
> keywords：项目关键字，是一个字符串数组
>
> private：是否私有，设置为 true 时，npm 拒绝发布
>
> license：软件授权条款，让用户知道他们的使用权利和限制
>
> bugs：bug 提交地址
>
> repository：项目仓库地址
>
> homepage：项目包的官网 URL
>
> dependencies：生产环境下，项目运行所需依赖，运行包时需要使用的依赖
>
> > 显示的版本号：
> >
> > 1.12.4 --> 必须是 1.12.4 版本
> >
> > ^1.12.4 --> 必须是 1.12.x 版本，x取最新的
> >
> > ~1.12.4 --> 必须是 1.x.x 版本，x取最新的
>
> devDependencies：开发环境下，项目所需依赖，构建包时需要使用依赖
>
> scripts：执行 npm 脚本命令简写，比如 “start”: “react-scripts start”, 执行 npm start 就是运行 “react-scripts start”
>
> bin：内部命令对应的可执行文件的路径。
>
> eslintConfig：EsLint 检查文件配置，自动读取验证
>
> engines：项目运行的平台
>
> browserslist：供浏览器使用的版本列表
>
> files：被项目包含的文件名数组

## [2 NPM]

全称：Node Package Manager , Node的包管理器

### [2.1 NPM能干什么]

- 通过NPM可以对Node的包进行搜索、下载、安装、删除、上传
- NPM的常用指令：
  - npm -v ：查看npm的版本
  - npm init：初始化项目的package.json文件
  - npm init -y 初始化一个默认配置package.json，
  - `npm install/i 包名`
    - 安装指定的包（下载之前先要初始化一个package.json）
    - 包会下载到node_modules文件夹中
    - package-lock.json 下载包的缓存文件
    - 下载包会自动添加到package.json中的开发依赖z
  - `npm install 包名 --save`或` npm i xxx -S` 或`npm i xxx` 安装指定包并添加到项目的生产依赖中
  - `npm install / i 包名 --save-dev` 或 `npm install / i 包名 -D`:下载包并添加到package.json中的开发依赖里,安装指定包并添加到项目的开发依赖中
  - `npm install / i` :安装项目中的所有依赖
  - `npm i xxx@1.12.1 `:下载指定版本的包,下载1.12.x版本的包，x代表最新版本
  - `npm install / i 包名 -g`:
    - 全局安装（全局安装都是安装一些工具）
    - 作用：将来作为cmd/终端指令使用，不是通过模块化语法引入使用
    - 比如：npm i webpack -g --> 将来就可以在 cmd/终端 使用webpack指令
  - `npm remove / r 包名` :删除指定的包

## [3 cnpm]

### [3.1 cnpm是什么]

它是淘宝对国外npm服务器的一个完整镜像版本，也就是**淘宝** **NPM** **镜像**

### [3.2 cnpm的安装]

- 直接安装:`npm install -g cnpm --registry=https://registry.npm.taobao.org`
- 修改npm仓库地址：`npm config set registry https://registry.npm.taobao.org/`

### [3.3 cnpm的使用]

cnpm和npm的使用基本没有区别，只需要将npm替换成cnpm

## [4 Yarn]

### [4.1 yarn是什么]

yarn是Facebook开源的新的包管理器，可以用来代替npm。

### [4.2 yarn的特点]

有缓存。

没有自己的仓库地址，使用的是npm仓库地址。

### [4.3 yarn的安装]

npm install yarn -g

### [4.4常用命令]

- yarn --version
- yarn init //生成package.json ！！！注意生成的包名不能有中文，大写
- yarn add global package (全局安装)
- yarn add package (局部安装)
- yarn add package --dev (相当于npm中的--save-dev)
- yarn remove package
- yarn 下载所有包

### [4.5 Cyarn]

- yarn引用npm的仓库，因为‘墙’的存在，可能会导致下载不了或速度很慢的情况，所以需要引入cyarn（淘宝镜像）
- 直接安装cyarn：`npm install cyarn -g --registry https://registry.npm.taobao.org` 配置后，只需将yarn改为cyarn使用即可
- 修改npm仓库地址：`yarn config set registry https://registry.npm.taobao.org/`