import { Tabs, Card, Avatar, Space, Image, Row, Col, Tag } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import { useState } from "react";
import { styled } from "styled-components";

const TeamRoot = styled(Card)``;

const TeamCell = styled.div`
  min-height: 52px;
`;

const TeamThumb = styled(Image)`
  margin-bottom: 6px;
`;

const TeamTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 15px;
  color: #000;
`;

const TeamDesc = styled.p`
  margin: 0;
  padding: 0;
  color: #5f5f5f;
  font-size: 12px;
`;

const TeamTag = styled(Tag)`
  border: none;
  line-height: 18px;
  padding-inline: 4px;
  color: rgba(0, 0, 0, .48);
`;

const TeamInfo = styled.div``;

const TeamInfoItem = styled.span`
  color: #666;
  font-size: 12px;
`;

const TeamDate = styled.div`
  color: #666;
  font-size: 12px;
  text-align: right;
`;

const Team = ({ title, desc, thumb, tags, name, avatar, date }) => {
  return (
    <TeamRoot
      bodyStyle={{ display: "flex", flexDirection: "column", padding: 14 }}
    >
      <Row>
        <Col xs={{ md: 24, order: 2 }} md={{ span: 14, order: 1 }}>
          <TeamCell>
            <TeamTitle>{title}</TeamTitle>
            <TeamDesc>{desc}</TeamDesc>
            {tags.map((item, index) => (
              <TeamTag bordered={false} key={index}>{item}</TeamTag>
            ))}
          </TeamCell>
        </Col>
        <Col xs={{ md: 24, order: 1 }} md={{ span: 10, order: 2 }}>
          <TeamThumb width="100%" preview={false} src={thumb} />
        </Col>
      </Row>
      <Row style={{ display: "flex", alignItems: "center" }}>
        <Col xs={24} md={12}>
          <TeamInfo>
            <Space size={6}>
              <Avatar size={14} src={avatar} />
              <TeamInfoItem>{name}</TeamInfoItem>
              <TeamInfoItem>0</TeamInfoItem>
              <TeamInfoItem>0</TeamInfoItem>
              <TeamInfoItem>0</TeamInfoItem>
            </Space>
          </TeamInfo>
        </Col>
        <Col xs={24} md={12}>
          <TeamDate>{date}</TeamDate>
        </Col>
      </Row>
    </TeamRoot>
  );
};

const BannerPanel = styled.div`
  background-color: #1677ff;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Desc = styled.p`
  font-size: 14px;
`;

const FilterPanel = styled.div`
  margin-bottom: 12px;
`;

const FilterPanelContainer = styled(PageContainer)`
  .ant-pro-page-container-children-container {
    padding-block: 8px;
  }
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

const Container = styled(PageContainer)`
  .ant-pro-page-container-children-container {
    padding-block: 0;
  }
`;

const Component = () => {
  const navTabs = [
    { key: "a", label: "优秀团队" },
    { key: "b", label: "收藏夹" },
  ];
  const navCategorys = [
    { key: "_", label: "全部" },
    { key: "a", label: "英语" },
    { key: "b", label: "数学" },
    { key: "c", label: "语文" },
    { key: "d", label: "体育" },
    { key: "e", label: "大学" },
    { key: "f", label: "测试" },
    { key: "g", label: "巨额" },
    { key: "h", label: "奖金" },
    { key: "i", label: "形容" },
    { key: "j", label: "行额" },
  ];

  const records = new Array(10).fill({
    title: "百度大数据",
    desc: "百度大数据",
    thumb:
      "https://pptwd.oss-cn-shenzhen.aliyuncs.com/yj/static/img/2023/04/17/1682985472956.png",
    tags: ["你好"],
    name: "jon",
    avatar:
      "https://himg.bdimg.com/sys/portraitn/item/public.1.5c0e99fc.N38xm64QGsEOc2YffDzNsA",
    date: "2023-04-17",
  });

  const [navTabKey, setNavTabKey] = useState("a");

  const [navCategoryKey, setNavCategoryKey] = useState("_");

  return (
    <>
      <BannerPanel>
        <PageContainer title={false}>
          <Title>发现你身边有趣好玩的事物</Title>
          <Desc>发现·收藏·分享--记忆·兴趣·智慧</Desc>
        </PageContainer>
      </BannerPanel>
      <FilterPanel>
        <FilterPanelContainer title={false}>
          <NavBar
            activeKey={navTabKey}
            items={navTabs}
            onChange={setNavTabKey}
          />
          <CategoryBar
            size="small"
            animated={false}
            activeKey={navCategoryKey}
            items={navCategorys}
            onChange={setNavCategoryKey}
          />
        </FilterPanelContainer>
      </FilterPanel>

      <Container title={false}>
        <Row
          gutter={[
            { xs: 8, sm: 12, md: 18, lg: 20 },
            { xs: 4, sm: 8, md: 12, lg: 16 },
          ]}
        >
          {records.map((item) => (
            <Col xs={12} sm={8} lg={6}>
              <Team
                title={item.title}
                desc={item.desc}
                thumb={item.thumb}
                tags={item.tags}
                name={item.name}
                avatar={item.avatar}
                date={item.date}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Component;
