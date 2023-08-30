import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  DesktopOutlined,
  FileDoneOutlined,
  InboxOutlined,
  BarChartOutlined,
  SketchOutlined,
  ApartmentOutlined,
  CompassOutlined,
  CreditCardOutlined,
  ShopOutlined,
  AccountBookOutlined,
  TransactionOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { useSite } from "../hooks/setting";

const defaultLayout = {
  fixSiderbar: true,
  layout: "mix",
  splitMenus: true,
};

const defaultProps = {
  route: {
    path: "/admin",
    routes: [
      {
        path: "/admin/base",
        name: "基础",
        icon: <DesktopOutlined />,
        routes: [
          {
            path: "/admin/base/_statistics",
            name: "数据统计",
            icon: <BarChartOutlined />,
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
    ],
  },
};

export default () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="Github"
        {...defaultLayout}
        {...defaultProps}
        location={{
          pathname: location.pathname,
        }}
        avatarProps={{
          src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
          size: "small",
          title: "七妮妮",
        }}
        onMenuHeaderClick={() => navigate("/admin")}
        menuItemRender={(item, dom) => <Link to={item.path}>{dom}</Link>}
      >
        <Outlet />
      </ProLayout>
    </div>
  );
};
