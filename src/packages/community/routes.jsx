import { lazy } from "react";
import { Outlet } from "react-router-dom";

import { Agent } from "@plugins/agent";
import LazyRoute from "@components/LazyRoute";

const Mobile = lazy(() => import("@layouts/mobile"));
const Header = lazy(() => import("@package_community/layouts/header"));
const Tabbar = lazy(() => import("@package_community/layouts/tabbar"));

const Index = lazy(() => import("@package_community/pages/index"));
const Search = lazy(() => import("@package_community/pages/search"));
const List = lazy(() => import("@package_community/pages/list"));
const Category = lazy(() => import("@package_community/pages/category"));
const Article = lazy(() => import("@package_community/pages/article"));

const MobileIndex = lazy(() => import("@package_community/pages/mini/index"));
const MobileSearch = lazy(() => import("@package_community/pages/mini/search"));
const MobileList = lazy(() => import("@package_community/pages/mini/list"));
const MobileUser = lazy(() => import("@package_community/pages/mini/user"));
const MobileCategory = lazy(() =>
  import("@package_community/pages/mini/category")
);
const MobileArticle = lazy(() =>
  import("@package_community/pages/mini/article")
);

export const communityRoutes = {
  path: "/",
  element: <Agent element={<Outlet />} />,
  children: [
    {
      path: "community",
      element: <LazyRoute element={<Header />} />,
      children: [
        {
          index: true,
          element: <LazyRoute element={<Index />} />,
        },
        {
          path: "search",
          element: <LazyRoute element={<Search />} />,
        },
        {
          path: "category",
          element: <LazyRoute element={<Category />} />,
        },
        {
          path: "list/:id",
          element: <LazyRoute element={<List />} />,
        },
        {
          path: "article/:id",
          element: <LazyRoute element={<Article />} />,
        },
      ],
    },
  ],
};

export const communityMobileRoutes = {
  path: "/",
  element: <Agent element={<Outlet />} />,
  children: [
    {
      path: "m/community",
      element: <LazyRoute element={<Mobile />} />,
      children: [
        {
          path: "",
          element: <LazyRoute element={<Tabbar />} />,
          children: [
            {
              index: true,
              element: <LazyRoute element={<MobileIndex />} />,
            },
            {
              path: "category",
              element: <LazyRoute element={<MobileCategory />} />,
            },
            {
              path: "list/:id",
              element: <LazyRoute element={<MobileList />} />,
            },
            {
              path: "user",
              element: <LazyRoute element={<MobileUser />} />,
            },
          ],
        },
        {
          path: "search",
          element: <LazyRoute element={<MobileSearch />} />,
        },
        {
          path: "article/:id",
          element: <LazyRoute element={<MobileArticle />} />,
        },
      ],
    },
  ],
};
