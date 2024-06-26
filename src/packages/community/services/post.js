import request from "@services/_request";

// 获取帖子模块
export const GetPostModules = () =>
  request(
    {
      url: "/PreForumForum/getForumList",
      method: "POST",
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 获取帖子模块中的子模块
export const GetPostModuleChilds = ({ fid }) =>
  request(
    {
      url: "/PreForumForum/getChildrenForumList",
      method: "POST",
      data: { fid },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 获取帖子分类
export const GetPostCategorys = ({ fid }) =>
  request(
    {
      url: "/PreForumThreadclass/getForumClassByid",
      method: "POST",
      data: { fid },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 获取帖子列表
export const GetPosts = ({ fid, pageNum, pageSize, typeId }) =>
  request(
    {
      url: "/PreForumThread/getpreForumThreadlist",
      method: "POST",
      data: {
        fid,
        pageNum,
        pageSize,
        typeId,
      },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 获取帖子内容
export const GetPostContent = ({ tid }) =>
  request(
    {
      url: "/PreForumPost/getForumPostById",
      method: "POST",
      data: { tid },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

// 获取帖子banner
export const GetPostBannars = ({ modeId }) =>
  request(
    {
      url: "/YunBanner/getBannerList",
      method: "POST",
      data: { modeId },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 获取帖子轮播
export const GetPostCarsouels = ({ limit }) =>
  request(
    {
      url: "/PreForumThread/getlastpostchart",
      method: "POST",
      data: { limit },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 获取查询条件帖子列表
export const GetIfPosts = ({ pageNum, pageSize, sort }) =>
  request(
    {
      url: "/PreForumThread/getpreForumThreadNewlist",
      method: "POST",
      data: { pageNum, pageSize, sort },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 根据关键词搜索帖子
export const GetKeywordPosts = ({ pageSize, pageNum, title }) =>
  request(
    {
      url: "/PreForumThread/getSourcePostList",
      method: "POST",
      data: { pageNum, pageSize, title },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 获取帖子隐藏内容
export const GetPostHideContent = ({ tid }) =>
  request(
    {
      url: "/PreForumPost/getForumPostHideById",
      method: "POST",
      data: { tid },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );

export const DownloadPostAttach = ({ aid }) => {
  return request(
    {
      url: "/PreForumPost/downloadAttachments",
      method: "POST",
      data: { aid },
      responseType: "arraybuffer",
    },
    {
      responseDataType: "download",
      carry: ["auth", "site"],
    }
  );
};
