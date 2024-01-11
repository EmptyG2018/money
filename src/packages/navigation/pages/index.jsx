import { Fragment, useEffect, useState } from "react";
import { Input, Tabs, Row, Col, Card, Image, Tag, Space, Avatar } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { styled } from "styled-components";
import Container from "@components/Container";
import links from "@package_navigation/constant/link";
import { navData, navMap } from "@package_navigation/constant/search";
import { useAgentSetting } from "@plugins/agent";
import { useRequest } from "ahooks";
import {
  GetBookmarkPromotionMarketCollects,
  GetBookmarkPromotionMarketTeams,
  GetBookmarkPromotionMarketCollectParticipants,
} from "@services/bookmark";

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

const TeamInfo = styled.div``;

const TeamInfoItem = styled.span`
  color: #666;
  font-size: 12px;
`;

const Team = ({ title, desc, thumb, name, avatar, date }) => {
  return (
    <TeamRoot
      bodyStyle={{ display: "flex", flexDirection: "column", padding: 14 }}
    >
      <Row>
        <Col span={16}>
          <TeamCell>
            <TeamTitle>{title}</TeamTitle>
            <TeamDesc>{desc}</TeamDesc>
          </TeamCell>
        </Col>
        <Col span={8}>
          <TeamThumb width="100%" preview={false} src={thumb} />
        </Col>
      </Row>
      <Row style={{ display: "flex", alignItems: "center" }}>
        <Col span={12}>
          <TeamInfo>
            <Space size={6}>
              <Avatar size={14} src={avatar} />
              <TeamInfoItem>{name}</TeamInfoItem>
            </Space>
          </TeamInfo>
        </Col>
        <Col span={12}></Col>
      </Row>
    </TeamRoot>
  );
};

const ExtensionGrid = ({ records, children }) => {
  return (
    <Row
      gutter={[
        { xs: 8, sm: 12 },
        { xs: 8, sm: 12 },
      ]}
    >
      {records.map((item, index) => (
        <Col xs={24} sm={12} lg={6} key={index}>
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

const Component = () => {
  const [navTabKey, setNavTabKey] = useState("internal");
  const [navCategoryKey, setNavCategoryKey] = useState("");
  const { agentSetting } = useAgentSetting();

  const { data: upCollects } = useRequest(GetBookmarkPromotionMarketCollects, {
    defaultParams: [
      {
        orderSort: "up",
      },
    ],
  });

  const { data: newCollects } = useRequest(GetBookmarkPromotionMarketCollects, {
    defaultParams: [
      {
        orderSort: "new",
      },
    ],
  });

  const { data: teams } = useRequest(
    GetBookmarkPromotionMarketCollectParticipants
  );

  const { data: upTeams } = useRequest(GetBookmarkPromotionMarketTeams, {
    defaultParams: [
      {
        orderSort: "up",
      },
    ],
  });

  const { data: newTeams } = useRequest(GetBookmarkPromotionMarketTeams, {
    defaultParams: [
      {
        orderSort: "new",
      },
    ],
  });

  const navTabs = navData.map(({ children, ...rest }) => ({ ...rest }));

  const navCategorys =
    navData.find((item) => item.key === navTabKey)?.children || [];

  const navCategory = navCategorys.find((item) => item.key === navCategoryKey);

  useEffect(() => {
    setNavCategoryKey(navCategorys.length ? navCategorys[0].key : "");
  }, [navCategorys]);

  return (
    <Container title={false} gutter={[16, 24]}>
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
                    label: (
                      <>
                        <Image
                          src="./imgs/nav/1.png"
                          width={30}
                          height={30}
                          preview={false}
                        />
                        <br />
                        <ExtensionLabel>最新云夹</ExtensionLabel>
                      </>
                    ),
                    key: "1",
                    children: (
                      <ExtensionContent>
                        <ExtensionGrid records={newCollects?.rows || []}>
                          {(item) => (
                            <Team
                              title={item.title}
                              desc={item.description}
                              thumb={item.iconUri}
                              name={item.userName}
                              avatar={item.photoUrl}
                            />
                          )}
                        </ExtensionGrid>
                      </ExtensionContent>
                    ),
                  },
                  {
                    label: (
                      <>
                        <Image
                          src="./imgs/nav/2.png"
                          width={30}
                          height={30}
                          preview={false}
                        />
                        <br />
                        <ExtensionLabel>最新团队</ExtensionLabel>
                      </>
                    ),
                    key: "2",
                    children: (
                      <ExtensionContent>
                        <ExtensionGrid records={newTeams?.rows || []}>
                          {(item) => (
                            <Team
                              title={item.title}
                              desc={item.description}
                              thumb={item.iconUri}
                              name={item.userName}
                              avatar={item.photoUrl}
                            />
                          )}
                        </ExtensionGrid>
                      </ExtensionContent>
                    ),
                  },
                  {
                    label: (
                      <>
                        <Image
                          src="./imgs/nav/3.png"
                          width={30}
                          height={30}
                          preview={false}
                        />
                        <br />
                        <ExtensionLabel>热门云夹</ExtensionLabel>
                      </>
                    ),
                    key: "3",
                    children: (
                      <ExtensionContent>
                        <ExtensionGrid records={upCollects?.rows || []}>
                          {(item) => (
                            <Team
                              title={item.title}
                              desc={item.description}
                              thumb={item.iconUri}
                              name={item.userName}
                              avatar={item.photoUrl}
                            />
                          )}
                        </ExtensionGrid>
                      </ExtensionContent>
                    ),
                  },
                  {
                    label: (
                      <>
                        <Image
                          src="./imgs/nav/4.png"
                          width={30}
                          height={30}
                          preview={false}
                        />
                        <br />
                        <ExtensionLabel>热门团队</ExtensionLabel>
                      </>
                    ),
                    key: "4",
                    children: (
                      <ExtensionContent>
                        <ExtensionGrid records={upTeams?.rows || []}>
                          {(item) => (
                            <Team
                              title={item.title}
                              desc={item.description}
                              thumb={item.iconUri}
                              name={item.userName}
                              avatar={item.photoUrl}
                            />
                          )}
                        </ExtensionGrid>
                      </ExtensionContent>
                    ),
                  },
                ]}
              />
            </ExtensionCard>
          </Col>
          <Col xs={0} md={6} lg={4}>
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
                      onClick={() => {
                        alert();
                      }}
                    >
                      &nbsp;{item.userName}
                    </Tag>
                  ))}
                </Space>
              </ExtensionContent>
            </ExtensionCard>
          </Col>
        </Row>
      </Extension>

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
