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
