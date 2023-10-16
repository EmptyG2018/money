import { redirect, Outlet } from "react-router-dom";

import { Agent } from "../../../plugins/agent";
import { LoginedPage, AdminPage } from "../../../plugins/access";

import Admin from "../../../layouts/admin";
import _Statistics from "../../../pages/_admin/statistics";
import _Website from "../../../pages/_admin/website";
import _Vip from "../../../pages/_admin/vip";
import _Site from "../../../pages/_admin/site";
import _Domain from "../../../pages/_admin/domain";
import _VipKey from "../../../pages/_admin/vipkey";
import _JoinKey from "../../../pages/_admin/joinkey";
import _Recharge from "../../../pages/_admin/recharge";
import _FlowRecord from "../../../pages/_admin/flowrecord";
import _Income from "../../../pages/_admin/income";
import _Help from "../../../pages/_admin/help";
import _CommunityModule from "../../../pages/_admin/community/module";
import _ExamIndex from "../../../pages/_admin/exam/index";
import _BookmarkIndex from "../../../pages/_admin/bookmark/index";

export default {
  path: "/",
  element: <Agent element={<Outlet />} />,
  children: [
    {
      path: "admin",
      element: <LoginedPage element={<AdminPage element={<Admin />} />} />,
      children: [
        {
          index: true,
          loader: () => redirect("/admin/base/_statistics"),
        },
        {
          path: "base",
          element: <Outlet />,
          children: [
            {
              index: true,
              loader: () => redirect("/admin/base/_statistics"),
            },
            {
              path: "_statistics",
              element: <_Statistics />,
            },
            {
              path: "_website",
              element: <_Website />,
            },
            {
              path: "_vip",
              element: <_Vip />,
            },
            {
              path: "_site",
              element: <_Site />,
            },
            {
              path: "_domain",
              element: <_Domain />,
            },
            {
              path: "_vipkey",
              element: <_VipKey />,
            },
            {
              path: "_joinkey",
              element: <_JoinKey />,
            },
            {
              path: "_recharge",
              element: <_Recharge />,
            },
            {
              path: "_flowrecord",
              element: <_FlowRecord />,
            },
            {
              path: "_income",
              element: <_Income />,
            },
            {
              path: "_help",
              element: <_Help />,
            },
          ],
        },
        {
          path: "bookmark",
          element: <Outlet />,
          children: [
            {
              index: true,
              loader: () => redirect("/admin/bookmark/_index"),
            },
            {
              path: "_index",
              element: <_BookmarkIndex />,
            },
          ],
        },
        {
          path: "community",
          element: <Outlet />,
          children: [
            {
              index: true,
              loader: () => redirect("/admin/community/_module"),
            },
            {
              path: "_module",
              element: <_CommunityModule />,
            },
          ],
        },
        {
          path: "exam",
          element: <Outlet />,
          children: [
            {
              index: true,
              loader: () => redirect("/admin/exam/_index"),
            },
            {
              path: "_index",
              element: <_ExamIndex />,
            },
          ],
        },
      ],
    },
  ],
};
