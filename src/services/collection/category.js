import request from "../_request";

// 获取分组
export const GetGroups = () =>
  request(
    {
      url: "/group/selectGroup",
      method: "POST",
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 创建分组
export const CreateGroup = ({ title }) =>
  request(
    {
      url: "/group/addGroup",
      method: "POST",
      data: {
        title,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 修改分组标题
export const UpdateGroupTitle = ({ id, title }) =>
  request(
    {
      url: "/group/updateGroup",
      method: "POST",
      data: {
        id,
        title,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 删除分组
export const DelGroup = ({ id }) =>
  request(
    {
      url: "/group/delGroup",
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

// 根据分组Id获取收藏集
export const GetCollections = ({ groupId }) =>
  request(
    {
      url: "/collections/selectUserCollections",
      method: "POST",
      data: { groupId },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 根据分组Id新增收藏集
export const CreateCollectionByGroupId = ({ title, groupId, parentId }) =>
  request(
    {
      url: "/collections/addUserCollections",
      method: "POST",
      data: { title, groupId, parentId },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 根据分组Id新增收藏集
export const DelCollection = ({ id }) =>
  request(
    {
      url: "/collections/delCollections",
      method: "POST",
      data: { id },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );
