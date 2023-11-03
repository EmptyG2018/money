import { Outlet } from "react-router-dom";

import { Agent } from "../../plugins/agent";

import Header from "../../layouts/examHeader";
import Index from "../../pages/exam/index";
import ExamPeperLibrary from "../../pages/exam/exampeperlibrary";
import ExamPeperLibraryQuery from "../../pages/exam/exampeperlibraryquery";
import TopicLibrary from "../../pages/exam/topiclibrary";
import TopicLibraryQuery from "../../pages/exam/topiclibraryquery";
import Search from "../../pages/exam/search";
import Paper from "../../pages/exam/paper";
import PaperB from "../../pages/exam/paperB";
import Topic from "../../pages/exam/topic";
import Exercise from "../../pages/exam/exercise";

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
          path: "exampeperlibrary",
          element: <ExamPeperLibrary />,
        },
        {
          path: "exampeperlibrary/:id",
          element: <ExamPeperLibraryQuery />,
        },
        {
          path: "topicLibrary",
          element: <TopicLibrary />,
        },
        {
          path: "topicLibrary/:id",
          element: <TopicLibraryQuery />,
        },
        {
          path: "paper/:id",
          element: <Paper />,
        },
        {
          path: "paperB/:id",
          element: <PaperB />,
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
          path: "exercise/:id",
          element: <Exercise />,
        },
      ],
    },
  ],
};
