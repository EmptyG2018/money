import { useEffect } from "react";

const useSEO = (option) => {
  useEffect(() => {
    const { title, ico, keywords, description } = option || {};

    if (title) document.querySelector("title").innerHTML = title;

    if (ico)
      document.querySelector("link[rel='icon']").setAttribute("href", ico);

    if (keywords)
      document
        .querySelector("meta[name='keywords']")
        .setAttribute("content", keywords);

    if (description)
      document
        .querySelector("meta[name='description']")
        .setAttribute("content", description);
  }, [option]);
};

export default useSEO;
