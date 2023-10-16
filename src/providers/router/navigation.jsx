import { redirect, Outlet } from "react-router-dom";

import { Agent } from "../../plugins/agent";

import Header from "../../layouts/navigationHeader";
import Index from "../../pages/navigation/index";
import Search from "../../pages/navigation/search";
import Hall from "../../pages/navigation/hall";
import Team from "../../pages/navigation/team";
import Collect from "../../pages/navigation/collect";

export default {
  path: "/",
  element: <Agent element={<Outlet />} />,
  children: [
    {
      index: true,
      loader: () => redirect("/navigation"),
    },
    {
      path: "navigation",
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
      ],
    },
  ],
};
