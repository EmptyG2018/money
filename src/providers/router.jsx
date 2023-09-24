import {
  createBrowserRouter,
  RouterProvider as BrowserRouterProvider,
  redirect,
  Outlet,
} from "react-router-dom";

import { Agent } from "../plugins/agent";
import { LoginedPage, AdminPage } from "../plugins/access";

import Mobile from "../layouts/mobile";
import Header from "../layouts/header";
import Settings from "../layouts/settings";
import Admin from "../layouts/admin";
import Tabbar from "../layouts/tabbar";
import Header2 from "../layouts/Header2";

import Index from "../pages/index";
import Search from "../pages/search";
import BuyKey from "../pages/buykey";
import Hall from "../pages/hall";
import ApplyJoin from "../pages/applyjoin";
import Team from "../pages/team";
import Collect from "../pages/collect";
import User from "../pages/user";
import Info from "../pages/info";
import EditPwd from "../pages/editpwd";
import Login from "../pages/login";
import Register from "../pages/register";
import Help from "../pages/help";

import CommunityIndex from "../pages/community/mini/index";
import CommunityCategory from "../pages/community/mini/category";
import CommunityList from "../pages/community/mini/list";
import CommunityArticle from "../pages/community/mini/article";
import CommunitySearch from "../pages/community/mini/search";

import TCommunityIndex from "../pages/community/index";
import TCommunityList from "../pages/community/list";

import WorkIndex from "../pages/work/index";

import _Statistics from "../pages/admin/statistics";
import _Website from "../pages/admin/website";
import _Vip from "../pages/admin/vip";
import _Site from "../pages/admin/site";
import _Domain from "../pages/admin/domain";
import _VipKey from "../pages/admin/vipkey";
import _JoinKey from "../pages/admin/joinkey";
import _Recharge from "../pages/admin/recharge";
import _FlowRecord from "../pages/admin/flowrecord";
import _Income from "../pages/admin/income";
import _Help from "../pages/admin/help";
import _ExamIndex from "../pages/admin/exam/index";
import _BookmarkIndex from "../pages/admin/bookmark/index";

import NoFound from "../pages/_404";
import Demo from "../pages/demo";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Agent element={<Outlet />} />,
    children: [
      {
        path: "/",
        element: <Header />,
        children: [
          {
            path: "",
            element: <Index />,
          },
          {
            path: "search",
            element: <Search />,
          },
          {
            path: "buykey",
            element: <BuyKey />,
          },
          {
            path: "hall",
            element: <Hall />,
          },
          {
            path: "team/:id",
            element: <Team />,
          },
          {
            path: "collect/:id",
            element: <Collect />,
          },
          {
            path: "user",
            element: <LoginedPage element={<User />} />,
          },
          {
            path: "settings",
            element: <LoginedPage element={<Settings />} />,
            children: [
              {
                path: "info",
                element: <Info />,
              },
              {
                path: "editpwd",
                element: <EditPwd />,
              },
            ],
          },
          {
            path: "login",
            element: <LoginedPage element={<Login />} />,
          },
          {
            path: "register",
            element: <LoginedPage element={<Register />} />,
          },
          {
            path: "applyjoin",
            element: <ApplyJoin />,
          },
        ],
      },
      {
        path: "/m",
        element: <Mobile />,
        children: [
          {
            path: "community",
            element: <Tabbar />,
            children: [
              {
                path: "index",
                element: <CommunityIndex />,
              },
              {
                path: "category",
                element: <CommunityCategory />,
              },
              {
                path: "list/:id",
                element: <CommunityList />,
              },
            ],
          },
          {
            path: "community/search",
            element: <CommunitySearch />,
          },
          {
            path: "community/article/:id",
            element: <CommunityArticle />,
          },
        ],
      },
      {
        path: "/community",
        element: <Header2 />,
        children: [
          {
            path: "index",
            element: <TCommunityIndex />,
          },
          {
            path: "list/:id",
            element: <TCommunityList />,
          },
          {
            path: "article",
            element: <CommunityArticle />,
          },
        ],
      },
      {
        path: "/work",
        element: <WorkIndex />,
      },
      {
        path: "/admin",
        element: <LoginedPage element={<AdminPage element={<Admin />} />} />,
        children: [
          {
            index: true,
            loader: () => redirect("/admin/base/_statistics"),
          },
          {
            path: "base",
            element: <Outlet />,
            children: [
              {
                index: true,
                loader: () => redirect("/admin/base/_statistics"),
              },
              {
                path: "_statistics",
                element: <_Statistics />,
              },
              {
                path: "_website",
                element: <_Website />,
              },
              {
                path: "_vip",
                element: <_Vip />,
              },
              {
                path: "_site",
                element: <_Site />,
              },
              {
                path: "_domain",
                element: <_Domain />,
              },
              {
                path: "_vipkey",
                element: <_VipKey />,
              },
              {
                path: "_joinkey",
                element: <_JoinKey />,
              },
              {
                path: "_recharge",
                element: <_Recharge />,
              },
              {
                path: "_flowrecord",
                element: <_FlowRecord />,
              },
              {
                path: "_income",
                element: <_Income />,
              },
              {
                path: "_help",
                element: <_Help />,
              },
            ],
          },
          {
            path: "exam",
            element: <Outlet />,
            children: [
              {
                index: true,
                loader: () => redirect("/admin/exam/_index"),
              },
              {
                path: "_index",
                element: <_ExamIndex />,
              },
            ],
          },
          {
            path: "bookmark",
            element: <Outlet />,
            children: [
              {
                index: true,
                loader: () => redirect("/admin/bookmark/_index"),
              },
              {
                path: "_index",
                element: <_BookmarkIndex />,
              },
            ],
          },
        ],
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/demo",
        element: <Demo />,
      },
    ],
  },
  {
    path: "*",
    element: <NoFound />,
  },
]);

const RouterProvider = () => {
  return <BrowserRouterProvider router={routes} />;
};
export default RouterProvider;
