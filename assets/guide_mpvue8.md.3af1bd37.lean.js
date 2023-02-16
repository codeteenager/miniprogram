import{_ as e,c as o,b as s,d as n,t as l,a as p,o as r}from"./app.3089abb2.js";const f=JSON.parse('{"title":"mpvue-template-compiler 源码分析","description":"","frontmatter":{},"headers":[{"level":2,"title":"mpvue-template-compiler 引用流程分析","slug":"mpvue-template-compiler-引用流程分析","link":"#mpvue-template-compiler-引用流程分析","children":[]},{"level":2,"title":"mpvue-template-compiler 源码分析","slug":"mpvue-template-compiler-源码分析-1","link":"#mpvue-template-compiler-源码分析-1","children":[]},{"level":2,"title":"baseCompile 源码分析","slug":"basecompile-源码分析","link":"#basecompile-源码分析","children":[]}],"relativePath":"guide/mpvue8.md","lastUpdated":1676568112000}'),t={name:"guide/mpvue8.md"},c=p("",10),F=p("",2),y=s("li",null,"type：html 元素对应的 nodeType，这里 type 为 1 表示节点类型为 Element 即元素；",-1),i=s("li",null,"tag：对应 html 标签名称，这里是 div；",-1),D=s("li",null,"attrsList 和 attrsMap：对应标签内的属性列表和属性对象，这里由于 div 内没有属性，所以为空数组和空对象；",-1),C=p("",22),m=s("ul",null,[s("li",null,"第一步，parseHTML 会通过正则表达式匹配 <，一旦匹配到 <，它会继续通过正则匹配其中的内容，这里会取出 div，之后 parseHTML 通过正则循环匹配 div 标签的属性，这里由于 div 中没有属性，所以会略过，循环匹配的原因是因为 div 中可能包含多个属性。属性匹配完毕后会继续匹配 >，至此 HTML 的第一个标签匹配完毕；"),s("li",null,"第二步，parseHTML 会继续匹配下一个 <，匹配到下一个 < 后，< 之前的内容就是属性的值，会存入 ast 属性的 children 中；"),s("li",null,"第三步，匹配到下一个 < 后，parseHTML 会匹配标签，如果发现是闭合标签，即包含 / 的标签，则会结束解析过程。")],-1);function A(a,u,b,d,v,h){return r(),o("div",null,[c,s("p",null,[n("该案例中的 template 字符串为："),s("code",null,"<div>"+l(a.message)+"</div>",1),n("，经过 compile 编译后的对象为：")]),F,s("ul",null,[y,i,D,s("li",null,[n("children：html 元素内部的子元素，由此可看出 ast 是一个树状结果，根节点下将包含子元素，子元素中将包含孙元素，以此类推；children 是一个数组，因为 div 内可以包含多个 DOM，这里的 children 即 "),s("code",null,l(a.message),1),n("，static 属性代表是否为静态属性，如果是静态属性，在 render 的 diff 算法时会被略过，但是小程序使用 setData 做状态更新和渲染，所以不会涉及这个属性。")])]),C,s("p",null,[n("这里省略了具体实现，只包含了主干，parse 最终返回值是 root，可见 root 就是最终返回的 ast 对象，而 parseHTML 就是具体生成 ast 的方法，具体解析流程如下，这里以 "),s("code",null,"<div>"+l(a.data)+"</div>",1),n(" 为例，通过 parseHTML 流程的分析，我们可以体会 HTML 解析的原理：")]),m,s("p",null,[n("通过上述过程最终会得到一个根节点为 div 的 ast，其中包含一个 children，children 的内容为 "),s("code",null,l(a.message),1),n("。这里 parseHTML 的逻辑与 Vue 完全一致，因为小程序的 template 也是类 HTML 格式，所以解析流程是一致的。")])])}const _=e(t,[["render",A]]);export{f as __pageData,_ as default};
