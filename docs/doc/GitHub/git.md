# [Git基础使用]

## [介绍]

GitHub 是一个 Git 仓库管理网站。可以创建远程中心仓库，为多人合作开发提供便利。

## [使用流程]

GitHub 远程仓库使用流程较为简单，主要有以下几种场景：

### [本地有仓库]

1. 注册并激活账号

2. 创建 GitHub 中心仓库

   

3. 获取仓库的地址

   

4. 本地配置远程仓库的地址

   ```shell
   git remote add origin https://github.com/nowLetsgo/test.git
       //远端仓库管理 添加一个远程仓库的url的别名
       //add  添加
       //origin 远端仓库的别名（git remote -v 可以查看仓库所有的别名）
       //https://github.com/nowLetsgo/test.git    仓库地址
       //git remote可以添加删除重命名等操作（使用 git remote -h查看）
   ```

5. 本地提交（确认代码已经提交到本地仓库）

6. 将本地仓库某个分内容推送到远程仓库

   ```shell
   git push -u origin master
       //
       push 推送
       -u   关联, 加上以后,后续提交时可以直接使用 git push
       origin 远端仓库的别名
       master 本地仓库的分支
   ```

### [本地没有仓库]

1. 注册并激活账号

2. 克隆仓库

   ```shell
   git clone https://github.com/nowLetsgo/test.git [name]
   //name 是对仓库名字的修改
   ```

3. 增加和修改代码

4. 拉取本地没有的分支

   ```js
   git fetch origin dev:dev
   ```

1. 本地提交

   ```shell
   git add .
   git commit -m 'message'
   ```

2. 推送到远程

   ```shell
   git push
   ```

> 克隆代码之后， 本地仓库会默认有一个远程地址的配置， 名字为 origin

# [多人合作]

## [账号仓库配置]

GitHub 团队协作开发也比较容易管理，可以创建一个组织

1. 首页 -> 右上角 `+` 号-> new Organization

![img](https://tva1.sinaimg.cn/large/007S8ZIlgy1gff1t2akhxj308e06ddfu.jpg)

1. 免费计划

![img](https://tva1.sinaimg.cn/large/007S8ZIlgy1gff1twl8k4j30s70ho74w.jpg)

1. 填写组织名称和联系方式（不用使用中文名称）

![img](https://tva1.sinaimg.cn/large/007S8ZIlgy1gff1xew0vdj30ir0ht0t8.jpg)

1. 邀请其他开发者进入组织（会有邮件邀请，==如收不到，请查看垃圾箱==）

![img](https://tva1.sinaimg.cn/large/007S8ZIlgy1gff1zlh3iyj30nw0kuaak.jpg)

1. 被邀请者加入方式1：

![img](https://tva1.sinaimg.cn/large/007S8ZIlgy1gff21pu6thj30nx0iywfv.jpg)

1. 被邀请者加入方式2：

![img](https://tva1.sinaimg.cn/large/007S8ZIlgy1gff2bkmkbkj316m06mglp.jpg)

1. 配置组织权限，组织首页右侧 settings -> Member privileges -> 选择 write （设置成员可写）

![image-20200603140344998](/Users/lipeihua/Library/Application Support/typora-user-images/image-20200603140344998.png)

1. 组织创建完毕后，在组织中创建仓库

![img](https://tva1.sinaimg.cn/large/007S8ZIlgy1gff2h3uo9oj319p0e9aac.jpg)

![img](https://tva1.sinaimg.cn/large/007S8ZIlgy1gff2f712kpj30pq07vjri.jpg)

1. 练习

   ```md
   组长创建一个组织仓库
   组员需要在仓库名中创建一个以自己名字命名的html文件
   创建完成后提交到远程仓库
   
   注意：
   组织权限要配置好，否则提交会出现403
   关于克隆，一定要在一个非git仓库文件夹进行
   ```

2. git复习

   ![img](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfh8hkq8vrj314n0u0di8.jpg)



# [协作流程]

## [入职第一天]

- 得到 Git 远程仓库的地址和账号密码

- 将代码克隆到本地（地址换成自己的）

  ```shell
  git clone https://github.com/xiaohigh/test.git
  ```

- 切换分支

  ```
  git checkout -b xiaohigh
  ```

- 开发代码

- 本地提交

  ```shell
  git add -A
  git commit -m '注释内容'
  ```

- 合并分支

  ```shell
  git checkout master
  git merge xiaohigh
  ```

- 更新本地代码

  ```shell
  git pull
  //或者使用下面两行代码
  git fetch 
  git merge origin/master
  ```

- 提交代码

  ```shell
  git push 
  ```

## [第二天工作流程]

1. 更新代码 (git pull)
2. 切换分支
3. 开发功能
4. 提交
5. 合并分支
6. 更新代码
7. 提交代码

#### [冲突解决]

同分支冲突一样的处理，将代码调整成最终的样式，提交代码即可。



# [免密登录]

1. 创建非对称加密对

   ```sh
   ssh-keygen //在任意位置输入命令即可
   ```

2. 文件默认存储在家目录（c:/用户/用户名/.ssh）的 .ssh 文件夹中。

   - id_rsa 私钥
   - id_rsa.pub 公钥

3. 将公钥（.pub）文件内容配置到账号的秘钥中

   - 首页 -> 右上角头像-> settings -> SSH and GPG keys -> new SSH Key

4. 克隆代码时，选择 ssh 模式进行克隆 （地址 在仓库首页 绿色 克隆的位置 选择 use ssh）

   ```shell
   git clone git@github.com/xiaohigh/team-repo-1.git 
   ```

5. 克隆代码时的提醒，这里需要输入 yes

# [GitFlow]

GitFlow 是团队开发的一种最佳实践，将代码划分为以下几个分支

![img](https://tva1.sinaimg.cn/large/007S8ZIlgy1gffiy2a356j30dy09yt90.jpg)

- Master 主分支。上面只保存正式发布的版本
- Hotfix 线上代码 Bug 修复分支。开发完后需要合并回Master和Develop分支，同时在Master上打一个tag
- Feather 功能分支。当开发某个功能时，创建一个单独的分支，开发完毕后再合并到 dev 分支
- Release 分支。待发布分支，Release分支基于Develop分支创建，在这个Release分支上测试，修改Bug
- Develop 开发分支。开发者都在这个分支上提交代码