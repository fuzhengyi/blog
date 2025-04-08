## Windows命令行设置代理
#### cmd，powershell，git-bash设置代理的方式是不一样的
1. powershell
```javascript
$env:https_proxy = "127.0.0.1:1080"
$env:http_proxy = "127.0.0.1:1080"
```
2. git-bash
```javascript
export http_proxy='127.0.0.1:1080'
export https_proxy='127.0.0.1:1080'
//或
git config --global http.proxy http://127.0.0.1:1080
git config --global http.proxy https://127.0.0.1:1080
```
其中127.0.0.1：1080是代理服务器的IP和端口号 
如果将来想取消git的代理服务器地址，可以执行命令
```javascript
export http_proxy=''
export https_proxy=''
//或
git config --global --unset http.proxy http://127.0.0.1:1080 
git config --global --unset http.proxy https://127.0.0.1:1080
```
3. cmd
```javascript
set http_proxy='127.0.0.1:1080'
set https_proxy='127.0.0.1:1080'
```
## ios系统设置代理