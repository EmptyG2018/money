import axios from "axios";

const useFetch = () => {
  const fetch = (params) => {
    const instance = axios.create({
      baseURL: '/proxy',
    })

    instance.interceptors.response.use(async (response) => {
      if (response.status === 200 && response.data?.code === 200) return response.data;
      return Promise.reject(response?.data);
    }, (error) => {
      return Promise.reject({
        code: error.response.status,
        msg: error.message,
      })
    })
    return instance(params);
  }
  return fetch;
}

export default useFetch;