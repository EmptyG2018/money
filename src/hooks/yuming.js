import useSWR from "swr";
import request from "../services/_request";
import useSWRMutation from "swr/mutation";

export const useYuMing = () => {
  return useSWR("/yunAdminDomain/getDlUserDomainList", (url) =>
    request(
      { url, method: "POST" },
      {
        responseDataType: "json",
        carry: ["auth", "site"],
      }
    )
  );
};

export const useAddYuMing = () => {
  const { data, trigger } = useSWRMutation(
    "/yunAdminDomain/adddlDomain",
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

  return { data, create: trigger };
};

export const useDelYuMing = () => {
  const { data, trigger } = useSWRMutation(
    "/yunAdminDomain/delDomainById",
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

  return { data, delete: trigger };
};
