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

// 根据分类查询题目
export const GetTopicByType = ({ Id, classType, number, typeId }) =>
  request(
    {
      url: "/question/getQuestionListBytype",
      method: "POST",
      data: {
        Id,
        classType,
        number,
        typeId,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 根据分类查询题目
export const GetTopicTypeBySubjectId = ({ subjectId }) =>
  request(
    {
      url: "/question/getQuestionTypeBysubId",
      method: "POST",
      data: {
        subjectId,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );
