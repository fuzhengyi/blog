
## 1.Nginx 编译安装/动态添加模块
### 写在前面的话

此文记录我学习nginx之路，现在以nginx1.20.2为例

### 编译安装

我们可以前往 Nginx 的官网下载我们的源码安装包
```javascript
//下载地址：http://nginx.org/en/download.html
```
对于生产应用，稳定放在第一位，所以我们选择下载 Stable 版本。

1. 先下载一些常用的包和模块
```
rewrite需要的PCRE库源码包
https://ftp.pcre.org/pub/pcre/

gzip 模块所需的zlib库源码包
http://www.zlib.net/

ssl功能所需要的openssl库源码包
https://www.openssl.org/source/

文件下载界面美化模块
https://github.com/aperezdc/ngx-fancyindex

上传模块
https://github.com/winshining/nginx-upload-module

cache 处理模块
https://github.com/FRiCKLE/ngx_cache_purge/

fair负载均衡调度模块
https://github.com/
```
2. 安装目录设计和用户设计  

创建目录  
mkdir -p /usr/locale/nginx20  
mkdir -p /opt/data/packages/nginx  
cd /opt/data/packages  

解压安装包  
tar -zxf nginx-1.20.2.tar.gz  
unzip nginx-upload-module-master.zip   
unzip ngx-fancyindex-master.zip   
unzip nginx-upstream-fair-master.zip  
unzip ngx_cache_purge-master.zip

cd /opt/data/packages/nginx/nginx-1.20.2  

由于 upstream_fair 模块存在 bug，需要修改一下：  
```shell
cd nginx-upstream-fair-master/
sed -i 's/default_port/no_port/g' ngx_http_upstream_fair_module.c
```
否则会报错：ngx_http_upstream_srv_conf_t’没有名为‘default_port’的成员  

```shell
编译检测

cd /opt/data/packages/nginx/nginx-1.20.2

# 编译检测
./configure --prefix=/usr/locale/nginx20 \
--user=nginx \
--group=nginx \--with-http_stub_status_module \
--with-http_gzip_static_module \
--with-http_flv_module \
--with-http_ssl_module \
--with-http_mp4_module \
--with-stream \
--with-http_realip_module \
--with-http_v2_module \
--with-http_sub_module \
--with-http_image_filter_module \
--with-pcre=/opt/data/packages/nginx/pcre-8.43 \
--with-openssl=/opt/data/packages/nginx/openssl-1.1.1c \
--with-zlib=/opt/data/packages/nginx/zlib-1.2.11 \
--add-module=/opt/data/packages/nginx/nginx-upload-module-master \
--add-module=/opt/data/packages/nginx/nginx-upstream-fair-master \
--add-module=/opt/data/packages/nginx/ngx_cache_purge-master \
--add-module=/opt/data/packages/nginx/ngx-fancyindex-master

# 编译安装
make && make install
```
我们可以简单了解一下部分常用的编译参数的含义：  
```shell
cd /opt/data/packages/nginx/nginx-1.20.2
./configure --help
```
 修改目录权限并修改配置：  
 ```shell
 # 编译安装
make && make install

# 修改配置
cd /usr/locale/nginx20/conf
mv nginx.conf nginx.conf_bak
 ```
精简基础配置如下：nginx.conf  
```python
#Nginx 默认运行worker的用户为nobody,而Master用户为root
#user  nobody;

#工作进程，也就是worker的数量，一般为CPU核数，可以写auto
worker_processes  8;

#默认错误日志路径
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#默认PID文件保存位置
#pid        logs/nginx.pid;


#一个进程打开的最大文件数，建议与ulimit -n 一致
worker_rlimit_nofile 65535;

events {
    #epoll为一种多路复用IO模式，可以提升性能
    use epoll;
    #单个进程最大连接数
    worker_connections  1024;
}


http {
    #文件扩展名与文件类型映射表和默认文件类型
    include       mime.types;
    default_type  application/octet-stream;


    #日志格式
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '"$http_referer" $status $body_bytes_sent $request_body '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    log_format  new_main  '"$http_x_forwarded_for" "$remote_user" ["$time_local"] "$request"'
                          '"$status" "$body_bytes_sent" "$http_referer"'
                          '"$http_user_agent" "$remote_addr"'
                          '"$upstream_addr" "$upstream_status" "$upstream_response_time" "$request_time"'
                          '"$http_cookie"'
                          '"$uri" "$args" "$http_host" "$request_body" "$http_menuId" "$server_addr:$server_port"';

    #高效文件传输，普通设置为on，下载服务或者高IO服务设置为off
    sendfile        on;
    #tcp_nopush     on;

    #长链接超时时间，单位是秒
    #keepalive_timeout  0;
    keepalive_timeout  300;

    #gzip压缩输出
    #gzip  on; 
    geoip_country /usr/local/share/GeoIP/GeoIP.dat;   #GeoIP所在目录
    geoip_proxy 0.0.0.0/0;
    fastcgi_param GEOIP_COUNTRY_CODE $geoip_country_code;
    fastcgi_param GEOIP_COUNTRY_CODE3 $geoip_country_code3;
    fastcgi_param GEOIP_COUNTRY_NAME $geoip_country_name;

    #虚拟主机
    server {
        #监听端口
        listen       80;

        #域名，多个空格隔开
        server_name  localhost;

        #charset koi8-r;

        #单独的日志
        #access_log  logs/host.access.log  main;

        #匹配规则
        location / {
           return 200 $http_host;
           #项目目录和索引文件
           root   html;
           index  index.html index.htm;
        }
        #404返回页面
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html

        #其他错误代码返回页面
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

    include vhosts/*.conf;
    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
}

```

检测配置，启动服务：   
```
/usr/locale/nginx20/sbin/nginx -t
/usr/locale/nginx20/sbin/nginx
```
### 动态添加模块 
某些时候可能我们会发现少编译了某个模块，我们需要后续加上去，这时候就需要动态编译添加了！  
我们这里以添加 echo 模块为例：  
```
https://github.com/openresty/echo-nginx-module
```
该模块可以在 nginx 实现 echo 内容，适合用于调试。  
1. 查看当前的编译：  
```
/usr/locale/nginx20/sbin/nginx -V
```
2. 进入我们之前的解压包路径，添加我们需要的参数重新编译：  
解压模块：  
```
cd /opt/data/packages/nginx
unzip echo-nginx-module-master.zip
```
重新检查：  
```shell
cd /opt/data/packages/nginx/nginx-1.20.2

./configure --prefix=/usr/locale/nginx20 \
--user=nginx \
--group=nginx \--with-http_stub_status_module \
--with-http_gzip_static_module \
--with-http_secure_link_module \
--with-http_flv_module \
--with-http_ssl_module \
--with-http_mp4_module \
--with-stream \
--with-http_realip_module \
--with-http_v2_module \
--with-http_sub_module \
--with-http_image_filter_module \
--with-pcre=/opt/data/packages/nginx/pcre-8.43 \
--with-openssl=/opt/data/packages/nginx/openssl-1.1.1c \
--with-zlib=/opt/data/packages/nginx/zlib-1.2.11 \
--add-module=/opt/data/packages/nginx/nginx-upload-module-master \
--add-module=/opt/data/packages/nginx/nginx-upstream-fair-master \
--add-module=/opt/data/packages/nginx/ngx_cache_purge-master \
--add-module=/opt/data/packages/nginx/ngx-fancyindex-master \
--add-module=/opt/data/packages/nginx/echo-nginx-module-master  #新加的
```
编译：  
```
make 
```
注意：  
```
只 make 不 make install，否则就完了。

只 make 不 make install，否则就完了。

只 make 不 make install，否则就完了。

重要的事情说三遍！
```
3. 备份旧版，替换新版：  
```
# 备份
mv /usr/locale/nginx20/sbin/nginx  /usr/locale/nginx20/sbin/nginx20210403

# 更新
cp /opt/data/packages/nginx/nginx-1.16.0/objs/nginx /usr/locale/nginx20/sbin/

# 查看
/usr/locale/nginx20/sbin/nginx -V
```
## 2.Nginx 基本配置和日志处理

## 3.Nginx location/root/alias
## 4.Nginx rewrite/if/return/set和变量
## 5.Nginx TCP/正向/反向代理/负载均衡
## 6.Nginx 文件下载/用户认证
## 7.Nginx 状态统计/状态码统计
## 8.Nginx 安全优化/信息隐藏/请求限制/白名单
## 9.Nginx 静态压缩/日志切割/防盗链/恶意解析/跨域
## 10.Nginx 后面有无/的区别
## Ngixn 项目中遇到的问题（实战篇）
1. 前端nginx注意事项  
  * 升级前，如果Nginx有变动，先升级Nginx配置
  * 如果后台服务是多节点则使用负载均衡
  * 如果代理服务器的地址使用了域名务必要配置resolver,resolver配置的域名是DNS服务器
```shell
#服务器与转发接口服务相关的，原则上，能走内网的就尽量走内网（内网要考虑单节点问题）
#外部域名，配置resolver指定5分钟或者10分钟查询一次DNS方式进行缓存。（先用set设置URL变量，然后再通过resolver解析后再proxy_pass，如果proxy_pass后面直接跟域名的话，只有每次nginx重启才会解析一次IP）
#resolver配置参数参考
resolver 8.8.8.8 114.114.114.114 valid=300 ipv6=off;
set $proxyUrl "https://elb.com";
proxy_pass $proxyUrl;
```

## 统一域名多站点nginx配置
假设站点A地址是http://demo.justfu.net，是统一域名地址，站点B地址是http://www.justfu.net。通过配置nginx和站点B的webpack和路由实现用站点A http://demo.justfu.net/invoice访问站点B。
```
首先设置站点A的nginx：

location /invoice{
    rewrite ^(.*)$ $1 break;
    proxy_pass "http://www.justfu.net";
}
```
如果站点B 的nginx有转发，得把站点B的nginx转发写到站点A里。例如，站点B的nginx有一个转发到/bss的配置
```
location /bss{
    proxy_pass "https://saas82.ukelink.net";
}
```
需要要把这个复制到站点A的nginx配置里  
设置站点B的vue路由：  
![rr](./image/1.png)
这样，在非开发环境访问页面时，得从http://www.justfu.net改成http://www.justfu.net/invoice  
tips: 关于base的说明，参考https://router.vuejs.org/zh/api/#base  
**设置站点B的webpack**  
如果使用vue cli3打包，在vue.config.js里添加这条publicPath配置：  
![界面](./image/2.png)  
这样，打包出来写入到index.html的路径文件会加上/invoice。比如原index.html的script引入路径是/js/app.js，现在变成了/invoice/js/app.js。

如果使用原始webpack打包，好像是要修改output.publicPath = '/invoice/' (待验证);  
tips: 关于vue cli3 publicPath的说明，参考https://cli.vuejs.org/zh/config/#publicpath。
```
给站点B的nginx添加一条配置：
location /invoice{
    rewrite ^/invoice(.*)$ /$1 last;
}
```
完成上面操作，站点B可以通过http://www.justfu.net访问， 也可以通过http://demo.justfu.net/invoice访问了。




https://www.cnblogs.com/Dy1an/category/1491372.html
                                                                                                                                                                                         