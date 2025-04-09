import{e as n}from"./app.bc17808d.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},e=n(`<h1 id="git\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#git\u4F7F\u7528" aria-hidden="true">#</a> git\u4F7F\u7528</h1><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>git clone 

git add . // add/rm
git add src/

git checkout -- file  // git checkout -- file\u547D\u4EE4\u4E2D\u7684--\u5F88\u91CD\u8981\uFF0C\u6CA1\u6709--\uFF0C\u5C31\u53D8\u6210\u4E86\u201C\u5207\u6362\u5230\u53E6\u4E00\u4E2A\u5206\u652F\u201D\u7684\u547D\u4EE4
git reset HEAD &lt;file&gt; // \u53EF\u4EE5\u628A\u6682\u5B58\u533A\u7684\u4FEE\u6539\u64A4\u9500\u6389\uFF08unstage\uFF09\uFF0C\u91CD\u65B0\u653E\u56DE\u5DE5\u4F5C\u533A

git status

git commit -m &quot;\u5907\u6CE8&quot;

git remote add origin git@github.com:michaelliao/learngit.git

git push
git push origin dev-zds:dev

git pull
git pull origin dev

git stash
git stash pop/apply
git stash drop

// \u521B\u5EFA\u5E76\u5207\u6362\u5206\u652F
git checkout -b \u5206\u652F\u540D origin/\u8FDC\u7A0B\u5206\u652F\u540D  // git switch -c \u5206\u652F\u540D
// \u5207\u6362\u5206\u652F
git checkout \u5206\u652F\u540D // git switch \u5206\u652F\u540D
// \u5408\u5E76\u5206\u652F
git merge &lt;name&gt;
// \u5220\u9664\u5206\u652F
git branch -d &lt;name&gt;
// \u67E5\u770B\u5206\u652F
git branch -a

\uFF08use &quot;git merge --abort&quot; to abort the merge\uFF09

git tag &lt;tagName&gt; // \u521B\u5EFA\u672C\u5730tag
git tag -a &lt;tagname&gt; -m &quot;blablabla...&quot; // \u53EF\u4EE5\u6307\u5B9A\u6807\u7B7E\u4FE1\u606F\uFF1B
git tag // \u67E5\u770B\u6240\u6709\u6807\u7B7E
git push origin &lt;tagname&gt; // \u5C06\u672C\u5730\u521B\u5EFA\u7684\u6807\u7B7E\u63A8\u9001\u5230\u8FDC\u7A0B
git tag -d &lt;tagname&gt; // git tag -d &lt;tagname&gt;
git push origin :refs/tags/&lt;tagname&gt; // \u53EF\u4EE5\u5220\u9664\u4E00\u4E2A\u8FDC\u7A0B\u6807\u7B7E
git checkout -b \u65B0\u5206\u652F\u540D\u79F0 origin/tag\u540D\u79F0 // \u4ECEtag\u62C9\u53BB\u4EE3\u7801

git push origin &lt;tagName&gt; // \u63A8\u9001\u5230\u8FDC\u7A0B\u4ED3\u5E93

git cherry-pick \u63D0\u4EA4id // \u5C06\u5236\u5B9A\u63D0\u4EA4\u590D\u5236\u5230\u5F53\u524D\u5206\u652F

.gitignore\u6587\u4EF6
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br></div></div><h1 id="\u65E5\u5E38\u5DE5\u4F5C\u6D41" tabindex="-1"><a class="header-anchor" href="#\u65E5\u5E38\u5DE5\u4F5C\u6D41" aria-hidden="true">#</a> \u65E5\u5E38\u5DE5\u4F5C\u6D41</h1><ol><li>\u5728master\u5206\u652F\u5F00\u53D1</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>git stash save &#39;\u8D2E\u5B58\u5907\u6CE8&#39;
git pull --rebase
git stash pop  // \u8FD9\u91CC\u53EF\u80FD\u6709\u51B2\u7A81
git add .
git commit -m &quot;\u5907\u6CE8&quot;
git push origin master:master-zds
\u8FDC\u7A0B\u5408\u5E76 
git pull  --rebase
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><ol start="2"><li>\u5728\u81EA\u5DF1\u7684\u5206\u652F\u5F00\u53D1</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>git stash save &#39;\u8D2E\u5B58\u5907\u6CE8&#39;
git pull origin master // git checkout master    |  git pull | git checkout master-zds   |   git merge master
git stash pop // \u8FD9\u91CC\u53EF\u80FD\u6709\u51B2\u7A81
git add .
git commit -m &quot;\u5907\u6CE8&quot;
git push 
\u8FDC\u7A0B\u5408\u5E76 
git pull  origin master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><ol start="3"><li>\u5927\u5BB6\u90FD\u7528\u4E00\u4E2A\u5206\u652F\u5F00\u53D1</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>git add .
git commit -m &quot;22&quot;
git pull // \u53EF\u80FD\u51B2\u7A81
git push // \u62A5\u9519 git pull
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>GitHub ssh-key\u914D\u7F6E \u751F\u6210ssh-key ssh-keygen -t rsa -C &quot;\u90AE\u7BB1&quot; \u68C0\u6D4B\u662F\u5426\u6210\u529F ssh -T git@github.com</p>`,10);function l(r,i){return e}var b=s(a,[["render",l]]);export{b as default};
