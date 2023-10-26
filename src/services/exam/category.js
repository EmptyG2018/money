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
