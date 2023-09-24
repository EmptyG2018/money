import request from "./_request";

// 注册账号
export const RegisterAccount = ({ account, password, userName, email }) =>
  request(
    {
      url: "/user/userRegist",
      method: "POST",
      data: {
        account,
        password,
        userName,
        email,
      },
    },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 登录账号
export const LoginAccount = ({ account, password }) =>
  request(
    { url: "/user/userLogin", method: "POST", data: { account, password } },
    {
      responseDataType: "json",
      carry: ["site"],
    }
  );

// 获取用户信息
export const GetProfile = ({ buserId }) =>
  request(
    {
      url: "/user/getMarkeUserInfo",
      method: "POST",
      data: { buserId },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 获取用户信息配置
export const GetProfileSetting = () =>
  request(
    { url: "/user/getEditUserInfo", method: "POST" },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 修改用户信息配置
export const UpdateProfileSetting = ({
  photoUrl,
  email,
  goType,
  introduce,
  username,
}) =>
  request(
    {
      url: "/user/editUserInfo",
      method: "POST",
      data: { photoUrl, email, goType, introduce, username },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 获取用户跳转类型
export const GetPublicToUrl = () =>
  request(
    { url: "/user/getPublicGoUrl", method: "POST" },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

// 修改用户密码
export const UpdateUserPwd = ({ oldpwd, newpwd }) =>
  request(
    {
      url: "/user/updateUserPwd",
      method: "POST",
      data: {
        oldpwd,
        newpwd,
      },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

export const GetProperty = () =>
  request(
    { url: "/yunAdminDlId/getYunAdminDlIdInfo", method: "POST" },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

export const RechargeCard = ({ code }) =>
  request(
    {
      url: "/yunAdminDlId/rechargeBalanceCode",
      method: "POST",
      data: { code },
    },
    {
      responseDataType: "json",
      carry: ["auth", "site"],
    }
  );

export const GetMenus = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          path: "/admin",
          name: "",
          icon: "",
          key: "Admin",
          hideInMenu: false,
          component: "./",
          children: [
            {
              path: "/admin/base",
              name: "基础管理",
              icon: "",
              key: "AdminBase",
              hideInMenu: false,
              component: "./",
              children: [
                {
                  path: "/admin/base/_statistics",
                  name: "数据统计",
                  icon: "",
                  key: "AdminBaseStatistics",
                  hideInMenu: false,
                  component: "./",
                },
                {
                  path: "/admin/base/_website",
                  name: "网站管理",
                  icon: "",
                  key: "AdminBaseWebsite",
                  hideInMenu: false,
                  component: "./",
                },
                {
                  path: "/admin/base/_vip",
                  name: "会员管理",
                  icon: "",
                  key: "AdminBaseVip",
                  hideInMenu: false,
                  component: "./",
                },
                {
                  path: "/admin/base/_site",
                  name: "分站管理",
                  icon: "",
                  key: "AdminBaseSite",
                  hideInMenu: false,
                  component: "./",
                },
                {
                  path: "/admin/base/_domain",
                  name: "域名管理",
                  icon: "",
                  key: "AdminBaseDomain",
                  hideInMenu: false,
                  component: "./",
                },
                {
                  path: "/admin/base/_vipkey",
                  name: "会员卡管理",
                  icon: "",
                  key: "AdminBaseVipkey",
                  hideInMenu: false,
                  component: "./",
                },
                {
                  path: "/admin/base/_joinkey",
                  name: "加盟卡管理",
                  icon: "",
                  key: "AdminBaseJoinkey",
                  hideInMenu: false,
                  component: "./",
                },
                {
                  path: "/admin/base/_recharge",
                  name: "余额充值",
                  icon: "",
                  key: "AdminBaseRecharge",
                  hideInMenu: false,
                  component: "./",
                },
                {
                  path: "/admin/base/_flowrecord",
                  name: "流水账单",
                  icon: "",
                  key: "AdminBaseFlowrecord",
                  hideInMenu: false,
                  component: "./",
                },
                {
                  path: "/admin/base/_income",
                  name: "佣金收入",
                  icon: "",
                  key: "AdminBaseIncome",
                  hideInMenu: false,
                  component: "./",
                },
                {
                  path: "/admin/base/_help",
                  name: "配置客服",
                  icon: "",
                  key: "AdminBaseHelp",
                  hideInMenu: false,
                  component: "./",
                },
              ],
            },
          ],
        },
      ]);
    }, 2000);
  });
