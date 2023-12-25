import request from "../_request";

// 获取

// 获取分类组的收藏数量
export const JoinPlaza = ({ id, classId, description }) =>
  request(
    {
      url: "/collections/collectionsJoinMarket",
      method: "POST",
      data: {
        id,
        classId,
        description,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );
