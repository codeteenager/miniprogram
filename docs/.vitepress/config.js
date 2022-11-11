module.exports = {
    title: '揭秘小程序',
    description: '小程序技术重难点分析',
    base: '/miniprogram/',
    themeConfig: {
        // siteTitle: false,
        // logo: "/logo.svg",
        nav: [
            {
                text: '博文',
                link: "/guide/index"
            }
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present codeteenager'
        },
        socialLinks: [{ icon: "github", link: "https://github.com/codeteenager/miniprogram" }],
        sidebar: {
            "/guide/": [
                {
                    text: "引言",
                    items: [
                        {
                            text: "介绍",
                            link: "/guide/index",
                        },
                        {
                            text: "技术分享",
                            link: "/guide/share",
                        }
                    ],
                },
                {
                    text: "微信小程序原理",
                    items: [
                        {
                            text: "介绍",
                            link: "/guide/wx-index",
                        }
                    ],
                }
            ],
        },
        docFooter: {
            prev: '上一页',
            next: '下一页'
        }
    }
}