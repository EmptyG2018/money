import useSWR from "swr";
import request from "../services/_request";

export const useSite = (domain) => {
  const { data, ...arg } = useSWR(
    ["/dlInfo/getDlInfo", domain],
    ([url, domain]) =>
      request(
        { url, method: "POST", data: { domain } },
        {
          responseDataType: "json",
          carry: [],
        }
      ),
    {
      revalidateOnFocus: false,
    }
  );

  return { site: data?.result || {}, ...arg };
};

export const useSEO = (option) => {
  const seo = (option) => {
    const { title, icon, keywords, description } = option || {};

    if (title) document.querySelector("title").innerHTML = title;
    if (icon)
      document.querySelector("link[rel='icon']").setAttribute("href", icon);
    if (keywords)
      document
        .querySelector("meta[name='keywords']")
        .setAttribute("content", keywords);
    if (description)
      document
        .querySelector("meta[name='description']")
        .setAttribute("content", description);
  };

  option && seo(option);

  return { seo };
};
