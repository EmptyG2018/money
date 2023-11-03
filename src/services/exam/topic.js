import request from "../_request";

// 根据关键词查询题目列表
export const GetTopicQuery = ({
  subjectId,
  courseId,
  chapterId,
  title,
  pageSize,
  pageNum,
}) =>
  request(
    {
      url: "/question/getSearchQuestionList",
      method: "POST",
      data: {
        subjectId,
        courseId,
        chapterId,
        title,
        pageSize,
        pageNum,
      },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 根据试卷Id查询题目
export const GetTopicByPaperId = ({ paperId }) =>
  request(
    {
      url: "/paper/getPaperQuestionList",
      method: "POST",
      data: {
        paperId,
      },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 根据章节Id查询题目
export const GetTopicByChapterId = ({ chapterId }) =>
  request(
    {
      url: "/courseList/getSubjectQuestionList",
      method: "POST",
      data: {
        subjectId: chapterId,
      },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );
