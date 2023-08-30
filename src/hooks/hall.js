import useSWR from "swr";
import request from "../services/_request";

export const useHallCagegory = () => {
  const { data } = useSWR("/myCollection/getmarketClassCollection", (url) =>
    request(
      { url, method: "POST" },
      {
        responseDataType: "json",
        carry: ["site"],
      }
    )
  );

  return { categorys: data?.result || [] };
};

export const useMarkTeam = (params) => {
  const { data } = useSWR(["/myTeam/getMarkeTeam", params], ([url, params]) =>
    request(
      { url, method: "POST", data: params },
      {
        responseDataType: "json",
        carry: ["site"],
      }
    )
  );

  return { teams: data?.result };
};

export const useMarketCollection = (params) => {
  const { data } = useSWR(
    ["/myCollection/getMarketCollection", params],
    ([url, data]) =>
      request(
        { url, method: "POST", data: params },
        {
          responseDataType: "json",
          carry: ["site"],
        }
      )
  );

  return { collects: data?.result };
};
