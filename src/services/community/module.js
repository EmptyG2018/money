import request from "../_request";

// 根据论坛模块列表
export const GetModules = () =>
  request(
    {
      url: "/forumForum/getdlIdForumList",
      method: "POST",
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 修改模块
export const UpdateModule = (record) =>
  request(
    {
      url: "/forumForum/updateDlIdForumList",
      method: "POST",
      data: record,
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );
