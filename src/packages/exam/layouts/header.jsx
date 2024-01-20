import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";
import { ConfigProvider, Dropdown } from "antd";
import {
  UserOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  LoginOutlined,
  FileTextOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProConfigProvider, ProLayout } from "@ant-design/pro-components";
import { WHITELIST, useAdmin } from "@plugins/access";
import { useAgentSetting } from "@plugins/agent";
import { useUser } from "@hooks/user";
import { GetMenusByProject } from "@services/agent";
import styled from "styled-components";
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

// const defaultProps = {
//   route: {
//     path: "/exam",
//     routes: [
//       {
//         path: "/exam/category",
//         name: "试题库",
//         icon: <FileTextOutlined />,
//       },
//       {
//         path: "/exam/search",
//         name: "搜题",
//         icon: <SearchOutlined />,
//       },
//     ],
//   },
// };

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
              menu={{
                request: async () => {
                  const menus = await GetMenusByProject({ projectId: 3 });
                  return menus.map((item) => ({
                    path: item.url,
                    name: item.title,
                    target: item.target,
                  }));
                },
              }}
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
              onMenuHeaderClick={() => navigate("/exam")}
              menuItemRender={(item, dom) => (
                <Navigate to={item.path}>{dom}</Navigate>
              )}
              actionsRender={() => [
                <img
                  src="/imgs/vip.png"
                  width={36}
                  height={36}
                  title="开通会员"
                  onClick={() => navigate("/buykey?id=3")}
                />,
                <img
                  src="/imgs/cooperation.png"
                  width={36}
                  height={36}
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
