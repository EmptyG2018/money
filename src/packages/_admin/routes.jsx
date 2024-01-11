import { lazy } from "react";
import { redirect, Outlet } from "react-router-dom";

import { Agent } from "@plugins/agent";
import { LoginedPage, AdminPage } from "@plugins/access";
import LazyRoute from "@components/LazyRoute";

const Admin = lazy(() => import("@package_admin/layouts/admin"));
const _Statistics = lazy(() => import("@package_admin/pages/statistics"));
const _Website = lazy(() => import("@package_admin/pages/website"));
const _Vip = lazy(() => import("@package_admin/pages/vip"));
const _Site = lazy(() => import("@package_admin/pages/site"));
const _Domain = lazy(() => import("@package_admin/pages/domain"));
const _VipKey = lazy(() => import("@package_admin/pages/vipkey"));
const _JoinKey = lazy(() => import("@package_admin/pages/joinkey"));
const _Recharge = lazy(() => import("@package_admin/pages/recharge"));
const _FlowRecord = lazy(() => import("@package_admin/pages/flowrecord"));
const _Income = lazy(() => import("@package_admin/pages/income"));
const _Help = lazy(() => import("@package_admin/pages/help"));
const _CommunityModule = lazy(() =>
  import("@package_admin/pages/community/module")
);
const _ExamIndex = lazy(() => import("@package_admin/pages/exam/index"));
const _BookmarkIndex = lazy(() =>
  import("@package_admin/pages/bookmark/index")
);

export default {
  path: "/",
  element: <Agent element={<Outlet />} />,
  children: [
    {
      path: "admin",
      element: (
        <LoginedPage
          element={<AdminPage element={<LazyRoute element={<Admin />} />} />}
        />
      ),
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
              element: <LazyRoute element={<_Statistics />} />,
            },
            {
              path: "_website",
              element: <LazyRoute element={<_Website />} />,
            },
            {
              path: "_vip",
              element: <LazyRoute element={<_Vip />} />,
            },
            {
              path: "_site",
              element: <LazyRoute element={<_Site />} />,
            },
            {
              path: "_domain",
              element: <LazyRoute element={<_Domain />} />,
            },
            {
              path: "_vipkey",
              element: <LazyRoute element={<_VipKey />} />,
            },
            {
              path: "_joinkey",
              element: <LazyRoute element={<_JoinKey />} />,
            },
            {
              path: "_recharge",
              element: <LazyRoute element={<_Recharge />} />,
            },
            {
              path: "_flowrecord",
              element: <LazyRoute element={<_FlowRecord />} />,
            },
            {
              path: "_income",
              element: <LazyRoute element={<_Income />} />,
            },
            {
              path: "_help",
              element: <LazyRoute element={<_Help />} />,
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
              element: <LazyRoute element={<_BookmarkIndex />} />,
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
              element: <LazyRoute element={<_CommunityModule />} />,
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
              element: <LazyRoute element={<_ExamIndex />} />,
            },
          ],
        },
      ],
    },
  ],
};
