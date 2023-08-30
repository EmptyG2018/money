import storage from "store";
import axios from "axios";

const resMap = {
  json: (response) => {
    response.use(
      async (response) => {
        if (response.status === 200 && response.data?.code === 200)
          return response.data;
        return Promise.reject(response?.data);
      },
      (error) => {
        return Promise.reject({
          code: error.response.status,
          message: error.message,
        });
      }
    );
  },
  download: (response) => {
    response.use(
      async (response) => {
        if (response.status === 200) return response.data;
        return Promise.reject(response?.data);
      },
      (error) => {
        return Promise.reject({
          code: error.response.status,
          message: "下载失败",
        });
      }
    );
  },
};

const carryMap = {
  auth: (config) => {
    config.headers["Accesstoken"] = storage.get("token") || "";
  },
  site: (config) => {
    config.headers["Proxytoken"] = storage.get("site")?.id;
  },
};

const request = (axiosOption, option = {}) => {
  const defaultResponseDataType = "json";
  const { responseDataType = defaultResponseDataType, carry = [] } = option;

  const instance = axios.create({
    baseURL: "/proxy/yj",
  });

  instance.interceptors.request.use((config) => {
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    // 代理Id后续不走请求体，会移除
    config.data['dlId'] = storage.get("site")?.id;

    carry.forEach((item) => carryMap[item] && carryMap[item](config));
    return config;
  });

  resMap[responseDataType]
    ? resMap[responseDataType](instance.interceptors.response)
    : resMap[defaultResponseDataType](instance.interceptors.response);
  return instance(axiosOption);
};

export default request;
