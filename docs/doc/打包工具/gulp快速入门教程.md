#  Gulp介绍

  * 中文主页: http://www.gulpjs.com.cn/
  * gulp是与webpack功能类似的**前端项目构建**工具, 也是基于Nodejs的自动**任务运行器**
  * 能自动化地完成 javascript/coffee/sass/less/html/image/css 等文件的
    合并、压缩、检查、监听文件变化、浏览器自动刷新、测试等任务
  * gulp更高效(异步多任务), 更易于使用, 插件高质量

## 使用步骤：

1. 安装 nodejs, 查看版本: node -v,务必保证node是6以上的版本。
2. 创建一个简单的应用gulp_test，文件结构如下：
  ```
  |- dist
  |- build
  |- src
    |- js
    |- less
    |- css
    |- index.html
  |- gulpfile.js-----gulp配置文件
  |- package.json
    {
      "name": "gulp_test",
      "version": "1.0.0"
    } 
  ```
3. 全局安装gulp

```
npm install gulp-cli -g
```



4. 局部安装gulp

```
npm install gulp --save-dev
```



4. 配置编码: gulpfile.js

```
//引入gulp模块
const gulp = require('gulp');

//定义默认任务
gulp.task('任务名', function() {
  // 将你的任务的任务代码放在这
});
```



4. 构建命令: 

    gulp 任务名

### gulp插件的使用
#### 使用gulp-jshint进行语法检查：

1.安装插件： npm install jshint gulp-jshint --save-dev

2.引入jshint： const jshint = require('gulp-jshint')

3.定义任务:

```js
gulp.task('jshint', function() {
		  // 将你的任务的任务代码放在这
		  return gulp.src('./src/js/*.js')
		    .pipe(jshint({
		      esversion: 6 //使用es6语法,
              asi:true //可以不添加分号
              eqeqeq: true // 必须使用 全等===
		    }))
		    .pipe(jshint.reporter('default')); // gulp插件中查看
		});
```



4.运行命令：gulp jshint 测试使用

#### 使用gulp-babel进行语法转换

1.安装插件： npm install --save-dev gulp-babel @babel/core @babel/preset-env

2.引入：const babel = require('gulp-babel');

3.定义任务:

```js
gulp.task('babel', () =>
		  gulp.src('./src/js/*.js')
		    .pipe(babel({ //进行语法转换
		      presets: ['@babel/env']
		    }))
		    .pipe(gulp.dest('build/js'))//输出到指定目录
		);
```

4.运行命令：gulp babel 测试使用

​	**备注：**经过babel转换后的ES6模块化语法变成了CommonJs语法，还需要用browserify转换

#### 使用gulp-browserify转换CommonJs模块化语法

1.安装插件： npm install --save-dev gulp-browserify

2.安装插件（用于重命名）： npm install --save-dev gulp-rename

3.引入：const browserify = require('gulp-browserify');

4.引入：const rename = require('gulp-rename');

5.定义任务:

```js
gulp.task('browserify', function() {
		  return gulp.src('./build/js/index.js')
		    .pipe(browserify())//将CommonJs语法转换为浏览器能识别的语法
		    .pipe(rename('built.js'))//为了防止冲突将文件重命名
		    .pipe(gulp.dest('build/js'))//输出到指定位置
		});
```

​	6.运行命令：gulp browserify 测试使用

#### 配置默认任务，让多个任务依次执行

定义默认任务：gulp.task('default', gulp.series('jshint', 'babel', 'browserify'))

#### 使用gulp-uglify压缩js

1.安装插件： npm install --save-dev gulp-uglify

2.引入插件： const uglify = require('gulp-uglify')

3.定义任务:：

```js
gulp.task('uglify', function () {
					  return gulp.src('build/js/built.js')
					    .pipe(uglify())  //压缩js
					    .pipe(rename('dist.min.js'))
					    .pipe(gulp.dest('dist/js'))
					});
```

4.运行命令：gulp uglify 测试使用

#### 使用gulp-less编译less文件、及使用less-plugin-autoprefix扩展前缀

1.安装插件： npm install gulp-less 

2.安装插件（用于扩展前缀）：npm install less-plugin-autoprefix

3.引入插件： const less = require('gulp-less');

4.引入插件：const LessAutoprefix = require('less-plugin-autoprefix')
				 const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] }); // 所有内核的浏览器往前兼容两个版本

5.定义任务：

```js
gulp.task('less', function () {
			  return gulp.src('./src/less/*.less')
			    .pipe(less({
			      plugins: [autoprefix]//自动扩展前缀
			    }))
			    .pipe(gulp.dest('./build/css'));
			});
```

6.运行命令：gulp less 测试使用

#### 使用gulp-concat合并css文件

1.安装插件： npm install --save-dev gulp-concat

2.引入：const concat = require('gulp-concat');

3.定义任务:

```js
gulp.task('concat', function() {
			  return gulp.src('./build/css/*.css')
			    .pipe(concat('built.css'))
			    .pipe(gulp.dest('./build/css'));
			});
```

4.运行命令：gulp concat 测试使用

#### 使用gulp-cssmin压缩css文件

1.安装插件：npm install --save-dev gulp-cssmin

2.引入：const cssmin = require('gulp-cssmin');

3.定义任务:

```js
gulp.task('cssmin', function () {
		  return gulp.src('build/css/built.css')
		    .pipe(cssmin())
		    .pipe(rename('dist.min.css'))
		    .pipe(gulp.dest('dist/css'));
		});
```

#### 使用gulp-htmlmin压缩html文件

1.安装插件：npm install --save gulp-htmlmin

2.引入：const htmlmin = require('gulp-htmlmin');

3.定义任务:

```js
gulp.task('htmlmin', () => {
		  return gulp.src('src/index.html')
		    .pipe(htmlmin({
		      collapseWhitespace: true ,//去除空格
		      removeComments:true //去除注释
		    }))
		    .pipe(gulp.dest('dist'));
		});
```

#### 自动化配置：

 安装如下模块：

```js
* npm install gulp-livereload --save-dev
* npm install gulp-connect --save-dev
* npm install opn --save-dev
```

  引入如下模块：

 ```js
const livereload = require('gulp-livereload');
const connect = require('gulp-connect');
const opn = require('opn');
 ```


```js
//自动执行任务，编译代码
gulp.task('watch', function() {
   	//1. 在所有可能要执行任务后面加上 .pipe(livereload());
   	//2. 配置watch任务
  		livereload.listen();
  	//通过自己服务器打开项目，自动刷新
	  	connect.server({
		    root: 'dist',
		    port: 3000,
		    livereload: true  // 自动刷新
	  	});
    //自动打开浏览器
    	opn('http://localhost:3000/index.html');
    //监视指定文件（第一个参数），一旦文件发生变化，就自动执行后面的任务（第二个参数）
      gulp.watch('src/less/*.less', gulp.series(['less','concat','cssmin']));
      gulp.watch('./src/js/*.js', gulp.series(['jshint','babel','browserify','uglify']));
      gulp.watch('./src/index.html', gulp.series('htmlmin'));
});
```

>备注：必须要在src文件夹中修改index.html中引入样式和脚本的路径，gulp不会自动处理路径。

  * 相关插件:
    * gulp-concat : 合并文件(js/css)
    * gulp-uglify : 压缩js文件
    * gulp-rename : 文件重命名
    * gulp-less : 编译less
    * gulp-cssmin : 压缩css
    * gulp-livereload : 实时自动编译刷新
  * 重要API
    * gulp.src(filePath/pathArr) : 
      * 指向指定路径的所有文件, 返回文件流对象
      * 用于读取文件
    * gulp.dest(dirPath/pathArr)
      * 指向指定的所有文件夹
      * 用于向文件夹中输出文件
    * gulp.task(name, [deps], fn) 
      * 定义一个任务
    * gulp.watch() 
      * 监视文件的变化
