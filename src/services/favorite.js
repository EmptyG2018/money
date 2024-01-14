import request from "./_request";

// 获取市场收藏夹信息
export const GetMarkeFavoriteInfo = ({ id }) =>
  request(
    {
      url: "/myCollection/getMarketCollectionInfo",
      method: "POST",
      data: { id },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 克隆市场收藏夹
export const CloneMarkeFavorite = ({ id }) =>
  request(
    {
      url: "/myCollection/copymarketCollection",
      method: "POST",
      data: {
        id,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 收藏市场收藏夹
export const UpdateMarkeTeamCollection = ({ id }) =>
  request(
    {
      url: "/myCollection/addmarketCollectionLike",
      method: "POST",
      data: {
        id,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 点赞市场收藏夹
export const UpdateMarkeFavoriteLike = ({ id }) =>
  request(
    {
      url: "/myCollection/updatemarketCollectionLike",
      method: "POST",
      data: {
        id,
        type: 1,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );
