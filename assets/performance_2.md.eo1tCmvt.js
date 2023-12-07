import{_ as t,o as e,c as a,R as o,ba as l}from"./chunks/framework.KWpDWCeV.js";const P=JSON.parse('{"title":"小程序启动流程(下)","description":"","frontmatter":{},"headers":[],"relativePath":"performance/2.md","filePath":"performance/2.md","lastUpdated":1701968601000}'),r={name:"performance/2.md"},p=o('<h1 id="小程序启动流程-下" tabindex="-1">小程序启动流程(下) <a class="header-anchor" href="#小程序启动流程-下" aria-label="Permalink to &quot;小程序启动流程(下)&quot;">​</a></h1><p>首先我们先了解一下微信小程序双线程运行机制。</p><p><img src="'+l+'" alt=""></p><p>微信小程序可以看作是由逻辑层、视图层两个线程协同完成运行的。</p><p>逻辑层负责执行JS代码，视图层负责渲染UI页面。逻辑层与视图层之间的事件触发以及数据传递，也就是setData的方法的一个调用全是由底层的Native层负责中转完成的。</p><p>我们以iOS Mac端为例，底层有一个叫做evaluateJavaScript函数，这个函数专门负责执行JS函数，每当这个逻辑层它有代码要执行的时候，这个代码它先转为字符串传递给这个函数，再由这个函数负责将这个代码传递给对应的WebView组件完成渲染、完成执行。</p><p>setData函数它用于更新视图数据，它的执行也不例外，底层的Native层，在逻辑层与视图层中间它像一座非常窄的 一个窄窄的一个独木桥，极大地限制了两个线程之间的一个通讯效率，按照微信小程序的性能评判标准，setData每次传递的数据大小不能超过256KB，超过这个限制 页面就容易卡顿，还有并不是低于256KB它便不会产生性能问题。在这个页面或者是列表组件scroll事件里面，如果我们频繁地调用setData视图层它来不及渲染也会出现明显的一个卡顿现象。</p><p>针对小程序的运行时特点有以下这些优化点，我们一起看一下。</p><ol><li>使用WXS的脚本，在这个视图层完成这个事件处理</li></ol><p>WXS脚本是微信自研的一种类似于JS的一个脚本语言，它完全可以在视图层线程里边独立完成执行，不需要由逻辑层进行插手。</p><ol start="2"><li>重渲染机制</li></ol><p>更无需底层进行中转，小程序使用重渲染机制。WXML节点越少、嵌套层次越浅、渲染效率越高，按照这个小程序的性能评判标准，每页总节点数要小于1000个，层次要低于30层，每个节点的子节点不能多于60个，针对JS脚本解析执行这样一个效率低下这样的一个特点。</p><ol start="3"><li>支持WXWebAssembly</li></ol><p>小程序它支持WXWebAssembly这样的一个技术，可以将C、Go语言代码编译为wasm文件，在这个小程序中加载并直接调用，借用其他编译型语言的一个强大执行能力，来弥补解析性语言的性能上的一个不足。</p><ol start="4"><li>允许开发者另开一个Worker线程</li></ol><p>针对JS是单线程执行的一个特点，小程序还允许开发者另开一个Worker线程并发进行代码的一个运算。</p><ol start="5"><li>分页渲染，采用虚拟DOM</li></ol><p>针对长列表页面setData单次传递的数据不能超过256KB限制可以采用分页渲染，采用虚拟DOM等优化技巧。这些技巧它不是小程序专用的，在HTML5 Web开发里面也用到了，但是Web开发它没有setData大小的限制，一般也不需要这么来做。</p><ol start="6"><li>使用LocalStorage接口将这个数据缓存在本地</li></ol><p>针对每次拉取动态数据需要时间可以使用LocalStorage接口，将这个数据缓存在本地，下次渲染的时候我们直接从本地去取。不过LocalStorage接口，无论是同步接口还是异步接口，它本质上其实都属于同步接口，在使用的时候我们要避免影响小程序的主体启动流程。</p><ol start="7"><li>5秒的挂起状态</li></ol><p>小程序在进入后台状态以后它有5秒的一个挂起状态，在这种状态之下setData它已经没有必要执行了，这个时候执行其实就是对用户CPU资源的一个浪费。在这种情况下我们可以停止setData的代码的执行。</p><ol start="8"><li>启用Http2 Quic等协议</li></ol><p>在小程序与后台进行数据交互的时候可以启用Http2 Quic等协议，以提高网络通讯效率。</p><ol start="9"><li>getCurrentPages()接口</li></ol><p>小程序的页面在跳转后，页面对象并没有立即销毁，通过getCurrentPages()接口仍然可以获取所有页面栈对象，在Page.onUnload周期函数里面，我们应该将定时器以及以wx.onXxx这样形式开头的全局监听、还有与全局对象有关的事件监听等等全部移除，避免GC不能及时进行垃圾内存的一个回收。</p><ol start="10"><li>原生的Context的节点</li></ol><p>小程序里面还有一些原生组件例如像map video canvas等这些原生组件，它们都有原生的Context的节点，在JS代码中可以通过SelectorQuery查询到这个原生节点，然后再利用这个原生节点直接操作和更新视图，可以绕过底层Native层的一个数据中转，这个技巧可以提升原生组件的一个渲染效率。</p><ol start="11"><li>本地图片都上传到云</li></ol><p>小程序中遇到的一些图片所有本地图片都可以传到云上转为网络图片，那图片还可以使用webp格式，小程序的image组件是支持这种图片格式的。</p><p>以上就是小程序在冷启动时以及运行时可以使用的性能优化技巧。微信开发者工具提供了静态代码分析、Performance面板、Memory面板、性能评分面板也就是Audits面板还有代码质量扫描工具等等这些工具可以对小程序代码进行分析，帮助开发者进行启动性能优化和运行时渲染性能优化。下面我们看项目诊断。</p><p>为小程序项目做项目诊断有很多工具，例如入口在这个项目详情面板里面的代码依赖分析性能报告，代码质量扫描以及调试区的Performance面板 Memory面板还有这个JavaScript Profiler面板和体验评分面板等等这些都是。下面我们依次看一下这些工具的运行效果，它们显示了我们的初始项目究竟有多么糟糕。</p><p>首先看代码依赖分析。主包竟然有36MB，主包超过了2MB就无法上传了，主包必须进行优化，无依赖的文件总数也达到了124，最大的一张高清商品图片占用了11MB的一个大小，这是非常恐怖的，所有的商品图片都需要进行网络链接化不能放在本地，接下来我们看代码质量扫描。我们可以看到有多项指标都没有达标，每个红色提示部分都值得我们仔细对待、认真优化还有Performance面板中出现多个红三角，有的任务执行时间竟然超过了400ms 性能已经十分堪忧了。这是Memory面板的一个截图，小程序平稳运行的时候，貌似存在大量新增的内存数据，程序可能存在内存泄露的一个隐患，这些问题也是我们在优化的时候应该重点对待的。</p><p>接下来我们再看JavaScript Profiler面板的一个表现。我们可以看到个别脚本执行时间稍微长了一些，达到了200ms以上，这是性能评分面板的一个截图，综合体验评分整体上较差。最大节点数已经超过了1000个的最大限制，这是小程序在冷启动时调试区的一个截图，小程序的冷启动耗时竟然达到了7秒以上。这是在微信开发者工具上的一个耗时，在手机设备尤其是在低端机设备上可能这个时间还要更长，以上我们从诊断结果来看，目前小程序项目的启动效率和运行时性能都很不乐观。</p><p>下面我们看一下优化目标。小程序用户设备，按性能可以分为高、中、低三档，一般低端机相对高端机在启动性能上有2到3倍的一个差距，在优化的时候我们不仅要关注高端机的一个性能，还要更加关注低端机的一个表现。一个页面从单击到打开如果超过3秒，用户便很容易失去耐心，对于高端机这个启动要求还要更加放低一些，</p><p>开发的时候如果我们使用苹果iPhone8进行测试的话，启动的时候这个时间则要控制在2.5秒以内同时不能有明显的白屏现象，小程序页面操作不能有明显的卡顿现象，为了避免不必要的一些麻烦、达到一致的实践效果，你在安装软件的时候最好选择使用与我相同的软件版本，特别是对于这个Go语言如果这个版本不对的话，稍后我们在编译WebAssembly文件的时候，可能会遇到额外的一些麻烦，这节课我们就讲到这里。</p>',36),s=[p];function i(c,n,_,m,d,S){return e(),a("div",null,s)}const u=t(r,[["render",i]]);export{P as __pageData,u as default};
