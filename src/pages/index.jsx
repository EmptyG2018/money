import { useEffect, useState } from "react";
import { Input, Tabs, Row, Col, Card, Image } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import { styled } from "styled-components";
import navigations from "../constant/navigation";
import { navData, navMap } from "../constant/search";

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
  height: 280px;
  background-color: #fff;
`;

const Component = () => {
  const [navTabKey, setNavTabKey] = useState("internal");

  const [navCategoryKey, setNavCategoryKey] = useState("");

  const navTabs = navData.map(({ children, ...rest }) => ({ ...rest }));

  const navCategorys =
    navData.find((item) => item.key === navTabKey)?.children || [];

  const navCategory = navCategorys.find((item) => item.key === navCategoryKey);

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

      <Extension></Extension>

      {navigations.map((item) => (
        <>
          <SectionHeader icon={<AppstoreOutlined />} title={item.name} />
          <Row
            gutter={[
              { xs: 8, sm: 12, md: 18, lg: 20 },
              { xs: 4, sm: 8, md: 12, lg: 16 },
            ]}
          >
            {item.siteList.map((site) => (
              <Col xs={12} sm={8} md={6} lg={4}>
                <Application
                  thumb={"./imgs/site/" + site.icon}
                  title={site.name}
                  desc={site.desc}
                  onClick={() => window.open(site.url)}
                />
              </Col>
            ))}
          </Row>
        </>
      ))}
    </PageContainer>
  );
};

export default Component;
