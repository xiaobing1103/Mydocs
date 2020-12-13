# [git准备]

Git是一款开源免费的分布式的版本控制系统。是Linux之父为了方便管理Linux内核代码而开发的。

## [一、作用]

版本控制系统在项目开发中作用重大，能记录文件的历史状态，主要功能有以下几点：

- 代码备份
- 版本回退
- 协作开发
- 权限控制

## [二、下载安装]

下载地址 https://git-scm.com/

安装方式和QQ安装相同，一路下一步，中间可以设置软件的安装路径。

因权限问题，安装目录尽量保持默认设置在C盘。

> CMD：cmd是command的缩写.即命令提示符（CMD），Win为基础的操作系统下的“MS-DOS 方式”。
>
> git base：bash是linux风格的命令行，路径也是linux式的，可以使用windows和linux的命令； cmd是windows风格的命令行，可以使用windows命令；
>
> CMD是天生就带了系统的PATH环境变量，这一点会导致如果你运行某些脚本的时候，如果依赖某些安装的程序，如python、node这些，git-bash就会提示不存在对应的命令，而cmd可以正确运行

## [三、Linux常用命令]

Linux是一套开源免费的操作系统，与系统的交互通常用命令来实现，常用的命令有：

- `ls` 查看当前文件夹下的文件（list单词的缩写）， `ls -al ` or `ls -a -l`查看隐藏文件并竖向排列

- `cd` 进入某一个文件夹（change directory）的缩写，`cd ..`回到上一级。`tab`键代码自动补全

- `clear` 清屏

- `mkdir` 创建文件夹

- `touch test.html` 创建一个文件夹

- `rm test.html` 删除一个文件

- `rm -r dir` 删除文件夹

- `mv 原文件或文件夹 目标文件或文件夹` 移动文件

- `cat test.html` 查看文件内容

- `ctrl+c` 取消命令

- 上下方向键，可以查看命令历史

  ```md
  练习：创建一下目录结构
  *project
      - css
          - app.js
          - home.js
      - js
          - app.js
      - images
          - logo.png
      - index.html
  ```

Vim是一款命令行下的文本编辑器，编辑方式跟图形化编辑器不同

- `vim test.html`编辑文件（文件不存在则创建）
- i可以进入编辑模式
- `ESC` + `:wq` 保存并推出
- `ESC`+`:q!` 不保存并推出

![img](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfdqt2es84j30iy0b2abb.jpg)

# [git 初始配置]

第一次使用Git的时候，会要求我们配置用户名和邮箱，用于表示开发者的信息。

## [一、用户名和邮箱地址的作用]

用户名和邮箱地址是本地git客户端的一个变量，不随git库而改变。

每次commit都会用用户名和邮箱纪录。

github的contributions统计就是按邮箱来统计的。

## [二、用户名和邮箱地址设置]

```git
//配置用户名
git config --global user.name "username"
//配置密码
git config --global user.email "email"
```

## [三、查看用户名和邮箱]

```git
查看用户名和邮箱地址：
git config user.name
git config user.email
git config -l //查看git所有配置
```

# [基本操作]

## [一、基本操作命令]

1. 创建进入空文件夹
2. 右键 -> 点击 Git Bash Here 启动命令行（MAC 在当前文件夹打开终端）
3. `git init` 仓库初始化
4. 创建一个初始化文件 index.html
5. `git add index.html` 将文件加入到暂存区
6. `git commit -m '注释'` 提交到仓库 m 是 message 单词的缩写

![img](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfds2r9qogj310e0ddmx6.jpg)

## [二、.git 目录]

![img](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfdswnmnspj30w20icjrr.jpg)

- hooks 目录包含客户端或服务端的钩子脚本，在特定操作下自动执行。
- info 包含一个全局性排除文件，可以配置文件忽略
- logs 保存日志信息
- objects 目录存储所有数据内容,本地的版本库存放位置
- refs 目录存储指向数据的提交对象的指针（分支）
- config 文件包含项目特有的配置选项
- description 用来显示对仓库的描述信息
- HEAD 文件指示目前被检出的分支
- index 暂存区数据
- *切记： 不要手动去修改 .git 文件夹中的内容**

## [三、版本库的三个区域]

- 工作区（代码编辑区）:代表本地开发代码的地方

- 暂存区（修改待提交区） ：代表本地仓库暂时保管代码的地址

- 仓库区（代码保存区）：代表代码进入本地版本控制

  ![img](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfdwjw3fg5j30ih0cu0ta.jpg)

  ![img](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfdwfqtc7yj30kr0ab74m.jpg)



# [常用命令]

## [一、常用命令]

- `git status` 版本状态查看

  红色：说明文件位于工作区

  绿色：说明文件位于暂存区

  没有体现，说明位于版本区

- `git add -A` 添加所有新文件到暂存区（或者`git add .` `git add *`）

  - 使用`git restore`可以丢弃工作区的改动

- `git commit -m '注释 '` 提交修改并注释

  - 使用`git restore --staged <文件>`可以取消暂存

- `git diff` 查看工作区与暂存区的差异（不显示删除或新增文件） 显示做了哪些修改

  ```js
  //解读结果
  lipeihuadeMacBook-Pro% git diff
      //进行比较的是，index.html（即变动前）index.html（即变动后）。 
      diff --git a/index.html b/index.html
      //表示两个版本的git哈希值
      index 16158b4..61045cd 100644
      //"---"表示变动前的版本
      --- a/index.html
      //"+++"表示变动后的版本
      +++ b/index.html
      //代表的意思是源文件的1-2行与目标文件的1-5行有差异,下面才是具体的差异信息;
      @@ -1,2 +1,5 @@
      //-红色部分表示减少的部分,+绿色部分表示增加的部分
       index.html 
      -no 1
      +
      +
      +
      +再次修改
      //\ No newline at end of file 最后一行没有换行
      \ No newline at end of file
  ```

- `git diff --cached` 查看暂存区与仓库的差异

## [二、历史版本回滚]

### [2.1查看历史版本]

- git log

  > 默认不用任何参数的话，git log 会按提交时间列出所有的更新，最近的更新排在最上面。每次更新都有一个 SHA-1 校验和、作者的名字 和 电子邮件地址、提交时间，最后缩进一个段落显示提交说明。

- git log --oneline

  > 如果内容偏多， 需要使用方向键上下滚动， 按 `q` 退出
  >
  > `git log` 命令有一个选项，可以用来更改仓库信息的显示方式。该选项为 `--oneline`.
  >
  > - 每行显示一个 commit
  > - 显示 commit 的 SHA 的前 7 个字符
  > - 显示 commit 的消息

### [2.2根据版本号进行回滚]

版本回退，只是本地的。不会影响git库中的内容。

- `git reset --hard  b815fd5a6ae655b521a31a9`

  > 进行版本回退时，不需要使用完整的哈希字符串，前七位即可
  >
  > **版本切换之前，要提交当前的代码状态到仓库**

- `git reflog`

  > 如果在回退以后又想再次回到之前的版本，git reflog 可以查看所有分支的所有操作记录（包括commit和reset的操作），包括已经被删除的commit记录，git log则不能察看已经删除了的commit记录

#### [2.3其他回滚（了解）]

```sh
git reset --hard HEAD^    回滚到上个版本
git reset --hard HEAD^^   回滚到上上个版本
git reset --hard HEAD~100   回滚到100个版本之前
```



# [配置忽略文件]

## [一、仓库中没有提交该文件]

项目中有些文件是不需要进入版本库中，比如编辑器的配置。Git 中需要创建一个文件 ==.gitignore==，一般与 .gitignore 同级目录。

```gitignore
# 忽略所有的 .idea 文件夹
.idea
# 忽略所有以 .test 结尾的文件
*.test
# 忽略 node_modules 文件和文件夹
/node_modules
```

## [二、仓库中已经提交该文件]

1. 对于已经加入到版本库的文件，可以在版本库中删除该文件

   ```sh
   git rm --cached .idea
   git rm --cached ./css/go.css
   ```

2. 然后在 .gitignore 中配置忽略

   ```sh
   .idea
   /css/go.css
   ```

3. add 和 commit 提交即可

# [分支]

分支是 Git 重要的功能特性之一，开发人员可以在主开发线的基础上分离出新的开发线。

## [创建分支]

name 为分支的名称

```sh
git branch name   
```

## [查看分支]

```sh
git branch
```

## [切换分支]

```sh
git checkout name
```

## [合并分支]

```sh
git merge name
```

## [删除分支]

```sh
git branch -d name
```

## [切换并创建分支]

```sh
git checkout -b name
```

> 注意: 每次在切换分支前 提交一下当前分支

## [冲突]

当多个分支修改同一个文件后，合并分支的时候就会产生冲突。冲突的解决非常简单，将内容修改为最终想要的结果，然后继续执行 git add 与 git commit 就可以了。