import {
  ChromeFilled,
  CrownFilled,
  SmileFilled,
  TabletFilled,
} from "@ant-design/icons";

export default {
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
