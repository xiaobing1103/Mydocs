# vue脚手架

# 1.1. 使用脚手架创建模板项目

### 1.1.1. 说明

1)    vue-cli是vue官方提供的脚手架工具 command line interface client

2)    最新的版本是4, 

3)    3.x版本与4.x版本变化不大, 但3.x相对于2.x的版本变化特别大

4)    在线文档: https://cli.vuejs.org/zh/

### 1.1.2. 创建vue项目

1)    创建脚手架4/3的vue项目, 并运行

npm install -g @vue/cli

vue create vue-demo

npm run serve

2)    创建脚手架2的vue项目

npm install -g @vue/cli-init

vue init webpack vue-demo

  npm run dev

3)    访问: http://localhost:8080/

### 1.1.3. 模板项目的结构

vue-cli2脚手架项目结构

gshop

  |-- build : webpack相关的配置文件夹(基本不需要修改)

  |-- config: webpack相关的配置文件夹(基本不需要修改)

​      |-- index.js: 指定的后台服务的端口号和静态资源文件夹

  |-- node_modules

  |-- src : 源码文件夹

​      |-- main.js: 应用入口js

  |-- static: 静态资源文件夹

  |-- .babelrc: babel的配置文件

  |-- .editorconfig: 通过编辑器的编码/格式进行一定的配置

  |-- .eslintignore: eslint检查忽略的配置

  |-- .eslintrc.js: eslint检查的配置

  |-- .gitignore: git版本管制忽略的配置

  |-- index.html: 主页面文件

  |-- package.json: 应用包配置文件 

  |-- README.md: 应用描述说明的readme文件

 

vue-cli3脚手架项目结构

gshop

  |-- node_modules

  |-- public

​    |-- index.html: 主页面文件

  |-- src

​    |-- main.js: 应用入口js

  |-- babel.config.js: babel的配置文件

  |-- vue.config.js: vue的配置文件

  |-- .gitignore: git版本管制忽略的配置

  |-- package.json: 应用包配置文件 

  |-- README.md: 应用描述说明的readme文件

### 1.1.4. 脚手架3相对于脚手架2的变化

\1. webpack配置

(1)   2: 配置是暴露的, 我们可以直接在里面修改配置

(2)   3: 配置是包装隐藏了, 需要通过脚手架扩展的vue.config.js来配置

\2. 运行启动命令

(1)   2: npm run dev

(2)   3: npm run serve 

 

 

