import request from "./_request";

// 获取团队网址列表
export const GetTeamWebsites = ({ teamId, pageSize, pageNum }) =>
  request(
    {
      url: "/team/website/getTeamWebsite",
      method: "POST",
      data: { teamId, pageSize, pageNum },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 批量删除团队网址
export const DelTeamWebsites = ({ teamId, ids }) =>
  request(
    {
      url: "/team/website/deleteYunTeamWebsite",
      method: "POST",
      data: { teamId, ids },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 修改团队网址
export const UpdateTeamWebsite = ({
  id,
  title,
  domain,
  classId,
  teamId,
  description,
}) =>
  request(
    {
      url: "/team/website/updateYunTeamWebsite",
      method: "POST",
      data: { id, title, domain, classId, teamId, description },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );
