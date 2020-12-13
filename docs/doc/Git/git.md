- git init:初始化一个仓库，就会在当前文件中生成一个 .git的文件夹，这个文件夹就是你的仓库内容
  - 不能在仓库中去新初始化一个仓库
- git add
  - git add filename:提交工作区某一个文件 到暂存区
  - git add ./*/-A：提交所有的工作区的改动 到暂存区
- git commit -m '注释信息'：
  - 把暂存区的内存 全部提交到版本区
- git status：
  - 查看工作区或暂存区是否存在未提交的内容
  - 红色：工作区有内容被修改
  - 绿色：暂存区有内容未提交到版本区
- 注释提交规范
  - chore: 项目初始化 
  - feat/Added: 增加新功能
  - fix/Fixed: 改bug
  - style: 样式修改
  - test: 部署测试环境
  - docs：文档（documentation）
- git restore ./filename：撤销工作区的改动，还原最后一次提交的状态（新增文件无法撤销，直接删除即可）
- git restore --staged ./filename  撤销暂存区的改变  但是工作区还是改变的状态

- git diff  查看工作区改动的内容(git diff不能检测出新增文件)
- git diff --cached 查看暂存区和仓库区当前版本的对比



- git log  查看仓库区所有的版本，按照时间列出所有的更新
- git log --oneline 一行查看所有的版本
- git reset --hard XXXXXXX  回退到某个版本
- git reflog ：查看所有的操作（无论是版本更新 还是版本回退）
- git reset --hard HEAD^ 回退上一个版本



- git branch name:创建一个分支，这个分支的内容和 当前分支的版本内容一致
- git branch :查看所有分支
- git checkout -b name :切换并创建分支
- git merge dev  在其他分支上合并dev分支
- git branch -d dev 删除dev分支



- 远程没有仓库
  - 创建远程仓库
  - 在本地仓库中关联远程仓库：git remote add origin 仓库地址
  - git push -u origin master  把本地仓库推到远程仓库
- 远程有仓库 本地没有
  - git clone 。。。。。克隆
  - git push -u origin master 可以继续推送自己的仓库去远程
  - git pull 去远程拉取最新的代码（在每一次push之前，先pull）
  - git fetch origin dev:dev  拉取远程仓库的dev分支
  - 
- 配置ssh：ssh-keygen -t rsa -C 734244502@qq.com 

合并完分支 需要先提交本地 然后再推到远程仓库

其他分支首先先拉取master代码 然后到自己的分支 合并master 继续开发

