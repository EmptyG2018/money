import request from "./_request";

// 根据项目获取VIP用户组
export const GetVipUserGroupsByProject = ({ projectId }) =>
  request(
    {
      url: "/yunGroup/getAllCreateGroupList",
      method: "POST",
      data: {
        projectId,
      },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 购买VIP用户组卡密
export const BuyVipUserGroupCardKey = ({ groupId, code }) =>
  request(
    {
      url: "/yunGroup/openuUserGroup",
      method: "POST",
      data: { groupId, code },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 获取VIP用户组项目列表
export const GetVipUserGroupProjects = () =>
  request(
    {
      url: "/yunUserGroup/getGroupProjectList",
      method: "POST",
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 获取VIP用户组
export const GetAdminVipUserGroups = ({ projectId }) =>
  request(
    {
      url: "/yunUserGroup/getGroupListByProjectId",
      method: "POST",
      data: {
        projectId,
      },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 修改VIP用户组
export const UpdateAdminVipUserGroup = ({ groupId, sellPrice }) =>
  request(
    {
      url: "/yunUserGroup/updateSellPrice",
      method: "POST",
      data: {
        groupId,
        sellPrice,
      },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 获取VIP用户组卡密配置信息
export const GetVipUserGroupCarKeyInfo = ({ groupId, projectId }) =>
  request(
    {
      url: "/yunUserGroup/getGroupInfoListByProjectId",
      method: "POST",
      data: {
        groupId,
        projectId,
      },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 配置VIP用户组卡密链接
export const UpdateVipUserGroupCardKeyLink = ({ groupId, urlLink, remark }) =>
  request(
    {
      url: "/yunUserGroup/addGropupInfoList",
      method: "POST",
      data: {
        groupId,
        urlLink,
        remark,
      },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 配置分站卡密链接
export const UpdateSiteCardKeyLink = ({ groupId, urlLink, remark }) =>
  request(
    {
      url: "/yunAdminDomain/addDomainEditionInfo",
      method: "POST",
      data: {
        groupId,
        urlLink,
        remark,
      },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 获取用户开通用户主
export const GetUserOpenVipGroupList = () =>
    request(
        {
            url: "/yunGroup/getUserOpenGroupList",
            method: "POST",
        },
        {
            responseDataType: "json",
            carry: ["auth", "site"],
        }
    );