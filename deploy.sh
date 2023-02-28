#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e


git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<xiaobing1103/eryiBlog>.github.io/<REPO>
git push -f git@github.com:xiaobing1103/eryiBlog.io.git master:gh-pages

cd -