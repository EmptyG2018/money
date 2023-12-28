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

// 申请加入广场
export const JoinCollectPlaza = ({ id, classId, description }) =>
  request(
    {
      url: "/collections/collectionsJoinMarket",
      method: "POST",
      data: {
        id,
        iconUrl: "",
        tagName: "",
        classId,
        description,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 申请加入广场
export const JoinTeamPlaza = ({ id, classId, description }) =>
  request(
    {
      url: "/team/info/teamJoinMarket",
      method: "POST",
      data: {
        id,
        iconUrl: "",
        tagName: "",
        classId,
        description,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );
