import { useEffect, useState, useMemo } from "react";
import { Input, Tabs, Row, Col, Card, Image } from "antd";
import { QqOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import { styled } from "styled-components";

const ApplicationRoot = styled(Card)``;

const ApplicationThumb = styled(Image)``;

const ApplicationCell = styled.div`
  margin-left: 8px;
  flex: 1 0 0;
  width: 0;
`;

const ApplicationTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  padding: 0;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ApplicationDesc = styled.p`
  padding: 0;
  margin: 0;
  font-size: 12px;
  color: #6c757d;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Application = ({ thumb, title, desc }) => {
  return (
    <ApplicationRoot
      bodyStyle={{ display: "flex", alignItems: "center", padding: 14 }}
    >
      <ApplicationThumb src={thumb} width={36} height={36} preview={false} />
      <ApplicationCell>
        <ApplicationTitle>{title}</ApplicationTitle>
        <ApplicationDesc>{desc}</ApplicationDesc>
      </ApplicationCell>
    </ApplicationRoot>
  );
};

const SectionHeaderRoot = styled.div`
  display: flex;
  padding: 8px 0;
  margin: 24px 0 8px 0;
`;
const SectionHeaderIcon = styled.div`
  margin-right: 4px;
`;
const SectionHeaderTitle = styled.p`
  padding: 0;
  margin: 0;
`;

const SectionHeader = ({ icon, title }) => {
  return (
    <SectionHeaderRoot>
      {icon && <SectionHeaderIcon>{icon}</SectionHeaderIcon>}
      <SectionHeaderTitle>{title}</SectionHeaderTitle>
    </SectionHeaderRoot>
  );
};

const SearchPanel = styled.div`
  max-width: 640px;
  margin: 0 auto;
  margin-bottom: 32px;
`;

const SearchPrefix = styled.div`
  padding: 48px 0;
  text-align: center;
`;

const NavBar = styled(Tabs)`
  .ant-tabs-nav::before {
    border-bottom: none;
  }
`;

const CategoryBar = styled(NavBar)`
  .ant-tabs-tab-btn {
    color: #5f5f5f;
  }
  .ant-tabs-ink-bar {
    background: none;
  }
`;

const Search = styled(Input.Search)``;

const Extension = styled.div`
  width: 100%;
  height: 280px;
  background-color: #fff;
`;

const Component = () => {
  const navData = [
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
          label: "收藏夹",
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

  const apps = [
    {
      thumb:
        "https://ai-bot.cn/wp-content/uploads/2023/03/paddlepaddle-icon.png",
      title: "磁力云",
      desc: "急速下载和在线观看",
    },
    {
      thumb:
        "https://ai-bot.cn/wp-content/uploads/2023/03/paddlepaddle-icon.png",
      title: "视频转换器",
      desc: "视频转换+压缩",
    },
    {
      thumb:
        "https://ai-bot.cn/wp-content/uploads/2023/03/paddlepaddle-icon.png",
      title: "云盘钥匙",
      desc: "破解网盘提取码...",
    },
    {
      thumb:
        "https://ai-bot.cn/wp-content/uploads/2023/03/paddlepaddle-icon.png",
      title: "云盘钥匙",
      desc: "破解网盘提取码...",
    },
    {
      thumb:
        "https://ai-bot.cn/wp-content/uploads/2023/03/paddlepaddle-icon.png",
      title: "云盘钥匙",
      desc: "破解网盘提取码...",
    },
    {
      thumb:
        "https://ai-bot.cn/wp-content/uploads/2023/03/paddlepaddle-icon.png",
      title: "云盘钥匙",
      desc: "破解网盘提取码...",
    },
    {
      thumb:
        "https://ai-bot.cn/wp-content/uploads/2023/03/paddlepaddle-icon.png",
      title: "云盘钥匙",
      desc: "破解网盘提取码...",
    },
    {
      thumb:
        "https://ai-bot.cn/wp-content/uploads/2023/03/paddlepaddle-icon.png",
      title: "云盘钥匙",
      desc: "破解网盘提取码...",
    },
    {
      thumb:
        "https://ai-bot.cn/wp-content/uploads/2023/03/paddlepaddle-icon.png",
      title: "云盘钥匙",
      desc: "破解网盘提取码...",
    },
    {
      thumb:
        "https://ai-bot.cn/wp-content/uploads/2023/03/paddlepaddle-icon.png",
      title: "云盘钥匙",
      desc: "破解网盘提取码...",
    },
    {
      thumb:
        "https://ai-bot.cn/wp-content/uploads/2023/03/paddlepaddle-icon.png",
      title: "云盘钥匙",
      desc: "破解网盘提取码...",
    },
    {
      thumb:
        "https://ai-bot.cn/wp-content/uploads/2023/03/paddlepaddle-icon.png",
      title: "云盘钥匙",
      desc: "破解网盘提取码...",
    },
  ];

  const [navTabKey, setNavTabKey] = useState("internal");

  const [navCategoryKey, setNavCategoryKey] = useState("");

  const navTabs = navData.map(({ children, ...rest }) => ({ ...rest }));

  const navCategorys = useMemo(
    () => navData.find((item) => item.key === navTabKey)?.children || [],
    [navTabKey]
  );

  const navCategory = useMemo(
    () => navCategorys.find((item) => item.key === navCategoryKey),
    [navCategorys, navCategoryKey]
  );

  useEffect(() => {
    setNavCategoryKey(navCategorys.length ? navCategorys[0].key : "");
  }, [navCategorys]);

  return (
    <PageContainer title={false}>
      <SearchPanel>
        <SearchPrefix>
          <Image
            src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
            height={72}
            preview={false}
          />
        </SearchPrefix>
        <NavBar
          centered
          activeKey={navTabKey}
          items={navTabs}
          onChange={setNavTabKey}
        />
        <Search
          autoFocus
          placeholder={"搜索" + (navCategory?.label || "")}
          size="large"
        />
        <CategoryBar
          size="small"
          animated={false}
          centered
          activeKey={navCategoryKey}
          items={navCategorys}
          onChange={setNavCategoryKey}
        />
      </SearchPanel>

      <Extension></Extension>

      <SectionHeader icon={<QqOutlined />} title="腾讯专区" />
      <Row
        gutter={[
          { xs: 8, sm: 12, md: 18, lg: 20 },
          { xs: 4, sm: 8, md: 12, lg: 16 },
        ]}
      >
        {apps.map((item) => (
          <Col xs={12} sm={8} md={6} lg={4}>
            <Application
              thumb={item.thumb}
              title={item.title}
              desc={item.desc}
            />
          </Col>
        ))}
      </Row>

      <SectionHeader icon={<QqOutlined />} title="腾讯专区" />
      <Row
        gutter={[
          { xs: 8, sm: 12, md: 18, lg: 20 },
          { xs: 4, sm: 8, md: 12, lg: 16 },
        ]}
      >
        {apps.map((item) => (
          <Col xs={12} sm={8} md={6} lg={4}>
            <Application
              thumb={item.thumb}
              title={item.title}
              desc={item.desc}
            />
          </Col>
        ))}
      </Row>
    </PageContainer>
  );
};

export default Component;
