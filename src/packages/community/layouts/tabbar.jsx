import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { TabBar } from "antd-mobile";
import {
  CompassOutline,
  UnorderedListOutline,
  UserOutline,
  DownCircleOutline,
} from "antd-mobile-icons";
import { styled } from "styled-components";

const ComponentRoot = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  height: 0;
`;

const Component = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      key: "/m/community",
      title: "首页",
      icon: <CompassOutline />,
    },
    {
      key: "/m/community/category",
      title: "分类",
      icon: <UnorderedListOutline />,
    },
    {
      key: "/navigation",
      title: "书签",
      icon: <DownCircleOutline />,
    },
    {
      key: "/m/community/user",
      title: "我的",
      icon: <UserOutline />,
    },
  ];

  return (
    <ComponentRoot>
      <Content>
        <Outlet />
      </Content>
      <TabBar safeArea activeKey={location.pathname} onChange={navigate}>
        {tabs.map((item) => (
          <TabBar.Item
            key={item.key}
            icon={item.icon}
            title={item.title}
            badge={item.badge}
          />
        ))}
      </TabBar>
    </ComponentRoot>
  );
};

export default Component;
