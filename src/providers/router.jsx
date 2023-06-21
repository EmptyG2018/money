import {
  createBrowserRouter,
  RouterProvider as BrowserRouterProvider,
} from "react-router-dom";
import Header from "../layouts/header";
import Settings from "../layouts/settings";
import Index from "../pages/index";
import Search from "../pages/search";
import BuyKey from "../pages/buykey";
import Hall from "../pages/hall";
import ApplyJoin from "../pages/applyjoin";
import User from "../pages/user";
import Info from "../pages/info";
import EditPwd from "../pages/editpwd";
import Login from "../pages/login";
import Register from "../pages/register";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/buykey",
        element: <BuyKey />,
      },
      {
        path: "/hall",
        element: <Hall />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/settings",
        element: <Settings />,
        children: [
          {
            path: "/settings/info",
            element: <Info />,
          },
          {
            path: "/settings/editpwd",
            element: <EditPwd />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/applyjoin",
        element: <ApplyJoin />,
      },
    ],
  },
  // {
  //   path: "",
  //   element: <Tabbar />,
  //   children: [
  //     {
  //       path: "/hall",
  //       element: <Hall />,
  //     },
  //     {
  //       path: "/conversation",
  //       element: <Conversation />,
  //     },
  //     {
  //       path: "/contact",
  //       element: <Contact />,
  //     },
  //     {
  //       path: "/user",
  //       element: <User />,
  //     },
  //   ],
  // },
]);

const RouterProvider = () => {
  return <BrowserRouterProvider router={routes} />;
};
export default RouterProvider;
