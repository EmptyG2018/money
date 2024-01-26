import request from "./_request";

// 代理商资产
export const GetAgentProperty = () =>
  request(
    { url: "/yunDlAgnetInfo/getAdminDlIdInfo", method: "POST" },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 代理商支付宝提款
export const DrawAgentAliMoney = ({ money }) =>
  request(
    {
      url: "/yunDlAgentCashout/addDlAgentCashout",
      method: "POST",
      data: { money },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 绑定代理商支付宝账号
export const BindAgentAliAccount = ({ alipayName, alipayAccount }) =>
  request(
    {
      url: "/yunDlAgnetInfo/updateAdminDlIdpayInfo",
      method: "POST",
      data: { alipayName, alipayAccount },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );
