import{_ as e,c as p,o as a,a as i}from"./app.6c5ab9cd.js";const t="/miniprogram/wx/2.png",r="/miniprogram/wx/3.jpg",j=JSON.parse('{"title":"双线程模型","description":"","frontmatter":{},"headers":[],"relativePath":"guide/wx-thread.md","lastUpdated":1676394900000}'),s={name:"guide/wx-thread.md"},c=i('<h1 id="双线程模型" tabindex="-1">双线程模型 <a class="header-anchor" href="#双线程模型" aria-hidden="true">#</a></h1><p>小程序的架构模型有别与传统web单线程架构，小程序为双线程架构。</p><p>微信小程序的渲染层与逻辑层分别由两个线程管理，渲染层的界面使用 webview 进行渲染；逻辑层采用 JSCore运行JavaScript代码。这里先看一下小程序的架构图。 <img src="'+t+'" alt=""></p><p>可以从图中看出，由于渲染层与逻辑层分开，一个小程序有多个界面，所以渲染层对应存在多个webview。这两个线程之间由Native层进行统一处理。无论是线程之间的通讯、数据的传递、网络请求都由Native层做转发。</p><p>那么首先有一个问题需要解释，这里的webview是什么呢？</p><p>平常我们浏览网页都是在浏览器中，可以想象webview是一个嵌入式的浏览器，是嵌入在原生应用中的。webview 用来展示网页的 view 组件，该组件是你运行自己的浏览器或者在你的线程中展示线上内容的基础。使用 webkit 渲染引擎来展示，并且支持前进后退、浏览历史、放大缩小、等更多功能。</p><p>简单来说 webview 是手机中内置了一款高性能 webkit 内核浏览器，在 SDK 中封装的一个组件。不过没有提供地址栏和导航栏，只是单纯的展示一个网页界面。</p><p>这里比较容易弄混的概念是iframe，iframe为页面中嵌入页面的方式，有别于webview嵌入原生应用的概念，这里需要注意一下。</p><p>紧接上文架构，那么为什么要做多个webview呢，为了更加接近原生应用APP的用户体验。多个webview可以理解为多页面应用，有别于单页面应用SPA，SPA渲染页面是通过路由识别随后动态将页面挂载到root节点中去，如果单页面应用打开一个新的页面，需要先卸载掉当前页面结构，并且重新渲染。很显然原生APP并不是这个样子，比较明显的特征为从页面右侧向左划入一个新的页面，并且我们可以同时看到两个页面。 <img src="'+r+'" alt=""></p><p>多页面应用就很好达到这个效果，新页面直接滑动出来并且覆盖在旧页面上即可，这也是小程序现在所做的形式。这样的用户体验是非常好的。</p><p>在之前单线程架构中，传统html开发的时候，官方建议script加载js的时候放在Body下方位置。就是因为单线程阻塞问题。因为html文件是从上到下渲染的，如果中间插入js的话，则会中断HTML节点渲染，转而去执行js，js执行完后继续渲染节点。就是因为单线程阻塞问题才建议在下方插入script，并且配合window.onload可以拿到已经渲染完成的节点。</p><p>这种情况当然也可以通过一些手段来规避，比如async、defer等。这两个属性加上后，虽然不会阻塞DOM渲染，但是并不是根本上解决问题，而是合理地安排了资源解析而已。</p><p>单线程阻塞问题还没结束，另一个问题又扑面而来。如果所有资源都是通过请求来获取，那么不光会阻塞js解析的时间，还要加上js请求的时长。请求js资源时间不可控，怎么办呢。这个时候另一种选择就至关重要，就是缓存。</p><p>微信中这一点做的很好，就是WXSDK，微信SDK是一系列jsApi的集合，提供了微信的丰富原生能力和微信内部的方法。</p><p>在曾经开发微信公众号h5的时候我们需要手动的注入某个版本的微信SDK到自身的项目中去，这种方式的用户体验并不是很好，因为加载js，并且解析js逻辑的时候是会抢占渲染资源的，原因也就是上面刚讲过的单线程阻塞问题，如果在我们有承接平台的时候，比如微信客户端，将微信SDK这样的资源放在客户端Native中，在加载页面的时候再进行动态的注入，由Native层注入到视图层。这样的做法的好处很明显，首先会使包的体积变小，其次，减少了网络请求的发送。</p><p>小程序中也用到了微信SDK，当然不仅仅只有微信SDK做了这样的处理，由Native层注入到双线程中。还有底层基础库、Service等都是事先放在Native层中的，当页面进行加载的时候再进行动态的注入。</p><p>好比如说公司里给你配了一台电脑来开发项目一样，曾经工作人员都需要自己带着自身的开发工具去公司上班，如果公司统一配好了开发工具，那么你再也不用带着电脑去公司上班了，减少了每个员工为工作需要提前准备的资源。</p><p>可以看出，双线程的好处不仅仅是一分为二而已，还有强大的Native层做背后支撑。</p><p>Native层除了做一些资源的动态注入，还负责着很多的事情，请求的转发，离线存储，组件渲染等等。界面主要由成熟的 Web 技术渲染，辅之以大量的接口提供丰富的客户端原生能力。同时，每个小程序页面都是用不同的WebView去渲染，这样可以提供更好的交互体验，更贴近原生体验，也避免了单个WebView的任务过于繁重。此外，界面渲染这一块还定义了一套内置组件以统一体验，并且提供一些基础和通用的能力，进一步降低开发者的学习门槛。值得一提的是，内置组件有一部分较复杂组件是用客户端原生渲染的，以提供更好的性能。</p><p>有了这么一个靠山后，让逻辑层与渲染层更加专注于自身的责任。</p><p>换一个角度来思考，基于Web 技术来渲染小程序是存在一些不可控因素和安全风险的。这是因为Web技术是非常开放灵活的，我们可以利用JavaScript 脚本随意地跳转网页或者改变界面上的任意内容。</p><p>这个时候安全问题摆到了微信团队的台面上。</p><p>如果微信小程序可以离线浏览，只需要小程序开发者把一些应用数据缓存到本地，然后通过javascript脚本把小程序渲染的webview跳转到其他的在线网页，那么这个体验就非常的糟糕。想必前端开发者会非常熟悉这个操作。</p><p>除此之外，javascript还可以通过操作DOM，直接获取小程序内部的一些敏感数据，比如用户的信息，商家信息等等，那么小程序将毫无安全可言。</p><p>为了解决安全管控问题，小程序阻止开发者使用一些浏览器提供的比如跳转页面、操作DOM、动态执行脚本的开放性接口。如果这些东西一个一个地去禁用，那么势必会进入一个糟糕的循环，因为javascript实在是太灵活了，浏览器的接口也太丰富了，很容易就遗漏一些危险的接口，而且就算是禁用掉了所有感觉到危险的接口，也势必防不住浏览器内核的下次更新。指不定又会出现一些漏洞。</p><p>因此，要彻底解决这个问题，必须提供一个沙箱环境来运行开发者的JavaScript 代码。这个沙箱环境不能有任何浏览器相关接口，只提供纯JavaScript 的解释执行环境，那么像HTML5中的ServiceWorker、WebWorker特性就符合这样的条件，这两者都是启用另一线程来执行 javaScript。但是考虑到小程序是一个多 webView 的架构，每一个小程序页面都是不同的webView 渲染后显示的，在这个架构下不好去用某个webView中的ServiceWorker去管理所有的小程序页面。</p><p>得益于客户端系统有javaScript 的解释引擎（在iOS下使用内置的 javaScriptCore框架，在安卓则是用腾讯x5内核提供的JsCore环境），可以创建一个单独的线程去执行 javaScript，在这个环境下执行的都是有关小程序业务逻辑的代码，也就是我们前面一直提到的逻辑层。而界面渲染相关的任务全都在webview线程里执行，通过逻辑层代码去控制渲染哪些界面，那么这一层当然就是所谓的渲染层。这就是小程序双线程模型的由来。</p>',27),o=[c];function w(v,_,n,d,S,b){return a(),p("div",null,o)}const h=e(s,[["render",w]]);export{j as __pageData,h as default};
