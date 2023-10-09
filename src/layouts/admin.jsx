import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Dropdown } from "antd";
import {
  DesktopOutlined,
  FileDoneOutlined,
  InboxOutlined,
  BarChartOutlined,
  LaptopOutlined,
  SketchOutlined,
  ApartmentOutlined,
  CompassOutlined,
  CreditCardOutlined,
  ShopOutlined,
  AccountBookOutlined,
  TransactionOutlined,
  RobotOutlined,
  CommentOutlined,
  LogoutOutlined,
  BuildOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { useAgentSetting } from "../plugins/agent";
import { useUser } from "../hooks/user";
import Copyright from "./_copyright";

const defaultLayout = {
  fixSiderbar: true,
  layout: "mix",
  splitMenus: true,
};

const defaultProps = {
  route: {
    path: "/admin",
    exact: true,
    routes: [
      {
        path: "/admin/base",
        name: "基础",
        icon: <DesktopOutlined />,
        routes: [
          {
            exact: true,
            path: "/admin/base/_statistics",
            name: "数据统计",
            icon: <BarChartOutlined />,
          },
          {
            path: "/admin/base/_website",
            name: "网站管理",
            icon: <LaptopOutlined />,
          },
          {
            path: "/admin/base/_vip",
            name: "会员管理",
            icon: <SketchOutlined />,
          },
          {
            path: "/admin/base/_site",
            name: "分站管理",
            icon: <ApartmentOutlined />,
          },
          {
            path: "/admin/base/_domain",
            name: "域名管理",
            icon: <CompassOutlined />,
          },
          {
            path: "/admin/base/_vipkey",
            name: "会员卡管理",
            icon: <CreditCardOutlined />,
          },
          {
            path: "/admin/base/_joinkey",
            name: "加盟卡管理",
            icon: <CreditCardOutlined />,
          },
          {
            path: "/admin/base/_recharge",
            name: "余额充值",
            icon: <ShopOutlined />,
          },
          {
            path: "/admin/base/_flowrecord",
            name: "流水账单",
            icon: <AccountBookOutlined />,
          },
          {
            path: "/admin/base/_income",
            name: "佣金收入",
            icon: <TransactionOutlined />,
          },
          {
            path: "/admin/base/_help",
            name: "配置客服",
            icon: <RobotOutlined />,
          },
        ],
      },
      {
        path: "/admin/bookmark",
        name: "书签",
        icon: <InboxOutlined />,
        routes: [
          {
            path: "/admin/bookmark/_index",
            name: "测试页面",
          },
        ],
      },
      {
        path: "/admin/community",
        name: "论坛",
        icon: <CommentOutlined />,
        routes: [
          {
            path: "/admin/community/_module",
            name: "模块管理",
            icon: <BuildOutlined />,
          },
        ],
      },
      {
        path: "/admin/exam",
        name: "考试",
        icon: <FileDoneOutlined />,
        routes: [
          {
            path: "/admin/exam/_index",
            name: "测试页面",
          },
        ],
      },
    ],
  },
};

export default () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { agentSetting } = useAgentSetting();
  const { user, logout } = useUser();

  return (
    <div
      style={{
        height: "100vh",
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
        avatarProps={{
          size: "small",
          src: user?.photoUrl,
          title: user?.username,
          render: (props, dom) => (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "logout",
                    icon: <LogoutOutlined />,
                    label: "退出登录",
                  },
                ],
                onClick: (item) => {
                  if (item.key === "logout") {
                    logout();
                    navigate("/login", { replace: true });
                  }
                },
              }}
            >
              {dom}
            </Dropdown>
          ),
        }}
        onMenuHeaderClick={() => navigate("/admin")}
        menuItemRender={(item, dom) => <Link to={item.path}>{dom}</Link>}
        footerRender={() => <Copyright />}
      >
        <Outlet />
      </ProLayout>
    </div>
  );
};
