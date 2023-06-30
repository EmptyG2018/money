import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";
import { ConfigProvider, Dropdown } from "antd";
import { LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import { ProConfigProvider, ProLayout } from "@ant-design/pro-components";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { useAuth, useSyncInfo } from "../hooks/user";
import defaultProps from "./_defaultProps";

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
      icon: <LogoutOutlined />,
      label: "个人主页",
      trigger: () => navigate("/user"),
    },
    settings: {
      key: "settings",
      icon: <LogoutOutlined />,
      label: "个人设置",
      trigger: () => navigate("/settings/info"),
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
