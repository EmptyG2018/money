import { useEffect } from "react";
import {
  useLocation,
  Navigate,
  createBrowserRouter,
  RouterProvider as BrowserRouterProvider,
  redirect,
  Outlet,
} from "react-router-dom";
import storage from "store";

import { useAuth } from "../hooks/user";
import { useSite, useSEO } from "../hooks/setting";

import Header from "../layouts/header";
import Settings from "../layouts/settings";
import Admin from "../layouts/admin";
import Work from "../layouts/work";

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

import WorkIndex from "../pages/work/index";

import _Statistics from "../pages/admin/statistics";
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
import NoAuth from "../pages/_403";
import Demo from "../pages/demo";

import FullLoading from "../components/FullLoading";

// 入口路径
const ENTRYPAGE = "/";

// 权鉴白名单
const WHITELIST = ["/login", "/register"];

/**
 * @title 权鉴
 * @param {React.ReactNode} [element] 授权页面
 * @param {React.ReactNode} [fallback] 授权拦截提示页面
 */
const Auth = ({ element, fallback = <NoAuth /> }) => {
  const location = useLocation();
  const authed = useAuth();
  if (WHITELIST.includes(location.pathname)) {
    return authed ? <Navigate to={ENTRYPAGE} replace /> : element;
  }
  return authed ? element : fallback;
};

/**
 * @title 代理
 * @param {string} [host] 代理IP
 * @param {React.ReactNode} [element] 路由页面
 * @param {React.ReactNode} [loading] 加载提示页面
 */
const Proxy = ({ host, element }) => {
  const { seo } = useSEO();
  const { site, error, isLoading } = useSite(host);

  useEffect(() => {
    const { webname, keywords, description } = site;
    seo({
      title: webname,
      keywords,
      description,
    });
    storage.set("site", site);
  }, [site]);

  if (error) return <p>error.</p>;
  if (isLoading) return <FullLoading />;
  return element;
};

/**
 * @title 站点
 * @param {React.ReactNode} [element] 路由页面
 */
const Site = ({ element }) => {
  const site = storage.get("site");
  const host = location.hostname;
  if (site && site?.domain === host) return element;
  return <Proxy host={host} element={element} />;
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Site element={<Outlet />} />,
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
            element: <Auth element={<User />} />,
          },
          {
            path: "settings",
            element: <Auth element={<Settings />} />,
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
            element: <Auth element={<Login />} />,
          },
          {
            path: "register",
            element: <Auth element={<Register />} />,
          },
          {
            path: "applyjoin",
            element: <ApplyJoin />,
          },
        ],
      },
      {
        path: "/work",
        element: <WorkIndex />,
      },
      {
        path: "/admin",
        element: <Auth element={<Admin />} />,
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
