import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import request from "../services/_request";

export const useSite = () => {
  return useSWR("/yunAdminDomain/getDlDomainList", (url) =>
    request(
      { url, method: "POST" },
      {
        responseDataType: "json",
        carry: ["auth", "site"],
      }
    )
  );
};

export const useUpdateSite = () => {
  const { data, trigger } = useSWRMutation(
    "/yunAdminDomain/updatelDomainEdition",
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
