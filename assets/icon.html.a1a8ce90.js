import{_ as s,r as a,o as t,c as p,b as e,a as c}from"./app.abbddf67.js";const i={},l=c(`<h1 id="\u0438\u043A\u043E\u043D\u043A\u0438" tabindex="-1"><a class="header-anchor" href="#\u0438\u043A\u043E\u043D\u043A\u0438" aria-hidden="true">#</a> \u0418\u043A\u043E\u043D\u043A\u0438</h1><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>example<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>icon</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item in icons<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> Icon <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@prleasing/kuku&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	<span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span> Icon <span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token punctuation">{</span>
			<span class="token literal-property property">icons</span><span class="token operator">:</span> <span class="token punctuation">[</span>
				<span class="token string">&#39;copy&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;truck&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;briefcase&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;calculator&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;eye&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;home&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;arrow-left&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;medicine&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;calendar&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;real-estate&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;message&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;youtube&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;telegram&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;tractor&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;angle-left&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;monitoring&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;angle-right&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;tick&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;arrow-right&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;euro&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;navigator&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;reference&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;plane&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;dollar&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;ruble&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;angle-down&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;tenchat&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;eye-closed&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;train&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;money&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;treaties&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;exit&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;fire&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;escalator&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;news&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;maps&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;profile&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;tiktok&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;phone&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;check-mark&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;contacts&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;application&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;vk&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;crane&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;axe&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;pills&#39;</span><span class="token punctuation">,</span>
				<span class="token string">&#39;yacht&#39;</span>
			<span class="token punctuation">]</span>
		<span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>scss<span class="token punctuation">&quot;</span></span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.example + .example</span> <span class="token punctuation">{</span>
	<span class="token property">margin-top</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function o(u,r){const n=a("example-icon");return t(),p("div",null,[l,e(n)])}var d=s(i,[["render",o],["__file","icon.html.vue"]]);export{d as default};
