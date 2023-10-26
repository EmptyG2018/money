import { Outlet } from "react-router-dom";

import { Agent } from "../../plugins/agent";

import Header from "../../layouts/examHeader";
import Index from "../../pages/exam/index";
import ExamPeperLibrary from "../../pages/exam/exampeperlibrary";
import TopicLibrary from "../../pages/exam/topiclibrary";
import Search from "../../pages/exam/search";
import Answer from "../../pages/exam/answer";

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
          path: "topicLibrary",
          element: <TopicLibrary />,
        },
        {
          path: "search",
          element: <Search />,
        },
        {
          path: "answer",
          element: <Answer />,
        },
      ],
    },
  ],
};
