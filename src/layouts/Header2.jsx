import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";
import { ConfigProvider, Dropdown, FloatButton, Image, Input } from "antd";
import {
  UserOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  LoginOutlined,
  CrownOutlined,
  FlagOutlined,
  FileDoneOutlined,
  HighlightOutlined,
  SearchOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { ProConfigProvider, ProLayout } from "@ant-design/pro-components";
import { styled } from "styled-components";
import { WHITELIST, useAdmin } from "../plugins/access";
import { useAgentSetting } from "../plugins/agent";
import { useUser } from "../hooks/user";
import { useRequest } from "ahooks";
import { GetAgentHelpIconShow } from "../services/setting";
import Copyright from "./_copyright";

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
    path: "/",
    routes: [
      {
        path: "/buykey",
        name: "购买卡密",
        icon: <CrownOutlined />,
      },
      {
        path: "/hall",
        name: "广场",
        icon: <FlagOutlined />,
      },
      {
        path: "/applyjoin",
        name: "加盟申请",
        icon: <FileDoneOutlined />,
      },
      {
        path: "/work",
        name: "工作台",
        icon: <HighlightOutlined />,
      },
      {
        path: "/login",
        name: "登录",
        hideInMenu: true,
      },
      {
        path: "/register",
        name: "注册",
        hideInMenu: true,
      },
    ],
  },
};

const useHelpLocation = (locationCode) => {
  const locationCodeMap = {
    8: { top: "72px", left: "24px", right: "initial", bottom: "initial" },
    9: { top: "72px", left: "initial", right: "24px", bottom: "initial" },
    10: {
      top: 0,
      left: "24px",
      right: "initial",
      bottom: 0,
      marginBlock: "auto",
    },
    11: {
      top: 0,
      left: "initial",
      right: "24px",
      bottom: 0,
      marginBlock: "auto",
    },
    12: { top: "initial", left: "24px", right: "initial", bottom: "72px" },
    13: { top: "initial", left: "initial", right: "24px", bottom: "72px" },
  };
  return locationCodeMap[locationCode];
};

const FloatButtonRoot = styled(FloatButton)`
  .ant-float-btn-body {
    .ant-float-btn-content {
      padding: 0;
      width: 100%;
      height: 100%;
      .ant-float-btn-icon {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const FixedHelpBtn = ({ show, icon, ...props }) => {
  return (
    show && (
      <Navigate to="/help">
        <FloatButtonRoot
          shape="circle"
          icon={
            <Image
              style={{ width: "100%", height: "100%" }}
              src={icon}
              preview={false}
            />
          }
          {...props}
        />
      </Navigate>
    )
  );
};

export default () => {
  const location = useLocation();
  const navigate = useNavigate();
  const admin = useAdmin();
  const { agentSetting } = useAgentSetting();
  const { user, logout } = useUser();
  const { data: helpSetting } = useRequest(GetAgentHelpIconShow);
  const helpPosition = useHelpLocation(helpSetting?.styleType);

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
              title="资料下载网"
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
              onMenuHeaderClick={() => navigate("/")}
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
                  />
                </div>,
              ]}
              contentStyle={{ padding: 0 }}
              footerRender={Copyright}
            >
              <Outlet />
            </ProLayout>
          </ConfigProvider>
        </ProConfigProvider>
      </ComponentRoot>
      <FixedHelpBtn
        show={helpSetting?.state === 1}
        icon={helpSetting?.iconValue}
        style={helpPosition}
      />
    </>
  );
};
