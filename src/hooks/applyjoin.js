import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import fetch from "../utils/fetch";

export const useSiteVersoin = (dlId) => {
  const { data } = useSWR(
    ["/yunSysDomain/getDlEditionDomainList", dlId],
    ([url, dlId]) => fetch({ url, method: "POST", data: { dlId } })
  );

  return { versions: data?.result?.editionInfo || [] };
};

export const useSiteDomain = () => {
  const { data } = useSWR("/yunSysDomain/getYunSysDomainList", (url) =>
    fetch({ url, method: "POST" })
  );

  return { domains: data?.result || [] };
};

export const useRandDomain = () => {
  const { data, trigger } = useSWRMutation(
    "/yunSysDomain/getRandomDomainList",
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

  return { data, rand: trigger };
};

export const useCreateDomain = () => {
  const { data, trigger } = useSWRMutation(
    "/yunSysDomain/addSysDomain",
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

  return { data, create: trigger };
};
