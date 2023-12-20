import { redirect, Outlet } from "react-router-dom";

import { Agent } from "../../plugins/agent";

import Index from "../../pages/collection/index";

export default {
  path: "/",
  element: <Agent element={<Outlet />} />,
  children: [
    {
      path: "collection",
      loader: () => redirect("/collection/-1"),
    },
    {
      path: "collection/:id",
      element: <Index />,
    },
  ],
};
