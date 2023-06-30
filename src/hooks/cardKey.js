import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import fetch from "../utils/fetch";

export const useBuyUserGroup = (dlId) => {
  const { data } = useSWR(
    ["/yunGroup/getCreateGroupList", dlId],
    ([url, dlId]) => fetch({ url, method: "POST", data: { dlId } })
  );

  return { userGroup: data?.result || [] };
};

export const useBuyUserKey = () => {
  const { data, trigger } = useSWRMutation(
    "/yunGroup/openuUserGroup",
    (url, { arg }) =>
      fetch(
        {
          url,
          method: "POST",
          data: { ...arg },
        },
        true
      )
  );

  return { data, buy: trigger };
};
