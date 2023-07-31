import {
  createBrowserRouter,
  RouterProvider as BrowserRouterProvider,
} from "react-router-dom";
import Auth from "../pages/_auth";
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
import NoFound from "../pages/404";

import WorkIndex from "../pages/work/index";

import AdminIndex from "../pages/admin/index";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/buykey",
        element: <BuyKey />,
      },
      {
        path: "/hall",
        element: <Hall />,
      },
      {
        path: "/team/:id",
        element: <Team />,
      },
      {
        path: "/collect/:id",
        element: <Collect />,
      },
      {
        path: "/user",
        element: <Auth element={<User />} />,
      },
      {
        path: "/settings",
        element: <Auth element={<Settings />} />,
        children: [
          {
            path: "/settings/info",
            element: <Info />,
          },
          {
            path: "/settings/editpwd",
            element: <EditPwd />,
          },
        ],
      },
      {
        path: "/login",
        element: <Auth element={<Login />} />,
      },
      {
        path: "/register",
        element: <Auth element={<Register />} />,
      },
      {
        path: "/applyjoin",
        element: <ApplyJoin />,
      },
      {
        path: "*",
        element: <NoFound />,
      },
    ],
  },
  {
    path: "/work",
    element: <Work />,
    children: [
      {
        path: "/work/index",
        element: <WorkIndex />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Auth element={<Admin />} />,
    children: [
      {
        path: "/admin/index",
        element: <AdminIndex />,
      },
    ],
  },
]);

const RouterProvider = () => {
  return <BrowserRouterProvider router={routes} />;
};
export default RouterProvider;
