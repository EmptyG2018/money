import request from "../_request";

// 获取我的收藏集
export const GetMyCollectLikes = ({ title, pageNum, pageSize }) =>
  request(
    {
      url: "/collections/getMymarketCollectionsLike",
      method: "POST",
      data: {
        title,
        pageNum,
        pageSize,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

