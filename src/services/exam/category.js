import request from "../_request";

// 获取分类、证书、科目
export const GetAllCategoryTrees = () =>
  request(
    {
      url: "/courseList/getAllCoursechapterSubList",
      method: "POST",
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 获取分类、证书
export const GetCorrelationCategoryTrees = () =>
  request(
    {
      url: "/courseList/getAllCoursechapterList",
      method: "POST",
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 获取试卷类型
export const GetPaperCategorys = ({ courseId }) =>
  request(
    {
      url: "/papertype/getpapertypeList",
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

// 根据证书Id获取科目列表
export const GetSubjectByCourseId = ({ pId }) =>
  request(
    {
      url: "/courseList/getCoursechapterByPidList",
      method: "POST",
      data: {
        pid: pId,
      },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 根据科目Id获取章节列表
export const GetChapterBySubjectId = ({ subjectid, pageNum, pageSize }) =>
  request(
    {
      url: "/courseList/getChapterListBySubject",
      method: "POST",
      data: {
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
