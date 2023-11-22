import{_ as s,o as n,c as a,R as l,ab as p}from"./chunks/framework.FQY43srL.js";const d=JSON.parse('{"title":"编译器","description":"","frontmatter":{},"headers":[],"relativePath":"guide/mars3.md","filePath":"guide/mars3.md","lastUpdated":1700649158000}'),e={name:"guide/mars3.md"},o=l(`<h1 id="编译器" tabindex="-1">编译器 <a class="header-anchor" href="#编译器" aria-label="Permalink to &quot;编译器&quot;">​</a></h1><p>在Mars源码中mars-build是编译器相关部分的源码，我们看一下其目录结构：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">├── compiler</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">   ├── file               # 文件编译器</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">   ├── runtime            # 运行时编译器</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">   ├── script             # </span><span style="color:#79B8FF;">JS</span><span style="color:#E1E4E8;"> 编译器</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">   ├── sfc                # </span><span style="color:#79B8FF;">SFC</span><span style="color:#E1E4E8;"> 编译器</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">   ├── style              # </span><span style="color:#79B8FF;">CSS</span><span style="color:#E1E4E8;"> 编译器</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">   └── template           # template 编译器</span></span>
<span class="line"><span style="color:#E1E4E8;">├── helper</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">   ├── babel              # babel辅助配置</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">   ├── config             # 文件后缀配置</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">   ├── html</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">parser        # </span><span style="color:#79B8FF;">HTML</span><span style="color:#E1E4E8;"> 解析器</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">   ├── log                # 日志打印</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">   ├── path               # 路径处理工具</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">   └── util               # 其他工具类</span></span>
<span class="line"><span style="color:#E1E4E8;">├── h5</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">   └── transform          # </span><span style="color:#79B8FF;">H5</span><span style="color:#E1E4E8;"> 转换器</span></span>
<span class="line"><span style="color:#E1E4E8;">├── swan</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">   └── transform          # 百度小程序转换器</span></span>
<span class="line"><span style="color:#E1E4E8;">├── wx</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">   └── transform          # 微信小程序转换器</span></span>
<span class="line"><span style="color:#E1E4E8;">├── scripts</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">   ├── defaultConfig      # 工程默认配置文件</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">   ├── getConfig          # 获取并解析工程配置</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">   ├── gulpTasks          # 编译任务</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">   └── run                # 编译器执行入口</span></span>
<span class="line"><span style="color:#E1E4E8;">├── gulp</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">mars</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">base         # 公共的编译任务文件</span></span>
<span class="line"><span style="color:#E1E4E8;">├── gulp</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">mars</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">h5           # </span><span style="color:#79B8FF;">H5</span><span style="color:#E1E4E8;"> 的编译任务文件</span></span>
<span class="line"><span style="color:#E1E4E8;">├── gulp</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">mars</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">swan         # 百度小程序的编译任务文件</span></span>
<span class="line"><span style="color:#E1E4E8;">├── gulp</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">mars</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">wxml         # 微信小程序的编译任务文件</span></span>
<span class="line"><span style="color:#E1E4E8;">└── index.js               # 入口文件，</span><span style="color:#B392F0;">暴露四个函数</span><span style="color:#E1E4E8;">(build、clean、watch、getConfig)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">├── compiler</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">   ├── file               # 文件编译器</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">   ├── runtime            # 运行时编译器</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">   ├── script             # </span><span style="color:#005CC5;">JS</span><span style="color:#24292E;"> 编译器</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">   ├── sfc                # </span><span style="color:#005CC5;">SFC</span><span style="color:#24292E;"> 编译器</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">   ├── style              # </span><span style="color:#005CC5;">CSS</span><span style="color:#24292E;"> 编译器</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">   └── template           # template 编译器</span></span>
<span class="line"><span style="color:#24292E;">├── helper</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">   ├── babel              # babel辅助配置</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">   ├── config             # 文件后缀配置</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">   ├── html</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">parser        # </span><span style="color:#005CC5;">HTML</span><span style="color:#24292E;"> 解析器</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">   ├── log                # 日志打印</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">   ├── path               # 路径处理工具</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">   └── util               # 其他工具类</span></span>
<span class="line"><span style="color:#24292E;">├── h5</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">   └── transform          # </span><span style="color:#005CC5;">H5</span><span style="color:#24292E;"> 转换器</span></span>
<span class="line"><span style="color:#24292E;">├── swan</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">   └── transform          # 百度小程序转换器</span></span>
<span class="line"><span style="color:#24292E;">├── wx</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">   └── transform          # 微信小程序转换器</span></span>
<span class="line"><span style="color:#24292E;">├── scripts</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">   ├── defaultConfig      # 工程默认配置文件</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">   ├── getConfig          # 获取并解析工程配置</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">   ├── gulpTasks          # 编译任务</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">   └── run                # 编译器执行入口</span></span>
<span class="line"><span style="color:#24292E;">├── gulp</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">mars</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">base         # 公共的编译任务文件</span></span>
<span class="line"><span style="color:#24292E;">├── gulp</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">mars</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">h5           # </span><span style="color:#005CC5;">H5</span><span style="color:#24292E;"> 的编译任务文件</span></span>
<span class="line"><span style="color:#24292E;">├── gulp</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">mars</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">swan         # 百度小程序的编译任务文件</span></span>
<span class="line"><span style="color:#24292E;">├── gulp</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">mars</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">wxml         # 微信小程序的编译任务文件</span></span>
<span class="line"><span style="color:#24292E;">└── index.js               # 入口文件，</span><span style="color:#6F42C1;">暴露四个函数</span><span style="color:#24292E;">(build、clean、watch、getConfig)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h2 id="编译执行流程" tabindex="-1">编译执行流程 <a class="header-anchor" href="#编译执行流程" aria-label="Permalink to &quot;编译执行流程&quot;">​</a></h2><p>编译过程整体的执行流程如下：</p><p><img src="`+p+'" alt=""></p><p>然后我们看一下它是怎么实现的。</p>',7),r=[o];function c(t,E,y,i,b,m){return n(),a("div",null,r)}const F=s(e,[["render",c]]);export{d as __pageData,F as default};
