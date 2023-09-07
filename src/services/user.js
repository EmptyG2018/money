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
