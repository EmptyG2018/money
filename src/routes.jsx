import { lazy } from "react";
import { Outlet } from "react-router-dom";

import { Agent } from "@plugins/agent";
import { LoginedPage } from "@plugins/access";
import LazyRoute from "@components/LazyRoute";

const User = lazy(() => import("@layouts/user"));
const BuyKey = lazy(() => import("@pages/buykey"));
const ApplyJoin = lazy(() => import("@pages/applyjoin"));
const Login = lazy(() => import("@pages/login"));
const Register = lazy(() => import("@pages/register"));
const Info = lazy(() => import("@pages/info"));
const EditPwd = lazy(() => import("@pages/editpwd"));
const Help = lazy(() => import("@pages/help"));
const NoFound = lazy(() => import("@pages/404"));

export default {
  path: "/",
  element: <Agent element={<Outlet />} />,
  children: [
    {
      path: "buykey",
      element: <LazyRoute element={<BuyKey />} />,
    },
    {
      path: "applyjoin",
      element: <LazyRoute element={<ApplyJoin />} />,
    },
    {
      path: "login",
      element: <LoginedPage element={<LazyRoute element={<Login />} />} />,
    },
    {
      path: "register",
      element: <LoginedPage element={<LazyRoute element={<Register />} />} />,
    },
    {
      path: "user",
      element: <LazyRoute element={<User />} />,
      children: [
        {
          path: "info",
          element: <LoginedPage element={<LazyRoute element={<Info />} />} />,
        },
        {
          path: "editpwd",
          element: (
            <LoginedPage element={<LazyRoute element={<EditPwd />} />} />
          ),
        },
      ],
    },
    {
      path: "/help",
      element: <LazyRoute element={<Help />} />,
    },
  ],
};

export const noFoundRoute = {
  path: "*",
  element: <NoFound />,
};
