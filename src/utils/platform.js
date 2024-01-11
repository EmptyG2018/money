export const getBrowserPlatform = () => {
  if (window.innerWidth < 768) {
    return "xs";
  } else if (window.innerWidth < 991) {
    return "sm";
  } else if (window.innerWidth < 1199) {
    return "md";
  } else {
    return "lg";
  }
};
