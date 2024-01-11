import {
  useLocation,
  createBrowserRouter,
  RouterProvider as BrowserRouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import {
  communityRoutes,
  communityMobileRoutes,
} from "@package_community/routes";
import baseRoutes, { noFoundRoute } from "@/routes";
import { examRoutes, examMobileRoutes } from "@package_exam/routes";
import { getBrowserPlatform } from "@/utils/platform";
import navigationRoutes from "@package_navigation/routes";
import collectionRoutes from "@package_collection/routes";
import adminRoutes from "@package_admin/routes";

const platformRegxs = [
  { name: "exam", regx: { pc: /^\/exam/, mobile: /^\/m\/exam/ } },
  {
    name: "community",
    regx: { pc: /^\/community/, mobile: /^\/m\/community/ },
  },
];

const PlatformNavigate = () => {
  const location = useLocation();
  const pathname = location.pathname;
  let matched;
  let isVisitMobile;

  // platformRegxs.forEach((item) => {
  //   for (let platform in item.regx) {
  //     if (item.regx[platform].test(location.pathname)) {
  //       matched = item;
  //       isVisitMobile = platform === "mobile";
  //     }
  //   }
  // });

  // if (matched) {
  //   if (getBrowserPlatform() === "xs" && !isVisitMobile)
  //     return <Navigate to={pathname.replace(matched.regx.pc, "/m/")} replace />;

  //   if (getBrowserPlatform() !== "xs" && isVisitMobile)
  //     return (
  //       <Navigate
  //         to={pathname.replace(matched.regx.mobile, `/${matched.name}`)}
  //         replace
  //       />
  //     );

  //   return <Outlet />;
  // }

  return <Outlet />;
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PlatformNavigate />,
    children: [
      baseRoutes,
      navigationRoutes,
      collectionRoutes,
      communityRoutes,
      communityMobileRoutes,
      examRoutes,
      examMobileRoutes,
      adminRoutes,
      noFoundRoute,
    ],
  },
]);

export default () => <BrowserRouterProvider router={routes} />;
