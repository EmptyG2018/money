import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, Row, Col, Pagination } from "antd";
import { useRequest } from "ahooks";
import {
  GetBookmarkMarketCategorys,
  GetBookmarkMarketCollects,
  GetBookmarkMarketTeams,
} from "@services/bookmark";
import { Container } from "@components/Container";
import Team from "@components/Team";
import Favorite from "@components/Favorite";
import styled from "styled-components";

const PAGE_SIZE = 16;

const View = styled.div`
  min-height: 520px;
  padding-block: 16px;
`;

const TeamView = ({ classId }) => {
  const navigate = useNavigate();
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
    <>
      <View>
        <Row
          gutter={[
            { xs: 8, sm: 12, md: 18, lg: 20 },
            { xs: 4, sm: 8, md: 12, lg: 16 },
          ]}
        >
          {(bookmarkTeam?.rows || []).map((item) => (
            <Col xs={12} sm={8} lg={6} key={item.id}>
              <Team
                key={item.id}
                title={item.title}
                desc={item.description}
                thumb={item.iconUri}
                tags={item.tagVoList}
                name={item.userName}
                avatar={item.photoUrl}
                onGo={() => navigate("../team/" + item.id)}
              />
            </Col>
          ))}
        </Row>
      </View>
      <Pagination
        style={{ textAlign: "center", marginBlockStart: 32 }}
        current={pageNum}
        size={PAGE_SIZE}
        onChange={setPageNum}
        total={bookmarkTeam?.total || 0}
        showSizeChanger={false}
      />
    </>
  );
};

const CollectView = ({ classId }) => {
  const navigate = useNavigate();
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
    <>
      <View>
        <Row
          gutter={[
            { xs: 8, sm: 12, md: 18, lg: 20 },
            { xs: 4, sm: 8, md: 12, lg: 16 },
          ]}
        >
          {(bookmarkCollect?.rows || []).map((item) => (
            <Col xs={12} sm={8} lg={6} key={item.id}>
              <Favorite
                key={item.id}
                title={item.title}
                name={item.userName}
                avatar={item.photoUrl}
                onGo={() => navigate("../collect/" + item.id)}
              />
            </Col>
          ))}
        </Row>
      </View>
      <Pagination
        style={{ textAlign: "center" }}
        current={pageNum}
        size={PAGE_SIZE}
        onChange={setPageNum}
        total={bookmarkCollect?.total || 0}
        showSizeChanger={false}
      />
    </>
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
      <TabWrap>
        <Container $gutter={[16, 0]}>
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
        </Container>
      </TabWrap>
      <Container $gutter={[16, 0]}>
        {typeKey === "team" && (
          <TeamView classId={navCategoryKey} key={navCategoryKey} />
        )}
        {typeKey === "collect" && (
          <CollectView classId={navCategoryKey} key={navCategoryKey} />
        )}
      </Container>
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

const TabWrap = styled.div`
  background-color: #fff;
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
        <Container $gutter={[16, 24]}>
          <Title>发现你身边有趣好玩的事物</Title>
          <Desc>发现·收藏·分享--记忆·兴趣·智慧</Desc>
        </Container>
      </BannerPanel>
      <TabWrap>
        <Container $gutter={[16, 0]}>
          <NavBar
            activeKey={navTabKey}
            items={[
              { key: "team", label: "优秀团队" },
              { key: "collect", label: "收藏集" },
            ]}
            onChange={setNavTabKey}
          />
        </Container>
      </TabWrap>
      <SubTypeView typeKey={navTabKey} />
    </>
  );
};

export default Component;
