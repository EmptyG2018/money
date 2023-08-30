import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import request from "../services/_request";

export const useGroup = () => {
  const { data } = useSWR("/group/selectGroup", (url) =>
    request(
      { url, method: "POST" },
      {
        responseDataType: "json",
        carry: ["auth", "site"],
      }
    )
  );

  return { groups: data?.result || [] };
};

export const useCreateGroup = () => {
  const { data, trigger } = useSWRMutation("/group/addGroup", (url, { arg }) =>
    request(
      {
        url,
        method: "POST",
        data: arg,
      },
      {
        responseDataType: "json",
        carry: ["auth", "site"],
      }
    )
  );

  return { create: trigger };
};

export const useVipGroup = () => {
  return useSWR("/yunUserGroup/getList", (url) =>
    request(
      { url, method: "POST" },
      {
        responseDataType: "json",
        carry: ["auth", "site"],
      }
    )
  );
};

export const useUpdateVipGroup = () => {
  const { data, trigger } = useSWRMutation(
    "/yunUserGroup/updateSellPrice",
    (url, { arg }) =>
      request(
        {
          url,
          method: "POST",
          data: arg,
        },
        {
          responseDataType: "json",
          carry: ["auth", "site"],
        }
      )
  );

  return { update: trigger };
};
