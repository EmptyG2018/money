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
