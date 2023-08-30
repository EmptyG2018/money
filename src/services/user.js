import request from "./_request";

export const GetProperty = () =>
  request(
    { url: "/yunAdminDlId/getYunAdminDlIdInfo", method: "POST" },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

export const RechargeCard = (params) =>
  request(
    { url: "/yunAdminDlId/rechargeBalanceCode", method: "POST", data: params },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );
