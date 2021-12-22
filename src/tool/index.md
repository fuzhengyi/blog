# Windows命令行设置代理
### cmd，powershell，git-bash设置代理的方式是不一样的
1. powershell
```javascript
$env:https_proxy = "127.0.0.1:1080"
$env:http_proxy = "127.0.0.1:1080"
```
2. git-bash
```javascript
export http_proxy='127.0.0.1:1080'
export https_proxy='127.0.0.1:1080'
```
3. cmd
```javascript
set http_proxy='127.0.0.1:1080'
set https_proxy='127.0.0.1:1080'
```
# ios系统设置代理