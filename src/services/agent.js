import request from "./_request";

// 获取站点版本
export const GetSiteVersion = () =>
  request(
    {
      url: "/yunSysDomain/getDlEditionDomainList",
      method: "POST",
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 获取站点域名后缀
export const GetSiteDomainSuffix = () =>
  request(
    { url: "/yunSysDomain/getYunSysDomainList", method: "POST" },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 获取随机站点域名前缀
export const GetRandSiteDomainPrefix = () =>
  request(
    { url: "/yunSysDomain/getRandomDomainList", method: "POST" },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 创建代理商分站
export const CreateAgentSite = ({
  code,
  domain,
  domainId,
  id,
  qq,
  webname,
  wx,
}) =>
  request(
    {
      url: "/yunSysDomain/addSysDomain",
      method: "POST",
      data: { code, domain, domainId, id, qq, webname, wx },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 获取分站
export const GetAdminSites = () =>
  request(
    {
      url: "/yunAdminDomain/getDlDomainList",
      method: "POST",
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 修改分站
export const UpdateAdminSite = ({ id, sellPrice }) =>
  request(
    {
      url: "/yunAdminDomain/updatelDomainEdition",
      method: "POST",
      data: { id, sellPrice },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 获取域名
export const GetDomains = () =>
  request(
    {
      url: "/yunAdminDomain/getDlUserDomainList",
      method: "POST",
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 新增域名
export const CreateDomain = ({ domain }) =>
  request(
    {
      url: "/yunAdminDomain/adddlDomain",
      method: "POST",
      data: { domain },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 删除域名
export const DelDomain = ({ id }) =>
  request(
    {
      url: "/yunAdminDomain/delDomainById",
      method: "POST",
      data: { id },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

export const GetDomainNavigateLinks = () =>
  request(
    {
      url: "/YunSystemPath/getDlIdyunSystemPathList",
      method: "POST",
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

export const UpdateDomainNavigateLink = ({ id, goPathId }) =>
  request(
    {
      url: "/yunAdminDomain/updateDomainPathById",
      method: "POST",
      data: { id, goPathId },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 获取菜单
export const GetMenusByProject = ({ projectId }) =>
  request(
    {
      url: "/YunMenuNavigation/getDlMenuNavigationList",
      method: "POST",
      data: { projectId },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );
