import{e as n}from"./app.bc17808d.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";var a="/blog/assets/1.5512d2b5.png",e="/blog/assets/2.e0668e31.png";const p={},t=n(`<h2 id="_1-nginx-\u7F16\u8BD1\u5B89\u88C5-\u52A8\u6001\u6DFB\u52A0\u6A21\u5757" tabindex="-1"><a class="header-anchor" href="#_1-nginx-\u7F16\u8BD1\u5B89\u88C5-\u52A8\u6001\u6DFB\u52A0\u6A21\u5757" aria-hidden="true">#</a> 1.Nginx \u7F16\u8BD1\u5B89\u88C5/\u52A8\u6001\u6DFB\u52A0\u6A21\u5757</h2><h3 id="\u5199\u5728\u524D\u9762\u7684\u8BDD" tabindex="-1"><a class="header-anchor" href="#\u5199\u5728\u524D\u9762\u7684\u8BDD" aria-hidden="true">#</a> \u5199\u5728\u524D\u9762\u7684\u8BDD</h3><p>\u6B64\u6587\u8BB0\u5F55\u6211\u5B66\u4E60nginx\u4E4B\u8DEF\uFF0C\u73B0\u5728\u4EE5nginx1.20.2\u4E3A\u4F8B</p><h3 id="\u7F16\u8BD1\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u7F16\u8BD1\u5B89\u88C5" aria-hidden="true">#</a> \u7F16\u8BD1\u5B89\u88C5</h3><p>\u6211\u4EEC\u53EF\u4EE5\u524D\u5F80 Nginx \u7684\u5B98\u7F51\u4E0B\u8F7D\u6211\u4EEC\u7684\u6E90\u7801\u5B89\u88C5\u5305</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">//:\u4E0B\u8F7D\u5730\u5740\uFF1Ahttp//nginx.org/en/download.html</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u5BF9\u4E8E\u751F\u4EA7\u5E94\u7528\uFF0C\u7A33\u5B9A\u653E\u5728\u7B2C\u4E00\u4F4D\uFF0C\u6240\u4EE5\u6211\u4EEC\u9009\u62E9\u4E0B\u8F7D Stable \u7248\u672C\u3002</p><ol><li>\u5148\u4E0B\u8F7D\u4E00\u4E9B\u5E38\u7528\u7684\u5305\u548C\u6A21\u5757</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>rewrite\u9700\u8981\u7684PCRE\u5E93\u6E90\u7801\u5305
https://ftp.pcre.org/pub/pcre/

gzip \u6A21\u5757\u6240\u9700\u7684zlib\u5E93\u6E90\u7801\u5305
http://www.zlib.net/

ssl\u529F\u80FD\u6240\u9700\u8981\u7684openssl\u5E93\u6E90\u7801\u5305
https://www.openssl.org/source/

\u6587\u4EF6\u4E0B\u8F7D\u754C\u9762\u7F8E\u5316\u6A21\u5757
https://github.com/aperezdc/ngx-fancyindex

\u4E0A\u4F20\u6A21\u5757
https://github.com/winshining/nginx-upload-module

cache \u5904\u7406\u6A21\u5757
https://github.com/FRiCKLE/ngx_cache_purge/

fair\u8D1F\u8F7D\u5747\u8861\u8C03\u5EA6\u6A21\u5757
https://github.com/
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><ol start="2"><li>\u5B89\u88C5\u76EE\u5F55\u8BBE\u8BA1\u548C\u7528\u6237\u8BBE\u8BA1</li></ol><p>\u521B\u5EFA\u76EE\u5F55<br> mkdir -p /usr/locale/nginx20<br> mkdir -p /opt/data/packages/nginx<br> cd /opt/data/packages</p><p>\u89E3\u538B\u5B89\u88C5\u5305<br> tar -zxf nginx-1.20.2.tar.gz<br> unzip nginx-upload-module-master.zip<br> unzip ngx-fancyindex-master.zip<br> unzip nginx-upstream-fair-master.zip<br> unzip ngx_cache_purge-master.zip</p><p>cd /opt/data/packages/nginx/nginx-1.20.2</p><p>\u7531\u4E8E upstream_fair \u6A21\u5757\u5B58\u5728 bug\uFF0C\u9700\u8981\u4FEE\u6539\u4E00\u4E0B\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> nginx-upstream-fair-master/
<span class="token function">sed</span> -i <span class="token string">&#39;s/default_port/no_port/g&#39;</span> ngx_http_upstream_fair_module.c
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u5426\u5219\u4F1A\u62A5\u9519\uFF1Angx_http_upstream_srv_conf_t\u2019\u6CA1\u6709\u540D\u4E3A\u2018default_port\u2019\u7684\u6210\u5458</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>\u7F16\u8BD1\u68C0\u6D4B

<span class="token builtin class-name">cd</span> /opt/data/packages/nginx/nginx-1.20.2

<span class="token comment"># \u7F16\u8BD1\u68C0\u6D4B</span>
./configure --prefix<span class="token operator">=</span>/usr/locale/nginx20 <span class="token punctuation">\\</span>
--user<span class="token operator">=</span>nginx <span class="token punctuation">\\</span>
--group<span class="token operator">=</span>nginx <span class="token punctuation">\\</span>--with-http_stub_status_module <span class="token punctuation">\\</span>
--with-http_gzip_static_module <span class="token punctuation">\\</span>
--with-http_flv_module <span class="token punctuation">\\</span>
--with-http_ssl_module <span class="token punctuation">\\</span>
--with-http_mp4_module <span class="token punctuation">\\</span>
--with-stream <span class="token punctuation">\\</span>
--with-http_realip_module <span class="token punctuation">\\</span>
--with-http_v2_module <span class="token punctuation">\\</span>
--with-http_sub_module <span class="token punctuation">\\</span>
--with-http_image_filter_module <span class="token punctuation">\\</span>
--with-pcre<span class="token operator">=</span>/opt/data/packages/nginx/pcre-8.43 <span class="token punctuation">\\</span>
--with-openssl<span class="token operator">=</span>/opt/data/packages/nginx/openssl-1.1.1c <span class="token punctuation">\\</span>
--with-zlib<span class="token operator">=</span>/opt/data/packages/nginx/zlib-1.2.11 <span class="token punctuation">\\</span>
--add-module<span class="token operator">=</span>/opt/data/packages/nginx/nginx-upload-module-master <span class="token punctuation">\\</span>
--add-module<span class="token operator">=</span>/opt/data/packages/nginx/nginx-upstream-fair-master <span class="token punctuation">\\</span>
--add-module<span class="token operator">=</span>/opt/data/packages/nginx/ngx_cache_purge-master <span class="token punctuation">\\</span>
--add-module<span class="token operator">=</span>/opt/data/packages/nginx/ngx-fancyindex-master

<span class="token comment"># \u7F16\u8BD1\u5B89\u88C5</span>
<span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>\u6211\u4EEC\u53EF\u4EE5\u7B80\u5355\u4E86\u89E3\u4E00\u4E0B\u90E8\u5206\u5E38\u7528\u7684\u7F16\u8BD1\u53C2\u6570\u7684\u542B\u4E49\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /opt/data/packages/nginx/nginx-1.20.2
./configure --help
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u4FEE\u6539\u76EE\u5F55\u6743\u9650\u5E76\u4FEE\u6539\u914D\u7F6E\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u7F16\u8BD1\u5B89\u88C5</span>
<span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token function">install</span>

<span class="token comment"># \u4FEE\u6539\u914D\u7F6E</span>
<span class="token builtin class-name">cd</span> /usr/locale/nginx20/conf
<span class="token function">mv</span> nginx.conf nginx.conf_bak
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>\u7CBE\u7B80\u57FA\u7840\u914D\u7F6E\u5982\u4E0B\uFF1Anginx.conf</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token comment">#Nginx \u9ED8\u8BA4\u8FD0\u884Cworker\u7684\u7528\u6237\u4E3Anobody,\u800CMaster\u7528\u6237\u4E3Aroot</span>
<span class="token comment">#user  nobody;</span>

<span class="token comment">#\u5DE5\u4F5C\u8FDB\u7A0B\uFF0C\u4E5F\u5C31\u662Fworker\u7684\u6570\u91CF\uFF0C\u4E00\u822C\u4E3ACPU\u6838\u6570\uFF0C\u53EF\u4EE5\u5199auto</span>
worker_processes  <span class="token number">8</span><span class="token punctuation">;</span>

<span class="token comment">#\u9ED8\u8BA4\u9519\u8BEF\u65E5\u5FD7\u8DEF\u5F84</span>
<span class="token comment">#error_log  logs/error.log;</span>
<span class="token comment">#error_log  logs/error.log  notice;</span>
<span class="token comment">#error_log  logs/error.log  info;</span>

<span class="token comment">#\u9ED8\u8BA4PID\u6587\u4EF6\u4FDD\u5B58\u4F4D\u7F6E</span>
<span class="token comment">#pid        logs/nginx.pid;</span>


<span class="token comment">#\u4E00\u4E2A\u8FDB\u7A0B\u6253\u5F00\u7684\u6700\u5927\u6587\u4EF6\u6570\uFF0C\u5EFA\u8BAE\u4E0Eulimit -n \u4E00\u81F4</span>
worker_rlimit_nofile <span class="token number">65535</span><span class="token punctuation">;</span>

events <span class="token punctuation">{</span>
    <span class="token comment">#epoll\u4E3A\u4E00\u79CD\u591A\u8DEF\u590D\u7528IO\u6A21\u5F0F\uFF0C\u53EF\u4EE5\u63D0\u5347\u6027\u80FD</span>
    use epoll<span class="token punctuation">;</span>
    <span class="token comment">#\u5355\u4E2A\u8FDB\u7A0B\u6700\u5927\u8FDE\u63A5\u6570</span>
    worker_connections  <span class="token number">1024</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


http <span class="token punctuation">{</span>
    <span class="token comment">#\u6587\u4EF6\u6269\u5C55\u540D\u4E0E\u6587\u4EF6\u7C7B\u578B\u6620\u5C04\u8868\u548C\u9ED8\u8BA4\u6587\u4EF6\u7C7B\u578B</span>
    include       mime<span class="token punctuation">.</span>types<span class="token punctuation">;</span>
    default_type  application<span class="token operator">/</span>octet<span class="token operator">-</span>stream<span class="token punctuation">;</span>


    <span class="token comment">#\u65E5\u5FD7\u683C\u5F0F</span>
    log_format main <span class="token string">&#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span>
                    <span class="token string">&#39;&quot;$http_referer&quot; $status $body_bytes_sent $request_body &#39;</span>
                    <span class="token string">&#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;</span><span class="token punctuation">;</span>

    log_format  new_main  <span class="token string">&#39;&quot;$http_x_forwarded_for&quot; &quot;$remote_user&quot; [&quot;$time_local&quot;] &quot;$request&quot;&#39;</span>
                          <span class="token string">&#39;&quot;$status&quot; &quot;$body_bytes_sent&quot; &quot;$http_referer&quot;&#39;</span>
                          <span class="token string">&#39;&quot;$http_user_agent&quot; &quot;$remote_addr&quot;&#39;</span>
                          <span class="token string">&#39;&quot;$upstream_addr&quot; &quot;$upstream_status&quot; &quot;$upstream_response_time&quot; &quot;$request_time&quot;&#39;</span>
                          <span class="token string">&#39;&quot;$http_cookie&quot;&#39;</span>
                          <span class="token string">&#39;&quot;$uri&quot; &quot;$args&quot; &quot;$http_host&quot; &quot;$request_body&quot; &quot;$http_menuId&quot; &quot;$server_addr:$server_port&quot;&#39;</span><span class="token punctuation">;</span>

    <span class="token comment">#\u9AD8\u6548\u6587\u4EF6\u4F20\u8F93\uFF0C\u666E\u901A\u8BBE\u7F6E\u4E3Aon\uFF0C\u4E0B\u8F7D\u670D\u52A1\u6216\u8005\u9AD8IO\u670D\u52A1\u8BBE\u7F6E\u4E3Aoff</span>
    sendfile        on<span class="token punctuation">;</span>
    <span class="token comment">#tcp_nopush     on;</span>

    <span class="token comment">#\u957F\u94FE\u63A5\u8D85\u65F6\u65F6\u95F4\uFF0C\u5355\u4F4D\u662F\u79D2</span>
    <span class="token comment">#keepalive_timeout  0;</span>
    keepalive_timeout  <span class="token number">300</span><span class="token punctuation">;</span>

    <span class="token comment">#gzip\u538B\u7F29\u8F93\u51FA</span>
    <span class="token comment">#gzip  on; </span>
    geoip_country <span class="token operator">/</span>usr<span class="token operator">/</span>local<span class="token operator">/</span>share<span class="token operator">/</span>GeoIP<span class="token operator">/</span>GeoIP<span class="token punctuation">.</span>dat<span class="token punctuation">;</span>   <span class="token comment">#GeoIP\u6240\u5728\u76EE\u5F55</span>
    geoip_proxy <span class="token number">0.0</span><span class="token number">.0</span><span class="token number">.0</span><span class="token operator">/</span><span class="token number">0</span><span class="token punctuation">;</span>
    fastcgi_param GEOIP_COUNTRY_CODE $geoip_country_code<span class="token punctuation">;</span>
    fastcgi_param GEOIP_COUNTRY_CODE3 $geoip_country_code3<span class="token punctuation">;</span>
    fastcgi_param GEOIP_COUNTRY_NAME $geoip_country_name<span class="token punctuation">;</span>

    <span class="token comment">#\u865A\u62DF\u4E3B\u673A</span>
    server <span class="token punctuation">{</span>
        <span class="token comment">#\u76D1\u542C\u7AEF\u53E3</span>
        listen       <span class="token number">80</span><span class="token punctuation">;</span>

        <span class="token comment">#\u57DF\u540D\uFF0C\u591A\u4E2A\u7A7A\u683C\u9694\u5F00</span>
        server_name  localhost<span class="token punctuation">;</span>

        <span class="token comment">#charset koi8-r;</span>

        <span class="token comment">#\u5355\u72EC\u7684\u65E5\u5FD7</span>
        <span class="token comment">#access_log  logs/host.access.log  main;</span>

        <span class="token comment">#\u5339\u914D\u89C4\u5219</span>
        location <span class="token operator">/</span> <span class="token punctuation">{</span>
           <span class="token keyword">return</span> <span class="token number">200</span> $http_host<span class="token punctuation">;</span>
           <span class="token comment">#\u9879\u76EE\u76EE\u5F55\u548C\u7D22\u5F15\u6587\u4EF6</span>
           root   html<span class="token punctuation">;</span>
           index  index<span class="token punctuation">.</span>html index<span class="token punctuation">.</span>htm<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">#404\u8FD4\u56DE\u9875\u9762</span>
        <span class="token comment">#error_page  404              /404.html;</span>

        <span class="token comment"># redirect server error pages to the static page /50x.html</span>

        <span class="token comment">#\u5176\u4ED6\u9519\u8BEF\u4EE3\u7801\u8FD4\u56DE\u9875\u9762</span>
        error_page   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  <span class="token operator">/</span>50x<span class="token punctuation">.</span>html<span class="token punctuation">;</span>
        location <span class="token operator">=</span> <span class="token operator">/</span>50x<span class="token punctuation">.</span>html <span class="token punctuation">{</span>
            root   html<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment"># proxy the PHP scripts to Apache listening on 127.0.0.1:80</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ \\.php$ {</span>
        <span class="token comment">#    proxy_pass   http://127.0.0.1;</span>
        <span class="token comment">#}</span>

        <span class="token comment"># pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ \\.php$ {</span>
        <span class="token comment">#    root           html;</span>
        <span class="token comment">#    fastcgi_pass   127.0.0.1:9000;</span>
        <span class="token comment">#    fastcgi_index  index.php;</span>
        <span class="token comment">#    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;</span>
        <span class="token comment">#    include        fastcgi_params;</span>
        <span class="token comment">#}</span>

        <span class="token comment"># deny access to .htaccess files, if Apache&#39;s document root</span>
        <span class="token comment"># concurs with nginx&#39;s one</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ /\\.ht {</span>
        <span class="token comment">#    deny  all;</span>
        <span class="token comment">#}</span>
    <span class="token punctuation">}</span>


    <span class="token comment"># another virtual host using mix of IP-, name-, and port-based configuration</span>
    <span class="token comment">#</span>
    <span class="token comment">#server {</span>
    <span class="token comment">#    listen       8000;</span>
    <span class="token comment">#    listen       somename:8080;</span>
    <span class="token comment">#    server_name  somename  alias  another.alias;</span>

    <span class="token comment">#    location / {</span>
    <span class="token comment">#        root   html;</span>
    <span class="token comment">#        index  index.html index.htm;</span>
    <span class="token comment">#    }</span>
    <span class="token comment">#}</span>

    include vhosts<span class="token operator">/</span><span class="token operator">*</span><span class="token punctuation">.</span>conf<span class="token punctuation">;</span>
    <span class="token comment"># HTTPS server</span>
    <span class="token comment">#</span>
    <span class="token comment">#server {</span>
    <span class="token comment">#    listen       443 ssl;</span>
    <span class="token comment">#    server_name  localhost;</span>

    <span class="token comment">#    ssl_certificate      cert.pem;</span>
    <span class="token comment">#    ssl_certificate_key  cert.key;</span>

    <span class="token comment">#    ssl_session_cache    shared:SSL:1m;</span>
    <span class="token comment">#    ssl_session_timeout  5m;</span>

    <span class="token comment">#    ssl_ciphers  HIGH:!aNULL:!MD5;</span>
    <span class="token comment">#    ssl_prefer_server_ciphers  on;</span>

    <span class="token comment">#    location / {</span>
    <span class="token comment">#        root   html;</span>
    <span class="token comment">#        index  index.html index.htm;</span>
    <span class="token comment">#    }</span>
    <span class="token comment">#}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br></div></div><p>\u68C0\u6D4B\u914D\u7F6E\uFF0C\u542F\u52A8\u670D\u52A1\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/usr/locale/nginx20/sbin/nginx -t
/usr/locale/nginx20/sbin/nginx
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="\u52A8\u6001\u6DFB\u52A0\u6A21\u5757" tabindex="-1"><a class="header-anchor" href="#\u52A8\u6001\u6DFB\u52A0\u6A21\u5757" aria-hidden="true">#</a> \u52A8\u6001\u6DFB\u52A0\u6A21\u5757</h3><p>\u67D0\u4E9B\u65F6\u5019\u53EF\u80FD\u6211\u4EEC\u4F1A\u53D1\u73B0\u5C11\u7F16\u8BD1\u4E86\u67D0\u4E2A\u6A21\u5757\uFF0C\u6211\u4EEC\u9700\u8981\u540E\u7EED\u52A0\u4E0A\u53BB\uFF0C\u8FD9\u65F6\u5019\u5C31\u9700\u8981\u52A8\u6001\u7F16\u8BD1\u6DFB\u52A0\u4E86\uFF01<br> \u6211\u4EEC\u8FD9\u91CC\u4EE5\u6DFB\u52A0 echo \u6A21\u5757\u4E3A\u4F8B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>https://github.com/openresty/echo-nginx-module
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u8BE5\u6A21\u5757\u53EF\u4EE5\u5728 nginx \u5B9E\u73B0 echo \u5185\u5BB9\uFF0C\u9002\u5408\u7528\u4E8E\u8C03\u8BD5\u3002</p><ol><li>\u67E5\u770B\u5F53\u524D\u7684\u7F16\u8BD1\uFF1A</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/usr/locale/nginx20/sbin/nginx -V
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol start="2"><li>\u8FDB\u5165\u6211\u4EEC\u4E4B\u524D\u7684\u89E3\u538B\u5305\u8DEF\u5F84\uFF0C\u6DFB\u52A0\u6211\u4EEC\u9700\u8981\u7684\u53C2\u6570\u91CD\u65B0\u7F16\u8BD1\uFF1A<br> \u89E3\u538B\u6A21\u5757\uFF1A</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>cd /opt/data/packages/nginx
unzip echo-nginx-module-master.zip
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u91CD\u65B0\u68C0\u67E5\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /opt/data/packages/nginx/nginx-1.20.2

./configure --prefix<span class="token operator">=</span>/usr/locale/nginx20 <span class="token punctuation">\\</span>
--user<span class="token operator">=</span>nginx <span class="token punctuation">\\</span>
--group<span class="token operator">=</span>nginx <span class="token punctuation">\\</span>--with-http_stub_status_module <span class="token punctuation">\\</span>
--with-http_gzip_static_module <span class="token punctuation">\\</span>
--with-http_secure_link_module <span class="token punctuation">\\</span>
--with-http_flv_module <span class="token punctuation">\\</span>
--with-http_ssl_module <span class="token punctuation">\\</span>
--with-http_mp4_module <span class="token punctuation">\\</span>
--with-stream <span class="token punctuation">\\</span>
--with-http_realip_module <span class="token punctuation">\\</span>
--with-http_v2_module <span class="token punctuation">\\</span>
--with-http_sub_module <span class="token punctuation">\\</span>
--with-http_image_filter_module <span class="token punctuation">\\</span>
--with-pcre<span class="token operator">=</span>/opt/data/packages/nginx/pcre-8.43 <span class="token punctuation">\\</span>
--with-openssl<span class="token operator">=</span>/opt/data/packages/nginx/openssl-1.1.1c <span class="token punctuation">\\</span>
--with-zlib<span class="token operator">=</span>/opt/data/packages/nginx/zlib-1.2.11 <span class="token punctuation">\\</span>
--add-module<span class="token operator">=</span>/opt/data/packages/nginx/nginx-upload-module-master <span class="token punctuation">\\</span>
--add-module<span class="token operator">=</span>/opt/data/packages/nginx/nginx-upstream-fair-master <span class="token punctuation">\\</span>
--add-module<span class="token operator">=</span>/opt/data/packages/nginx/ngx_cache_purge-master <span class="token punctuation">\\</span>
--add-module<span class="token operator">=</span>/opt/data/packages/nginx/ngx-fancyindex-master <span class="token punctuation">\\</span>
--add-module<span class="token operator">=</span>/opt/data/packages/nginx/echo-nginx-module-master  <span class="token comment">#\u65B0\u52A0\u7684</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>\u7F16\u8BD1\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>make 
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u6CE8\u610F\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u53EA make \u4E0D make install\uFF0C\u5426\u5219\u5C31\u5B8C\u4E86\u3002

\u53EA make \u4E0D make install\uFF0C\u5426\u5219\u5C31\u5B8C\u4E86\u3002

\u53EA make \u4E0D make install\uFF0C\u5426\u5219\u5C31\u5B8C\u4E86\u3002

\u91CD\u8981\u7684\u4E8B\u60C5\u8BF4\u4E09\u904D\uFF01
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><ol start="3"><li>\u5907\u4EFD\u65E7\u7248\uFF0C\u66FF\u6362\u65B0\u7248\uFF1A</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># \u5907\u4EFD
mv /usr/locale/nginx20/sbin/nginx  /usr/locale/nginx20/sbin/nginx20210403

# \u66F4\u65B0
cp /opt/data/packages/nginx/nginx-1.16.0/objs/nginx /usr/locale/nginx20/sbin/

# \u67E5\u770B
/usr/locale/nginx20/sbin/nginx -V
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="_2-nginx-\u57FA\u672C\u914D\u7F6E\u548C\u65E5\u5FD7\u5904\u7406" tabindex="-1"><a class="header-anchor" href="#_2-nginx-\u57FA\u672C\u914D\u7F6E\u548C\u65E5\u5FD7\u5904\u7406" aria-hidden="true">#</a> 2.Nginx \u57FA\u672C\u914D\u7F6E\u548C\u65E5\u5FD7\u5904\u7406</h2><h2 id="_3-nginx-location-root-alias" tabindex="-1"><a class="header-anchor" href="#_3-nginx-location-root-alias" aria-hidden="true">#</a> 3.Nginx location/root/alias</h2><h2 id="_4-nginx-rewrite-if-return-set\u548C\u53D8\u91CF" tabindex="-1"><a class="header-anchor" href="#_4-nginx-rewrite-if-return-set\u548C\u53D8\u91CF" aria-hidden="true">#</a> 4.Nginx rewrite/if/return/set\u548C\u53D8\u91CF</h2><h2 id="_5-nginx-tcp-\u6B63\u5411-\u53CD\u5411\u4EE3\u7406-\u8D1F\u8F7D\u5747\u8861" tabindex="-1"><a class="header-anchor" href="#_5-nginx-tcp-\u6B63\u5411-\u53CD\u5411\u4EE3\u7406-\u8D1F\u8F7D\u5747\u8861" aria-hidden="true">#</a> 5.Nginx TCP/\u6B63\u5411/\u53CD\u5411\u4EE3\u7406/\u8D1F\u8F7D\u5747\u8861</h2><h2 id="_6-nginx-\u6587\u4EF6\u4E0B\u8F7D-\u7528\u6237\u8BA4\u8BC1" tabindex="-1"><a class="header-anchor" href="#_6-nginx-\u6587\u4EF6\u4E0B\u8F7D-\u7528\u6237\u8BA4\u8BC1" aria-hidden="true">#</a> 6.Nginx \u6587\u4EF6\u4E0B\u8F7D/\u7528\u6237\u8BA4\u8BC1</h2><h2 id="_7-nginx-\u72B6\u6001\u7EDF\u8BA1-\u72B6\u6001\u7801\u7EDF\u8BA1" tabindex="-1"><a class="header-anchor" href="#_7-nginx-\u72B6\u6001\u7EDF\u8BA1-\u72B6\u6001\u7801\u7EDF\u8BA1" aria-hidden="true">#</a> 7.Nginx \u72B6\u6001\u7EDF\u8BA1/\u72B6\u6001\u7801\u7EDF\u8BA1</h2><h2 id="_8-nginx-\u5B89\u5168\u4F18\u5316-\u4FE1\u606F\u9690\u85CF-\u8BF7\u6C42\u9650\u5236-\u767D\u540D\u5355" tabindex="-1"><a class="header-anchor" href="#_8-nginx-\u5B89\u5168\u4F18\u5316-\u4FE1\u606F\u9690\u85CF-\u8BF7\u6C42\u9650\u5236-\u767D\u540D\u5355" aria-hidden="true">#</a> 8.Nginx \u5B89\u5168\u4F18\u5316/\u4FE1\u606F\u9690\u85CF/\u8BF7\u6C42\u9650\u5236/\u767D\u540D\u5355</h2><h2 id="_9-nginx-\u9759\u6001\u538B\u7F29-\u65E5\u5FD7\u5207\u5272-\u9632\u76D7\u94FE-\u6076\u610F\u89E3\u6790-\u8DE8\u57DF" tabindex="-1"><a class="header-anchor" href="#_9-nginx-\u9759\u6001\u538B\u7F29-\u65E5\u5FD7\u5207\u5272-\u9632\u76D7\u94FE-\u6076\u610F\u89E3\u6790-\u8DE8\u57DF" aria-hidden="true">#</a> 9.Nginx \u9759\u6001\u538B\u7F29/\u65E5\u5FD7\u5207\u5272/\u9632\u76D7\u94FE/\u6076\u610F\u89E3\u6790/\u8DE8\u57DF</h2><h2 id="_10-nginx-\u540E\u9762\u6709\u65E0-\u7684\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#_10-nginx-\u540E\u9762\u6709\u65E0-\u7684\u533A\u522B" aria-hidden="true">#</a> 10.Nginx \u540E\u9762\u6709\u65E0/\u7684\u533A\u522B</h2><h2 id="ngixn-\u9879\u76EE\u4E2D\u9047\u5230\u7684\u95EE\u9898-\u5B9E\u6218\u7BC7" tabindex="-1"><a class="header-anchor" href="#ngixn-\u9879\u76EE\u4E2D\u9047\u5230\u7684\u95EE\u9898-\u5B9E\u6218\u7BC7" aria-hidden="true">#</a> Ngixn \u9879\u76EE\u4E2D\u9047\u5230\u7684\u95EE\u9898\uFF08\u5B9E\u6218\u7BC7\uFF09</h2><ol><li>\u524D\u7AEFnginx\u6CE8\u610F\u4E8B\u9879</li></ol><ul><li>\u5347\u7EA7\u524D\uFF0C\u5982\u679CNginx\u6709\u53D8\u52A8\uFF0C\u5148\u5347\u7EA7Nginx\u914D\u7F6E</li><li>\u5982\u679C\u540E\u53F0\u670D\u52A1\u662F\u591A\u8282\u70B9\u5219\u4F7F\u7528\u8D1F\u8F7D\u5747\u8861</li><li>\u5982\u679C\u4EE3\u7406\u670D\u52A1\u5668\u7684\u5730\u5740\u4F7F\u7528\u4E86\u57DF\u540D\u52A1\u5FC5\u8981\u914D\u7F6Eresolver,resolver\u914D\u7F6E\u7684\u57DF\u540D\u662FDNS\u670D\u52A1\u5668</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#\u670D\u52A1\u5668\u4E0E\u8F6C\u53D1\u63A5\u53E3\u670D\u52A1\u76F8\u5173\u7684\uFF0C\u539F\u5219\u4E0A\uFF0C\u80FD\u8D70\u5185\u7F51\u7684\u5C31\u5C3D\u91CF\u8D70\u5185\u7F51\uFF08\u5185\u7F51\u8981\u8003\u8651\u5355\u8282\u70B9\u95EE\u9898\uFF09</span>
<span class="token comment">#\u5916\u90E8\u57DF\u540D\uFF0C\u914D\u7F6Eresolver\u6307\u5B9A5\u5206\u949F\u6216\u800510\u5206\u949F\u67E5\u8BE2\u4E00\u6B21DNS\u65B9\u5F0F\u8FDB\u884C\u7F13\u5B58\u3002\uFF08\u5148\u7528set\u8BBE\u7F6EURL\u53D8\u91CF\uFF0C\u7136\u540E\u518D\u901A\u8FC7resolver\u89E3\u6790\u540E\u518Dproxy_pass\uFF0C\u5982\u679Cproxy_pass\u540E\u9762\u76F4\u63A5\u8DDF\u57DF\u540D\u7684\u8BDD\uFF0C\u53EA\u6709\u6BCF\u6B21nginx\u91CD\u542F\u624D\u4F1A\u89E3\u6790\u4E00\u6B21IP\uFF09</span>
<span class="token comment">#resolver\u914D\u7F6E\u53C2\u6570\u53C2\u8003</span>
resolver <span class="token number">8.8</span>.8.8 <span class="token number">114.114</span>.114.114 <span class="token assign-left variable">valid</span><span class="token operator">=</span><span class="token number">300</span> <span class="token assign-left variable">ipv6</span><span class="token operator">=</span>off<span class="token punctuation">;</span>
<span class="token builtin class-name">set</span> <span class="token variable">$proxyUrl</span> <span class="token string">&quot;https://elb.com&quot;</span><span class="token punctuation">;</span>
proxy_pass <span class="token variable">$proxyUrl</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ol start="2"><li><p>\u5F3A\u7F13\u5B58\u4E0E\u534F\u5546\u7F13\u5B58\u7684\u533A\u522B<br> \u5F3A\u7F13\u5B58\uFF1A\u6D4F\u89C8\u5668\u4E0D\u4E0E\u670D\u52A1\u7AEF\u534F\u5546\u76F4\u63A5\u53D6\u6D4F\u89C8\u5668\u7F13\u5B58<br> \u534F\u5546\u7F13\u5B58\uFF1A\u6D4F\u89C8\u5668\u4F1A\u5148\u5411\u670D\u52A1\u5668\u786E\u8BA4\u8D44\u6E90\u7684\u6709\u6548\u6027\u540E\u624D\u51B3\u5B9A\u662F\u4ECE\u7F13\u5B58\u4E2D\u53D6\u8D44\u6E90\u8FD8\u662F\u4ECE\u65B0\u83B7\u53D6\u8D44\u6E90</p><p>\u540E\u7AEF\u901A\u8FC7Etag\u548CLast-Modified\u4E24\u9879\u54CD\u5E94\u5934\u5224\u65AD\u8D44\u6E90\u662F\u5426\u66F4\u65B0</p><p>\u524D\u7AEF\u8BF7\u6C42\u76F8\u540C\u8D44\u6E90\u7684\u65F6\u5019\u4F1A\u5728\u8BF7\u6C42\u5934\u4E2D\u5E26\u4E0AIf-Modified-Since\u548CIf-None-Match\u548C\u670D\u52A1\u7AEF\u751F\u6210\u7684Etag\u548CLast-Modified\u4F5C\u6BD4\u8F83\uFF0C\u5982\u679C\u6CA1\u6709\u66F4\u65B0\u4F1A\u8FD4\u56DE\u7A7A\u54CD\u5E94\u72B6\u6001\u7801304</p></li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>location /picture/ <span class="token punctuation">{</span> 
    add_header Cache-Control no-cache<span class="token punctuation">;</span><span class="token comment">#nginx\u914D\u7F6E\u534F\u5546\u7F13\u5B58</span>
    <span class="token builtin class-name">alias</span> D:/fuzhengyi/tcp_test/picture/<span class="token punctuation">;</span> 
<span class="token punctuation">}</span>   


</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ol start="3"><li>no-cache\u4E0Eno-store\u7684\u533A\u522B<br> \u3000no-cache\u8868\u793A\u4E0D\u7F13\u5B58\u8FC7\u671F\u8D44\u6E90\uFF0C\u7F13\u5B58\u4F1A\u5411\u670D\u52A1\u5668\u8FDB\u884C\u6709\u6548\u5904\u7406\u786E\u8BA4\u4E4B\u540E\u5904\u7406\u8D44\u6E90<br> no-store\u624D\u662F\u771F\u6B63\u7684\u4E0D\u8FDB\u884C\u7F13\u5B58\u3002</li></ol><h2 id="\u7EDF\u4E00\u57DF\u540D\u591A\u7AD9\u70B9nginx\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u7EDF\u4E00\u57DF\u540D\u591A\u7AD9\u70B9nginx\u914D\u7F6E" aria-hidden="true">#</a> \u7EDF\u4E00\u57DF\u540D\u591A\u7AD9\u70B9nginx\u914D\u7F6E</h2><p>\u5047\u8BBE\u7AD9\u70B9A\u5730\u5740\u662Fhttp://demo.justfu.net\uFF0C\u662F\u7EDF\u4E00\u57DF\u540D\u5730\u5740\uFF0C\u7AD9\u70B9B\u5730\u5740\u662Fhttp://www.justfu.net\u3002\u901A\u8FC7\u914D\u7F6Enginx\u548C\u7AD9\u70B9B\u7684webpack\u548C\u8DEF\u7531\u5B9E\u73B0\u7528\u7AD9\u70B9A http://demo.justfu.net/invoice\u8BBF\u95EE\u7AD9\u70B9B\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u9996\u5148\u8BBE\u7F6E\u7AD9\u70B9A\u7684nginx\uFF1A

location /invoice{
    rewrite ^(.*)$ $1 break;
    proxy_pass &quot;http://www.justfu.net&quot;;
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>\u5982\u679C\u7AD9\u70B9B \u7684nginx\u6709\u8F6C\u53D1\uFF0C\u5F97\u628A\u7AD9\u70B9B\u7684nginx\u8F6C\u53D1\u5199\u5230\u7AD9\u70B9A\u91CC\u3002\u4F8B\u5982\uFF0C\u7AD9\u70B9B\u7684nginx\u6709\u4E00\u4E2A\u8F6C\u53D1\u5230/bss\u7684\u914D\u7F6E</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>location /bss{
    proxy_pass &quot;https://saas82.ukelink.net&quot;;
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u9700\u8981\u8981\u628A\u8FD9\u4E2A\u590D\u5236\u5230\u7AD9\u70B9A\u7684nginx\u914D\u7F6E\u91CC<br> \u8BBE\u7F6E\u7AD9\u70B9B\u7684vue\u8DEF\u7531\uFF1A<br><img src="`+a+'" alt="rr"> \u8FD9\u6837\uFF0C\u5728\u975E\u5F00\u53D1\u73AF\u5883\u8BBF\u95EE\u9875\u9762\u65F6\uFF0C\u5F97\u4ECEhttp://www.justfu.net\u6539\u6210http://www.justfu.net/invoice<br> tips: \u5173\u4E8Ebase\u7684\u8BF4\u660E\uFF0C\u53C2\u8003https://router.vuejs.org/zh/api/#base<br><strong>\u8BBE\u7F6E\u7AD9\u70B9B\u7684webpack</strong><br> \u5982\u679C\u4F7F\u7528vue cli3\u6253\u5305\uFF0C\u5728vue.config.js\u91CC\u6DFB\u52A0\u8FD9\u6761publicPath\u914D\u7F6E\uFF1A<br><img src="'+e+`" alt="\u754C\u9762"><br> \u8FD9\u6837\uFF0C\u6253\u5305\u51FA\u6765\u5199\u5165\u5230index.html\u7684\u8DEF\u5F84\u6587\u4EF6\u4F1A\u52A0\u4E0A/invoice\u3002\u6BD4\u5982\u539Findex.html\u7684script\u5F15\u5165\u8DEF\u5F84\u662F/js/app.js\uFF0C\u73B0\u5728\u53D8\u6210\u4E86/invoice/js/app.js\u3002</p><p>\u5982\u679C\u4F7F\u7528\u539F\u59CBwebpack\u6253\u5305\uFF0C\u597D\u50CF\u662F\u8981\u4FEE\u6539output.publicPath = &#39;/invoice/&#39; (\u5F85\u9A8C\u8BC1);<br> tips: \u5173\u4E8Evue cli3 publicPath\u7684\u8BF4\u660E\uFF0C\u53C2\u8003https://cli.vuejs.org/zh/config/#publicpath\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u7ED9\u7AD9\u70B9B\u7684nginx\u6DFB\u52A0\u4E00\u6761\u914D\u7F6E\uFF1A
location /invoice{
    rewrite ^/invoice(.*)$ /$1 last;
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u5B8C\u6210\u4E0A\u9762\u64CD\u4F5C\uFF0C\u7AD9\u70B9B\u53EF\u4EE5\u901A\u8FC7http://www.justfu.net\u8BBF\u95EE\uFF0C \u4E5F\u53EF\u4EE5\u901A\u8FC7http://demo.justfu.net/invoice\u8BBF\u95EE\u4E86\u3002</p><p>https://www.cnblogs.com/Dy1an/category/1491372.html</p><h3 id="nginx\u5B9E\u73B0\u524D\u7AEF\u7070\u5EA6\u53D1\u5E03" tabindex="-1"><a class="header-anchor" href="#nginx\u5B9E\u73B0\u524D\u7AEF\u7070\u5EA6\u53D1\u5E03" aria-hidden="true">#</a> nginx\u5B9E\u73B0\u524D\u7AEF\u7070\u5EA6\u53D1\u5E03</h3><p>\u5728\u524D\u7AEF\u5F00\u53D1\u4E2D\uFF0C\u7070\u5EA6\u53D1\u5E03\u662F\u4E00\u79CD\u91CD\u8981\u7684\u7B56\u7565\uFF0C\u5B83\u5141\u8BB8\u6211\u4EEC\u5728\u4E0D\u5F71\u54CD\u6240\u6709\u7528\u6237\u7684\u60C5\u51B5\u4E0B\uFF0C\u9010\u6B65\u63A8\u51FA\u65B0\u529F\u80FD\u6216\u66F4\u65B0\u3002\u901A\u8FC7\u7070\u5EA6\u53D1\u5E03\uFF0C\u6211\u4EEC\u53EF\u4EE5\u6D4B\u8BD5\u65B0\u7248\u672C\u7684\u7A33\u5B9A\u6027\u548C\u6027\u80FD\uFF0C\u540C\u65F6\u6536\u96C6\u7528\u6237\u53CD\u9988</p><ol><li>\u57FA\u4E8E\u6743\u91CD\u7684\u6D41\u91CF\u5206\u914D \u57FA\u4E8E\u6743\u91CD\u7684\u7070\u5EA6\u53D1\u5E03\u662F\u6700\u5E38\u89C1\u7684\u4E00\u79CD\u65B9\u5F0F\u3002\u901A\u8FC7\u8C03\u6574\u4E0D\u540C\u7248\u672C\u670D\u52A1\u7684\u6743\u91CD\uFF0C\u63A7\u5236\u6D41\u91CF\u7684\u5206\u914D\u6BD4\u4F8B\u3002\u4F8B\u5982\uFF0C\u5047\u8BBE\u6211\u4EEC\u7684\u7EBF\u4E0A\u5546\u57CE\u6709\u4E24\u4E2A\u7248\u672C\u7684\u652F\u4ED8\u7CFB\u7EDF\uFF0C\u4E00\u4E2A\u662F\u8001\u7248\u672C\uFF08V1\uFF09\uFF0C\u53E6\u4E00\u4E2A\u662F\u65B0\u7248\u672C\uFF08V2\uFF09\u3002\u6211\u4EEC\u5E0C\u671B\u65B0\u7248\u672C\u5728\u521D\u671F\u53EA\u63A5\u6536 20% \u7684\u8BF7\u6C42\u6D41\u91CF\uFF0C\u5269\u4F59\u7684 80% \u8BF7\u6C42\u7EE7\u7EED\u7531\u8001\u7248\u672C\u5904\u7406\u3002Nginx \u7684\u914D\u7F6E\u53EF\u4EE5\u5982\u4E0B\uFF1A</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>upstream payment_system <span class="token punctuation">{</span>
    server v1.payment.example.com <span class="token assign-left variable">weight</span><span class="token operator">=</span><span class="token number">80</span><span class="token punctuation">;</span>
    server v2.payment.example.com <span class="token assign-left variable">weight</span><span class="token operator">=</span><span class="token number">20</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u5728\u8FD9\u4E2A\u914D\u7F6E\u4E2D\uFF0C80%\u7684\u6D41\u91CF\u4F1A\u88AB\u5F15\u5BFC\u5230\u8001\u7248\u672C\u7684\u652F\u4ED8\u7CFB\u7EDF\uFF08V1\uFF09\uFF0C20%\u7684\u6D41\u91CF\u4F1A\u88AB\u5F15\u5BFC\u5230\u65B0\u7248\u672C\u7684\u652F\u4ED8\u7CFB\u7EDF\uFF08V2\uFF09\u3002\u968F\u7740\u65B0\u7248\u672C\u9010\u6E10\u7A33\u5B9A\uFF0C\u6211\u4EEC\u53EF\u4EE5\u9010\u6B65\u589E\u52A0\u65B0\u7248\u672C\u7684\u6743\u91CD\uFF0C\u6700\u7EC8\u5C06\u6240\u6709\u6D41\u91CF\u5207\u6362\u5230\u65B0\u7248\u672C\u3002 2. \u57FA\u4E8E Cookie \u7684\u5206\u6D41 \u6709\u65F6\uFF0C\u6211\u4EEC\u5E0C\u671B\u6839\u636E\u7528\u6237\u7684\u8EAB\u4EFD\u6765\u51B3\u5B9A\u4ED6\u4EEC\u662F\u5426\u63A5\u5165\u65B0\u7248\u672C\u3002\u8FD9\u65F6\uFF0C\u53EF\u4EE5\u901A\u8FC7\u6D4F\u89C8\u5668\u7684 Cookie \u6765\u5B9E\u73B0\u57FA\u4E8E\u7528\u6237\u7684\u7070\u5EA6\u53D1\u5E03\u3002\u4F8B\u5982\uFF0C\u6211\u4EEC\u5728\u5E94\u7528\u4E2D\u8BBE\u7F6E\u4E86\u4E00\u4E2A\u540D\u4E3A is_gray \u7684 Cookie\uFF0C\u6807\u8BB0\u7528\u6237\u662F\u5426\u53C2\u4E0E\u65B0\u7248\u672C\u7684\u7070\u5EA6\u6D4B\u8BD5\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    server_name example.com<span class="token punctuation">;</span>
    location / <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$http_cookie</span> ~* <span class="token string">&quot;is_gray=1&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            proxy_pass http://v2.backend.example.com<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        proxy_pass http://v1.backend.example.com<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>\u5728\u4E0A\u9762\u7684\u914D\u7F6E\u4E2D\uFF0C\u5982\u679C\u7528\u6237\u7684 Cookie \u4E2D\u6709 is_gray=1 \u7684\u6807\u8BB0\uFF0CNginx \u4F1A\u5C06\u8BE5\u7528\u6237\u7684\u8BF7\u6C42\u8DEF\u7531\u5230\u65B0\u7248\u672C\u7684\u670D\u52A1\uFF08V2\uFF09\uFF1B\u5426\u5219\uFF0C\u7528\u6237\u7684\u8BF7\u6C42\u4F1A\u7EE7\u7EED\u8BBF\u95EE\u65E7\u7248\u672C\u7684\u670D\u52A1\uFF08V1\uFF09\u3002\u8FD9\u79CD\u65B9\u5F0F\u9002\u5408\u7528\u4E8E\u5B9A\u5411\u6D4B\u8BD5\u548C\u7528\u6237\u5206\u7EC4\u3002 3. \u57FA\u4E8E\u8BF7\u6C42\u5934\u7684\u5206\u6D41 \u6211\u4EEC\u8FD8\u53EF\u4EE5\u6839\u636E\u8BF7\u6C42\u5934\u6765\u5B9E\u73B0\u7070\u5EA6\u53D1\u5E03\u3002\u4F8B\u5982\uFF0C\u6839\u636E\u8BF7\u6C42\u4E2D\u7684\u7528\u6237 ID \u5224\u65AD\u662F\u5426\u5C06\u8BF7\u6C42\u8DEF\u7531\u5230\u7070\u5EA6\u73AF\u5883\u3002\u8FD9\u53EF\u4EE5\u901A\u8FC7 Nginx \u7684 Lua \u6A21\u5757\u548C Redis \u6765\u5B9E\u73B0\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    server_name example.com<span class="token punctuation">;</span>
    location / <span class="token punctuation">{</span>
        access_by_lua_block <span class="token punctuation">{</span>
            <span class="token builtin class-name">local</span> redis <span class="token operator">=</span> require <span class="token string">&quot;resty.redis&quot;</span>
            <span class="token builtin class-name">local</span> red <span class="token operator">=</span> redis:new<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token builtin class-name">local</span> ok, err <span class="token operator">=</span> red:connect<span class="token punctuation">(</span><span class="token string">&quot;redis_host&quot;</span>, redis_port<span class="token punctuation">)</span>
            <span class="token keyword">if</span> not ok <span class="token keyword">then</span>
                ngx.log<span class="token punctuation">(</span>ngx.ERR, <span class="token string">&quot;failed to connect to Redis: &quot;</span>, err<span class="token punctuation">)</span>
                ngx.exit<span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span>
            end
            <span class="token builtin class-name">local</span> user_id <span class="token operator">=</span> ngx.req.get_headers<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token string">&quot;X-User-ID&quot;</span><span class="token punctuation">]</span>
            <span class="token builtin class-name">local</span> is_gray <span class="token operator">=</span> red:get<span class="token punctuation">(</span><span class="token string">&quot;gray:&quot;</span> <span class="token punctuation">..</span> user_id<span class="token punctuation">)</span>
            <span class="token keyword">if</span> is_gray <span class="token operator">==</span> <span class="token string">&quot;1&quot;</span> <span class="token keyword">then</span>
                ngx.var.upstream <span class="token operator">=</span> <span class="token string">&quot;gray_backend&quot;</span>
            end
        <span class="token punctuation">}</span>
        proxy_pass http://backend<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>\u5728\u4E0A\u9762\u7684\u793A\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u8FDE\u63A5\u5230 Redis\uFF0C\u5E76\u6839\u636E\u8BF7\u6C42\u4E2D\u7684\u7528\u6237 ID \u5224\u65AD\u662F\u5426\u5C06\u8BF7\u6C42\u8DEF\u7531\u5230\u7070\u5EA6\u73AF\u5883\u3002ngx.var.upstream\xA0\u53D8\u91CF\u7528\u4E8E\u52A8\u6001\u8BBE\u7F6E\u4E0A\u6E38\u5730\u5740\uFF0C\u4ECE\u800C\u5B9E\u73B0\u7070\u5EA6\u73AF\u5883\u7684\u8DEF\u7531\u3002 4. \u57FA\u4E8E\u8BF7\u6C42\u53C2\u6570\u7684\u5206\u6D41 \u6211\u4EEC\u8FD8\u53EF\u4EE5\u6839\u636E\u8BF7\u6C42\u53C2\u6570\u6765\u5B9E\u73B0\u7070\u5EA6\u53D1\u5E03\u3002\u4F8B\u5982\uFF0C\u6839\u636E\u8BF7\u6C42\u4E2D\u7684\u67D0\u4E2A\u53C2\u6570\u503C\u51B3\u5B9A\u8DEF\u7531\u5230\u54EA\u4E2A\u7248\u672C\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    server_name example.com<span class="token punctuation">;</span>
    location / <span class="token punctuation">{</span>
        <span class="token builtin class-name">set</span> <span class="token variable">$group</span> <span class="token string">&quot;default&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$query_string</span> ~* <span class="token string">&quot;thirdPolicystatus=1&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token builtin class-name">set</span> <span class="token variable">$group</span> new_version<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$query_string</span> ~* <span class="token string">&quot;thirdPolicystatus=2&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token builtin class-name">set</span> <span class="token variable">$group</span> old_version<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        proxy_pass http://<span class="token variable">$group</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>\u5728\u4E0A\u9762\u7684\u914D\u7F6E\u4E2D\uFF0C\u6211\u4EEC\u6839\u636E\u8BF7\u6C42\u53C2\u6570\xA0thirdPolicystatus\xA0\u7684\u503C\u6765\u51B3\u5B9A\u8DEF\u7531\u5230\u54EA\u4E2A\u7248\u672C\u3002\u5982\u679C\u53C2\u6570\u503C\u4E3A 1\uFF0C\u5219\u8DEF\u7531\u5230\u65B0\u7248\u672C\uFF1B\u5982\u679C\u53C2\u6570\u503C\u4E3A 2\uFF0C\u5219\u8DEF\u7531\u5230\u65E7\u7248\u672C\u3002\u603B\u7ED3</p>`,78);function l(r,c){return t}var u=s(p,[["render",l]]);export{u as default};
