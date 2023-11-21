import { Outlet } from "react-router-dom";

import { Agent } from "../../plugins/agent";

import Header from "../../layouts/communityHeader";
import Index from "../../pages/community/index";
import Search from "../../pages/community/search";
import List from "../../pages/community/list";
import Category from "../../pages/community/category";
import Article from "../../pages/community/article";

import Mobile from "../../layouts/mobile";
import Tabbar from "../../layouts/communityTabbar";
import MobileIndex from "../../pages/community/mini/index";
import MobileSearch from "../../pages/community/mini/search";
import MobileList from "../../pages/community/mini/list";
import MobileUser from "../../pages/community/mini/user";
import MobileCategory from "../../pages/community/mini/category";
import MobileArticle from "../../pages/community/mini/article";

export const communityRoutes = {
  path: "/",
  element: <Agent element={<Outlet />} />,
  children: [
    {
      path: "community",
      element: <Header />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "search",
          element: <Search />,
        },
        {
          path: "category",
          element: <Category />,
        },
        {
          path: "list/:id",
          element: <List />,
        },
        {
          path: "article/:id",
          element: <Article />,
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
      element: <Mobile />,
      children: [
        {
          path: "",
          element: <Tabbar />,
          children: [
            {
              index: true,
              element: <MobileIndex />,
            },
            {
              path: "category",
              element: <MobileCategory />,
            },
            {
              path: "list/:id",
              element: <MobileList />,
            },
            {
              path: "user",
              element: <MobileUser />,
            },
          ],
        },
        {
          path: "search",
          element: <MobileSearch />,
        },
        {
          path: "article/:id",
          element: <MobileArticle />,
        },
      ],
    },
  ],
};
