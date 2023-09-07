import request from "./_request";

// 云夹推广市场收藏
export const GetBookmarkPromotionMarketCollects = ({ orderSort }) =>
  request(
    {
      url: "/myCollection/getIndexMarketCollection",
      method: "POST",
      data: { orderSort },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 云夹推广市场团队
export const GetBookmarkPromotionMarketTeams = ({ orderSort }) =>
  request(
    {
      url: "/myTeam/getIndexMarkeTeam",
      method: "POST",
      data: { orderSort },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 云夹市场收藏参与者
export const GetBookmarkPromotionMarketCollectParticipants = () =>
  request(
    {
      url: "/user/getIndexMarkeTeam",
      method: "POST",
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 云夹市场分类
export const GetBookmarkMarketCategorys = () =>
  request(
    { url: "/myCollection/getmarketClassCollection", method: "POST" },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 云夹市场优秀团队
export const GetBookmarkMarketTeams = ({
  classId,
  pageNum,
  pageSize,
  searchKey,
}) =>
  request(
    {
      url: "/myTeam/getMarkeTeam",
      method: "POST",
      data: {
        classId,
        pageNum,
        pageSize,
        searchKey,
      },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 云夹市场收藏
export const GetBookmarkMarketCollects = ({
  classId,
  pageNum,
  pageSize,
  searchKey,
}) =>
  request(
    {
      url: "/myCollection/getMarketCollection",
      method: "POST",
      data: {
        classId,
        pageNum,
        pageSize,
        searchKey,
      },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 用户收藏集
export const GetBookmarkUserCollect = ({ userId, pageNum, pageSize }) =>
  request(
    {
      url: "/collections/getUsermarketList",
      method: "POST",
      data: { userId, pageNum, pageSize },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 用户公开团队
export const GetBookmarkUserOpenTeam = ({ userId, pageNum, pageSize }) =>
  request(
    {
      url: "/collections/getUsermarketList",
      method: "POST",
      data: { userId, pageNum, pageSize },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 用户加入团队
export const GetBookmarkUserJoinTeam = ({ userId, pageNum, pageSize }) =>
  request(
    {
      url: "/collections/getUsermarketList",
      method: "POST",
      data: { userId, pageNum, pageSize },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );
