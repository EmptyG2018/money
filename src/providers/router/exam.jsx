import { Outlet } from "react-router-dom";

import { Agent } from "../../plugins/agent";

import Header from "../../layouts/examHeader";
import Index from "../../pages/exam/index";
import Category from "../../pages/exam/category";
import Certificate from "../../pages/exam/certificate";
import Search from "../../pages/exam/search";
import Chapter from "../../pages/exam/chapter";
import TopicType from "../../pages/exam/topictype";
import HistoryPaper from "../../pages/exam/historypaper";
import Topic from "../../pages/exam/topic";
import Exercise from "../../pages/exam/exercise";
import Answer from "../../pages/exam/answer";

import Mobile from "../../layouts/mobile";
import Tabbar from "../../layouts/examTabbar";
import MobileIndex from "../../pages/exam/mini/index";
import MobileSearch from "../../pages/exam/mini/search";
import MobileList from "../../pages/exam/mini/list";
import MobileUser from "../../pages/exam/mini/user";
import MobileCategory from "../../pages/exam/mini/category";
import MobileCertificate from "../../pages/exam/mini/certificate";
import MobileExercise from "../../pages/exam/mini/exercise";
import MobileAnswer from "../../pages/exam/mini/answer";
import MobileArticle from "../../pages/exam/mini/article";

export const examRoutes = {
  path: "/",
  element: <Agent element={<Outlet />} />,
  children: [
    {
      path: "exam",
      element: <Header />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "category",
          element: <Category />,
        },
        {
          path: "certificate/:id",
          element: <Certificate />,
        },
        {
          path: "chapter/:id",
          element: <Chapter />,
        },
        {
          path: "topictype/:id",
          element: <TopicType />,
        },
        {
          path: "historypaper/:id",
          element: <HistoryPaper />,
        },
        {
          path: "topic/:id",
          element: <Topic />,
        },
        {
          path: "search",
          element: <Search />,
        },
        {
          path: "exercise/:mode/:id",
          element: <Exercise />,
        },
        {
          path: "answer/:id",
          element: <Answer />,
        },
      ],
    },
  ],
};

export const examMobileRoutes = {
  path: "/",
  element: <Agent element={<Outlet />} />,
  children: [
    {
      path: "m/exam",
      element: <Mobile />,
      children: [
        {
          path: "",
          element: <Tabbar />,
          children: [
            {
              index: true,
              element: <MobileIndex />,
            },
            {
              path: "category",
              element: <MobileCategory />,
            },
            {
              path: "certificate/:id",
              element: <MobileCertificate />,
            },
            {
              path: "list/:id",
              element: <MobileList />,
            },
            {
              path: "user",
              element: <MobileUser />,
            },
          ],
        },
        {
          path: "search",
          element: <MobileSearch />,
        },
        {
          path: "exercise/:mode/:id",
          element: <MobileExercise />,
        },
        {
          path: "answer/:id",
          element: <MobileAnswer />,
        },
        {
          path: "article/:id",
          element: <MobileArticle />,
        },
      ],
    },
  ],
};
