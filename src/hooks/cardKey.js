import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import request from "../services/_request";

export const useBuyUserGroup = (dlId) => {
  const { data } = useSWR(
    ["/yunGroup/getCreateGroupList", dlId],
    ([url, dlId]) =>
      request(
        { url, method: "POST", data: { dlId } },
        {
          responseDataType: "json",
          carry: ["site"],
        }
      )
  );

  return { userGroup: data?.result || [] };
};

export const useBuyUserKey = () => {
  const { data, trigger } = useSWRMutation(
    "/yunGroup/openuUserGroup",
    (url, { arg }) =>
      request(
        {
          url,
          method: "POST",
          data: { ...arg },
        },
        {
          responseDataType: "json",
          carry: ["auth", "site"],
        }
      )
  );

  return { data, buy: trigger };
};

export const useUpdateCardKey = () => {
  const { data, trigger } = useSWRMutation(
    "/yunUserGroup/addGropupInfoList",
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

export const useUpdateSiteCardKey = () => {
  const { data, trigger } = useSWRMutation(
    "/yunAdminDomain/addDomainEditionInfo",
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
