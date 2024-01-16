import request from "./_request";

// 获取代理商全局配置
export const GetAgentGlobalSetting = (domain) =>
  request(
    { url: "/dlInfo/getDlInfo", method: "POST", data: { domain } },
    {
      responseDataType: "json",
      carry: [],
    }
  );

// 获取代理商全局配置
export const GetAdminAgentGlobalSetting = () =>
  request(
    { url: "/yunAdminDlId/getDlIdInfoById", method: "POST", data: { dlId: 1 } },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 修改代理商全局配置
export const UpdateAdminAgentGlobalSetting = (setting) =>
  request(
    {
      url: "/yunAdminDlId/updateDlIdInfoById",
      method: "POST",
      data: setting,
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 获取代理商客服配置
export const GetAgentHelpSetting = () =>
  request(
    { url: "/yunDlCustomerC/getDlIdcustomerInfo", method: "POST" },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 获取代理商客服配置选项（1、图标，7、客服图标显示位置，14、账户类型）
export const GetAgentHelpOption = ({ pid }) =>
  request(
    {
      url: "/sysparam/yunSysparam/getSysparamBypid",
      method: "POST",
      data: { pid },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 修改代理商客服配置
export const UpdateAgentHelpSetting = (setting) =>
  request(
    {
      url: "/yunDlCustomerC/updateDlIdcustomerInfo",
      method: "POST",
      data: setting,
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 获取代理商客服图标显示状态
export const GetAgentHelpIconShow = () =>
  request(
    {
      url: "/yunDlCustomerC/getDlIdcustomerOpen",
      method: "POST",
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 获取代理商客服图标显示状态
export const GetAgentHelpMethods = () =>
  request(
    {
      url: "/yunDlCustomerC/getDlIdcustomerList",
      method: "POST",
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 获取配置样式模块列表
export const GetConfigStyleModuleList = ({
  pageId,
  positionType,
  projectId,
  terminal,
}) =>
  request(
    {
      url: "/YunDlAgentPageConfig/getdlIdPageConfig",
      method: "POST",
      data: { pageId, positionType, projectId, terminal },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );