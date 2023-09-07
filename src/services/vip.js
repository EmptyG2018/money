import request from "./_request";

// 获取VIP用户组
export const GetVipUserGroups = () =>
  request(
    {
      url: "/yunGroup/getCreateGroupList",
      method: "POST",
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

// 获取VIP用户组
export const GetAdminVipUserGroups = () =>
  request(
    { url: "/yunUserGroup/getList", method: "POST" },
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

// 绑定VIP用户组卡密
export const BindVipUserGroupCardKey = ({ urlLink, remark }) =>
  request(
    {
      url: "/yunUserGroup/addGropupInfoList",
      method: "POST",
      data: {
        urlLink,
        remark,
      },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 绑定分站卡密
export const BindSiteCardKey = ({ urlLink, remark }) =>
  request(
    {
      url: "/yunAdminDomain/addDomainEditionInfo",
      method: "POST",
      data: {
        urlLink,
        remark,
      },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );
