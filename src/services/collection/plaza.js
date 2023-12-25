import request from "../_request";

// 获取广场分类
export const GetPlazaCategorys = () =>
  request(
    {
      url: "/myCollection/getmarketClassCollection",
      method: "POST",
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 获取分类组的收藏数量
export const JoinPlaza = ({ id, classId, description }) =>
  request(
    {
      url: "/collections/collectionsJoinMarket",
      method: "POST",
      data: {
        id,
        iconUrl: '',
        tagName: '',
        classId,
        description,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );
