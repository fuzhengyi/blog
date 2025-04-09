import{e as n}from"./app.bc17808d.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},e=n(`<h1 id="\u80FD\u7528const\u5C31\u4E0D\u8981\u7528let" tabindex="-1"><a class="header-anchor" href="#\u80FD\u7528const\u5C31\u4E0D\u8981\u7528let" aria-hidden="true">#</a> \u80FD\u7528const\u5C31\u4E0D\u8981\u7528let</h1><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">//\u53EA\u8981\u662F\u6CA1\u6709\u91CD\u65B0\u8D4B\u503C\u7684\u53D8\u91CF\u90FD\u53EF\u4EE5\u7528const\u58F0\u660E</span>
<span class="token comment">//bad</span>
<span class="token keyword">const</span> userInfo <span class="token operator">=</span> <span class="token punctuation">{</span>
  age<span class="token operator">:</span> <span class="token number">40</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>userInfo<span class="token punctuation">.</span>age <span class="token operator">&gt;</span> <span class="token number">30</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  result <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token comment">//good</span>
<span class="token keyword">const</span> result <span class="token operator">=</span> userInfo<span class="token punctuation">.</span>age <span class="token operator">&gt;</span> <span class="token number">30</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="\u91CD\u6D41\u548C\u91CD\u7ED8" tabindex="-1"><a class="header-anchor" href="#\u91CD\u6D41\u548C\u91CD\u7ED8" aria-hidden="true">#</a> \u91CD\u6D41\u548C\u91CD\u7ED8</h2><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h2>`,4);function p(t,r){return e}var l=s(a,[["render",p]]);export{l as default};
