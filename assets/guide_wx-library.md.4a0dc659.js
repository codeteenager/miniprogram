import{_ as a,a as p,b as r}from"./chunks/8.f43c4490.js";import{_ as e,o as t,c as i,Q as o}from"./chunks/framework.858cddca.js";const s="/miniprogram/wx/14.png",n="/miniprogram/wx/15.png",l="/miniprogram/wx/16.jpg",c="/miniprogram/wx/17.jpg",_="/miniprogram/wx/18.jpg",S=JSON.parse('{"title":"反编译基础库","description":"","frontmatter":{},"headers":[],"relativePath":"guide/wx-library.md","filePath":"guide/wx-library.md","lastUpdated":1699118902000}'),m={name:"guide/wx-library.md"},d=o('<h1 id="反编译基础库" tabindex="-1">反编译基础库 <a class="header-anchor" href="#反编译基础库" aria-label="Permalink to &quot;反编译基础库&quot;">​</a></h1><p>在上文我们反编译了小程序包，接下来我们反编译一下小程序的基础包。</p><p>首先我们来找一下基础库在哪里。</p><h2 id="基础库" tabindex="-1">基础库 <a class="header-anchor" href="#基础库" aria-label="Permalink to &quot;基础库&quot;">​</a></h2><p>打开微信开发者工具界面找到这个位置。</p><p><img src="'+s+'" alt=""></p><p>这里显示着调试小程序运行的基础库版本。打开下拉之后可以看到很多基础库的版本，并且显示了每个版本用户使用的占比。</p><p><img src="'+n+'" alt=""></p><p>在微信开发者工具中可以选择指定的基础库版本进行小程序调试，这里的版本选择与微信客户端中的基础库版本无关。</p><p>怎么理解这句话呢？每个版本的微信客户端都会自带一个版本的小程序基础库。而不是微信客户端带着所有版本的基础库。</p><p>这种场景下就会有个问题，每个用户使用的微信客户端是不一样的，对应的小程序底层基础库版本肯定是不一样的，每个基础库版本之间是又一些差异，小程序开发的过程中一定会有兼容问题。通常都是使用最新的基础库来进行项目开发，相关文档中也标明了一些组件和方法所要求的最低基础库版本号。</p><p>所以在开发中要注意一些api的兼容问题，可以通过几种方式来处理：</p><ul><li>比较版本号调用 wx.getSystemInfo 或者 wx.getSystemInfoSync 获取到当前小程序运行的基础库的版本号。</li><li>API存在判断：通过判断该API是否存在来判断是否支持用户使用的基础库版本。</li><li>wx.canIUse：通过 wx.canIUse 来判断是否可以在该基础库版本下直接使用</li><li>设置最低基础库版本：在小程序管理后台中设置最低基础库版本，如用户低于此版本，则进入不了小程序，并提示需更新微信版本。</li></ul><h2 id="寻找文件" tabindex="-1">寻找文件 <a class="header-anchor" href="#寻找文件" aria-label="Permalink to &quot;寻找文件&quot;">​</a></h2><p>在微信开发者工具的控制台界面，输入help()命令可见如所示界面。</p><p><img src="'+l+'" alt=""></p><p>可以看到这里有一些命令。我们继续在控制台执行第八条openVendor()命令。</p><p><img src="'+c+'" alt=""></p><p>这时候弹出了一个名为WeappVendor的文件夹。可以看到上面带版本号的那些文件就是基础库包了，包的格式是.wxvpkg。</p><p>可以看到每个版本的基础库的包都在这里。基础库的代码就在这些包里。这个包我们是没有办法直接查看的。这个时候就需要一些手段来解包。</p><h2 id="解压" tabindex="-1">解压 <a class="header-anchor" href="#解压" aria-label="Permalink to &quot;解压&quot;">​</a></h2><p>然后打开vscode搜索unwxvpkg插件并下载，下载完之后右键包文件unpack wxvpkg即可解压。</p><p><img src="'+a+'" alt=""></p><p><img src="'+p+'" alt=""></p><p>目录中的WAWebview.js和WAService.js分别为渲染层底层基础库和逻辑层底层基础库。我们打开WAWebview.js文件看一下：</p><p><img src="'+r+'" alt=""></p><p>可以看到代码是压缩过后的。这样的压缩过的代码是难以分析的，所以我们需要美化一下。我们可以安装prettier插件，然后右击格式化代码即可。</p><p><img src="'+_+'" alt=""></p><p>把我们要分析的核心基础库文件都美化一下。再打开文件我们就可以看到美化之后的代码了。</p>',29),g=[d];function h(x,u,w,b,f,k){return t(),i("div",null,g)}const q=e(m,[["render",h]]);export{S as __pageData,q as default};
