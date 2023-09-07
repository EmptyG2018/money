import { useLocation, Navigate } from "react-router-dom";
import { useUser } from "../hooks/user";

import NoAuth from "../pages/_403";

// 落地页
const ENTRYPAGE = "/";

// 免登录白名单
export const WHITELIST = ["/login", "/register"];

/**
 * @title 登录权限
 * @param {React.ReactNode} [element] 授权页面
 * @param {React.ReactNode} [fallback] 授权拦截提示页面
 */
export const LoginedPage = ({ element, fallback = <NoAuth /> }) => {
  const location = useLocation();
  const { user } = useUser();

  if (WHITELIST.includes(location.pathname)) {
    return user ? <Navigate to={ENTRYPAGE} replace /> : element;
  }
  return user ? element : fallback;
};

/**
 * @title 是否管理员
 */
export const useAdmin = () => {
  const { user } = useUser();
  return user && user.isAdmin === 1;
};

/**
 * @title 管理员权限
 * @param {React.ReactNode} [element] 授权页面
 * @param {React.ReactNode} [fallback] 授权拦截提示页面
 */
export const AdminPage = ({ element, fallback = <NoAuth /> }) => {
  const admin = useAdmin();
  return admin ? element : fallback;
};
