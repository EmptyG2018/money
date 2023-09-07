import { useSelector, useDispatch } from "react-redux";
import { setToken, setInfo } from "../stores/userReducer";
import storage from "store";

export const useUser = () => {
  const dispatch = useDispatch();
  const { token, info } = useSelector(({ user }) => user);

  const login = (token, info) => {
    storage.set("token", token);
    storage.set("info", info);
    dispatch(setToken(token));
    dispatch(setInfo(info));
  };

  const logout = () => {
    storage.remove("token");
    storage.remove("info");
    dispatch(setToken(null));
    dispatch(setInfo(null));
  };

  return { user: token && info, login, logout };
};
