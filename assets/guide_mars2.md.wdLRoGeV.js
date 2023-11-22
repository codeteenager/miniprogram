import{_ as a,o as s,c as e,R as n,a7 as p,a8 as l,a9 as r,aa as t}from"./chunks/framework.FQY43srL.js";const f=JSON.parse('{"title":"设计思路与原理","description":"","frontmatter":{},"headers":[],"relativePath":"guide/mars2.md","filePath":"guide/mars2.md","lastUpdated":1700649158000}'),c={name:"guide/mars2.md"},i=n('<h1 id="设计思路与原理" tabindex="-1">设计思路与原理 <a class="header-anchor" href="#设计思路与原理" aria-label="Permalink to &quot;设计思路与原理&quot;">​</a></h1><h2 id="设计思路" tabindex="-1">设计思路 <a class="header-anchor" href="#设计思路" aria-label="Permalink to &quot;设计思路&quot;">​</a></h2><p>Mars 框架的设计思路是将跨多端的应用拆分为逻辑层和视图层，逻辑层采用同一套核心运行时进行数据驱动以及生命周期管理，视图层使用同一套模板语法，经过编译转换为特定平台的视图语言。</p><h2 id="框架原理" tabindex="-1">框架原理 <a class="header-anchor" href="#框架原理" aria-label="Permalink to &quot;框架原理&quot;">​</a></h2><p>考虑到学习成本、生态完善程度以及在多端上的扩展性、业务场景等原因，我们选择了 Vue 技术栈，采用 Vue 单文件组件和模板语法来书写组件代码，引入标准基础组件和 API 规范和标准生命周期规范。</p><p>在此开发规范之上，基于 Vue 的模板语法和基础组件来构建视图层，基于 Vue 数据驱动及标准生命周期规范来构建逻辑层，实现多端运行。框架总体原理图如下：</p><p><img src="'+p+'" alt=""></p><p>小程序运行时原理图：</p><p><img src="'+l+'" alt=""></p><p>编译和构建：</p><p><img src="'+r+'" alt=""></p><p>H5运行时原理图：</p><p><img src="'+t+`" alt=""></p><h2 id="代码结构" tabindex="-1">代码结构 <a class="header-anchor" href="#代码结构" aria-label="Permalink to &quot;代码结构&quot;">​</a></h2><p>Mars仓库地址为：<a href="https://github.com/max-team/Mars" target="_blank" rel="noreferrer">https://github.com/max-team/Mars</a>，其中代码结构如下：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docs                // 文档目录</span></span>
<span class="line"><span style="color:#e1e4e8;">packsges</span></span>
<span class="line"><span style="color:#e1e4e8;">    |- mars-build   // 编译相关代码</span></span>
<span class="line"><span style="color:#e1e4e8;">    |- mars-core    // 运行时代码</span></span>
<span class="line"><span style="color:#e1e4e8;">    |- mars-cli     // CLI 代码</span></span>
<span class="line"><span style="color:#e1e4e8;">    |- mars-cli-template  // CLI Service 代码</span></span>
<span class="line"><span style="color:#e1e4e8;">    |- mars-api     // 适配 H5 的 API 代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docs                // 文档目录</span></span>
<span class="line"><span style="color:#24292e;">packsges</span></span>
<span class="line"><span style="color:#24292e;">    |- mars-build   // 编译相关代码</span></span>
<span class="line"><span style="color:#24292e;">    |- mars-core    // 运行时代码</span></span>
<span class="line"><span style="color:#24292e;">    |- mars-cli     // CLI 代码</span></span>
<span class="line"><span style="color:#24292e;">    |- mars-cli-template  // CLI Service 代码</span></span>
<span class="line"><span style="color:#24292e;">    |- mars-api     // 适配 H5 的 API 代码</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div>`,16),o=[i];function m(d,h,u,_,b,g){return s(),e("div",null,o)}const k=a(c,[["render",m]]);export{f as __pageData,k as default};
