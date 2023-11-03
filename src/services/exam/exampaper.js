import request from "../_request";

// 根据证书Id获取试卷列表
export const GetExamPaperByCertificateId = ({ courseId }) =>
  request(
    {
      url: "/courseList/getIndexCoursechapterByPidList",
      method: "POST",
      data: {
        courseId,
      },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 根据关键词查询试卷列表
export const GetExamPaperByKeyword = ({ title, pageSize, pageNum }) =>
  request(
    {
      url: "/paper/getSearchPapersList",
      method: "POST",
      data: {
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

// 根据证书Id按筛选试卷列表
export const GetFilterExamPaperByCourseId = ({
  type,
  subjectid,
  pageSize,
  pageNum,
}) =>
  request(
    {
      url: "/paper/getPaperListBySubject",
      method: "POST",
      data: {
        type,
        subjectid,
        pageSize,
        pageNum,
      },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 根据科目Id获取试卷列表
export const GetPaperBySubjectId = ({ type, subjectid, pageNum, pageSize }) =>
  request(
    {
      url: "/paper/getPaperListBySubject",
      method: "POST",
      data: {
        type,
        subjectid,
        pageNum,
        pageSize,
      },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );
