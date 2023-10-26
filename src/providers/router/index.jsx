import {
  createBrowserRouter,
  RouterProvider as BrowserRouterProvider,
  Outlet,
} from "react-router-dom";

import { Agent } from "../../plugins/agent";
import { LoginedPage } from "../../plugins/access";

import navigationRoutes from "./navigation";
import { communityRoutes, communityMobileRoutes } from "./community";
import { examRoutes } from "./exam";
import adminRoutes from "./_admin";

import User from "../../layouts/user";
import BuyKey from "../../pages/buykey";
import ApplyJoin from "../../pages/applyjoin";
import Login from "../../pages/login";
import Register from "../../pages/register";
import Info from "../../pages/info";
import EditPwd from "../../pages/editpwd";
import Help from "../../pages/help";
import NoFound from "../../pages/404";

import Demo from "../../pages/demo";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Agent element={<Outlet />} />,
    children: [
      {
        path: "buykey",
        element: <BuyKey />,
      },
      {
        path: "applyjoin",
        element: <ApplyJoin />,
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
        path: "user",
        element: <User />,
        children: [
          {
            path: "info",
            element: <LoginedPage element={<Info />} />,
          },
          {
            path: "editpwd",
            element: <LoginedPage element={<EditPwd />} />,
          },
        ],
      },
      {
        path: "/help",
        element: <Help />,
      },
    ],
  },
  navigationRoutes,
  communityRoutes,
  communityMobileRoutes,
  examRoutes,
  adminRoutes,
  {
    path: "/demo",
    element: <Demo />,
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
