import { useSelector, useDispatch } from "react-redux";
import { setToken, setInfo } from "../stores/userReducer";
import storage from "store";
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
