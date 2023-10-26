import { useNavigate, useSearchParams } from "react-router-dom";

export const useNavigatorPath = (path) => {
  const navigate = useNavigate();
  return () =>
    navigate(path + "?redirect=" + encodeURIComponent(location.href));
};

export const useRedirectPath = () => {
  const [params] = useSearchParams();
  return (path) => {
    const url = path || decodeURIComponent(params.get("redirect") || "");
    if (url) location.href = url;
  };
};
