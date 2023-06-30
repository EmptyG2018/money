import storage from "store";
import axios from "axios";

const fetch = (params, auth) => {
  const instance = axios.create({
    baseURL: "/proxy/yj",
  });

  instance.interceptors.request.use((config) => {
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };
    if (auth) {
      config.headers["Accesstoken"] = storage.get("token");
    }
    return config;
  });

  instance.interceptors.response.use(
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
  return instance(params);
};

export default fetch;
