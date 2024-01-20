import request from "../_request";

// 获取分类组的收藏数量
export const GetCategoryMarkCount = () =>
  request(
    {
      url: "/collections/getMyWeisiteCount",
      method: "POST",
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 创建书签
export const CreateMark = ({
  collectionsId,
  title,
  domain,
  description,
  mediaType,
}) =>
  request(
    {
      url: "/collections/website/addCollectionsWebsite",
      method: "POST",
      data: {
        collectionsId,
        title,
        domain,
        description,
        mediaType,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 修改书签
export const UpdateMark = ({
  id,
  collectionsId,
  tagName,
  title,
  domain,
  description,
  mediaType,
  icon,
  imageUrl,
}) =>
  request(
    {
      url: "/collections/website/updateCollectionsWebsite",
      method: "POST",
      data: {
        id,
        collectionsId,
        tagName,
        title,
        domain,
        description,
        mediaType,
        imageUrl,
        icon,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 根据收藏集ID获取书签
export const GetMarksByCollectionId = ({
  collectionsId,
  title,
  offset,
  pageSize,
  pageNum,
  sort,
}) =>
  request(
    {
      url: "/collections/website/getCollectionsWebsite",
      method: "POST",
      data: {
        collectionsId,
        title,
        offset,
        pageNum,
        pageSize,
        sort,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 移动书签
export const MoveMarks = ({ collectionsId, ids, pid }) =>
  request(
    {
      url: "/collections/website/updateCollectionsWebsiteMove",
      method: "POST",
      data: {
        collectionsId,
        ids,
        pid,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 删除回收站全部书签
export const DelAllMarks = () =>
  request(
    {
      url: "/collections/website/delCollectionsWebsiteAll",
      method: "POST",
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 获取市场团队下的书签列表
export const GetMarkeTeamMarks = ({ id, classId, pageNum, pageSize }) =>
  request(
    {
      url: "/myTeam/getMarketTeamWebsiteByid",
      method: "POST",
      data: {
        id,
        classId,
        pageNum,
        pageSize,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 获取市场收藏夹下的书签
export const GetMarkeFavoriteMarks = ({ pid, id, pageNum, pageSize }) =>
  request(
    {
      url: "/myCollection/getMarketCollectionWebsiteByid",
      method: "POST",
      data: { pid, id, pageNum, pageSize },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 导入书签
export const ImportMarks = (formData) =>
  request(
    {
      url: "/collections/website/uploadAddwebsite",
      method: "POST",
      data: formData,
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );
