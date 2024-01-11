import { useState, useEffect } from "react";
import {
  Tabs,
  Card,
  Avatar,
  Space,
  Image,
  Row,
  Col,
  Tag,
  Pagination,
} from "antd";
import { useRequest } from "ahooks";
import {
  GetBookmarkMarketCategorys,
  GetBookmarkMarketCollects,
  GetBookmarkMarketTeams,
} from "@services/bookmark";
import Container from "@components/Container";
import { styled } from "styled-components";

const PAGE_SIZE = 16;

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
  const [pageNum, setPageNum] = useState(1);
  const { data: bookmarkTeam } = useRequest(
    () =>
      GetBookmarkMarketTeams({
        classId,
        pageNum,
        pageSize: PAGE_SIZE,
        searchKey: "",
      }),
    { refreshDeps: [classId, pageNum] }
  );

  return (
    <Container title={false} gutter={[12, 24]}>
      <div style={{ minHeight: 480 }}>
        <Row
          gutter={[
            { xs: 8, sm: 12, md: 18, lg: 20 },
            { xs: 4, sm: 8, md: 12, lg: 16 },
          ]}
        >
          {(bookmarkTeam?.rows || []).map((item) => (
            <Col xs={12} sm={8} lg={6} key={item.id}>
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
      </div>

      <Pagination
        style={{ textAlign: "center" }}
        current={pageNum}
        size={PAGE_SIZE}
        onChange={setPageNum}
        total={bookmarkTeam?.total || 0}
        showSizeChanger={false}
      />
    </Container>
  );
};

const CollectView = ({ classId }) => {
  const [pageNum, setPageNum] = useState(1);
  const { data: bookmarkCollect } = useRequest(
    () =>
      GetBookmarkMarketCollects({
        classId,
        pageNum,
        pageSize: PAGE_SIZE,
        searchKey: "",
      }),
    { refreshDeps: [classId, pageNum] }
  );

  return (
    <Container title={false} gutter={[12, 24]}>
      <div style={{ minHeight: 480 }}>
        <Row
          gutter={[
            { xs: 8, sm: 12, md: 18, lg: 20 },
            { xs: 4, sm: 8, md: 12, lg: 16 },
          ]}
        >
          {(bookmarkCollect?.rows || []).map((item) => (
            <Col xs={12} sm={8} lg={6} key={item.id}>
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
      </div>
      <Pagination
        style={{ textAlign: "center" }}
        current={pageNum}
        size={PAGE_SIZE}
        onChange={setPageNum}
        total={bookmarkCollect?.total || 0}
        showSizeChanger={false}
      />
    </Container>
  );
};

const SubTypeView = ({ typeKey }) => {
  const { data: bookmarkCategorys } = useRequest(GetBookmarkMarketCategorys);
  const [navCategoryKey, setNavCategoryKey] = useState("");

  useEffect(() => {
    setNavCategoryKey("");
  }, [typeKey]);

  return (
    <>
      <CategoryBar
        size="small"
        animated={false}
        activeKey={navCategoryKey}
        items={[
          {
            label: "全部",
            key: "",
          },
          ...(bookmarkCategorys || []).map((item) => ({
            label: item.title,
            key: item.id,
          })),
        ]}
        onChange={setNavCategoryKey}
      />

      {typeKey === "team" && (
        <TeamView classId={navCategoryKey} key={navCategoryKey} />
      )}
      {typeKey === "collect" && (
        <CollectView classId={navCategoryKey} key={navCategoryKey} />
      )}
    </>
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
  const [navTabKey, setNavTabKey] = useState("team");
  return (
    <>
      <BannerPanel>
        <Container title={false} gutter={[12, 24]}>
          <Title>发现你身边有趣好玩的事物</Title>
          <Desc>发现·收藏·分享--记忆·兴趣·智慧</Desc>
        </Container>
      </BannerPanel>
      <Container title={false} gutter={[12, 0]}>
        <NavBar
          activeKey={navTabKey}
          items={[
            { key: "team", label: "优秀团队" },
            { key: "collect", label: "收藏集" },
          ]}
          onChange={setNavTabKey}
        />
        <SubTypeView typeKey={navTabKey} />
      </Container>
    </>
  );
};

export default Component;
