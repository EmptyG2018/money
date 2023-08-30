import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import request from "../services/_request";

export const useSiteVersoin = (dlId) => {
  const { data } = useSWR(
    ["/yunSysDomain/getDlEditionDomainList", dlId],
    ([url, dlId]) =>
      request(
        { url, method: "POST", data: { dlId } },
        {
          responseDataType: "json",
          carry: ["site"],
        }
      )
  );

  return { versions: data?.result?.editionInfo || [] };
};

export const useSiteDomain = () => {
  const { data } = useSWR("/yunSysDomain/getYunSysDomainList", (url) =>
    request(
      { url, method: "POST" },
      {
        responseDataType: "json",
        carry: ["site"],
      }
    )
  );

  return { domains: data?.result || [] };
};

export const useRandDomain = () => {
  const { data, trigger } = useSWRMutation(
    "/yunSysDomain/getRandomDomainList",
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

  return { data, rand: trigger };
};

export const useCreateDomain = () => {
  const { data, trigger } = useSWRMutation(
    "/yunSysDomain/addSysDomain",
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

  return { data, create: trigger };
};
