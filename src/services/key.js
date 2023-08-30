import request from "./_request";

export const GetCodeTypes = () => {
  return request(
    { url: "/admincode/getCodeTypeList", method: "POST" },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );
};

export const GetVipKeyGroups = () => {
  return request(
    { url: "/yunUserGroup/getGroupList", method: "POST" },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );
};

export const GetVipKeys = (params) => {
  return request(
    { url: "/admincode/getYunGroupCodeList", method: "POST", data: params },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );
};

export const GenerateRandVipKey = (params) => {
  return request(
    { url: "/admincode/createYunGroupCode", method: "POST", data: params },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );
};

export const DelVipkey = (params) => {
  return request(
    { url: "/admincode/delYunGroupCodeById", method: "POST", data: params },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );
};

export const ExportVipKey = (params) => {
  return request(
    {
      url: "/admincode/exportYunGroupCodeList",
      method: "POST",
      data: params,
      responseType: "arraybuffer",
    },
    {
      responseDataType: "download",
      carry: ["auth", "site"],
    }
  );
};

export const GetJoinKeyGroups = () => {
  return request(
    { url: "/doadmincode/getYunDoadminEditionList", method: "POST" },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );
};

export const GetJoinKeys = (params) => {
  return request(
    { url: "/doadmincode/getYunDoadminCodeList", method: "POST", data: params },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );
};

export const GenerateRandJoinKey = (params) => {
  return request(
    { url: "/doadmincode/createYunDoadminCode", method: "POST", data: params },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );
};

export const ExportJoinKey = (params) => {
  return request(
    {
      url: "/doadmincode/exportYunDoadminCodeList",
      method: "POST",
      data: params,
      responseType: "arraybuffer",
    },
    {
      responseDataType: "download",
      carry: ["auth", "site"],
    }
  );
};

export const DelJoinkey = (params) => {
  return request(
    { url: "/doadmincode/delYunDoadminCodeById", method: "POST", data: params },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );
};
