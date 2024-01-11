import { lazy } from "react";
import { Outlet } from "react-router-dom";

import { Agent } from "@plugins/agent";
import LazyRoute from "@components/LazyRoute";

const Mobile = lazy(() => import("@layouts/mobile"));
const Tabbar = lazy(() => import("@package_exam/layouts/tabbar"));
const Header = lazy(() => import("@package_exam/layouts/header"));

const Index = lazy(() => import("@package_exam/pages/index"));
const Category = lazy(() => import("@package_exam/pages/category"));
const Certificate = lazy(() => import("@package_exam/pages/certificate"));
const Search = lazy(() => import("@package_exam/pages/search"));
const Chapter = lazy(() => import("@package_exam/pages/chapter"));
const TopicType = lazy(() => import("@package_exam/pages/topictype"));
const HistoryPaper = lazy(() => import("@package_exam/pages/historypaper"));
const Topic = lazy(() => import("@package_exam/pages/topic"));
const Exercise = lazy(() => import("@package_exam/pages/exercise"));
const Answer = lazy(() => import("@package_exam/pages/answer"));

const MobileIndex = lazy(() => import("@package_exam/pages/mini/index"));
const MobileSearch = lazy(() => import("@package_exam/pages/mini/search"));
const MobileList = lazy(() => import("@package_exam/pages/mini/list"));
const MobileUser = lazy(() => import("@package_exam/pages/mini/user"));
const MobileCategory = lazy(() => import("@package_exam/pages/mini/category"));
const MobileCertificate = lazy(() =>
  import("@package_exam/pages/mini/certificate")
);
const MobileExercise = lazy(() => import("@package_exam/pages/mini/exercise"));
const MobileAnswer = lazy(() => import("@package_exam/pages/mini/answer"));
const MobileArticle = lazy(() => import("@package_exam/pages/mini/article"));

export const examRoutes = [
  {
    path: "exam",
    element: <LazyRoute element={<Header />} />,
    children: [
      {
        path: "",
        element: <LazyRoute element={<Index />} />,
      },
      {
        path: "category",
        element: <LazyRoute element={<Category />} />,
      },
      {
        path: "certificate/:id",
        element: <LazyRoute element={<Certificate />} />,
      },
      {
        path: "chapter/:id",
        element: <LazyRoute element={<Chapter />} />,
      },
      {
        path: "topictype/:id",
        element: <LazyRoute element={<TopicType />} />,
      },
      {
        path: "historypaper/:id",
        element: <LazyRoute element={<HistoryPaper />} />,
      },
      {
        path: "topic/:id",
        element: <LazyRoute element={<Topic />} />,
      },
      {
        path: "search",
        element: <LazyRoute element={<Search />} />,
      },
      {
        path: "exercise/:mode/:id",
        element: <LazyRoute element={<Exercise />} />,
      },
      {
        path: "answer/:id",
        element: <LazyRoute element={<Answer />} />,
      },
    ],
  },
];

export const examMobileRoutes = [
  {
    path: "m/exam",
    element: <LazyRoute element={<Mobile />} />,
    children: [
      {
        path: "",
        element: <LazyRoute element={<Tabbar />} />,
        children: [
          {
            path: "",
            element: <LazyRoute element={<MobileIndex />} />,
          },
          {
            path: "category",
            element: <LazyRoute element={<MobileCategory />} />,
          },
          {
            path: "certificate/:id",
            element: <LazyRoute element={<MobileCertificate />} />,
          },
          {
            path: "list/:id",
            element: <LazyRoute element={<MobileList />} />,
          },
          {
            path: "user",
            element: <LazyRoute element={<MobileUser />} />,
          },
        ],
      },
      {
        path: "search",
        element: <LazyRoute element={<MobileSearch />} />,
      },
      {
        path: "exercise/:mode/:id",
        element: <LazyRoute element={<MobileExercise />} />,
      },
      {
        path: "answer/:id",
        element: <LazyRoute element={<MobileAnswer />} />,
      },
      {
        path: "article/:id",
        element: <LazyRoute element={<MobileArticle />} />,
      },
    ],
  },
];
