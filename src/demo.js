export const cacheKey = "/demo";

export const fetcher = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random());
    }, 2000);
  })
}