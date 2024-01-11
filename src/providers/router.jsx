import {
  createBrowserRouter,
  RouterProvider as BrowserRouterProvider,
  Outlet,
} from "react-router-dom";
import { Agent } from "@plugins/agent";
import {
  communityRoutes,
  communityMobileRoutes,
} from "@package_community/routes";
import baseRoutes, { noFoundRoute } from "@/routes";
import { examRoutes, examMobileRoutes } from "@package_exam/routes";
import navigationRoutes from "@package_navigation/routes";
import collectionRoutes from "@package_collection/routes";
import adminRoutes from "@package_admin/routes";
import LandingNavigate from "@/components/LandingNavigate";
import PlatformNavigate from "@components/PlatformNavigate";

const LandingRoute = {
  path: "",
  element: <LandingNavigate />,
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PlatformNavigate element={<Agent element={<Outlet />} />} />,
    children: [
      LandingRoute,
      ...baseRoutes,
      ...navigationRoutes,
      ...collectionRoutes,
      ...communityRoutes,
      ...communityMobileRoutes,
      ...examRoutes,
      ...examMobileRoutes,
      ...adminRoutes,
      noFoundRoute,
    ],
  },
]);

export default () => <BrowserRouterProvider router={routes} />;
