import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Tabs, Row, Col, Card, Image, Tag, Space, Avatar } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { styled } from "styled-components";
import { Container } from "@components/Container";
import links from "@package_navigation/constant/link";
import { navData, navMap } from "@package_navigation/constant/search";
import { useAgentSetting } from "@plugins/agent";
import { useRequest } from "ahooks";
import {
  GetBookmarkPromotionMarketCollects,
  GetBookmarkPromotionMarketTeams,
  GetBookmarkPromotionMarketCollectParticipants,
} from "@services/bookmark";
import Favorite from "@components/Favorite";
import Team from "@components/Team";

const ApplicationRoot = styled(Card)`
  &:hover {
    cursor: pointer;
  }
`;

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

const Application = ({ thumb, title, desc, onClick }) => {
  return (
    <ApplicationRoot
      bodyStyle={{ display: "flex", alignItems: "center", padding: 14 }}
      onClick={() => typeof onClick === "function" && onClick()}
    >
      <Image src={thumb} width={36} height={36} preview={false} />
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

const ExtensionGrid = ({ records, children }) => {
  return (
    <Row
      gutter={[
        { xs: 8, sm: 12 },
        { xs: 8, sm: 12 },
      ]}
    >
      {records.map((item, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          {children && children(item)}
        </Col>
      ))}
    </Row>
  );
};

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

const Extension = styled.div`
  width: 100%;
`;

const ExtensionTabs = styled(Tabs)`
  &.ant-tabs-left .ant-tabs-tabpane {
    padding-left: 0 !important;
  }
`;

const ExtensionCard = styled.div`
  background-color: #fff;
  height: 304px;
  border-radius: 8px;
  overflow: hidden;
`;

const ExtensionContent = styled.div`
  box-sizing: border-box;
  padding: 16px;
  height: 304px;
  overflow-y: auto;
`;

const ExtensionLabel = styled.span`
  font-size: 12px;
  color: #5f5f5f;
`;

const FavoriteList = ({ sort }) => {
  const navigate = useNavigate();
  const { data: favorite } = useRequest(GetBookmarkPromotionMarketCollects, {
    defaultParams: [
      {
        orderSort: sort,
      },
    ],
  });

  return (
    <ExtensionContent>
      <ExtensionGrid records={favorite?.rows || []}>
        {(item) => (
          <Favorite
            key={item.id}
            title={item.title}
            name={item.userName}
            avatar={item.photoUrl}
            count={item.count}
            likeCount={item.likeNumber}
            onGo={() => navigate("./collect/" + item.id)}
          />
        )}
      </ExtensionGrid>
    </ExtensionContent>
  );
};

const TeamList = ({ sort }) => {
  const navigate = useNavigate();
  const { data: team } = useRequest(GetBookmarkPromotionMarketTeams, {
    defaultParams: [
      {
        orderSort: sort,
      },
    ],
  });

  return (
    <ExtensionContent>
      <ExtensionGrid records={team?.rows || []}>
        {(item) => (
          <Team
            key={item.id}
            title={item.title}
            desc={item.description}
            thumb={item.iconUri}
            tags={item.tagVoList}
            name={item.userName}
            avatar={item.photoUrl}
            onGo={() => navigate("./team/" + item.id)}
          />
        )}
      </ExtensionGrid>
    </ExtensionContent>
  );
};

const UserList = () => {
  const { data: teams } = useRequest(
    GetBookmarkPromotionMarketCollectParticipants
  );

  return (
    <ExtensionCard>
      <ExtensionContent>
        <Space wrap>
          {(teams?.rows || []).map((item) => (
            <Tag
              style={{ cursor: "pointer" }}
              bordered={false}
              color="processing"
              icon={<Avatar src={item.photoUrl} size={16} />}
              key={item.id}
            >
              &nbsp;{item.userName}
            </Tag>
          ))}
        </Space>
      </ExtensionContent>
    </ExtensionCard>
  );
};

const TabItem = ({ src, title }) => (
  <>
    <Image src={src} width={30} height={30} preview={false} />
    <br />
    <ExtensionLabel>{title}</ExtensionLabel>
  </>
);

const ShareCard = () => {
  return (
    <Extension>
      <Row gutter={16}>
        <Col xs={24} md={18} lg={20}>
          <ExtensionCard>
            <ExtensionTabs
              tabBarGutter={0}
              tabPosition="left"
              renderTabBar={(props, DefaultTabbar) => (
                <div style={{ paddingBlock: "16px" }}>
                  <DefaultTabbar {...props} />
                </div>
              )}
              items={[
                {
                  key: "1",
                  label: <TabItem src="./imgs/nav/1.png" title="最新云夹" />,
                  children: <FavoriteList sort="new" />,
                },
                {
                  key: "2",
                  label: <TabItem src="./imgs/nav/2.png" title="最新团队" />,
                  children: <TeamList sort="new" />,
                },
                {
                  key: "3",
                  label: <TabItem src="./imgs/nav/3.png" title="热门云夹" />,
                  children: <FavoriteList sort="up" />,
                },
                {
                  key: "4",
                  label: <TabItem src="./imgs/nav/4.png" title="热门团队" />,
                  children: <TeamList sort="up" />,
                },
              ]}
            />
          </ExtensionCard>
        </Col>
        <Col xs={0} md={6} lg={4}>
          <UserList />
        </Col>
      </Row>
    </Extension>
  );
};

const SearchBar = () => {
  const [navTabKey, setNavTabKey] = useState("internal");
  const [navCategoryKey, setNavCategoryKey] = useState("");
  const { agentSetting } = useAgentSetting();

  const navTabs = navData.map(({ children, ...rest }) => ({ ...rest }));

  const navCategorys =
    navData.find((item) => item.key === navTabKey)?.children || [];

  const navCategory = navCategorys.find((item) => item.key === navCategoryKey);

  useEffect(() => {
    setNavCategoryKey(navCategorys.length ? navCategorys[0].key : "");
  }, [navCategorys]);

  return (
    <SearchPanel>
      <SearchPrefix>
        <Image
          src={agentSetting?.weblogoUrl}
          width={72}
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
      <Input.Search
        autoFocus
        placeholder={"搜索" + (navCategory?.label || "")}
        size="large"
        onSearch={(keyword) => {
          keyword.trim() &&
            navMap[navCategoryKey] &&
            navMap[navCategoryKey](keyword || "");
        }}
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
  );
};

const Component = () => {
  return (
    <Container $gutter={[16, 24]}>
      <SearchBar />
      <ShareCard />
      {links.map((item, index) => (
        <Fragment key={index}>
          <SectionHeader icon={<AppstoreOutlined />} title={item.name} />
          <Row
            gutter={[
              { xs: 8, sm: 12, md: 18, lg: 20 },
              { xs: 4, sm: 8, md: 12, lg: 16 },
            ]}
          >
            {item.siteList.map((site, index) => (
              <Col xs={12} sm={8} md={6} lg={4} key={index}>
                <Application
                  thumb={"./imgs/site/" + site.icon}
                  title={site.name}
                  desc={site.desc}
                  onClick={() => window.open(site.url)}
                />
              </Col>
            ))}
          </Row>
        </Fragment>
      ))}
    </Container>
  );
};

export default Component;
