import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import fetch from "../utils/fetch";

export const useHallCagegory = () => {
  const { data } = useSWR("/myCollection/getmarketClassCollection", (url) =>
    fetch({ url, method: "POST" })
  );

  return { categorys: data?.result || [] };
};

export const useMarkTeam = (params) => {
  const { data } = useSWR(["/myTeam/getMarkeTeam", params], ([url, params]) =>
    fetch({ url, method: "POST", data: params })
  );

  return { teams: data?.result };
};

export const useMarketCollection = (params) => {
  const { data } = useSWR(
    ["/myCollection/getMarketCollection", params],
    ([url, data]) => fetch({ url, method: "POST", data: params })
  );

  return { collects: data?.result };
};
