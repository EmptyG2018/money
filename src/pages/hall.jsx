import { Tabs, Card, Avatar, Space, Image, Row, Col, Tag } from "antd";
import { useState } from "react";
import { styled } from "styled-components";
import Container from "../components/Container";
import {
  useHallCagegory,
  useMarkTeam,
  useMarketCollection,
} from "../hooks/hall";

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
  color: rgba(0, 0, 0, 0.48);
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
              <TeamTag bordered={false} key={index}>
                {item}
              </TeamTag>
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

const TeamView = ({ classId }) => {
  const { teams } = useMarkTeam({
    classId,
    pageNum: 1,
    pageSize: 12,
    searchKey: "",
  });

  return (
    <Container title={false} gutter={[12, 24]}>
      <Row
        gutter={[
          { xs: 8, sm: 12, md: 18, lg: 20 },
          { xs: 4, sm: 8, md: 12, lg: 16 },
        ]}
      >
        {(teams?.rows || []).map((item) => (
          <Col xs={12} sm={8} lg={6}>
            <Team
              title={item.title}
              desc={item.description}
              thumb={item.iconUri}
              tags={item.tagVoList.map((item) => item.tagName)}
              name={item.userName}
              avatar={item.photoUrl}
              date={item.createTime}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

const CollectView = ({ classId }) => {
  const { collects } = useMarketCollection({
    classId,
    pageNum: 1,
    pageSize: 12,
    searchKey: "",
  });

  return (
    <Container title={false} gutter={[12, 24]}>
      <Row
        gutter={[
          { xs: 8, sm: 12, md: 18, lg: 20 },
          { xs: 4, sm: 8, md: 12, lg: 16 },
        ]}
      >
        {(collects?.rows || []).map((item) => (
          <Col xs={12} sm={8} lg={6}>
            <Team
              title={item.title}
              desc={item.description}
              thumb={item.iconUri}
              tags={item.tagVoList.map((item) => item.tagName)}
              name={item.userName}
              avatar={item.photoUrl}
              date={item.createTime}
            />
          </Col>
        ))}
      </Row>
    </Container>
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

const Component = () => {
  const { categorys } = useHallCagegory();

  const navTabs = [
    { key: "team", label: "优秀团队" },
    { key: "collect", label: "收藏夹" },
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

  const [navTabKey, setNavTabKey] = useState("team");

  const [navCategoryKey, setNavCategoryKey] = useState("");

  const viewMap = {
    team: TeamView,
    collect: CollectView,
  };

  return (
    <>
      <BannerPanel>
        <Container title={false} gutter={[12, 24]}>
          <Title>发现你身边有趣好玩的事物</Title>
          <Desc>发现·收藏·分享--记忆·兴趣·智慧</Desc>
        </Container>
      </BannerPanel>
      <Container title={false} gutter={[12, 0]}>
        <NavBar activeKey={navTabKey} items={navTabs} onChange={setNavTabKey} />
        <CategoryBar
          size="small"
          animated={false}
          activeKey={navCategoryKey}
          items={[
            {
              label: "全部",
              key: "",
            },
            ...categorys.map((item) => ({
              label: item.title,
              key: item.id,
            })),
          ]}
          onChange={setNavCategoryKey}
        />
      </Container>

      {viewMap[navTabKey] && viewMap[navTabKey]({ classId: navCategoryKey })}
    </>
  );
};

export default Component;
