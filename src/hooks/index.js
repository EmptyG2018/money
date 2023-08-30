import useSWR from "swr";
import request from "../services/_request";

export const useMarketCollect = (orderSort) => {
  const { data } = useSWR(
    ["/myCollection/getIndexMarketCollection", orderSort],
    ([url, orderSort]) =>
      request(
        { url, method: "POST", data: { orderSort } },
        {
          responseDataType: "json",
          carry: ["site"],
        }
      )
  );

  return { collects: data?.result?.rows || [] };
};

export const useMarketTeam = (orderSort) => {
  const { data } = useSWR(
    ["/myTeam/getIndexMarkeTeam", orderSort],
    ([url, orderSort]) =>
      request(
        { url, method: "POST", data: { orderSort } },
        {
          responseDataType: "json",
          carry: ["site"],
        }
      )
  );

  return { teams: data?.result?.rows || [] };
};

export const useUserMarketTeam = () => {
  const { data } = useSWR("/user/getIndexMarkeTeam", (url) =>
    request(
      { url, method: "POST" },
      {
        responseDataType: "json",
        carry: ["site"],
      }
    )
  );

  return { teams: data?.result?.rows || [] };
};
