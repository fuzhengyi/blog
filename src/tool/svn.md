# svn 操作命令

1. 将文件checkout到本地
```shell
# svn checkout path(path是服务器上的目录)
# 例如：
svn checkout http://0.0.0.0/svn/xxx
# 简写:
svn co
```
2. 添加
```shell
# svn add file(file是文件名)
# 例如：
svn add testfile
```

3. 提交文件到版本库
```shell
# svn commit  -m”备注”
# 简写：
svn ci -m ”备注”  filename
```

4. 更新到某个版本
```shell
# svn update -r m path
# 例如：
# svn update如果后面没有目录，默认将当前目录以及子目录下的所有文件都更新到最新版本。
# svn update -r 200 test.php(将版本库中的文件test.php还原到版本200)
# svn update test.php(更新，于版本库同步。如果在提交的时候提示过期的话，是因为冲突，需要先update，修改文件，然后清除svn resolved，最后再提交commit)
# 简写：svn up
```

5. 查看文件或者目录状态
```shell
# svn status path（目录下的文件和子目录的状态，正常状态不显示）
# svn status -v path(显示文件和子目录状态)
# 第一列保持相同，第二列显示工作版本号，第三和第四列显示最后一次修改的版本号和修改人。
# 注：svn status、svn diff和 svn revert这三条命令在没有网络的情况下也可以执行的，原因是svn在本地的.svn中保留了本地版本的原始拷贝。
# 简写：svn st
```

6. 删除文件
```shell
# svn delete path -m “delete test fle“
# 例如：svn delete svn://192.168.1.1/pro/domain/test.php -m “delete test file”
# 或者直接svn delete test.php 然后再svn ci -m ‘delete test file‘，推荐使用这种
# 简写：svn (del, remove, rm)
```

7. 查看日志
```shell
# svn log path
# 例如：svn log test.php 显示这个文件的所有修改记录，及其版本号的变化
```

8. 查看文件详细信息
```shell
# svn info path
# 例如：svn info test.php
```

9. 比较差异
```shell
# svn diff path(将修改的文件与基础版本比较)
# 例如：svn diff test.php
# svn diff -r m:n path(对版本m和版本n比较差异)
# 例如：svn diff -r 200:201 test.php
# 简写：svn di
```

10. 将两个版本之间的差异合并到当前文件
```shell
# svn merge -r m:n path
# 例如：svn merge -r 200:205 test.php（将版本200与205之间的差异合并到当前文件，但是一般都会产生冲突，需要处理一下）
```

11. 版本库下的文件和目录列表
```shell
# svn list path
# 显示path目录下的所有属于版本库的文件和目录
# 简写：svn ls
```

12. 恢复本地修改
```shell
# svn revert: 恢复原始未改变的工作副本文件 (恢复大部份的本地修改)。revert:
# 用法: revert PATH…
# 注意: 本子命令不会存取网络，并且会解除冲突的状况。但是它不会恢复
# 被删除的目录
```
