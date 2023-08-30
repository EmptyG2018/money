import request from "./_request";

export const GetStatistics = () =>
  request(
    { url: "/yunAdminDlId/getStatistics", method: "POST" },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

export const GetConsumeRecord = (params) =>
  request(
    { url: "/yunAdminDlId/getConsumptionList", method: "POST", data: params },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

export const GetFlowRecord = (params) =>
  request(
    {
      url: "/yunAdminDlId/getRechargeBalanceCodeList",
      method: "POST",
      data: params,
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );
