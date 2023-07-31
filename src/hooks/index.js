import useSWR from "swr";
import fetch from "../utils/fetch";

export const useMarketCollect = (orderSort) => {
  const { data } = useSWR(
    ["/myCollection/getIndexMarketCollection", orderSort],
    ([url, orderSort]) => fetch({ url, method: "POST", data: { orderSort } })
  );

  return { collects: data?.result?.rows || [] };
};

export const useMarketTeam = (orderSort) => {
  const { data } = useSWR(
    ["/myTeam/getIndexMarkeTeam", orderSort],
    ([url, orderSort]) => fetch({ url, method: "POST", data: { orderSort } })
  );

  return { teams: data?.result?.rows || [] };
};

export const useUserMarketTeam = () => {
  const { data } = useSWR("/user/getIndexMarkeTeam", (url) =>
    fetch({ url, method: "POST" })
  );

  return { teams: data?.result?.rows || [] };
};
