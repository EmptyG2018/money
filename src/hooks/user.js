import { useSelector, useDispatch } from "react-redux";
import { setToken, setInfo } from "../stores/userReducer";
import storage from "store";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import fetch from "../utils/fetch";

export const useProfile = () => {
  const { data, trigger } = useSWRMutation("/user/userLogin", (url, { arg }) =>
    fetch({
      url,
      method: "POST",
      data: { ...arg },
    })
  );

  return { data, login: trigger };
};

export const useUser = (buserId) => {
  const { data } = useSWR(
    ["/user/getMarkeUserInfo", buserId],
    ([url, buserId]) => fetch({ url, method: "POST", data: { buserId } })
  );

  return { user: data?.result };
};

export const useRegister = () => {
  const { data, trigger } = useSWRMutation("/user/userRegist", (url, { arg }) =>
    fetch({
      url,
      method: "POST",
      data: { ...arg },
    })
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
      fetch(
        {
          url,
          method: "POST",
          data: { ...arg },
        },
        true
      )
  );

  return { data, edit: trigger };
};

export const useGetEditUser = () => {
  const { data } = useSWR("/user/getEditUserInfo", (url) =>
    fetch({ url, method: "POST" }, true)
  );

  return { user: data?.result };
};

export const useEditUser = () => {
  const { data, trigger } = useSWRMutation(
    "/user/editUserInfo",
    (url, { arg }) =>
      fetch(
        {
          url,
          method: "POST",
          data: { ...arg },
        },
        true
      )
  );

  return { data, edit: trigger };
};

export const usePublicGoUrl = () => {
  const { data } = useSWR("/user/getPublicGoUrl", (url) =>
    fetch({ url, method: "POST" }, true)
  );

  return { urls: data?.result };
};

export const useUserMarkeTeam = (params) => {
  const { data } = useSWR(
    ["/myTeam/getUserMarkeTeam", params],
    ([url, params]) => fetch({ url, method: "POST", data: params }, true)
  );

  return { teams: data?.result?.rows || [] };
};

export const useUserJoinMarkeTeam = (params) => {
  const { data } = useSWR(
    ["/myTeam/getUserJoinMarkeTeam", params],
    ([url, params]) => fetch({ url, method: "POST", data: params }, true)
  );

  return { teams: data?.result?.rows || [] };
};

export const useUsermarketList = (params) => {
  const { data } = useSWR(
    ["/collections/getUsermarketList", params],
    ([url, params]) => fetch({ url, method: "POST", data: params }, true)
  );

  return { collects: data?.result?.rows || [] };
};
