import request from "../_request";

// 获取轮博图
export const GetCrousel = ({ modeId, project }) =>
  request(
    {
      url: "/YunBanner/getBannerList",
      method: "POST",
      data: {
        modeId,
        project,
      },
    },
    {
      responseDataType: "json",
      carry: ["site", "auth"],
    }
  );
