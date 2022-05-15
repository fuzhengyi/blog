git clone 

git add . // add/rm
git add src/

git checkout -- file  // git checkout -- file命令中的--很重要，没有--，就变成了“切换到另一个分支”的命令
git reset HEAD <file> // 可以把暂存区的修改撤销掉（unstage），重新放回工作区

git status

git commit -m "备注"

git remote add origin git@github.com:michaelliao/learngit.git

git push
git push origin dev-zds:dev

git pull
git pull origin dev

git stash
git stash pop/apply
git stash drop

// 创建并切换分支
git checkout -b 分支名 origin/远程分支名  // git switch -c 分支名
// 切换分支
git checkout 分支名 // git switch 分支名
// 合并分支
git merge <name>
// 删除分支
git branch -d <name>
// 查看分支
git branch -a

（use "git merge --abort" to abort the merge）

git tag <tagName> // 创建本地tag
git tag -a <tagname> -m "blablabla..." // 可以指定标签信息；
git tag // 查看所有标签
git push origin <tagname> // 将本地创建的标签推送到远程
git tag -d <tagname> // git tag -d <tagname>
git push origin :refs/tags/<tagname> // 可以删除一个远程标签
git checkout -b 新分支名称 origin/tag名称 // 从tag拉去代码

git push origin <tagName> // 推送到远程仓库

git cherry-pick 提交id // 将制定提交复制到当前分支

.gitignore文件

# 日常工作流
1. 在master分支开发
```
git stash save '贮存备注'
git pull --rebase
git stash pop  // 这里可能有冲突
git add .
git commit -m "备注"
git push origin master:master-zds
远程合并 
git pull  --rebase
```
2. 在自己的分支开发
```
git stash save '贮存备注'
git pull origin master // git checkout master    |  git pull | git checkout master-zds   |   git merge master
git stash pop // 这里可能有冲突
git add .
git commit -m "备注"
git push 
远程合并 
git pull  origin master
```
3. 大家都用一个分支开发
```
git add .
git commit -m "22"
git pull // 可能冲突
git push // 报错 git pull
```
