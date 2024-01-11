import { useLocation, Navigate, Outlet } from "react-router-dom";
import { getBrowserPlatform } from "@/utils/platform";

const platformRegxs = [
  { name: "exam", regx: { pc: /^\/exam/, mobile: /^\/m\/exam/ } },
  {
    name: "community",
    regx: { pc: /^\/community/, mobile: /^\/m\/community/ },
  },
];

export default ({ element }) => {
  const location = useLocation();
  const pathname = location.pathname;
  let matched;
  let isVisitMobile;

  platformRegxs.forEach((item) => {
    for (let platform in item.regx) {
      if (item.regx[platform].test(location.pathname)) {
        matched = item;
        isVisitMobile = platform === "mobile";
      }
    }
  });

  if (matched && getBrowserPlatform() === "xs" && !isVisitMobile)
    return (
      <Navigate
        to={pathname.replace(matched.regx.pc, `/m/${matched.name}`)}
        replace
      />
    );

  if (matched && getBrowserPlatform() !== "xs" && isVisitMobile)
    return (
      <Navigate
        to={pathname.replace(matched.regx.mobile, `/${matched.name}`)}
        replace
      />
    );

  return element;
};
