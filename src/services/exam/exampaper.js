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
