import{_ as s,r as a,o as t,c as p,b as e,a as o}from"./app.abbddf67.js";const c={},l=o(`<h1 id="\u0432\u044B\u043F\u0430\u0434\u0430\u044E\u0449\u0438\u0438-\u0441\u043F\u0438\u0441\u043E\u043A-\u0441-\u0430\u0432\u0442\u043E\u0448\u0438\u0440\u0438\u043D\u043E\u0438" tabindex="-1"><a class="header-anchor" href="#\u0432\u044B\u043F\u0430\u0434\u0430\u044E\u0449\u0438\u0438-\u0441\u043F\u0438\u0441\u043E\u043A-\u0441-\u0430\u0432\u0442\u043E\u0448\u0438\u0440\u0438\u043D\u043E\u0438" aria-hidden="true">#</a> \u0412\u044B\u043F\u0430\u0434\u0430\u044E\u0449\u0438\u0439 \u0441\u043F\u0438\u0441\u043E\u043A \u0441 \u0430\u0432\u0442\u043E\u0448\u0438\u0440\u0438\u043D\u043E\u0439</h1><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select-auto-size</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>city<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:items</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>items<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> SelectAutoSize <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@prleasing/kuku&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	<span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span> SelectAutoSize <span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">const</span> items <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;\u041C\u043E\u0441\u043A\u0432\u0430&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u0423\u0444\u0430&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">const</span> city <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span>value<span class="token punctuation">[</span>items<span class="token punctuation">.</span>value<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token keyword">return</span> <span class="token punctuation">{</span> city<span class="token punctuation">,</span> items <span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function u(i,k){const n=a("example-select-auto-size");return t(),p("div",null,[l,e(n)])}var d=s(c,[["render",u],["__file","select-auto-size.html.vue"]]);export{d as default};
