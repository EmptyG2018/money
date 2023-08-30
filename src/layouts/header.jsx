import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";
import { ConfigProvider, Dropdown } from "antd";
import {
  SmileFilled,
  UserOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { ProConfigProvider, ProLayout } from "@ant-design/pro-components";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { useAuth, useSyncInfo } from "../hooks/user";

const defaultProps = {
  route: {
    path: "/",
    routes: [
      {
        path: "/buykey",
        name: "购买卡密",
        icon: <SmileFilled />,
        component: "./buykey",
      },
      {
        path: "/hall",
        name: "广场",
        icon: <SmileFilled />,
        component: "./hall",
      },
      {
        path: "/applyjoin",
        name: "加盟申请",
        icon: <SmileFilled />,
        component: "./applyjoin",
      },
      {
        path: "/join",
        name: "加盟",
        icon: <SmileFilled />,
        component: "./join",
      },
      {
        path: "/work",
        name: "工作台",
        icon: <SmileFilled />,
        component: "./work",
      },
    ],
  },
  location: {
    pathname: "/",
  },

  fixSiderbar: true,
  fixedHeader: true,
  layout: "top",
  splitMenus: false,
  contentWidth: "Fixed",
  colorPrimary: "#1677FF",
};

const ComponentRoot = styled.div`
  height: 100vh;
  overflow: auto;
`;

const Navigate = styled(Link)`
  color: inherit;
  &:hover {
    color: inherit;
  }
`;

export default () => {
  const location = useLocation();
  const navigate = useNavigate();
  const syncInfo = useSyncInfo();
  const authed = useAuth();
  const { info } = useSelector(({ user }) => user);

  const menus = {
    info: {
      key: "info",
      icon: <UserOutlined />,
      label: "个人主页",
      trigger: () => navigate("/user"),
    },
    settings: {
      key: "settings",
      icon: <DatabaseOutlined />,
      label: "后台管理",
      trigger: () => navigate("/admin"),
    },
    logout: {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
      trigger: () => {
        syncInfo.clear();
        navigate("/login", { replace: true });
      },
    },
  };

  const hideAvatarPage = ["/login", "/register"];
  const avatarProps = hideAvatarPage.includes(location.pathname)
    ? null
    : authed
    ? {
        size: "small",
        src: info?.photoUrl,
        title: info?.username,
        render: (props, dom) => (
          <Dropdown
            menu={{
              items: Object.values(menus).map(({ trigger, ...item }) => item),
              onClick: (item) => menus[item.key] && menus[item.key]?.trigger(),
            }}
          >
            {dom}
          </Dropdown>
        ),
      }
    : {
        size: "small",
        src: <LoginOutlined style={{ color: "rgba(0, 0, 0, 0.65)" }} />,
        title: "登录",
        render: (item, dom) => <Navigate to="/login">{dom}</Navigate>,
      };

  return (
    <ComponentRoot id="layout">
      <ProConfigProvider hashed={false}>
        <ConfigProvider
          getTargetContainer={() => {
            return document.getElementById("layout") || document.body;
          }}
        >
          <ProLayout
            prefixCls="my-prefix"
            logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
            title="Github"
            {...defaultProps}
            location={{
              pathname: location.pathname,
            }}
            token={{
              header: {
                colorBgMenuItemSelected: "rgba(0,0,0,0.04)",
              },
            }}
            avatarProps={avatarProps}
            onMenuHeaderClick={() => navigate('/')}
            menuItemRender={(item, dom) => (
              <Navigate to={item.path}>{dom}</Navigate>
            )}
            contentStyle={{ padding: 0 }}
          >
            <Outlet />
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </ComponentRoot>
  );
};
