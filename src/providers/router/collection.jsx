import { redirect, Outlet } from "react-router-dom";
import { Agent } from "@plugins/agent";
import Root from "@layouts/collection/root";
import Index from "@pages/collection/index";
import Team from "@pages/collection/team";
import My from "@pages/collection/my";
import TeamSetting from "@pages/collection/teamSetting";

export default {
  path: "/",
  element: <Agent element={<Outlet />} />,
  children: [
    {
      path: "collection",
      element: <Root />,
      children: [
        {
          path: "",
          loader: () => redirect("/collection/-1"),
        },
        {
          path: ":id",
          element: <Index />,
        },
        {
          path: "team",
          element: <Team />,
        },
        {
          path: "team/:teamId",
          element: <TeamSetting />
        },
        {
          path: "my",
          element: <My />,
        },
      ],
    },
  ],
};
