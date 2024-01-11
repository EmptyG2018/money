import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";
import { ConfigProvider, Dropdown, Input } from "antd";
import {
  UserOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  LoginOutlined,
  UnorderedListOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProConfigProvider, ProLayout } from "@ant-design/pro-components";
import { styled } from "styled-components";
import { WHITELIST, useAdmin } from "@plugins/access";
import { useAgentSetting } from "@plugins/agent";
import { useUser } from "@hooks/user";
import Copyright from "@layouts/copyright";
import FixedHelpBtn from "@components/FixedHelpBtn";

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

const defaultLayout = {
  fixSiderbar: true,
  fixedHeader: true,
  contentWidth: "Fixed",
  layout: "top",
  splitMenus: false,
};

const defaultProps = {
  route: {
    path: "/community",
    routes: [
      {
        path: "/community/category",
        name: "分类",
        icon: <UnorderedListOutlined />,
      },
    ],
  },
};

export default () => {
  const location = useLocation();
  const navigate = useNavigate();
  const admin = useAdmin();
  const { agentSetting } = useAgentSetting();
  const { user, logout } = useUser();

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
        logout();
        navigate("/login", { replace: true });
      },
    },
  };

  !admin && delete menus.settings;

  const avatarProps = WHITELIST.includes(location.pathname)
    ? null
    : user
    ? {
        size: "small",
        src: user?.photoUrl,
        title: user?.username,
        render: (_, dom) => (
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
        render: (_, dom) => <Navigate to="/login">{dom}</Navigate>,
      };

  return (
    <>
      <ComponentRoot id="layout">
        <ProConfigProvider hashed={false}>
          <ConfigProvider
            getTargetContainer={() => {
              return document.getElementById("layout") || document.body;
            }}
          >
            <ProLayout
              logo={agentSetting?.weblogoUrl || undefined}
              title={agentSetting?.webname}
              {...defaultLayout}
              {...defaultProps}
              location={{
                pathname: location.pathname,
              }}
              token={{
                header: {
                  colorTextMenuActive: "rgba(22, 119, 255, .8)",
                  colorTextMenuSelected: "rgb(22, 119, 255)",
                },
              }}
              avatarProps={avatarProps}
              onMenuHeaderClick={() => navigate("/community")}
              menuItemRender={(item, dom) => (
                <Navigate to={item.path}>{dom}</Navigate>
              )}
              actionsRender={() => [
                <div
                  key="SearchOutlined"
                  aria-hidden
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginInlineEnd: 24,
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <Input
                    style={{
                      width: "256px",
                      borderRadius: 4,
                      backgroundColor: "rgba(0,0,0,0.03)",
                    }}
                    prefix={
                      <SearchOutlined
                        style={{
                          color: "rgba(0, 0, 0, 0.15)",
                        }}
                      />
                    }
                    placeholder="搜索资源"
                    bordered={false}
                    onPressEnter={(e) =>
                      navigate("/community/search?keyword=" + e.target.value)
                    }
                  />
                </div>,
                <img
                  src="/imgs/vip.png"
                  width={36}
                  height={36}
                  title="开通会员"
                  onClick={() => navigate("/buykey")}
                />,
                <img
                  src="/imgs/cooperation.png"
                  width={36}
                  height={35}
                  title="申请加盟"
                  onClick={() => navigate("/applyjoin")}
                />,
              ]}
              contentStyle={{ padding: 0 }}
              footerRender={Copyright}
            >
              <Outlet />
            </ProLayout>
          </ConfigProvider>
        </ProConfigProvider>
      </ComponentRoot>
      <FixedHelpBtn />
    </>
  );
};
