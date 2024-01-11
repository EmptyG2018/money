import {
  createBrowserRouter,
  RouterProvider as BrowserRouterProvider,
} from "react-router-dom";

import {
  communityRoutes,
  communityMobileRoutes,
} from "@package_community/routes";
import baseRoutes, { noFoundRoute } from "@/routes";
import { examRoutes, examMobileRoutes } from "@package_exam/routes";
import navigationRoutes from "@package_navigation/routes";
import collectionRoutes from "@package_collection/routes";
import adminRoutes from "@package_admin/routes";

const routes = createBrowserRouter([
  baseRoutes,
  navigationRoutes,
  collectionRoutes,
  communityRoutes,
  communityMobileRoutes,
  examRoutes,
  examMobileRoutes,
  adminRoutes,
  noFoundRoute,
]);

export default () => <BrowserRouterProvider router={routes} />;
