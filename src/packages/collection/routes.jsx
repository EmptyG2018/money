import { lazy } from "react";
import { Navigate } from "react-router-dom";

import { LoginedPage } from "@plugins/access";
import LazyRoute from "@components/LazyRoute";

const Root = lazy(() => import("@package_collection/layouts/root"));
const Index = lazy(() => import("@package_collection/pages/index"));
const Team = lazy(() => import("@package_collection/pages/team"));
const My = lazy(() => import("@package_collection/pages/my"));
const TeamSetting = lazy(() => import("@package_collection/pages/teamSetting"));

export default [
  {
    path: "collection",
    element: <LoginedPage element={<LazyRoute element={<Root />} />} />,
    children: [
      {
        path: "",
        element: <Navigate to="/collection/-1" replace />,
      },
      {
        path: ":id",
        element: <LazyRoute element={<Index />} />,
      },
      {
        path: "team",
        element: <LazyRoute element={<Team />} />,
      },
      {
        path: "team/:teamId",
        element: <LazyRoute element={<TeamSetting />} />,
      },
      {
        path: "my",
        element: <LazyRoute element={<My />} />,
      },
    ],
  },
];
