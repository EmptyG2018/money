export const navData = [
  {
    key: "internal",
    label: "站内",
    children: [
      {
        key: "internal_publicity_team",
        label: "公开团队",
      },
      {
        key: "internal_collect",
        label: "收藏集",
      },
    ],
  },
  {
    key: "common_use",
    label: "常用",
    children: [
      {
        key: "common_use_baidu",
        label: "百度",
      },
      {
        key: "common_use_google",
        label: "谷歌",
      },
      {
        key: "common_use_taobao",
        label: "淘宝",
      },
      {
        key: "common_use_bing",
        label: "bing",
      },
    ],
  },
  {
    key: "search",
    label: "搜索",
    children: [
      {
        key: "search_baidu",
        label: "百度",
      },
      {
        key: "search_google",
        label: "谷歌",
      },
      {
        key: "search_360",
        label: "360",
      },
      {
        key: "search_bing",
        label: "bing",
      },
    ],
  },
  {
    key: "tool",
    label: "工具",
    children: [
      {
        key: "tool_zindex",
        label: "权重查询",
      },
      {
        key: "tool_link",
        label: "友链检测",
      },
      {
        key: "tool_record",
        label: "备案查询",
      },
      {
        key: "tool_ping",
        label: "PING查询",
      },
    ],
  },
  {
    key: "community",
    label: "社区",
    children: [
      {
        key: "community_zhihu",
        label: "知乎",
      },
      {
        key: "community_wechat",
        label: "微信",
      },
      {
        key: "community_weibo",
        label: "微博",
      },
      {
        key: "community_douban",
        label: "豆瓣",
      },
    ],
  },
  {
    key: "live",
    label: "生活",
    children: [
      {
        key: "live_taobao",
        label: "淘宝",
      },
      {
        key: "live_jd",
        label: "京东",
      },
      {
        key: "live_12306",
        label: "12306",
      },
    ],
  },
  {
    key: "job",
    label: "求职",
    children: [
      {
        key: "job_zhilian",
        label: "智联招聘",
      },
      {
        key: "job_qiancheng",
        label: "前程无忧",
      },
      {
        key: "job_lagou",
        label: "拉钩",
      },
      {
        key: "job_liepin",
        label: "猎聘",
      },
    ],
  },
];


export const navMap = {
  'internal_publicity_team': () => window.open('/??'),
  'internal_collect': () => window.open('/??'),
  'common_use_baidu': (keyword) => window.open(`https://www.baidu.com/s?wd=${keyword}`),
  'common_use_google': (keyword) => window.open(`https://www.google.com/search?q=${keyword}`),
  'common_use_taobao': (keyword) => window.open(`https://s.taobao.com/search?page=1&q=${keyword}`),
  'common_use_bing': (keyword) => window.open(`https://cn.bing.com/search?q=${keyword}`),
  'search_baidu': (keyword) => window.open(`https://www.baidu.com/s?wd=${keyword}`),
  'search_google': (keyword) => window.open(`https://www.google.com/search?q=${keyword}`),
  'search_360': (keyword) => window.open(`https://www.so.com/s?q=${keyword}`),
  'search_bing': (keyword) => window.open(`https://cn.bing.com/search?q=${keyword}`),
  'tool_zindex': (keyword) => window.open(`https://rank.chinaz.com/all/${keyword}`),
  'tool_link': (keyword) => window.open(`https://link.chinaz.com/${keyword}`),
  'tool_record': (keyword) => window.open(`https://icp.aizhan.com:6666/${keyword}`),
  'tool_ping': (keyword) => window.open(`https://ping.chinaz.com/${keyword}`),
  'community_zhihu': (keyword) => window.open(`https://www.zhihu.com/search?type=content&q=${keyword}`),
  'community_wechat': (keyword) => window.open(`https://weixin.sogou.com/weixin?type=2&query=${keyword}`),
  'community_weibo': (keyword) => window.open(`https://s.weibo.com/weibo/${keyword}`),
  'community_douban': (keyword) => window.open(`https://www.douban.com/search?q=${keyword}`),
  'live_taobao': (keyword) => window.open(`https://s.taobao.com/search?page=1&q=${keyword}`),
  'live_jd': (keyword) => window.open(`https://search.jd.com/Search?keyword=${keyword}`),
  'live_12306': (keyword) => window.open(`https://www.12306.cn/${keyword}`),
  'job_zhilian': (keyword) => window.open(`https://sou.zhaopin.com/?kw=${keyword}`),
  'job_qiancheng': (keyword) => window.open(`https://we.51job.com/pc/search?keyword=${keyword}`),
  'job_lagou': (keyword) => window.open(`https://www.lagou.com/jobs/list_${keyword}`),
  'job_liepin': (keyword) => window.open(`https://www.liepin.com/zhaopin/?key=${keyword}`)
}