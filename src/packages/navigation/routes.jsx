import { lazy } from "react";

import { LoginedPage } from "@plugins/access";
import LazyRoute from "@components/LazyRoute";

const Header = lazy(() => import("@package_navigation/layouts/header"));
const Index = lazy(() => import("@package_navigation/pages/index"));
const Search = lazy(() => import("@package_navigation/pages/search"));
const Hall = lazy(() => import("@package_navigation/pages/hall"));
const Team = lazy(() => import("@package_navigation/pages/team"));
const Collect = lazy(() => import("@package_navigation/pages/collect"));
const User = lazy(() => import("@package_navigation/pages/user"));

export default [
  {
    path: "navigation",
    element: <LazyRoute element={<Header />} />,
    children: [
      {
        path: "",
        element: <LazyRoute element={<Index />} />,
      },
      {
        path: "search",
        element: <LazyRoute element={<Search />} />,
      },
      {
        path: "hall",
        element: <LazyRoute element={<Hall />} />,
      },
      {
        path: "team/:id",
        element: <LazyRoute element={<Team />} />,
      },
      {
        path: "collect/:id",
        element: <LazyRoute element={<Collect />} />,
      },
      {
        path: "user",
        element: <LoginedPage element={<LazyRoute element={<User />} />} />,
      },
    ],
  },
];
