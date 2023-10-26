import { useState } from "react";
import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";
import {
  Divider,
  ConfigProvider,
  Dropdown,
  FloatButton,
  Image,
  Input,
} from "antd";
import {
  UserOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  LoginOutlined,
  FileTextOutlined,
  AlignLeftOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProConfigProvider, ProLayout } from "@ant-design/pro-components";
import { WHITELIST, useAdmin } from "../plugins/access";
import { useAgentSetting } from "../plugins/agent";
import { useUser } from "../hooks/user";
import { useRequest } from "ahooks";
import { GetAgentHelpIconShow } from "../services/setting";
import styled, { css } from "styled-components";
import Copyright from "./_copyright";

const MiniBtnGroupRoot = styled.span`
  display: flex;
  border-radius: 2px;
  overflow: hidden;
`;

const MiniBtn = styled.button`
  font-size: 12px;
  line-height: 1;
  outline: none;
  border: none;
  color: #616161;
  background-color: rgba(0, 0, 0, 0.08);
  width: 40px;
  height: 28px;
  padding: 0;
  zoom: 0.74;

  ${({ type, actived }) =>
    type === "exam" &&
    !!actived &&
    css`
      color: #1677fe;
      background-color: rgba(22, 119, 254, 0.12);
    `}

  ${({ type, actived }) =>
    type === "topic" &&
    !!actived &&
    css`
      color: #ff4d4f;
      background-color: rgba(255, 77, 79, 0.12);
    `}
`;

const MiniBtnGroup = ({ activeKey, items, onChange }) => {
  return (
    <MiniBtnGroupRoot>
      {items.map((item) => (
        <MiniBtn
          actived={item.key === activeKey ? 1 : 0}
          key={item.key}
          type={item.key}
          onClick={(e) => {
            e.stopPropagation();
            onChange && onChange(item.key);
          }}
        >
          {item.label}
        </MiniBtn>
      ))}
    </MiniBtnGroupRoot>
  );
};

const GlobalSearchRoot = styled.div`
  display: flex;
  align-items: center;
  margin-inline-end: 24px;
`;

const SearchWraper = styled.div`
  display: flex;
  align-items: center;
  width: 256px;
  border-radius: 4px;
  overflow: hidden;
  padding-inline: 6px;
  background-color: rgba(0, 0, 0, 0.03);
`;

const SearchInput = styled(Input)`
  padding-inline: 0;
`;

const options = [
  { label: "试卷", key: "exam" },
  { label: "题目", key: "topic" },
];

const GlobalSearch = ({ onPressEnter, ...props }) => {
  const [searchType, setSearchType] = useState("exam");
  const checkedItem = options.find((item) => searchType === item.key);
  return (
    <GlobalSearchRoot key="SearchOutlined">
      <SearchWraper>
        <MiniBtnGroup
          activeKey={searchType}
          items={options}
          onChange={setSearchType}
        />
        <Divider type="vertical" />
        <SearchInput
          prefix={
            <SearchOutlined
              style={{
                color: "rgba(0, 0, 0, 0.15)",
              }}
            />
          }
          placeholder={"搜索" + checkedItem.label}
          bordered={false}
          onPressEnter={(e) => {
            e.stopPropagation();
            onPressEnter && onPressEnter(searchType, e);
          }}
          {...props}
        />
      </SearchWraper>
    </GlobalSearchRoot>
  );
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

const defaultLayout = {
  fixSiderbar: true,
  fixedHeader: true,
  contentWidth: "Fixed",
  layout: "top",
  splitMenus: false,
};

const defaultProps = {
  route: {
    path: "/exam",
    routes: [
      {
        path: "/exam/exampeperlibrary",
        name: "试卷库",
        icon: <FileTextOutlined />,
      },
      {
        path: "/exam/topiclibrary",
        name: "试题库",
        icon: <AlignLeftOutlined />,
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
              onMenuHeaderClick={() => navigate("/exam")}
              menuItemRender={(item, dom) => (
                <Navigate to={item.path}>{dom}</Navigate>
              )}
              actionsRender={() => [
                <GlobalSearch
                  onPressEnter={(type, e) =>
                    navigate("/exam/search?keyword=" + e.target.value)
                  }
                />,
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
      <FixedHelpBtn
        show={helpSetting?.state === 1}
        icon={helpSetting?.iconValue}
        style={helpPosition}
      />
    </>
  );
};
