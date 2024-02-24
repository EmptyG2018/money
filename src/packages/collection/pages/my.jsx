import { useState, useEffect, useRef, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Pagination } from "antd";
import { useRequest } from "ahooks";
import { GetMyCollectLikes } from "@services/collection/collect";
import { GetMyTeamLikes } from "@services/collection/team";
import {
  ResourceSearch,
  HeaderPanel,
} from "@components/collection/HeaderPanel";
import { ProCard } from "@ant-design/pro-components";
import ToggleCollapsedBtn from "@components/collection/ToggleCollapsedBtn";
import Team from "@components/Team";
import Favorite from "@components/Favorite";
import styled from "styled-components";

const SearchContext = createContext("");

const PAGE_SIZE = 16;

const DataPlaceholder = styled.div`
  height: calc(100vh - 198px);
  overflow-y: auto;
`;

const FavoriteList = ({ list }) => {
  const navigate = useNavigate();

  return (
    <DataPlaceholder>
      <Row
        gutter={[
          { xs: 8, sm: 12, md: 18, lg: 20 },
          { xs: 4, sm: 8, md: 12, lg: 16 },
        ]}
      >
        {(list?.rows || []).map((item) => (
          <Col xs={24} sm={12} lg={6} key={item.id}>
            <Favorite
              title={item.title}
              name={item.userName}
              count={item.count}
              likeCount={item.likeNumber}
              viewNumber={item.viewNumber}
              avatar={item.photoUrl}
              onGo={() => navigate("/navigation/collect/" + item.id)}
            />
          </Col>
        ))}
      </Row>
    </DataPlaceholder>
  );
};

const TeamList = ({ list }) => {
  return (
    <DataPlaceholder>
      <Row
        gutter={[
          { xs: 8, sm: 12, md: 18, lg: 20 },
          { xs: 4, sm: 8, md: 12, lg: 16 },
        ]}
      >
        {(list?.rows || []).map((item) => (
          <Col xs={24} sm={12} lg={6} key={item.id}>
          <Team
            title={item.title}
            desc={item.description}
            thumb={item.iconUri}
            tags={item.tagVoList}
            name={item.userName}
            avatar={item.photoUrl}
            onGo={() => navigate("/navigation/team/" + item.id)}
          />
          </Col>
        ))}
      </Row>
    </DataPlaceholder>
  );
};

const FavoriteView = () => {
  const keyword = useContext(SearchContext);
  const pageNum = useRef(1);

  const { data: favorite, refresh: refreshFavorites } = useRequest(() =>
    GetMyCollectLikes({
      title: keyword,
      pageNum: pageNum.current,
      pageSize: PAGE_SIZE,
    })
  );

  return (
    <>
      <FavoriteList list={favorite} />
      <Pagination
        style={{ textAlign: "center", marginBlockStart: 32 }}
        defaultCurrent={pageNum.current}
        pageSize={PAGE_SIZE}
        total={favorite?.total}
        onChange={(current) => {
          pageNum.current = current;
          refreshFavorites();
        }}
      />
    </>
  );
};

const TeamView = () => {
  const keyword = useContext(SearchContext);
  const pageNum = useRef(1);

  const { data: team, refresh: refreshTeams } = useRequest(() =>
    GetMyTeamLikes({
      title: keyword,
      pageNum: pageNum.current,
      pageSize: PAGE_SIZE,
    })
  );

  return (
    <>
      <TeamList list={team} />
      <Pagination
        style={{ textAlign: "center", marginBlockStart: 32 }}
        current={pageNum.current}
        pageSize={PAGE_SIZE}
        total={team?.total}
        onChange={(current) => {
          pageNum.current = current;
          refreshTeams();
        }}
      />
    </>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  height: 0;
  overflow-y: auto;
`;

export default () => {
  const [keyword, setKeyword] = useState("");

  return (
    <Content>
      <HeaderPanel
        title={
          <>
            <ToggleCollapsedBtn />
            <ResourceSearch placeholder="请输入关键词" onSearch={setKeyword} />
          </>
        }
      />
      <Container>
        <SearchContext.Provider value={keyword}>
          <ProCard
            colSpan={{ sm: 24, md: 16, lg: 18 }}
            tabs={{
              destroyInactiveTabPane: true,
              items: [
                {
                  label: `收藏夹`,
                  key: "collect",
                  children: <FavoriteView />,
                },
                {
                  label: `公开团队`,
                  key: "team",
                  children: <TeamView />,
                },
              ],
            }}
          ></ProCard>
        </SearchContext.Provider>
      </Container>
    </Content>
  );
};
