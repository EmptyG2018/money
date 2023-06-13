import {
  createBrowserRouter,
  RouterProvider as BrowserRouterProvider,
} from "react-router-dom";
import Header from "../layouts/header";
import Index from "../pages/index";
import Search from "../pages/search";
import ApplyJoin from "../pages/applyjoin";
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
