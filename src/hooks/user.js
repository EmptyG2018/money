import { useSelector, useDispatch } from "react-redux";
import { setToken, setInfo } from "../stores/userReducer";
import storage from "store";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import request from "../services/_request";

export const useProfile = () => {
  const { data, trigger } = useSWRMutation("/user/userLogin", (url, { arg }) =>
    request(
      {
        url,
        method: "POST",
        data: { ...arg },
      },
      {
        responseDataType: "json",
        carry: ["site"],
      }
    )
  );

  return { data, login: trigger };
};

export const useUser = (buserId) => {
  const { data } = useSWR(
    ["/user/getMarkeUserInfo", buserId],
    ([url, buserId]) =>
      request(
        { url, method: "POST", data: { buserId } },
        {
          responseDataType: "json",
          carry: ["site"],
        }
      )
  );

  return { user: data?.result };
};

export const useRegister = () => {
  const { data, trigger } = useSWRMutation("/user/userRegist", (url, { arg }) =>
    request(
      {
        url,
        method: "POST",
        data: { ...arg },
      },
      {
        responseDataType: "json",
        carry: ["site"],
      }
    )
  );

  return { data, register: trigger };
};

export const useAuth = () => {
  const { token, info } = useSelector(({ user }) => user);
  return token && info;
};

export const useSyncInfo = () => {
  const dispatch = useDispatch();

  const sync = (token, info) => {
    storage.set("token", token);
    storage.set("info", info);
    dispatch(setToken(token));
    dispatch(setInfo(info));
  };

  const clear = () => {
    storage.remove("token");
    storage.remove("info");
    dispatch(setToken(null));
    dispatch(setInfo(null));
  };
  return { sync, clear };
};

export const useEditPwd = () => {
  const { data, trigger } = useSWRMutation(
    "/user/updateUserPwd",
    (url, { arg }) =>
      request(
        {
          url,
          method: "POST",
          data: { ...arg },
        },
        {
          responseDataType: "json",
          carry: ["auth", "site"],
        }
      )
  );

  return { data, edit: trigger };
};

export const useGetEditUser = () => {
  const { data } = useSWR("/user/getEditUserInfo", (url) =>
    request(
      { url, method: "POST" },
      {
        responseDataType: "json",
        carry: ["auth", "site"],
      }
    )
  );

  return { user: data?.result };
};

export const useEditUser = () => {
  const { data, trigger } = useSWRMutation(
    "/user/editUserInfo",
    (url, { arg }) =>
      request(
        {
          url,
          method: "POST",
          data: { ...arg },
        },
        {
          responseDataType: "json",
          carry: ["auth", "site"],
        }
      )
  );

  return { data, edit: trigger };
};

export const usePublicGoUrl = () => {
  const { data } = useSWR("/user/getPublicGoUrl", (url) =>
    request(
      { url, method: "POST" },
      {
        responseDataType: "json",
        carry: ["auth", "site"],
      }
    )
  );

  return { urls: data?.result };
};

export const useUserMarkeTeam = (params) => {
  const { data } = useSWR(
    ["/myTeam/getUserMarkeTeam", params],
    ([url, params]) =>
      request(
        { url, method: "POST", data: params },
        {
          responseDataType: "json",
          carry: ["auth", "site"],
        }
      )
  );

  return { teams: data?.result?.rows || [] };
};

export const useUserJoinMarkeTeam = (params) => {
  const { data } = useSWR(
    ["/myTeam/getUserJoinMarkeTeam", params],
    ([url, params]) =>
      request(
        { url, method: "POST", data: params },
        {
          responseDataType: "json",
          carry: ["auth", "site"],
        }
      )
  );

  return { teams: data?.result?.rows || [] };
};

export const useUsermarketList = (params) => {
  const { data } = useSWR(
    ["/collections/getUsermarketList", params],
    ([url, params]) =>
      request(
        { url, method: "POST", data: params },
        {
          responseDataType: "json",
          carry: ["auth", "site"],
        }
      )
  );

  return { collects: data?.result?.rows || [] };
};
